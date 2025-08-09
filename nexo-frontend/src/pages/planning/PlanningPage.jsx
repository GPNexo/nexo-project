import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Sparkles, Download, Upload, Calendar, DollarSign, Star, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

const PlanningPage = () => {
  const [objective, setObjective] = useState('');
  const [isGeneratingObjective, setIsGeneratingObjective] = useState(false);
  const [selectedKPIs, setSelectedKPIs] = useState(['Prazo', 'Custo']);

  const availableKPIs = [
    { id: 'prazo', label: 'Prazo', icon: Calendar, color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' },
    { id: 'custo', label: 'Custo', icon: DollarSign, color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' },
    { id: 'qualidade', label: 'Qualidade', icon: Star, color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' },
    { id: 'satisfacao', label: 'Satisfação', icon: Users, color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' }
  ];

  const handleGenerateObjective = async () => {
    setIsGeneratingObjective(true);
    
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const generatedObjective = `Desenvolver e lançar uma plataforma de e-commerce completa em 90 dias, com capacidade para processar 1000 pedidos simultâneos, mantendo 99.9% de uptime e alcançando uma taxa de conversão de pelo menos 3.5%, resultando em um ROI de 150% no primeiro trimestre após o lançamento.`;
    
    setObjective(generatedObjective);
    setIsGeneratingObjective(false);
  };

  const toggleKPI = (kpiId) => {
    setSelectedKPIs(prev => 
      prev.includes(kpiId) 
        ? prev.filter(id => id !== kpiId)
        : [...prev, kpiId]
    );
  };

  const handleImportFile = () => {
    // In a real app, this would open a file picker
    alert('Funcionalidade de importação será implementada');
  };

  const handleExportFile = () => {
    // In a real app, this would export the current planning data
    alert('Funcionalidade de exportação será implementada');
  };

  const handleGenerateActivities = () => {
    // In a real app, this would generate activities with AI
    alert('Funcionalidade de geração de atividades com IA será implementada');
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
          Planejamento
        </h1>
        <p className="text-muted-foreground font-inter">
          Defina objetivos SMART e crie cronogramas detalhados
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* SMART Objective Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="nexo-card">
            <CardHeader>
              <CardTitle className="flex items-center font-montserrat">
                <Target className="mr-2 h-5 w-5 text-primary" />
                Objetivo SMART
              </CardTitle>
              <CardDescription>
                Defina um objetivo Específico, Mensurável, Atingível, Relevante e Temporal
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="objective">Descreva seu objetivo</Label>
                <Textarea
                  id="objective"
                  placeholder="Ex: Aumentar as vendas online em 25% nos próximos 6 meses através da implementação de um novo sistema de recomendações..."
                  value={objective}
                  onChange={(e) => setObjective(e.target.value)}
                  className="min-h-[120px]"
                />
              </div>
              
              <Button
                onClick={handleGenerateObjective}
                disabled={isGeneratingObjective}
                className="w-full nexo-button"
              >
                {isGeneratingObjective ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="mr-2"
                    >
                      <Sparkles className="h-4 w-4" />
                    </motion.div>
                    Gerando objetivo com IA...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Gerar objetivo com IA
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* KPIs Selection */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="nexo-card">
            <CardHeader>
              <CardTitle className="font-montserrat">KPIs do Projeto</CardTitle>
              <CardDescription>
                Selecione os indicadores-chave de performance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {availableKPIs.map((kpi) => {
                  const Icon = kpi.icon;
                  const isSelected = selectedKPIs.includes(kpi.id);
                  
                  return (
                    <motion.div
                      key={kpi.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        variant={isSelected ? "default" : "outline"}
                        onClick={() => toggleKPI(kpi.id)}
                        className={`w-full h-auto p-4 flex flex-col items-center space-y-2 ${
                          isSelected ? 'bg-primary text-primary-foreground' : ''
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span className="text-sm font-inter">{kpi.label}</span>
                      </Button>
                    </motion.div>
                  );
                })}
              </div>
              
              <div className="space-y-2">
                <Label>KPIs Selecionados</Label>
                <div className="flex flex-wrap gap-2">
                  {selectedKPIs.map((kpiId) => {
                    const kpi = availableKPIs.find(k => k.id === kpiId);
                    return (
                      <Badge key={kpiId} variant="secondary" className={kpi?.color}>
                        {kpi?.label}
                      </Badge>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Timeline and Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="nexo-card">
          <CardHeader>
            <CardTitle className="font-montserrat">Cronograma Inicial</CardTitle>
            <CardDescription>
              Visualize e gerencie o cronograma do seu projeto
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Gantt Chart Placeholder */}
            <div className="h-64 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
              <div className="text-center">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground font-inter">
                  Cronograma Gantt será exibido aqui
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Defina um objetivo primeiro para gerar atividades
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button
                onClick={handleGenerateActivities}
                className="nexo-button"
                disabled={!objective.trim()}
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Gerar atividades com IA
              </Button>
              
              <Button
                variant="outline"
                onClick={handleImportFile}
              >
                <Upload className="mr-2 h-4 w-4" />
                Importar Excel/CSV
              </Button>
              
              <Button
                variant="outline"
                onClick={handleExportFile}
              >
                <Download className="mr-2 h-4 w-4" />
                Exportar Excel/CSV
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default PlanningPage;

