// Cliente API para comunicação com o backend Nexo
const API_BASE_URL = 'http://localhost:5000/api';

class ApiClient {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = localStorage.getItem('nexo_token');
  }

  // Configurar token de autenticação
  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('nexo_token', token);
    } else {
      localStorage.removeItem('nexo_token');
    }
  }

  // Headers padrão para requisições
  getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    return headers;
  }

  // Método genérico para fazer requisições
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: this.getHeaders(),
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  }

  // Métodos de autenticação
  async login(email, password) {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    if (response.token) {
      this.setToken(response.token);
    }
    
    return response;
  }

  async register(userData) {
    const response = await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    
    if (response.token) {
      this.setToken(response.token);
    }
    
    return response;
  }

  async logout() {
    await this.request('/auth/logout', { method: 'POST' });
    this.setToken(null);
  }

  async getCurrentUser() {
    return await this.request('/auth/me');
  }

  async oauthLogin(provider, data = {}) {
    const response = await this.request(`/auth/oauth/${provider}`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    
    if (response.token) {
      this.setToken(response.token);
    }
    
    return response;
  }

  // Métodos de projetos
  async getProjects(userId = null) {
    const params = userId ? `?user_id=${userId}` : '';
    return await this.request(`/projects${params}`);
  }

  async createProject(projectData) {
    return await this.request('/projects', {
      method: 'POST',
      body: JSON.stringify(projectData),
    });
  }

  async updateProject(projectId, projectData) {
    return await this.request(`/projects/${projectId}`, {
      method: 'PUT',
      body: JSON.stringify(projectData),
    });
  }

  async deleteProject(projectId) {
    return await this.request(`/projects/${projectId}`, {
      method: 'DELETE',
    });
  }

  async getProject(projectId) {
    return await this.request(`/projects/${projectId}`);
  }

  // Recursos de IA
  async generateSmartObjective(description) {
    return await this.request('/projects/generate-smart-objective', {
      method: 'POST',
      body: JSON.stringify({ description }),
    });
  }

  async generateTasks(projectId, objective) {
    return await this.request(`/projects/${projectId}/generate-tasks`, {
      method: 'POST',
      body: JSON.stringify({ objective }),
    });
  }

  // Métodos de tarefas
  async getProjectTasks(projectId) {
    return await this.request(`/projects/${projectId}/tasks`);
  }

  async createTask(projectId, taskData) {
    return await this.request(`/projects/${projectId}/tasks`, {
      method: 'POST',
      body: JSON.stringify(taskData),
    });
  }

  async updateTask(taskId, taskData) {
    return await this.request(`/tasks/${taskId}`, {
      method: 'PUT',
      body: JSON.stringify(taskData),
    });
  }

  async deleteTask(taskId) {
    return await this.request(`/tasks/${taskId}`, {
      method: 'DELETE',
    });
  }

  // Métodos de KPIs
  async getProjectKPIs(projectId) {
    return await this.request(`/projects/${projectId}/kpis`);
  }

  async createKPI(projectId, kpiData) {
    return await this.request(`/projects/${projectId}/kpis`, {
      method: 'POST',
      body: JSON.stringify(kpiData),
    });
  }

  async updateKPI(kpiId, kpiData) {
    return await this.request(`/kpis/${kpiId}`, {
      method: 'PUT',
      body: JSON.stringify(kpiData),
    });
  }

  // Analytics e Dashboard
  async getProjectAnalytics(projectId) {
    return await this.request(`/projects/${projectId}/analytics`);
  }

  // Health check
  async healthCheck() {
    return await this.request('/health');
  }
}

// Instância singleton do cliente API
const apiClient = new ApiClient();

export default apiClient;

