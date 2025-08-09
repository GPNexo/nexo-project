from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from src.models.user import db

class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    smart_objective = db.Column(db.Text)
    start_date = db.Column(db.DateTime, default=datetime.utcnow)
    end_date = db.Column(db.DateTime)
    status = db.Column(db.String(50), default='planning')  # planning, active, completed, paused
    progress = db.Column(db.Float, default=0.0)
    budget = db.Column(db.Float)
    actual_cost = db.Column(db.Float, default=0.0)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relacionamentos
    tasks = db.relationship('Task', backref='project', lazy=True, cascade='all, delete-orphan')
    kpis = db.relationship('ProjectKPI', backref='project', lazy=True, cascade='all, delete-orphan')

    def __repr__(self):
        return f'<Project {self.name}>'

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'smart_objective': self.smart_objective,
            'start_date': self.start_date.isoformat() if self.start_date else None,
            'end_date': self.end_date.isoformat() if self.end_date else None,
            'status': self.status,
            'progress': self.progress,
            'budget': self.budget,
            'actual_cost': self.actual_cost,
            'user_id': self.user_id,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
            'tasks_count': len(self.tasks) if self.tasks else 0,
            'kpis_count': len(self.kpis) if self.kpis else 0
        }

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    status = db.Column(db.String(50), default='todo')  # todo, in_progress, done, blocked
    priority = db.Column(db.String(20), default='medium')  # low, medium, high, urgent
    start_date = db.Column(db.DateTime)
    end_date = db.Column(db.DateTime)
    estimated_hours = db.Column(db.Float)
    actual_hours = db.Column(db.Float, default=0.0)
    progress = db.Column(db.Float, default=0.0)
    project_id = db.Column(db.Integer, db.ForeignKey('project.id'), nullable=False)
    assigned_to = db.Column(db.Integer, db.ForeignKey('user.id'))
    parent_task_id = db.Column(db.Integer, db.ForeignKey('task.id'))
    order_index = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relacionamentos
    subtasks = db.relationship('Task', backref=db.backref('parent_task', remote_side=[id]), lazy=True)
    dependencies = db.relationship('TaskDependency', foreign_keys='TaskDependency.task_id', backref='task', lazy=True)

    def __repr__(self):
        return f'<Task {self.title}>'

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'status': self.status,
            'priority': self.priority,
            'start_date': self.start_date.isoformat() if self.start_date else None,
            'end_date': self.end_date.isoformat() if self.end_date else None,
            'estimated_hours': self.estimated_hours,
            'actual_hours': self.actual_hours,
            'progress': self.progress,
            'project_id': self.project_id,
            'assigned_to': self.assigned_to,
            'parent_task_id': self.parent_task_id,
            'order_index': self.order_index,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
            'subtasks_count': len(self.subtasks) if self.subtasks else 0
        }

class TaskDependency(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    task_id = db.Column(db.Integer, db.ForeignKey('task.id'), nullable=False)
    depends_on_task_id = db.Column(db.Integer, db.ForeignKey('task.id'), nullable=False)
    dependency_type = db.Column(db.String(20), default='finish_to_start')  # finish_to_start, start_to_start, etc.
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'task_id': self.task_id,
            'depends_on_task_id': self.depends_on_task_id,
            'dependency_type': self.dependency_type,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class ProjectKPI(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.Integer, db.ForeignKey('project.id'), nullable=False)
    kpi_type = db.Column(db.String(50), nullable=False)  # deadline, cost, quality, satisfaction
    target_value = db.Column(db.Float)
    current_value = db.Column(db.Float, default=0.0)
    unit = db.Column(db.String(20))  # days, currency, percentage, etc.
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __repr__(self):
        return f'<ProjectKPI {self.kpi_type}>'

    def to_dict(self):
        return {
            'id': self.id,
            'project_id': self.project_id,
            'kpi_type': self.kpi_type,
            'target_value': self.target_value,
            'current_value': self.current_value,
            'unit': self.unit,
            'is_active': self.is_active,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

