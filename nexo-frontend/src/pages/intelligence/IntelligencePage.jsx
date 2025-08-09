import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Clock, TrendingDown, DollarSign, AlertTriangle, Calendar, BarChart3, PieChart, LineChart } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

const IntelligencePage = () => {
  // Mock data for intelligence metrics
  const intelligenceCards = [
    {
      title: 'Tempo Médio de Execução',
      value: '14.5 dias',
      description: '-2.3 dias vs. média histórica',
      icon: Clock,
      color: 'text-green-500',
      trend: 'positive'
    },
    {
      title: 'Desvio de Prazo',
      value: '+8%',
      description: 'Dentro da margem aceitável',
      icon: TrendingDown,
      color: 'text-yellow-500',
      trend: 'neutral'
    },
    {
      title: 'Desvio de Custo',
      value: '-5%',
      description: 'Economia de R$ 12.500',
      icon: DollarSign,
      color: 'text-green-500',
      trend: 'positive'
    }
  ];

  const predictions = [
    {
      title: 'Data Estimada de Conclusão',
      value: '15 de Setembro, 2025',
      confidence: 85,
      status: 'success'
    },
    {
      title: 'Risco de Atraso',
      value: 'Médio',
      confidence: 72,
      status: 'warning'
    },
    {
      title: 'Probabilidade de Sucesso',
      value: '92%',
      confidence: 88,
      status: 'success'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-montserrat font-bold text-foreground mb-2">
          Dashboard Inteligente
        </h1>
        <p className="text-muted-foreground font-inter">
          Análises avançadas e previsões baseadas em IA
        </p>
      </motion.div>

      {/* Intelligence Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {intelligenceCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.title}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="nexo-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium font-inter">
                    {card.title}
                  </CardTitle>
                  <Icon className={`h-4 w-4 ${card.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold font-montserrat">{card.value}</div>
                  <p className={`text-xs ${
                    card.trend === 'positive' ? 'text-green-600' : 
                    card.trend === 'negative' ? 'text-red-600' : 
                    'text-muted-foreground'
                  }`}>
                    {card.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Charts Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* Timeline Chart */}
        <Card className="nexo-card">
          <CardHeader>
            <CardTitle className="flex items-center font-montserrat">
              <LineChart className="mr-2 h-5 w-5 text-primary" />
              Linha do Tempo
            </CardTitle>
            <CardDescription>
              Progresso ao longo do tempo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
              <div className="text-center">
                <LineChart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground font-inter">
                  Gráfico de linha do tempo
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Chart.js será implementado aqui
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Status Pie Chart */}
        <Card className="nexo-card">
          <CardHeader>
            <CardTitle className="flex items-center font-montserrat">
              <PieChart className="mr-2 h-5 w-5 text-primary" />
              Status das Tarefas
            </CardTitle>
            <CardDescription>
              Distribuição por status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
              <div className="text-center">
                <PieChart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground font-inter">
                  Gráfico de pizza
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Chart.js será implementado aqui
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Planned vs Actual Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="nexo-card">
          <CardHeader>
            <CardTitle className="flex items-center font-montserrat">
              <BarChart3 className="mr-2 h-5 w-5 text-primary" />
              Planejado vs Realizado
            </CardTitle>
            <CardDescription>
              Comparação entre cronograma planejado e execução real
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
              <div className="text-center">
                <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground font-inter text-lg mb-2">
                  Gráfico de Barras Comparativo
                </p>
                <p className="text-sm text-muted-foreground">
                  Chart.js ou ApexCharts será implementado aqui
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Comparação visual entre planejamento e execução real
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Predictions Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="nexo-card">
          <CardHeader>
            <CardTitle className="flex items-center font-montserrat">
              <Brain className="mr-2 h-5 w-5 text-primary" />
              Previsões e Alertas
            </CardTitle>
            <CardDescription>
              Análises preditivas baseadas em IA e dados históricos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {predictions.map((prediction, index) => (
                <motion.div
                  key={prediction.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-inter font-medium text-sm">{prediction.title}</h4>
                    <Badge variant={prediction.status === 'success' ? 'default' : 'destructive'}>
                      {prediction.confidence}% confiança
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="font-montserrat font-semibold text-lg">{prediction.value}</p>
                    <Progress value={prediction.confidence} className="h-2" />
                  </div>
                  
                  {prediction.status === 'warning' && (
                    <div className="flex items-center text-yellow-600 dark:text-yellow-400">
                      <AlertTriangle className="mr-1 h-3 w-3" />
                      <span className="text-xs">Atenção necessária</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default IntelligencePage;

