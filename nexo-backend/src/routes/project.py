from flask import Blueprint, jsonify, request
from src.models.project import Project, Task, TaskDependency, ProjectKPI, db
from src.models.user import User
from datetime import datetime
import random

project_bp = Blueprint('project', __name__)

# Projetos
@project_bp.route('/projects', methods=['GET'])
def get_projects():
    user_id = request.args.get('user_id')
    if user_id:
        projects = Project.query.filter_by(user_id=user_id).all()
    else:
        projects = Project.query.all()
    return jsonify([project.to_dict() for project in projects])

@project_bp.route('/projects', methods=['POST'])
def create_project():
    data = request.json
    project = Project(
        name=data['name'],
        description=data.get('description'),
        smart_objective=data.get('smart_objective'),
        start_date=datetime.fromisoformat(data['start_date']) if data.get('start_date') else None,
        end_date=datetime.fromisoformat(data['end_date']) if data.get('end_date') else None,
        budget=data.get('budget'),
        user_id=data['user_id']
    )
    db.session.add(project)
    db.session.commit()
    return jsonify(project.to_dict()), 201

@project_bp.route('/projects/<int:project_id>', methods=['GET'])
def get_project(project_id):
    project = Project.query.get_or_404(project_id)
    return jsonify(project.to_dict())

@project_bp.route('/projects/<int:project_id>', methods=['PUT'])
def update_project(project_id):
    project = Project.query.get_or_404(project_id)
    data = request.json
    
    project.name = data.get('name', project.name)
    project.description = data.get('description', project.description)
    project.smart_objective = data.get('smart_objective', project.smart_objective)
    project.status = data.get('status', project.status)
    project.progress = data.get('progress', project.progress)
    project.budget = data.get('budget', project.budget)
    project.actual_cost = data.get('actual_cost', project.actual_cost)
    
    if data.get('start_date'):
        project.start_date = datetime.fromisoformat(data['start_date'])
    if data.get('end_date'):
        project.end_date = datetime.fromisoformat(data['end_date'])
    
    project.updated_at = datetime.utcnow()
    db.session.commit()
    return jsonify(project.to_dict())

@project_bp.route('/projects/<int:project_id>', methods=['DELETE'])
def delete_project(project_id):
    project = Project.query.get_or_404(project_id)
    db.session.delete(project)
    db.session.commit()
    return '', 204

# Geração de objetivo SMART com IA (simulado)
@project_bp.route('/projects/generate-smart-objective', methods=['POST'])
def generate_smart_objective():
    data = request.json
    description = data.get('description', '')
    
    # Simulação de IA - em produção seria integrado com OpenAI ou similar
    smart_objectives = [
        f"Aumentar a eficiência operacional em 25% nos próximos 6 meses através da implementação de {description}, medindo o tempo de execução de processos-chave e estabelecendo marcos mensais de progresso.",
        f"Desenvolver e lançar {description} até {datetime.now().strftime('%B de %Y')}, alcançando 80% de satisfação dos usuários através de pesquisas de feedback e métricas de engajamento.",
        f"Reduzir custos operacionais em 15% no próximo trimestre implementando {description}, com acompanhamento semanal do orçamento e relatórios de economia gerados.",
        f"Melhorar a qualidade do produto/serviço relacionado a {description} em 30% nos próximos 4 meses, utilizando métricas de qualidade específicas e avaliações regulares."
    ]
    
    return jsonify({
        'smart_objective': random.choice(smart_objectives),
        'generated_at': datetime.utcnow().isoformat()
    })

# KPIs
@project_bp.route('/projects/<int:project_id>/kpis', methods=['GET'])
def get_project_kpis(project_id):
    kpis = ProjectKPI.query.filter_by(project_id=project_id).all()
    return jsonify([kpi.to_dict() for kpi in kpis])

@project_bp.route('/projects/<int:project_id>/kpis', methods=['POST'])
def create_project_kpi(project_id):
    data = request.json
    kpi = ProjectKPI(
        project_id=project_id,
        kpi_type=data['kpi_type'],
        target_value=data.get('target_value'),
        unit=data.get('unit'),
        is_active=data.get('is_active', True)
    )
    db.session.add(kpi)
    db.session.commit()
    return jsonify(kpi.to_dict()), 201

@project_bp.route('/kpis/<int:kpi_id>', methods=['PUT'])
def update_kpi(kpi_id):
    kpi = ProjectKPI.query.get_or_404(kpi_id)
    data = request.json
    
    kpi.target_value = data.get('target_value', kpi.target_value)
    kpi.current_value = data.get('current_value', kpi.current_value)
    kpi.is_active = data.get('is_active', kpi.is_active)
    kpi.updated_at = datetime.utcnow()
    
    db.session.commit()
    return jsonify(kpi.to_dict())

# Tarefas
@project_bp.route('/projects/<int:project_id>/tasks', methods=['GET'])
def get_project_tasks(project_id):
    tasks = Task.query.filter_by(project_id=project_id).order_by(Task.order_index).all()
    return jsonify([task.to_dict() for task in tasks])

