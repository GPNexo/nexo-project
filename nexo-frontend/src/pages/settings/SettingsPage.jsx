import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  User, 
  Globe, 
  Palette, 
  Bell, 
  Link, 
  Save,
  Calendar,
  MessageSquare,
  Trello,
  Slack
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const SettingsPage = () => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  
  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    company: ''
  });
  
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    deadlines: true,
    updates: false
  });
  
  const [language, setLanguage] = useState('pt-BR');

  const integrations = [
    {
      id: 'google-calendar',
      name: 'Google Calendar',
      description: 'Sincronize prazos e marcos com seu calendário',
      icon: Calendar,
      connected: false
    },
    {
      id: 'slack',
      name: 'Slack',
      description: 'Receba notificações no seu workspace',
      icon: Slack,
      connected: true
    },
    {
      id: 'microsoft-teams',
      name: 'Microsoft Teams',
      description: 'Integração com canais do Teams',
      icon: MessageSquare,
      connected: false
    },
    {
      id: 'trello',
      name: 'Trello',
      description: 'Importe boards e cards existentes',
      icon: Trello,
      connected: false
    }
  ];

  const handleProfileSave = () => {
    // In a real app, this would save to backend
    alert('Perfil salvo com sucesso!');
  };

  const handleNotificationChange = (key, value) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  const toggleIntegration = (integrationId) => {
    // In a real app, this would handle OAuth flow
    alert(`Integração com ${integrationId} será implementada`);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-montserrat font-bold text-foreground mb-2">
          Configurações
        </h1>
        <p className="text-muted-foreground font-inter">
          Personalize sua experiência no Nexo
        </p>
      </motion.div>

      {/* Settings Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Perfil</TabsTrigger>
            <TabsTrigger value="preferences">Preferências</TabsTrigger>
            <TabsTrigger value="notifications">Notificações</TabsTrigger>
            <TabsTrigger value="integrations">Integrações</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-4">
            <Card className="nexo-card">
              <CardHeader>
                <CardTitle className="flex items-center font-montserrat">
                  <User className="mr-2 h-5 w-5 text-primary" />
                  Perfil do Usuário
                </CardTitle>
                <CardDescription>
                  Gerencie suas informações pessoais
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4 mb-6">
                  <img
                    src={user?.avatar}
                    alt={user?.name}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-montserrat font-semibold">{user?.name}</h3>
                    <p className="text-sm text-muted-foreground">{user?.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="company">Empresa</Label>
                    <Input
                      id="company"
                      value={profile.company}
                      onChange={(e) => setProfile(prev => ({ ...prev, company: e.target.value }))}
                      placeholder="Nome da empresa"
                    />
                  </div>
                </div>

                <Button onClick={handleProfileSave} className="nexo-button">
                  <Save className="mr-2 h-4 w-4" />
                  Salvar Perfil
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences" className="space-y-4">
            <Card className="nexo-card">
              <CardHeader>
                <CardTitle className="flex items-center font-montserrat">
                  <Palette className="mr-2 h-5 w-5 text-primary" />
                  Preferências
                </CardTitle>
                <CardDescription>
                  Personalize a aparência e idioma
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Tema</Label>
                    <p className="text-sm text-muted-foreground">
                      Escolha entre tema claro ou escuro
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={toggleTheme}
                    className="w-24"
                  >
                    {theme === 'dark' ? 'Escuro' : 'Claro'}
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">Idioma</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o idioma" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                      <SelectItem value="en-US">English (US)</SelectItem>
                      <SelectItem value="es-ES">Español</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-4">
            <Card className="nexo-card">
              <CardHeader>
                <CardTitle className="flex items-center font-montserrat">
                  <Bell className="mr-2 h-5 w-5 text-primary" />
                  Notificações
                </CardTitle>
                <CardDescription>
                  Configure como e quando receber notificações
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {Object.entries({
                  email: 'Notificações por E-mail',
                  push: 'Notificações Push',
                  deadlines: 'Alertas de Prazo',
                  updates: 'Atualizações de Projeto'
                }).map(([key, label]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">{label}</Label>
                      <p className="text-sm text-muted-foreground">
                        {key === 'email' && 'Receba notificações importantes por e-mail'}
                        {key === 'push' && 'Notificações em tempo real no navegador'}
                        {key === 'deadlines' && 'Alertas quando prazos estão próximos'}
                        {key === 'updates' && 'Notificações sobre mudanças nos projetos'}
                      </p>
                    </div>
                    <Switch
                      checked={notifications[key]}
                      onCheckedChange={(checked) => handleNotificationChange(key, checked)}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Integrations Tab */}
          <TabsContent value="integrations" className="space-y-4">
            <Card className="nexo-card">
              <CardHeader>
                <CardTitle className="flex items-center font-montserrat">
                  <Link className="mr-2 h-5 w-5 text-primary" />
                  Integrações
                </CardTitle>
                <CardDescription>
                  Conecte o Nexo com suas ferramentas favoritas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {integrations.map((integration) => {
                  const Icon = integration.icon;
                  return (
                    <motion.div
                      key={integration.id}
                      whileHover={{ scale: 1.01 }}
                      className="flex items-center justify-between p-4 border border-border rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="h-8 w-8 text-primary" />
                        <div>
                          <h4 className="font-inter font-medium">{integration.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {integration.description}
                          </p>
                        </div>
                      </div>
                      
                      <Button
                        variant={integration.connected ? "destructive" : "default"}
                        onClick={() => toggleIntegration(integration.id)}
                        className={integration.connected ? '' : 'nexo-button'}
                      >
                        {integration.connected ? 'Desconectar' : 'Conectar'}
                      </Button>
                    </motion.div>
                  );
                })}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default SettingsPage;

