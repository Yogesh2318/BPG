import React, { useState } from 'react';
import { Plus, Droplet, Map, Edit } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FABProps {
  onAddPlant?: () => void;
  onWaterAll?: () => void;
  onEditMap?: () => void;
}

export function FAB({ onAddPlant, onWaterAll, onEditMap }: FABProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const actions = [
    { icon: Plus, label: 'Add Plant', color: 'var(--green-600)', onClick: onAddPlant },
    { icon: Droplet, label: 'Water All', color: 'var(--blue-600)', onClick: onWaterAll },
    { icon: Map, label: 'Edit Map', color: 'var(--terracotta-600)', onClick: onEditMap },
  ];
  
  const handleAction = (action: typeof actions[0]) => {
    action.onClick?.();
    setIsOpen(false);
  };
  
  return (
    <div className="fixed bottom-8 right-8 z-30">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-24 right-0 flex flex-col gap-3"
          >
            {actions.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.button
                  key={action.label}
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.8 }}
                  transition={{ 
                    delay: index * 0.05,
                    type: 'spring',
                    stiffness: 300,
                    damping: 20
                  }}
                  whileHover={{ scale: 1.05, x: -4 }}
                  onClick={() => handleAction(action)}
                  className="flex items-center gap-3 bg-white/90 backdrop-blur-xl shadow-lg rounded-full pl-4 pr-6 py-3.5 hover:shadow-xl transition-all border border-white/50"
                >
                  <div 
                    className="w-11 h-11 rounded-full flex items-center justify-center shadow-sm"
                    style={{ 
                      background: `linear-gradient(135deg, ${action.color}, ${action.color}dd)`
                    }}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="whitespace-nowrap font-medium text-[var(--text-primary)]">{action.label}</span>
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.button
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--green-600)] to-[var(--green-700)] text-white shadow-xl hover:shadow-2xl flex items-center justify-center transition-all relative overflow-hidden"
        aria-label="Quick actions"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="relative z-10"
        >
          <Plus className="w-8 h-8" />
        </motion.div>
      </motion.button>
    </div>
  );
}