@project_bp.route('/projects/<int:project_id>/tasks', methods=['POST'])
def create_task(project_id):
    data = request.json
    task = Task(
        title=data['title'],
        description=data.get('description'),
        status=data.get('status', 'todo'),
        priority=data.get('priority', 'medium'),
        start_date=datetime.fromisoformat(data['start_date']) if data.get('start_date') else None,
        end_date=datetime.fromisoformat(data['end_date']) if data.get('end_date') else None,
        estimated_hours=data.get('estimated_hours'),
        project_id=project_id,
        assigned_to=data.get('assigned_to'),
        parent_task_id=data.get('parent_task_id'),
        order_index=data.get('order_index', 0)
    )
    db.session.add(task)
    db.session.commit()
    return jsonify(task.to_dict()), 201

@project_bp.route('/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    task = Task.query.get_or_404(task_id)
    data = request.json
    
    task.title = data.get('title', task.title)
    task.description = data.get('description', task.description)
    task.status = data.get('status', task.status)
    task.priority = data.get('priority', task.priority)
    task.progress = data.get('progress', task.progress)
    task.actual_hours = data.get('actual_hours', task.actual_hours)
    task.order_index = data.get('order_index', task.order_index)
    
    if data.get('start_date'):
        task.start_date = datetime.fromisoformat(data['start_date'])
    if data.get('end_date'):
        task.end_date = datetime.fromisoformat(data['end_date'])
    
    task.updated_at = datetime.utcnow()
    db.session.commit()
    return jsonify(task.to_dict())

@project_bp.route('/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    task = Task.query.get_or_404(task_id)
    db.session.delete(task)
    db.session.commit()
    return '', 204

# Geração de tarefas com IA (simulado)
@project_bp.route('/projects/<int:project_id>/generate-tasks', methods=['POST'])
def generate_tasks(project_id):
    data = request.json
    objective = data.get('objective', '')
    
    # Simulação de IA - tarefas baseadas no objetivo
    task_templates = [
        {"title": "Análise de Requisitos", "description": "Definir e documentar todos os requisitos do projeto", "estimated_hours": 16},
        {"title": "Planejamento Detalhado", "description": "Criar cronograma detalhado e alocar recursos", "estimated_hours": 12},
        {"title": "Desenvolvimento/Implementação", "description": "Executar as atividades principais do projeto", "estimated_hours": 40},
        {"title": "Testes e Validação", "description": "Realizar testes e validar resultados", "estimated_hours": 20},
        {"title": "Documentação", "description": "Criar documentação técnica e de usuário", "estimated_hours": 8},
        {"title": "Treinamento", "description": "Treinar equipe e usuários finais", "estimated_hours": 12},
        {"title": "Entrega e Implantação", "description": "Entregar e implantar a solução", "estimated_hours": 16}
    ]
    
    generated_tasks = []
    for i, template in enumerate(task_templates):
        task = Task(
            title=template['title'],
            description=template['description'],
            estimated_hours=template['estimated_hours'],
            project_id=project_id,
            order_index=i,
            status='todo',
            priority='medium'
        )
        db.session.add(task)
        generated_tasks.append(template)
    
    db.session.commit()
    
    return jsonify({
        'generated_tasks': generated_tasks,
        'count': len(generated_tasks),
        'generated_at': datetime.utcnow().isoformat()
    })

# Dashboard Analytics
@project_bp.route('/projects/<int:project_id>/analytics', methods=['GET'])
def get_project_analytics(project_id):
    project = Project.query.get_or_404(project_id)
    tasks = Task.query.filter_by(project_id=project_id).all()
    
    # Calcular métricas
    total_tasks = len(tasks)
    completed_tasks = len([t for t in tasks if t.status == 'done'])
    in_progress_tasks = len([t for t in tasks if t.status == 'in_progress'])
    todo_tasks = len([t for t in tasks if t.status == 'todo'])
    
    total_estimated_hours = sum([t.estimated_hours or 0 for t in tasks])
    total_actual_hours = sum([t.actual_hours or 0 for t in tasks])
    
    # Simulação de previsões de IA
    completion_prediction = {
        'estimated_completion_date': '2025-09-15',
        'confidence': 85,
        'risk_level': 'medium',
        'success_probability': 92
    }
    
    return jsonify({
        'project_id': project_id,
        'progress': project.progress,
        'tasks_summary': {
            'total': total_tasks,
            'completed': completed_tasks,
            'in_progress': in_progress_tasks,
            'todo': todo_tasks
        },
        'time_tracking': {
            'estimated_hours': total_estimated_hours,
            'actual_hours': total_actual_hours,
            'efficiency': (total_estimated_hours / total_actual_hours * 100) if total_actual_hours > 0 else 100
        },
        'budget_tracking': {
            'budget': project.budget or 0,
            'actual_cost': project.actual_cost or 0,
            'variance': ((project.budget or 0) - (project.actual_cost or 0))
        },
        'predictions': completion_prediction
    })

