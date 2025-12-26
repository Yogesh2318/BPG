import React from 'react';
import { motion } from 'motion/react';
import { Droplet, Calendar } from 'lucide-react';
import { Card } from './Card';
import { Pill } from './Pill';
import { Button } from './Button';
import type { Plant } from '../types';

interface PlantCardProps {
  plant: Plant;
  variant?: 'small' | 'medium' | 'large';
  onWater?: (plantId: string) => void;
  onCare?: (plantId: string) => void;
  onClick?: (plantId: string) => void;
}

export function PlantCard({ plant, variant = 'medium', onWater, onCare, onClick }: PlantCardProps) {
  const handleWater = (e: React.MouseEvent) => {
    e.stopPropagation();
    onWater?.(plant.id);
  };
  
  const handleCare = (e: React.MouseEvent) => {
    e.stopPropagation();
    onCare?.(plant.id);
  };
  
  const formatDaysUntil = (date?: Date) => {
    if (!date) return 'Not scheduled';
    const days = Math.ceil((date.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    if (days < 0) return 'Overdue!';
    if (days === 0) return 'Today';
    if (days === 1) return 'Tomorrow';
    return `In ${days} days`;
  };
  
  const healthColor = plant.health >= 80 ? 'var(--green-600)' : plant.health >= 50 ? 'orange' : 'var(--terracotta-600)';
  
  if (variant === 'small') {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        onClick={() => onClick?.(plant.id)}
        className="flex items-center gap-3 p-4 bg-[var(--bg-secondary)] rounded-[var(--radius-md)] shadow-sm hover:shadow-md cursor-pointer transition-all"
      >
        <div className="relative w-12 h-12 rounded-full bg-[var(--green-100)] flex items-center justify-center">
          <div className="text-xl">🌿</div>
          <svg className="absolute inset-0 w-12 h-12 -rotate-90">
            <circle cx="24" cy="24" r="22" fill="none" stroke="var(--muted-200)" strokeWidth="2" />
            <circle 
              cx="24" 
              cy="24" 
              r="22" 
              fill="none" 
              stroke={healthColor}
              strokeWidth="2"
              strokeDasharray={`${plant.health * 1.38} 138`}
              className="transition-all duration-300"
            />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="truncate">{plant.name}</p>
            <Pill variant={plant.ownership === 'owned' ? 'green' : 'blue'} size="sm">
              {plant.ownership === 'owned' ? 'Owned' : 'Wishlist'}
            </Pill>
          </div>
          <p className="text-sm text-[var(--text-muted)]">{formatDaysUntil(plant.nextWaterDue)}</p>
        </div>
      </motion.div>
    );
  }
  
  return (
    <Card hover onClick={() => onClick?.(plant.id)} className="overflow-hidden group">
      <div className="relative h-48 bg-gradient-to-br from-[var(--green-100)] via-[var(--green-50)] to-[var(--green-100)] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[var(--green-200)]/20" />
        <div className="text-7xl relative z-10 group-hover:scale-110 transition-transform duration-500">🌿</div>
        <Pill variant={plant.ownership === 'owned' ? 'green' : 'blue'} className="absolute top-4 right-4 z-20 shadow-sm">
          {plant.ownership === 'owned' ? 'Owned' : 'Wishlist'}
        </Pill>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white/80 to-transparent backdrop-blur-sm" />
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="mb-1 group-hover:text-[var(--green-600)] transition-colors">{plant.name}</h3>
            <p className="text-sm text-[var(--text-muted)] italic">{plant.scientificName}</p>
          </div>
          <div className="relative w-16 h-16 flex-shrink-0">
            <svg className="w-16 h-16 -rotate-90">
              <circle cx="32" cy="32" r="28" fill="none" stroke="var(--muted-200)" strokeWidth="3" />
              <circle 
                cx="32" 
                cy="32" 
                r="28" 
                fill="none" 
                stroke={healthColor}
                strokeWidth="3"
                strokeDasharray={`${plant.health * 1.76} 176`}
                strokeLinecap="round"
                className="transition-all duration-500"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-sm font-bold">{plant.health}%</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {plant.tags.slice(0, 3).map(tag => (
            <Pill key={tag} variant="gray" size="sm">{tag}</Pill>
          ))}
        </div>
        
        {plant.ownership === 'owned' && (
          <>
            <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)] mb-4 bg-[var(--muted-100)] px-3 py-2 rounded-[var(--radius-md)]">
              <Calendar className="w-4 h-4 text-[var(--green-600)]" />
              <span>Next water: <span className="font-medium">{formatDaysUntil(plant.nextWaterDue)}</span></span>
            </div>
            
            <div className="flex gap-2">
              <Button variant="primary" size="sm" icon={<Droplet className="w-4 h-4" />} onClick={handleWater} className="flex-1">
                Water Now
              </Button>
              <Button variant="ghost" size="sm" onClick={handleCare}>
                Log Care
              </Button>
            </div>
          </>
        )}
      </div>
    </Card>
  );
}