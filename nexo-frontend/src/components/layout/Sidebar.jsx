import React from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Target, 
  Activity, 
  Brain, 
  Settings 
} from 'lucide-react';
import { cn } from '../../lib/utils';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      path: '/dashboard'
    },
    {
      id: 'planning',
      label: 'Planejamento',
      icon: Target,
      path: '/planning'
    },
    {
      id: 'tracking',
      label: 'Acompanhamento',
      icon: Activity,
      path: '/tracking'
    },
    {
      id: 'intelligence',
      label: 'Dashboard Inteligente',
      icon: Brain,
      path: '/intelligence'
    },
    {
      id: 'settings',
      label: 'Configurações',
      icon: Settings,
      path: '/settings'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <motion.aside
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed left-0 top-16 bottom-0 w-64 bg-sidebar border-r border-sidebar-border z-40"
    >
      <div className="flex flex-col h-full">
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <li key={item.id}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleNavigation(item.path)}
                    className={cn(
                      "w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200",
                      isActive
                        ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    )}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    <span className="font-inter font-medium">{item.label}</span>
                  </motion.button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-sidebar-border">
          <div className="text-xs text-muted-foreground text-center">
            <p className="font-montserrat font-medium">Nexo v1.0</p>
            <p>Gestão de Projetos</p>
          </div>
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;

