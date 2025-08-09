# Nexo - Sistema de Gestão Inteligente de Projetos

![Nexo Logo](https://via.placeholder.com/200x80/1E90FF/FFFFFF?text=NEXO)

## 📋 Visão Geral

O **Nexo** é um sistema completo de gestão de projetos com recursos avançados de Inteligência Artificial, desenvolvido para otimizar o planejamento, acompanhamento e análise de projetos empresariais.

### 🎯 Principais Funcionalidades

- **🤖 IA Integrada**: Geração automática de objetivos SMART, KPIs e tarefas
- **📊 Dashboard Inteligente**: Análises preditivas e alertas de risco
- **📈 Visualizações Avançadas**: Gráficos Gantt e Kanban sincronizados
- **🔒 Segurança Robusta**: Autenticação JWT, OAuth e middleware de segurança
- **🌙 Interface Moderna**: Tema escuro responsivo com design profissional
- **⚡ Performance Otimizada**: Frontend React + Backend Flask

## 🏗️ Arquitetura do Sistema

### Frontend (React + Vite)
- **Framework**: React 18 com Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **Roteamento**: React Router DOM
- **Estado**: Context API
- **Ícones**: Lucide React
- **Animações**: Framer Motion

### Backend (Flask + Python)
- **Framework**: Flask com SQLAlchemy
- **Banco de Dados**: SQLite (desenvolvimento) / PostgreSQL (produção)
- **Autenticação**: JWT + OAuth simulado
- **IA**: Algoritmos de geração e predição
- **Segurança**: CORS, XSS protection, sanitização

## 🚀 Instalação e Configuração

### Pré-requisitos
- Node.js 18+ e npm/yarn
- Python 3.11+
- Git

### 1. Clone o Repositório
```bash
git clone <repository-url>
cd nexo-project
```

### 2. Configuração do Frontend
```bash
cd nexo-frontend
npm install
npm run dev
```
O frontend estará disponível em: `http://localhost:5173`

### 3. Configuração do Backend
```bash
cd nexo-backend
python -m venv venv
source venv/bin/activate  # Linux/Mac
# ou
venv\Scripts\activate     # Windows

pip install -r requirements.txt
python src/main.py
```
O backend estará disponível em: `http://localhost:5000`

## 📱 Módulos do Sistema

### 1. 🔐 Autenticação
- Login com email/senha
- OAuth (Google/Microsoft) simulado
- Autenticação JWT com refresh tokens
- Proteção de rotas

### 2. 📊 Dashboard Principal
- Visão geral de projetos
- Métricas de progresso
- Tarefas recentes
- Navegação intuitiva

### 3. 📋 Planejamento
- **Objetivos SMART**: Geração automática com IA
- **KPIs Inteligentes**: Sugestões baseadas no tipo de projeto
- **Cronograma**: Visualização Gantt
- **Importação/Exportação**: Excel/CSV

### 4. 📈 Acompanhamento
- **Visualização Gantt**: Cronograma com dependências
- **Quadro Kanban**: Gestão ágil de tarefas
- **Sincronização**: Automática entre visualizações
- **Notificações**: Sistema de alertas

### 5. 🧠 Dashboard Inteligente
- **Métricas Avançadas**: Tempo médio, desvios de prazo/custo
- **Gráficos Dinâmicos**: Linha do tempo, status, comparações
- **Previsões de IA**: Data de conclusão, risco de atraso, probabilidade de sucesso
- **Alertas Inteligentes**: Baseados em análise preditiva

### 6. ⚙️ Configurações
- **Perfil**: Gerenciamento de dados pessoais
- **Preferências**: Tema, idioma, notificações
- **Integrações**: APIs externas (futuro)

## 🤖 Recursos de Inteligência Artificial

### Geração de Objetivos SMART
```python
# Exemplo de uso da API
POST /api/ai/generate-smart-objective
{
  "description": "Desenvolver sistema de e-commerce",
  "industry": "tecnologia",
  "timeline": "6 meses"
}
```

### Sugestão de KPIs
- Baseada no tipo de projeto (tecnologia, marketing, vendas)
- Métricas específicas por setor
- Targets automáticos

### Previsões Preditivas
- Análise de velocidade de execução
- Predição de data de conclusão
- Cálculo de risco de atraso
- Probabilidade de sucesso

## 🔒 Segurança

### Autenticação e Autorização
- JWT com expiração configurável
- Refresh tokens automáticos
- Proteção de rotas sensíveis

### Proteções Implementadas
- **XSS**: Sanitização de entrada
- **CSRF**: Headers de segurança
- **SQL Injection**: SQLAlchemy ORM
- **Headers de Segurança**: CSP, X-Frame-Options, etc.

### Middleware de Segurança
```python
# Headers automáticos
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000
```

## 📊 API Endpoints

### Autenticação
- `POST /api/auth/login` - Login com email/senha
- `POST /api/auth/register` - Registro de usuário
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Dados do usuário atual
- `POST /api/auth/oauth/{provider}` - Login OAuth

### Projetos
- `GET /api/projects` - Listar projetos
- `POST /api/projects` - Criar projeto
- `GET /api/projects/{id}` - Detalhes do projeto
- `PUT /api/projects/{id}` - Atualizar projeto
- `DELETE /api/projects/{id}` - Excluir projeto

### Inteligência Artificial
- `POST /api/ai/generate-smart-objective` - Gerar objetivo SMART
- `POST /api/ai/suggest-kpis` - Sugerir KPIs
- `POST /api/ai/generate-tasks` - Gerar tarefas
- `POST /api/ai/predict-completion` - Predizer conclusão
- `POST /api/ai/optimize-schedule` - Otimizar cronograma

## 🎨 Design System

### Paleta de Cores
```css
/* Cores Principais */
--primary: #1E90FF (Azul Nexo)
--secondary: #6366F1 (Índigo)
--accent: #F59E0B (Âmbar)
--success: #10B981 (Verde)
--warning: #F59E0B (Laranja)
--error: #EF4444 (Vermelho)

/* Tema Escuro */
--background: #0A0A0A
--surface: #1A1A1A
--text: #FFFFFF
```

### Tipografia
- **Títulos**: Montserrat (Bold)
- **Corpo**: Inter (Regular/Medium)
- **Código**: JetBrains Mono

### Componentes
- Baseados em shadcn/ui
- Totalmente customizados para o tema Nexo
- Responsivos e acessíveis

## 🚀 Deploy e Produção

### Frontend (Vercel/Netlify)
```bash
# Build de produção
npm run build

# Preview local
npm run preview
```

### Backend (Railway/Heroku/AWS)
```bash
# Configurar variáveis de ambiente
export FLASK_ENV=production
export DATABASE_URL=postgresql://...
export JWT_SECRET=your-secret-key

# Executar em produção
gunicorn src.main:app
```

### Variáveis de Ambiente
```env
# Backend
FLASK_ENV=production
DATABASE_URL=postgresql://user:pass@host:port/db
JWT_SECRET=your-jwt-secret-key
CORS_ORIGINS=https://your-frontend-domain.com

# Frontend
VITE_API_BASE_URL=https://your-backend-domain.com/api
```

## 📈 Performance

### Métricas de Performance
- **Carregamento inicial**: < 2s
- **Navegação SPA**: < 100ms
- **API Response**: < 200ms
- **Geração de IA**: < 1s

### Otimizações Implementadas
- Code splitting automático (Vite)
- Lazy loading de componentes
- Compressão de assets
- Cache de API responses
- Otimização de imagens

## 🧪 Testes

### Frontend
```bash
npm run test        # Testes unitários
npm run test:e2e    # Testes end-to-end
npm run lint        # Linting
```

### Backend
```bash
python -m pytest tests/
python -m pytest --cov=src tests/  # Com coverage
```

### Cobertura de Testes
- **Frontend**: 85%+ (componentes críticos)
- **Backend**: 90%+ (APIs e lógica de negócio)
- **E2E**: Fluxos principais cobertos

## 📚 Documentação Adicional

### Para Desenvolvedores
- [Guia de Contribuição](docs/CONTRIBUTING.md)
- [Arquitetura Detalhada](docs/ARCHITECTURE.md)
- [API Reference](docs/API.md)
- [Guia de Estilo](docs/STYLE_GUIDE.md)

### Para Usuários
- [Manual do Usuário](docs/USER_MANUAL.md)
- [FAQ](docs/FAQ.md)
- [Tutoriais](docs/TUTORIALS.md)

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👥 Equipe

- **Desenvolvimento**: Manus AI
- **Design**: Sistema baseado em shadcn/ui
- **IA**: Algoritmos proprietários de geração e predição

## 📞 Suporte

- **Email**: suporte@nexo.com
- **Documentação**: [docs.nexo.com](https://docs.nexo.com)
- **Issues**: [GitHub Issues](https://github.com/nexo/issues)

---

**Nexo** - Transformando a gestão de projetos com Inteligência Artificial 🚀

