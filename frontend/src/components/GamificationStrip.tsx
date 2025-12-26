import React from 'react';
import { Trophy, Flame, Star, TrendingUp } from 'lucide-react';
import { Card } from './Card';
import { motion } from 'motion/react';

interface GamificationStripProps {
  points: number;
  streak: number;
  level: number;
  nextLevelPoints: number;
  currentBadge?: string;
  onRedeem?: () => void;
}

export function GamificationStrip({ 
  points, 
  streak, 
  level, 
  nextLevelPoints,
  currentBadge = 'Garden Enthusiast',
  onRedeem 
}: GamificationStripProps) {
  const progress = ((points % nextLevelPoints) / nextLevelPoints) * 100;
  
  return (
    <Card paper className="p-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--green-600)] to-[var(--green-400)] flex items-center justify-center flex-shrink-0">
            <Star className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-sm text-[var(--text-muted)]">Points</p>
            <p className="text-2xl">{points}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--terracotta-600)] to-[var(--terracotta-400)] flex items-center justify-center flex-shrink-0">
            <Flame className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-sm text-[var(--text-muted)]">Streak</p>
            <p className="text-2xl">{streak} days</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--navy-700)] to-[var(--navy-600)] flex items-center justify-center flex-shrink-0">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-sm text-[var(--text-muted)]">Badge</p>
            <p className="text-sm truncate">{currentBadge}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center flex-shrink-0">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-[var(--text-muted)] mb-1">Level {level}</p>
            <div className="relative h-2 bg-[var(--muted-200)] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.6, ease: [0.22, 0.9, 0.38, 1] }}
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-600 to-blue-400"
              />
            </div>
          </div>
        </div>
      </div>
      
      {onRedeem && (
        <div className="mt-4 pt-4 border-t border-[var(--muted-300)]">
          <button
            onClick={onRedeem}
            className="text-sm text-[var(--green-700)] hover:text-[var(--green-600)] transition-colors"
          >
            Redeem points for tips →
          </button>
        </div>
      )}
    </Card>
  );
}
