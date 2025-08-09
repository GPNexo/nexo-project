from flask import Blueprint, jsonify, request
from datetime import datetime, timedelta
import random
import json

ai_bp = Blueprint('ai', __name__)

# Simulação de modelos de IA - em produção seria integrado com OpenAI, Anthropic, etc.

@ai_bp.route('/ai/generate-smart-objective', methods=['POST'])
def generate_smart_objective():
    """Gera objetivos SMART baseados na descrição do projeto"""
    data = request.json
    description = data.get('description', '')
    industry = data.get('industry', 'geral')
    timeline = data.get('timeline', '6 meses')
    
    # Templates de objetivos SMART por setor
    templates = {
        'tecnologia': [
            f"Desenvolver e lançar {description} em {timeline}, alcançando 85% de satisfação dos usuários através de testes beta com pelo menos 100 usuários, medindo NPS e tempo de resposta do sistema.",
            f"Implementar {description} reduzindo o tempo de processamento em 40% nos próximos {timeline}, com monitoramento contínuo de performance e relatórios semanais de otimização.",
            f"Criar {description} que aumente a eficiência operacional em 30% até {timeline}, medindo através de métricas de produtividade e feedback da equipe."
        ],
        'marketing': [
            f"Executar campanha de {description} aumentando o engajamento em 50% nos próximos {timeline}, medindo através de métricas de redes sociais e conversões.",
            f"Implementar estratégia de {description} gerando 200 leads qualificados por mês até {timeline}, com acompanhamento via CRM e relatórios de ROI.",
            f"Desenvolver {description} aumentando o reconhecimento da marca em 35% nos próximos {timeline}, medindo através de pesquisas de mercado mensais."
        ],
        'vendas': [
            f"Implementar processo de {description} aumentando as vendas em 25% nos próximos {timeline}, com acompanhamento semanal de pipeline e conversões.",
            f"Desenvolver {description} reduzindo o ciclo de vendas em 20% até {timeline}, medindo tempo médio de fechamento e satisfação do cliente.",
            f"Executar {description} aumentando a taxa de retenção de clientes em 30% nos próximos {timeline}, com métricas de churn e NPS."
        ],
        'geral': [
            f"Implementar {description} melhorando a eficiência em 25% nos próximos {timeline}, com medições mensais de KPIs específicos e relatórios de progresso.",
            f"Desenvolver {description} até {timeline}, alcançando 90% de satisfação dos stakeholders através de pesquisas regulares e marcos de entrega.",
            f"Executar {description} reduzindo custos em 15% nos próximos {timeline}, com acompanhamento orçamentário semanal e análise de ROI."
        ]
    }
    
    selected_templates = templates.get(industry, templates['geral'])
    objective = random.choice(selected_templates)
    
    # Adicionar métricas específicas
    metrics = [
        "Acompanhamento semanal de progresso",
        "Relatórios mensais de performance",
        "Revisões quinzenais com stakeholders",
        "Dashboard em tempo real de KPIs",
        "Análise de ROI trimestral"
    ]
    
    return jsonify({
        'smart_objective': objective,
        'suggested_metrics': random.sample(metrics, 3),
        'confidence': random.randint(85, 95),
        'generated_at': datetime.utcnow().isoformat()
    })

