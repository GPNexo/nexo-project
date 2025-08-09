import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, BarChart3, Kanban, Bell, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const TrackingPage = () => {
  const [activeView, setActiveView] = useState('gantt');
  const [isSync, setIsSync] = useState(true);

  const handleViewChange = (view) => {
    setActiveView(view);
  };

  const toggleSync = () => {
    setIsSync(!isSync);
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
          Acompanhamento
        </h1>
        <p className="text-muted-foreground font-inter">
          Monitore o progresso com visualizações Gantt e Kanban
        </p>
      </motion.div>

      {/* View Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex items-center justify-between"
      >
        <Tabs value={activeView} onValueChange={handleViewChange} className="w-auto">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="gantt" className="flex items-center">
              <BarChart3 className="mr-2 h-4 w-4" />
              Gantt
            </TabsTrigger>
            <TabsTrigger value="kanban" className="flex items-center">
              <Kanban className="mr-2 h-4 w-4" />
              Kanban
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center space-x-4">
          <Button
            variant={isSync ? "default" : "outline"}
            onClick={toggleSync}
            className="flex items-center"
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${isSync ? 'animate-spin' : ''}`} />
            Sincronização {isSync ? 'Ativa' : 'Inativa'}
          </Button>
          
          <Button variant="outline">
            <Bell className="mr-2 h-4 w-4" />
            Notificações
          </Button>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Tabs value={activeView} className="w-full">
          <TabsContent value="gantt" className="space-y-4">
            <Card className="nexo-card">
              <CardHeader>
                <CardTitle className="flex items-center font-montserrat">
                  <BarChart3 className="mr-2 h-5 w-5 text-primary" />
                  Visualização Gantt
                </CardTitle>
                <CardDescription>
                  Cronograma com dependências e drag-and-drop
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Gantt Chart Placeholder */}
                <div className="h-96 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                  <div className="text-center">
                    <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground font-inter text-lg mb-2">
                      Gráfico de Gantt
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Visualização de cronograma com frappe-gantt será implementada aqui
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Recursos: Drag-and-drop, dependências entre tarefas, marcos
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="kanban" className="space-y-4">
            <Card className="nexo-card">
              <CardHeader>
                <CardTitle className="flex items-center font-montserrat">
                  <Kanban className="mr-2 h-5 w-5 text-primary" />
                  Visualização Kanban
                </CardTitle>
                <CardDescription>
                  Quadro Kanban com colunas personalizáveis
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Kanban Board Placeholder */}
                <div className="h-96 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                  <div className="text-center">
                    <Kanban className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground font-inter text-lg mb-2">
                      Quadro Kanban
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Visualização Kanban com jKanban será implementada aqui
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Recursos: Colunas personalizáveis, drag-and-drop, filtros
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Sync Status */}
      {isSync && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="nexo-card border-primary/20 bg-primary/5">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <RefreshCw className="h-5 w-5 text-primary" />
                </motion.div>
                <div>
                  <p className="font-inter font-medium">Sincronização Automática Ativa</p>
                  <p className="text-sm text-muted-foreground">
                    As alterações entre Gantt e Kanban são sincronizadas automaticamente
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default TrackingPage;

