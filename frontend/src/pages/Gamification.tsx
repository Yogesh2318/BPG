import React from 'react';
import { Trophy, Lock, Sparkles, Award, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Pill } from '../components/Pill';
import type { Badge, UserProfile } from '../types';

interface GamificationProps {
  userProfile: UserProfile;
  onShareBadge: (badgeId: string) => void;
}

export function Gamification({ userProfile, onShareBadge }: GamificationProps) {
  const unlockedBadges = userProfile.badges.filter(b => b.unlocked);
  const lockedBadges = userProfile.badges.filter(b => !b.unlocked);
  
  const streakData = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    const hasActivity = i >= 24; // Last 6 days have activity
    return { date, hasActivity };
  });
  
  const rarityColors = {
    common: { bg: 'from-[var(--gray-300)] to-[var(--gray-400)]', text: 'text-[var(--gray-700)]', border: 'border-[var(--gray-400)]' },
    rare: { bg: 'from-blue-400 to-blue-600', text: 'text-blue-700', border: 'border-blue-600' },
    legendary: { bg: 'from-purple-400 to-purple-600', text: 'text-purple-700', border: 'border-purple-600' },
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-2">🏆 Rewards & Achievements</h2>
        <p className="text-[var(--text-muted)]">
          Track your progress and unlock badges as you care for your plants
        </p>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card paper className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-[var(--text-muted)]">Total Points</p>
              <p className="text-2xl">{userProfile.points}</p>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm text-[var(--green-700)]">
            <span>↑ +45 this week</span>
          </div>
        </Card>
        
        <Card paper className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--terracotta-600)] to-[var(--terracotta-400)] flex items-center justify-center text-white text-xl">
              🔥
            </div>
            <div>
              <p className="text-sm text-[var(--text-muted)]">Current Streak</p>
              <p className="text-2xl">{userProfile.streak} days</p>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm text-[var(--text-muted)]">
            <span>Best: 12 days</span>
          </div>
        </Card>
        
        <Card paper className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-[var(--text-muted)]">Badges</p>
              <p className="text-2xl">{unlockedBadges.length}/{userProfile.badges.length}</p>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm text-[var(--text-muted)]">
            <span>{((unlockedBadges.length / userProfile.badges.length) * 100).toFixed(0)}% complete</span>
          </div>
        </Card>
        
        <Card paper className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-[var(--text-muted)]">Level</p>
              <p className="text-2xl">{userProfile.level}</p>
            </div>
          </div>
          <div className="w-full bg-[var(--muted-200)] rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-400 to-purple-600 h-2 rounded-full transition-all"
              style={{ width: `${((userProfile.points % 100) / 100) * 100}%` }}
            />
          </div>
        </Card>
      </div>
      
      {/* Streak Calendar */}
      <Card paper className="p-6">
        <h3 className="mb-4">🔥 Activity Streak</h3>
        <div className="grid grid-cols-10 md:grid-cols-15 lg:grid-cols-30 gap-2">
          {streakData.map((day, index) => (
            <div
              key={index}
              className={`aspect-square rounded-sm transition-all ${
                day.hasActivity 
                  ? 'bg-[var(--green-600)] hover:bg-[var(--green-700)]' 
                  : 'bg-[var(--muted-200)] hover:bg-[var(--muted-300)]'
              }`}
              title={day.date.toLocaleDateString()}
            />
          ))}
        </div>
        <p className="text-sm text-[var(--text-muted)] mt-4">
          Log care activities daily to maintain your streak. You're on a {userProfile.streak}-day streak! 🎉
        </p>
      </Card>
      
      {/* Unlocked Badges */}
      <div>
        <h3 className="mb-4">✨ Unlocked Badges</h3>
        {unlockedBadges.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="text-6xl mb-4">🏆</div>
            <h3 className="mb-2">No badges unlocked yet</h3>
            <p className="text-[var(--text-muted)]">Keep caring for your plants to earn your first badge!</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {unlockedBadges.map((badge, index) => {
              const colors = rarityColors[badge.rarity];
              return (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card hover paper className={`p-6 border-2 ${colors.border}`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${colors.bg} flex items-center justify-center text-white text-3xl`}>
                        {badge.rarity === 'legendary' && '👑'}
                        {badge.rarity === 'rare' && '⭐'}
                        {badge.rarity === 'common' && '🌟'}
                      </div>
                      <Pill variant="gray" size="sm" className="capitalize">
                        {badge.rarity}
                      </Pill>
                    </div>
                    
                    <h4 className="mb-2">{badge.name}</h4>
                    <p className="text-sm text-[var(--text-muted)] mb-4">{badge.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[var(--green-700)]">+{badge.points} pts</span>
                      {badge.unlockedAt && (
                        <span className="text-xs text-[var(--text-muted)]">
                          {new Date(badge.unlockedAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full mt-4"
                      onClick={() => onShareBadge(badge.id)}
                    >
                      Share Badge →
                    </Button>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
      
      {/* Locked Badges */}
      {lockedBadges.length > 0 && (
        <div>
          <h3 className="mb-4">🔒 Locked Badges</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {lockedBadges.map(badge => {
              const colors = rarityColors[badge.rarity];
              return (
                <Card key={badge.id} paper className="p-6 opacity-60">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-16 h-16 rounded-full bg-[var(--muted-300)] flex items-center justify-center text-3xl">
                      <Lock className="w-8 h-8 text-[var(--text-muted)]" />
                    </div>
                    <Pill variant="gray" size="sm" className="capitalize">
                      {badge.rarity}
                    </Pill>
                  </div>
                  
                  <h4 className="mb-2">{badge.name}</h4>
                  <p className="text-sm text-[var(--text-muted)] mb-4">{badge.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[var(--text-muted)]">+{badge.points} pts</span>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}
      
      {/* Rewards */}
      <Card paper className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Sparkles className="w-6 h-6 text-[var(--green-700)]" />
          <h3>Available Rewards</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-6 border border-[var(--muted-300)] rounded-[var(--radius-md)]">
            <p className="mb-2">🎨 Seasonal Wallpaper</p>
            <p className="text-sm text-[var(--text-muted)] mb-4">Cost: 100 pts</p>
            <Button variant="primary" size="sm" className="w-full" disabled={userProfile.points < 100}>
              Redeem
            </Button>
          </div>
          
          <div className="p-6 border border-[var(--muted-300)] rounded-[var(--radius-md)]">
            <p className="mb-2">🖼️ Avatar Frame</p>
            <p className="text-sm text-[var(--text-muted)] mb-4">Cost: 150 pts</p>
            <Button variant="primary" size="sm" className="w-full" disabled={userProfile.points < 150}>
              Redeem
            </Button>
          </div>
          
          <div className="p-6 border border-[var(--muted-300)] rounded-[var(--radius-md)]">
            <p className="mb-2">📊 Advanced Insights</p>
            <p className="text-sm text-[var(--text-muted)] mb-4">Cost: 200 pts</p>
            <Button variant="primary" size="sm" className="w-full" disabled={userProfile.points < 200}>
              Redeem
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}