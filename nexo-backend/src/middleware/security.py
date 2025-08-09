from flask import request, jsonify, g
from functools import wraps
import re
import html
from src.routes.auth import verify_token

class SecurityMiddleware:
    """Middleware de segurança para proteger contra vulnerabilidades comuns"""
    
    def __init__(self, app=None):
        self.app = app
        if app is not None:
            self.init_app(app)
    
    def init_app(self, app):
        """Inicializar middleware com a aplicação Flask"""
        app.before_request(self.before_request)
        app.after_request(self.after_request)
    
    def before_request(self):
        """Executado antes de cada requisição"""
        # Validar Content-Type para requisições POST/PUT
        if request.method in ['POST', 'PUT', 'PATCH']:
            if not request.is_json and request.content_type != 'application/json':
                if '/api/' in request.path:
                    return jsonify({'error': 'Content-Type deve ser application/json'}), 400
        
        # Sanitizar dados de entrada
        if request.is_json and request.json:
            g.sanitized_data = self.sanitize_input(request.json)
        
        # Rate limiting básico (em produção usar Redis)
        # Aqui implementaríamos rate limiting por IP
        
    def after_request(self, response):
        """Executado após cada requisição"""
        # Headers de segurança
        response.headers['X-Content-Type-Options'] = 'nosniff'
        response.headers['X-Frame-Options'] = 'DENY'
        response.headers['X-XSS-Protection'] = '1; mode=block'
        response.headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains'
        response.headers['Content-Security-Policy'] = "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'"
        
        # Remover headers que expõem informações do servidor
        response.headers.pop('Server', None)
        
        return response
    
    def sanitize_input(self, data):
        """Sanitizar dados de entrada para prevenir XSS"""
        if isinstance(data, dict):
            return {key: self.sanitize_input(value) for key, value in data.items()}
        elif isinstance(data, list):
            return [self.sanitize_input(item) for item in data]
        elif isinstance(data, str):
            # Escapar HTML
            sanitized = html.escape(data)
            # Remover scripts maliciosos
            sanitized = re.sub(r'<script[^>]*>.*?</script>', '', sanitized, flags=re.IGNORECASE | re.DOTALL)
            # Remover eventos JavaScript
            sanitized = re.sub(r'on\w+\s*=\s*["\'][^"\']*["\']', '', sanitized, flags=re.IGNORECASE)
            return sanitized
        else:
            return data

def require_auth(f):
    """Decorator para exigir autenticação"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return jsonify({'error': 'Token de autorização necessário'}), 401
        
        token = auth_header.split(' ')[1]
        user_id = verify_token(token)
        
        if not user_id:
            return jsonify({'error': 'Token inválido ou expirado'}), 401
        
        g.current_user_id = user_id
        return f(*args, **kwargs)
    
    return decorated_function

def validate_input(schema):
    """Decorator para validar entrada baseada em schema"""
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            if not request.is_json:
                return jsonify({'error': 'Content-Type deve ser application/json'}), 400
            
            data = request.json
            errors = []
            
            # Validar campos obrigatórios
            for field in schema.get('required', []):
                if field not in data or data[field] is None or data[field] == '':
                    errors.append(f'Campo {field} é obrigatório')
            
            # Validar tipos de dados
            for field, field_type in schema.get('types', {}).items():
                if field in data and not isinstance(data[field], field_type):
                    errors.append(f'Campo {field} deve ser do tipo {field_type.__name__}')
            
            # Validar tamanhos de string
            for field, max_length in schema.get('max_lengths', {}).items():
                if field in data and isinstance(data[field], str) and len(data[field]) > max_length:
                    errors.append(f'Campo {field} deve ter no máximo {max_length} caracteres')
            
            # Validar emails
            email_fields = schema.get('email_fields', [])
            email_pattern = re.compile(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')
            for field in email_fields:
                if field in data and not email_pattern.match(data[field]):
                    errors.append(f'Campo {field} deve ser um email válido')
            
            if errors:
                return jsonify({'error': 'Dados inválidos', 'details': errors}), 400
            
            return f(*args, **kwargs)
        
        return decorated_function
    return decorator

def rate_limit(max_requests=100, window=3600):
    """Decorator para rate limiting (versão simplificada)"""
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            # Em produção, implementar com Redis
            # Por agora, apenas log da tentativa
            client_ip = request.environ.get('HTTP_X_FORWARDED_FOR', request.remote_addr)
            print(f"Rate limit check for {client_ip} on {request.endpoint}")
            
            return f(*args, **kwargs)
        
        return decorated_function
    return decorator

# Schemas de validação para diferentes endpoints
SCHEMAS = {
    'login': {
        'required': ['email', 'password'],
        'types': {'email': str, 'password': str},
        'email_fields': ['email'],
        'max_lengths': {'email': 255, 'password': 128}
    },
    'register': {
        'required': ['email', 'password'],
        'types': {'email': str, 'password': str, 'username': str},
        'email_fields': ['email'],
        'max_lengths': {'email': 255, 'password': 128, 'username': 80}
    },
    'project': {
        'required': ['name', 'user_id'],
        'types': {'name': str, 'user_id': int, 'description': str, 'budget': (int, float)},
        'max_lengths': {'name': 200, 'description': 1000}
    },
    'task': {
        'required': ['title', 'project_id'],
        'types': {'title': str, 'project_id': int, 'description': str, 'estimated_hours': (int, float)},
        'max_lengths': {'title': 200, 'description': 1000}
    }
}

