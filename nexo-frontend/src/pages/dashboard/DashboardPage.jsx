import React from 'react';
import { motion } from 'framer-motion';

const DashboardPage = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-montserrat font-bold text-foreground mb-2">
          Dashboard
        </h1>
        <p className="text-muted-foreground font-inter">
          Visão geral dos seus projetos e atividades
        </p>
      </motion.div>

      {/* Simple content for testing */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card p-6 rounded-lg border">
          <h3 className="font-montserrat font-semibold mb-2">Progresso Geral</h3>
          <p className="text-2xl font-bold">68%</p>
          <p className="text-sm text-muted-foreground">+12% desde a semana passada</p>
        </div>
        
        <div className="bg-card p-6 rounded-lg border">
          <h3 className="font-montserrat font-semibold mb-2">Tarefas Concluídas</h3>
          <p className="text-2xl font-bold">24</p>
          <p className="text-sm text-muted-foreground">8 tarefas esta semana</p>
        </div>
        
        <div className="bg-card p-6 rounded-lg border">
          <h3 className="font-montserrat font-semibold mb-2">Prazo Restante</h3>
          <p className="text-2xl font-bold">12 dias</p>
          <p className="text-sm text-muted-foreground">Para o próximo milestone</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

