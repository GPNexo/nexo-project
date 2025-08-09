# 🚀 Guia de Implantação - Sistema Nexo

Este guia fornece instruções passo a passo para implantar o sistema Nexo em produção.

## 📋 Pré-requisitos

### Contas Necessárias
- [ ] Conta no GitHub (para código)
- [ ] Conta no Vercel (para frontend)
- [ ] Conta no Railway ou Heroku (para backend)
- [ ] Conta no PostgreSQL (banco de dados)

### Ferramentas Locais
- [ ] Git instalado
- [ ] Node.js 18+ instalado
- [ ] Python 3.11+ instalado

## 🗂️ Estrutura do Projeto

```
nexo-project/
├── nexo-frontend/          # Aplicação React
├── nexo-backend/           # API Flask
├── README.md               # Documentação principal
├── GUIA_IMPLANTACAO.md    # Este guia
└── relatorio_testes.md    # Relatório de testes
```

## 🎯 Opção 1: Deploy Rápido (Recomendado)

### 1. Preparar o Código

```bash
# 1. Criar repositório no GitHub
# Vá para github.com e crie um novo repositório chamado "nexo-project"

# 2. Fazer upload do código
cd /caminho/para/o/projeto
git init
git add .
git commit -m "Initial commit - Sistema Nexo completo"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/nexo-project.git
git push -u origin main
```

### 2. Deploy do Frontend (Vercel)

