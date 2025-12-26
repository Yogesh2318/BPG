import React from 'react';
import { WifiOff, Wifi, Menu } from 'lucide-react';
import { Pill } from './Pill';

interface HeaderProps {
  userName: string;
  isOnline?: boolean;
  onMenuClick?: () => void;
}

export function Header({ userName, isOnline = true, onMenuClick }: HeaderProps) {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };
  
  const formatDate = () => {
    return new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/80 border-b border-white/40 shadow-sm">
      <div className="px-4 lg:px-8 py-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="mb-1">{getGreeting()}, {userName} 🌿</h1>
            <p className="text-sm text-[var(--text-muted)]">{formatDate()}</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Pill variant={isOnline ? 'green' : 'gray'} size="sm">
              {isOnline ? <Wifi className="w-3 h-3 mr-1" /> : <WifiOff className="w-3 h-3 mr-1" />}
              {isOnline ? 'Online' : 'Offline'}
            </Pill>
            
            <button 
              onClick={onMenuClick}
              className="p-2 hover:bg-white/60 rounded-[var(--radius-md)] transition-all lg:hidden"
              aria-label="Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}