@ai_bp.route('/ai/suggest-kpis', methods=['POST'])
def suggest_kpis():
    """Sugere KPIs baseados no objetivo do projeto"""
    data = request.json
    objective = data.get('objective', '')
    project_type = data.get('project_type', 'geral')
    
    kpi_suggestions = {
        'tecnologia': [
            {'name': 'Tempo de Resposta', 'type': 'performance', 'unit': 'ms', 'target': '< 200'},
            {'name': 'Uptime', 'type': 'reliability', 'unit': '%', 'target': '99.9'},
            {'name': 'Bugs por Release', 'type': 'quality', 'unit': 'count', 'target': '< 5'},
            {'name': 'Cobertura de Testes', 'type': 'quality', 'unit': '%', 'target': '> 80'},
            {'name': 'Satisfação do Usuário', 'type': 'satisfaction', 'unit': 'NPS', 'target': '> 50'}
        ],
        'marketing': [
            {'name': 'Taxa de Conversão', 'type': 'conversion', 'unit': '%', 'target': '> 3'},
            {'name': 'Custo por Lead', 'type': 'cost', 'unit': 'R$', 'target': '< 50'},
            {'name': 'Engajamento', 'type': 'engagement', 'unit': '%', 'target': '> 5'},
            {'name': 'Alcance', 'type': 'reach', 'unit': 'pessoas', 'target': '> 10000'},
            {'name': 'ROI', 'type': 'financial', 'unit': '%', 'target': '> 300'}
        ],
        'vendas': [
            {'name': 'Taxa de Fechamento', 'type': 'conversion', 'unit': '%', 'target': '> 20'},
            {'name': 'Ticket Médio', 'type': 'revenue', 'unit': 'R$', 'target': '> 1000'},
            {'name': 'Ciclo de Vendas', 'type': 'time', 'unit': 'dias', 'target': '< 30'},
            {'name': 'Retenção de Clientes', 'type': 'retention', 'unit': '%', 'target': '> 85'},
            {'name': 'LTV/CAC', 'type': 'financial', 'unit': 'ratio', 'target': '> 3'}
        ],
        'geral': [
            {'name': 'Prazo', 'type': 'time', 'unit': 'dias', 'target': 'Dentro do cronograma'},
            {'name': 'Orçamento', 'type': 'cost', 'unit': 'R$', 'target': 'Dentro do orçamento'},
            {'name': 'Qualidade', 'type': 'quality', 'unit': '%', 'target': '> 90'},
            {'name': 'Satisfação', 'type': 'satisfaction', 'unit': 'score', 'target': '> 4.5'},
            {'name': 'Produtividade', 'type': 'efficiency', 'unit': '%', 'target': '> 85'}
        ]
    }
    
    suggested = kpi_suggestions.get(project_type, kpi_suggestions['geral'])
    selected_kpis = random.sample(suggested, min(4, len(suggested)))
    
    return jsonify({
        'suggested_kpis': selected_kpis,
        'total_suggestions': len(suggested),
        'confidence': random.randint(80, 95),
        'generated_at': datetime.utcnow().isoformat()
    })