1. **Acesse**: [vercel.com](https://vercel.com)
2. **Login**: Com sua conta GitHub
3. **Import Project**: Selecione o repositório `nexo-project`
4. **Configure**:
   - **Framework Preset**: Vite
   - **Root Directory**: `nexo-frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

5. **Variáveis de Ambiente**:
   ```
   VITE_API_BASE_URL=https://SEU_BACKEND.railway.app/api
   ```

6. **Deploy**: Clique em "Deploy"

### 3. Deploy do Backend (Railway)

1. **Acesse**: [railway.app](https://railway.app)
2. **Login**: Com sua conta GitHub
3. **New Project**: Selecione "Deploy from GitHub repo"
4. **Configure**:
   - **Repository**: `nexo-project`
   - **Root Directory**: `nexo-backend`

5. **Variáveis de Ambiente**:
   ```
   FLASK_ENV=production
   DATABASE_URL=postgresql://user:pass@host:port/dbname
   JWT_SECRET=seu-jwt-secret-super-seguro-aqui
   CORS_ORIGINS=https://seu-frontend.vercel.app
   ```

6. **Deploy**: Railway fará o deploy automaticamente

### 4. Configurar Banco de Dados

#### Opção A: Railway PostgreSQL (Mais Fácil)
1. No Railway, clique em "New" → "Database" → "PostgreSQL"
2. Copie a `DATABASE_URL` gerada
3. Cole nas variáveis de ambiente do backend

#### Opção B: PostgreSQL Externo
1. **Supabase** (gratuito): [supabase.com](https://supabase.com)
2. **ElephantSQL** (gratuito): [elephantsql.com](https://elephantsql.com)
3. **Neon** (gratuito): [neon.tech](https://neon.tech)

### 5. Atualizar URLs

1. **No Frontend**: Atualize `VITE_API_BASE_URL` com a URL do backend
2. **No Backend**: Atualize `CORS_ORIGINS` com a URL do frontend

## 🔧 Opção 2: Deploy Manual

### Frontend (Build Local + Upload)

```bash
cd nexo-frontend

# Instalar dependências
npm install

# Configurar variável de ambiente
echo "VITE_API_BASE_URL=https://SEU_BACKEND_URL/api" > .env.production

# Build de produção
npm run build

# O diretório 'dist' contém os arquivos para upload
```

**Upload para**:
- **Netlify**: Arraste a pasta `dist` para netlify.com/drop
- **GitHub Pages**: Commit a pasta `dist` em uma branch `gh-pages`
- **Servidor próprio**: Upload via FTP/SSH

### Backend (Servidor VPS)

```bash
# No servidor (Ubuntu/Debian)
sudo apt update
sudo apt install python3 python3-pip python3-venv nginx

# Clone o projeto
git clone https://github.com/SEU_USUARIO/nexo-project.git
cd nexo-project/nexo-backend

# Configurar ambiente
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Configurar variáveis de ambiente
cat > .env << EOF
FLASK_ENV=production
DATABASE_URL=postgresql://user:pass@localhost/nexo
JWT_SECRET=seu-jwt-secret-super-seguro
CORS_ORIGINS=https://seu-frontend-url.com
EOF

# Instalar Gunicorn
pip install gunicorn

# Executar
gunicorn --bind 0.0.0.0:5000 src.main:app
```

## 🔒 Configurações de Segurança

### 1. Variáveis de Ambiente Obrigatórias

```bash
# Backend
FLASK_ENV=production
DATABASE_URL=postgresql://...
JWT_SECRET=chave-super-segura-de-pelo-menos-32-caracteres
CORS_ORIGINS=https://seu-frontend.vercel.app

# Frontend
VITE_API_BASE_URL=https://seu-backend.railway.app/api
```

### 2. Configurações de Produção

#### Backend (Flask)
```python
# Já configurado em src/main.py
app.config['SECRET_KEY'] = os.getenv('JWT_SECRET')
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
```

#### Nginx (se usando VPS)
```nginx
server {
    listen 80;
    server_name seu-dominio.com;
    
    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## 📊 Monitoramento e Logs

### Railway
- **Logs**: Disponíveis no dashboard do Railway
- **Métricas**: CPU, RAM, requests automáticos
- **Alertas**: Configuráveis por email

### Vercel
- **Analytics**: Disponível no dashboard
- **Performance**: Core Web Vitals automáticos
- **Logs**: Funções e builds

## 🔄 Atualizações e Manutenção

### Deploy Automático
1. **Push para GitHub**: Vercel e Railway fazem deploy automático
2. **Branches**: Configure deploy de staging/production
3. **Rollback**: Disponível nos dashboards

### Backup do Banco
```bash
# PostgreSQL backup
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d).sql

# Restaurar backup
psql $DATABASE_URL < backup_20240809.sql
```

## 🧪 Testes em Produção

### 1. Checklist Pós-Deploy
- [ ] Frontend carrega corretamente
- [ ] Login funciona
- [ ] API responde (teste: `/api/health`)
- [ ] Banco de dados conectado
- [ ] IA funciona (gerar objetivo SMART)
- [ ] Todas as páginas acessíveis

### 2. URLs de Teste
```bash
# Frontend
https://seu-frontend.vercel.app

# Backend Health Check
https://seu-backend.railway.app/api/health

# Login Test
curl -X POST https://seu-backend.railway.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@nexo.com","password":"123456"}'
```

## 🆘 Solução de Problemas

### Problemas Comuns

#### 1. CORS Error
```
Access to fetch at 'backend-url' from origin 'frontend-url' has been blocked by CORS policy
```
**Solução**: Verificar `CORS_ORIGINS` no backend

#### 2. Database Connection Error
```
sqlalchemy.exc.OperationalError: could not connect to server
```
**Solução**: Verificar `DATABASE_URL` e conectividade

#### 3. Build Error (Frontend)
```
Module not found: Can't resolve './component'
```
**Solução**: Verificar imports e dependências

#### 4. 500 Internal Server Error
**Solução**: Verificar logs do backend e variáveis de ambiente

### Logs Úteis

```bash
# Railway logs
railway logs

# Vercel logs
vercel logs

# Local debugging
cd nexo-backend
python src/main.py  # Modo debug
```

## 📞 Suporte

### Recursos de Ajuda
- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Railway Docs**: [docs.railway.app](https://docs.railway.app)
- **Flask Deployment**: [flask.palletsprojects.com/deploying/](https://flask.palletsprojects.com/deploying/)

### Contato
- **Email**: suporte@nexo.com
- **GitHub Issues**: Para bugs e melhorias
- **Documentação**: README.md para detalhes técnicos

---

## ✅ Checklist Final

### Pré-Deploy
- [ ] Código testado localmente
- [ ] Variáveis de ambiente configuradas
- [ ] Banco de dados preparado
- [ ] Domínios/URLs definidos

### Deploy
- [ ] Frontend deployado e acessível
- [ ] Backend deployado e respondendo
- [ ] Banco de dados conectado
- [ ] CORS configurado corretamente

### Pós-Deploy
- [ ] Testes de funcionalidade realizados
- [ ] Performance verificada
- [ ] Logs monitorados
- [ ] Backup configurado

**🎉 Parabéns! Seu sistema Nexo está em produção!**

