import React from 'react';
import { Home, Map, Leaf, Calendar, Trophy, Sprout, Settings } from 'lucide-react';
import { motion } from 'motion/react';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  mobile?: boolean;
  onClose?: () => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'collection', label: 'My Plants', icon: Leaf },
  { id: 'map', label: 'Sunlight Map', icon: Map },
  { id: 'scheduler', label: 'Scheduler', icon: Calendar },
  { id: 'gamification', label: 'Rewards', icon: Trophy },
  { id: 'sustainability', label: 'Sustainability', icon: Sprout },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function Navigation({ currentPage, onNavigate, mobile = false, onClose }: NavigationProps) {
  const handleNavigate = (page: string) => {
    onNavigate(page);
    onClose?.();
  };
  
  if (mobile) {
    return (
      <motion.nav
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        exit={{ x: -300 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed inset-y-0 left-0 z-50 w-64 bg-[var(--bg-secondary)] shadow-[var(--shadow-modal)] p-6"
      >
        <div className="mb-8">
          <h2>BalconyFarm Buddy</h2>
          <p className="text-sm text-[var(--text-muted)]">Urban Garden Toolkit</p>
        </div>
        
        <div className="space-y-2">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-[var(--radius-md)] transition-all ${
                  isActive 
                    ? 'bg-[var(--green-100)] text-[var(--green-700)]' 
                    : 'text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </motion.nav>
    );
  }
  
  return (
    <nav className="hidden lg:flex flex-col w-64 xl:w-72 min-w-64 xl:min-w-72 bg-white/90 backdrop-blur-xl border-r border-white/50 px-6 py-8 h-screen sticky top-0">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-[var(--radius-md)] bg-gradient-to-br from-[var(--green-500)] to-[var(--green-600)] flex items-center justify-center text-white shadow-md">
            <Sprout className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg">BalconyFarm</h2>
          </div>
        </div>
        <p className="text-sm text-[var(--text-muted)] ml-13">Urban Garden Toolkit</p>
      </div>
      
      <div className="space-y-1.5">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-[var(--radius-md)] transition-all ${
                isActive 
                  ? 'bg-gradient-to-r from-[var(--green-100)] to-[var(--green-50)] text-[var(--green-700)] shadow-sm border border-[var(--green-200)]' 
                  : 'text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--green-600)]'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}