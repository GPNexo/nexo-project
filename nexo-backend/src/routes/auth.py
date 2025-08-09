from flask import Blueprint, jsonify, request, session
from src.models.user import User, db
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, timedelta
import jwt
import os

auth_bp = Blueprint('auth', __name__)

# Configuração JWT
JWT_SECRET = os.environ.get('JWT_SECRET', 'nexo-secret-key-2025')
JWT_EXPIRATION_HOURS = 24

def generate_token(user_id):
    payload = {
        'user_id': user_id,
        'exp': datetime.utcnow() + timedelta(hours=JWT_EXPIRATION_HOURS),
        'iat': datetime.utcnow()
    }
    return jwt.encode(payload, JWT_SECRET, algorithm='HS256')

def verify_token(token):
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=['HS256'])
        return payload['user_id']
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None

@auth_bp.route('/auth/register', methods=['POST'])
def register():
    data = request.json
    
    # Validar dados obrigatórios
    if not data.get('email') or not data.get('password'):
        return jsonify({'error': 'Email e senha são obrigatórios'}), 400
    
    # Verificar se usuário já existe
    existing_user = User.query.filter_by(email=data['email']).first()
    if existing_user:
        return jsonify({'error': 'Email já cadastrado'}), 409
    
    # Criar novo usuário
    user = User(
        username=data.get('username', data['email'].split('@')[0]),
        email=data['email']
    )
    
    # Em produção, adicionar hash da senha
    # user.password_hash = generate_password_hash(data['password'])
    
    db.session.add(user)
    db.session.commit()
    
    # Gerar token
    token = generate_token(user.id)
    
    return jsonify({
        'message': 'Usuário criado com sucesso',
        'user': user.to_dict(),
        'token': token
    }), 201

@auth_bp.route('/auth/login', methods=['POST'])
def login():
    data = request.json
    
    if not data.get('email') or not data.get('password'):
        return jsonify({'error': 'Email e senha são obrigatórios'}), 400
    
    # Buscar usuário
    user = User.query.filter_by(email=data['email']).first()
    
    # Para demo, aceitar qualquer senha
    # Em produção, verificar hash da senha
    if not user:
        # Criar usuário automaticamente para demo
        user = User(
            username=data['email'].split('@')[0],
            email=data['email']
        )
        db.session.add(user)
        db.session.commit()
    
    # Gerar token
    token = generate_token(user.id)
    
    return jsonify({
        'message': 'Login realizado com sucesso',
        'user': user.to_dict(),
        'token': token
    })

@auth_bp.route('/auth/logout', methods=['POST'])
def logout():
    # Em uma implementação real, invalidar o token
    return jsonify({'message': 'Logout realizado com sucesso'})

@auth_bp.route('/auth/me', methods=['GET'])
def get_current_user():
    auth_header = request.headers.get('Authorization')
    if not auth_header or not auth_header.startswith('Bearer '):
        return jsonify({'error': 'Token de autorização necessário'}), 401
    
    token = auth_header.split(' ')[1]
    user_id = verify_token(token)
    
    if not user_id:
        return jsonify({'error': 'Token inválido ou expirado'}), 401
    
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'Usuário não encontrado'}), 404
    
    return jsonify(user.to_dict())

@auth_bp.route('/auth/refresh', methods=['POST'])
def refresh_token():
    auth_header = request.headers.get('Authorization')
    if not auth_header or not auth_header.startswith('Bearer '):
        return jsonify({'error': 'Token de autorização necessário'}), 401
    
    token = auth_header.split(' ')[1]
    user_id = verify_token(token)
    
    if not user_id:
        return jsonify({'error': 'Token inválido ou expirado'}), 401
    
    # Gerar novo token
    new_token = generate_token(user_id)
    
    return jsonify({
        'token': new_token,
        'expires_in': JWT_EXPIRATION_HOURS * 3600  # em segundos
    })

# OAuth simulado (Google/Microsoft)
@auth_bp.route('/auth/oauth/<provider>', methods=['POST'])
def oauth_login(provider):
    data = request.json
    
    if provider not in ['google', 'microsoft']:
        return jsonify({'error': 'Provedor OAuth não suportado'}), 400
    
    # Simulação de OAuth - em produção integrar com APIs reais
    oauth_data = {
        'google': {
            'email': 'usuario@gmail.com',
            'name': 'Usuário Google',
            'provider_id': 'google_123456'
        },
        'microsoft': {
            'email': 'usuario@outlook.com',
            'name': 'Usuário Microsoft',
            'provider_id': 'microsoft_789012'
        }
    }
    
    user_data = oauth_data[provider]
    
    # Buscar ou criar usuário
    user = User.query.filter_by(email=user_data['email']).first()
    if not user:
        user = User(
            username=user_data['name'],
            email=user_data['email']
        )
        db.session.add(user)
        db.session.commit()
    
    # Gerar token
    token = generate_token(user.id)
    
    return jsonify({
        'message': f'Login via {provider.title()} realizado com sucesso',
        'user': user.to_dict(),
        'token': token,
        'provider': provider
    })

# Middleware para verificar autenticação
def require_auth(f):
    def decorated_function(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return jsonify({'error': 'Token de autorização necessário'}), 401
        
        token = auth_header.split(' ')[1]
        user_id = verify_token(token)
        
        if not user_id:
            return jsonify({'error': 'Token inválido ou expirado'}), 401
        
        request.current_user_id = user_id
        return f(*args, **kwargs)
    
    decorated_function.__name__ = f.__name__
    return decorated_function