@ai_bp.route('/ai/generate-tasks', methods=['POST'])
def generate_tasks():
    """Gera tarefas detalhadas baseadas no objetivo do projeto"""
    data = request.json
    objective = data.get('objective', '')
    project_type = data.get('project_type', 'geral')
    complexity = data.get('complexity', 'medium')  # low, medium, high
    
    # Multiplicadores baseados na complexidade
    complexity_multipliers = {
        'low': {'tasks': 0.7, 'hours': 0.8},
        'medium': {'tasks': 1.0, 'hours': 1.0},
        'high': {'tasks': 1.5, 'hours': 1.3}
    }
    
    multiplier = complexity_multipliers[complexity]
    
    task_templates = {
        'tecnologia': [
            {'title': 'Análise de Requisitos Técnicos', 'category': 'planning', 'base_hours': 20},
            {'title': 'Arquitetura do Sistema', 'category': 'design', 'base_hours': 24},
            {'title': 'Setup do Ambiente de Desenvolvimento', 'category': 'setup', 'base_hours': 8},
            {'title': 'Desenvolvimento do Backend', 'category': 'development', 'base_hours': 60},
            {'title': 'Desenvolvimento do Frontend', 'category': 'development', 'base_hours': 50},
            {'title': 'Integração de APIs', 'category': 'integration', 'base_hours': 16},
            {'title': 'Testes Unitários', 'category': 'testing', 'base_hours': 20},
            {'title': 'Testes de Integração', 'category': 'testing', 'base_hours': 16},
            {'title': 'Testes de Performance', 'category': 'testing', 'base_hours': 12},
            {'title': 'Documentação Técnica', 'category': 'documentation', 'base_hours': 16},
            {'title': 'Deploy e Configuração', 'category': 'deployment', 'base_hours': 12},
            {'title': 'Monitoramento e Logs', 'category': 'monitoring', 'base_hours': 8}
        ],
        'marketing': [
            {'title': 'Pesquisa de Mercado', 'category': 'research', 'base_hours': 16},
            {'title': 'Definição de Personas', 'category': 'strategy', 'base_hours': 12},
            {'title': 'Criação de Conteúdo', 'category': 'content', 'base_hours': 30},
            {'title': 'Design de Materiais', 'category': 'design', 'base_hours': 20},
            {'title': 'Configuração de Campanhas', 'category': 'setup', 'base_hours': 8},
            {'title': 'Lançamento da Campanha', 'category': 'execution', 'base_hours': 4},
            {'title': 'Monitoramento de Métricas', 'category': 'monitoring', 'base_hours': 12},
            {'title': 'Otimização de Performance', 'category': 'optimization', 'base_hours': 16},
            {'title': 'Relatórios de Resultados', 'category': 'reporting', 'base_hours': 8},
            {'title': 'Análise de ROI', 'category': 'analysis', 'base_hours': 6}
        ],
        'geral': [
            {'title': 'Planejamento Inicial', 'category': 'planning', 'base_hours': 16},
            {'title': 'Definição de Escopo', 'category': 'planning', 'base_hours': 12},
            {'title': 'Alocação de Recursos', 'category': 'resource', 'base_hours': 8},
            {'title': 'Execução Principal', 'category': 'execution', 'base_hours': 40},
            {'title': 'Controle de Qualidade', 'category': 'quality', 'base_hours': 16},
            {'title': 'Testes e Validação', 'category': 'testing', 'base_hours': 20},
            {'title': 'Documentação', 'category': 'documentation', 'base_hours': 12},
            {'title': 'Treinamento da Equipe', 'category': 'training', 'base_hours': 16},
            {'title': 'Entrega Final', 'category': 'delivery', 'base_hours': 8},
            {'title': 'Avaliação de Resultados', 'category': 'evaluation', 'base_hours': 6}
        ]
    }
    
    templates = task_templates.get(project_type, task_templates['geral'])
    
    # Selecionar tarefas baseadas na complexidade
    num_tasks = int(len(templates) * multiplier['tasks'])
    selected_templates = random.sample(templates, min(num_tasks, len(templates)))
    
    generated_tasks = []
    for i, template in enumerate(selected_templates):
        estimated_hours = int(template['base_hours'] * multiplier['hours'])
        
        task = {
            'title': template['title'],
            'description': f"Executar {template['title'].lower()} conforme especificações do projeto",
            'category': template['category'],
            'estimated_hours': estimated_hours,
            'priority': 'high' if template['category'] in ['planning', 'execution'] else 'medium',
            'order_index': i,
            'dependencies': []
        }
        
        # Adicionar dependências lógicas
        if template['category'] == 'development' and i > 0:
            task['dependencies'] = [0]  # Depende do planejamento
        elif template['category'] == 'testing' and i > 1:
            task['dependencies'] = [j for j, t in enumerate(selected_templates[:i]) if t['category'] == 'development']
        
        generated_tasks.append(task)
    
    return jsonify({
        'generated_tasks': generated_tasks,
        'total_estimated_hours': sum(task['estimated_hours'] for task in generated_tasks),
        'complexity': complexity,
        'confidence': random.randint(85, 95),
        'generated_at': datetime.utcnow().isoformat()
    })

@ai_bp.route('/ai/predict-completion', methods=['POST'])
def predict_completion():
    """Prediz data de conclusão baseada no progresso atual"""
    data = request.json
    project_id = data.get('project_id')
    current_progress = data.get('current_progress', 0)
    total_tasks = data.get('total_tasks', 10)
    completed_tasks = data.get('completed_tasks', 0)
    start_date = data.get('start_date')
    
    if start_date:
        start_date = datetime.fromisoformat(start_date)
    else:
        start_date = datetime.utcnow() - timedelta(days=30)
    
    # Calcular velocidade baseada no progresso atual
    days_elapsed = (datetime.utcnow() - start_date).days
    if days_elapsed > 0 and completed_tasks > 0:
        velocity = completed_tasks / days_elapsed
    else:
        velocity = 0.5  # Velocidade padrão
    
    # Predição baseada na velocidade atual
    remaining_tasks = total_tasks - completed_tasks
    estimated_days = remaining_tasks / velocity if velocity > 0 else remaining_tasks * 2
    
    predicted_date = datetime.utcnow() + timedelta(days=estimated_days)
    
    # Calcular nível de confiança baseado em fatores
    confidence_factors = {
        'progress_consistency': min(100, (completed_tasks / max(1, days_elapsed)) * 50),
        'task_completion_rate': (completed_tasks / max(1, total_tasks)) * 100,
        'time_factor': max(0, 100 - (days_elapsed * 2))  # Confiança diminui com o tempo
    }
    
    confidence = int(sum(confidence_factors.values()) / len(confidence_factors))
    
    # Determinar nível de risco
    if current_progress >= 80:
        risk_level = 'low'
    elif current_progress >= 50:
        risk_level = 'medium'
    else:
        risk_level = 'high'
    
    return jsonify({
        'predicted_completion_date': predicted_date.isoformat(),
        'confidence': max(60, min(95, confidence)),
        'risk_level': risk_level,
        'velocity': round(velocity, 2),
        'estimated_days_remaining': int(estimated_days),
        'factors': confidence_factors,
        'recommendations': generate_recommendations(risk_level, current_progress),
        'generated_at': datetime.utcnow().isoformat()
    })

def generate_recommendations(risk_level, progress):
    """Gera recomendações baseadas no risco e progresso"""
    recommendations = {
        'low': [
            "Manter o ritmo atual de trabalho",
            "Focar na qualidade das entregas finais",
            "Preparar documentação de encerramento"
        ],
        'medium': [
            "Revisar cronograma e prioridades",
            "Considerar realocação de recursos",
            "Aumentar frequência de reuniões de acompanhamento",
            "Identificar possíveis bloqueadores"
        ],
        'high': [
            "Ação imediata necessária",
            "Revisar escopo do projeto",
            "Considerar recursos adicionais",
            "Comunicar riscos aos stakeholders",
            "Implementar plano de contingência"
        ]
    }
    
    return recommendations.get(risk_level, recommendations['medium'])

@ai_bp.route('/ai/optimize-schedule', methods=['POST'])
def optimize_schedule():
    """Otimiza cronograma baseado em dependências e recursos"""
    data = request.json
    tasks = data.get('tasks', [])
    resources = data.get('resources', 1)
    
    # Simulação de otimização de cronograma
    optimized_tasks = []
    current_date = datetime.utcnow()
    
    for i, task in enumerate(tasks):
        # Calcular data de início baseada em dependências
        start_date = current_date
        if task.get('dependencies'):
            # Encontrar a última data de término das dependências
            for dep_index in task['dependencies']:
                if dep_index < len(optimized_tasks):
                    dep_end = datetime.fromisoformat(optimized_tasks[dep_index]['end_date'])
                    start_date = max(start_date, dep_end)
        
        # Calcular duração baseada nas horas estimadas
        estimated_hours = task.get('estimated_hours', 8)
        duration_days = max(1, estimated_hours // 8)  # 8 horas por dia
        
        end_date = start_date + timedelta(days=duration_days)
        
        optimized_task = {
            **task,
            'start_date': start_date.isoformat(),
            'end_date': end_date.isoformat(),
            'duration_days': duration_days,
            'resource_allocation': min(1.0, resources / len(tasks))
        }
        
        optimized_tasks.append(optimized_task)
        current_date = end_date
    
    total_duration = (current_date - datetime.utcnow()).days
    
    return jsonify({
        'optimized_tasks': optimized_tasks,
        'total_duration_days': total_duration,
        'project_end_date': current_date.isoformat(),
        'resource_utilization': min(100, (len(tasks) / resources) * 100),
        'optimization_score': random.randint(75, 95),
        'generated_at': datetime.utcnow().isoformat()
    })

