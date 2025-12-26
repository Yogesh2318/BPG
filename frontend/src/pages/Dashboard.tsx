import React from 'react';
import { PlantCard } from '../components/PlantCard';
import { WaterWasteGraph } from '../components/WaterWasteGraph';
import { Carousel } from '../components/Carousel';
import { GamificationStrip } from '../components/GamificationStrip';
import { AnalyticsCard } from '../components/AnalyticsCard';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Droplet, Droplets, Percent, Sprout, Sun, Plus, Trophy, Calendar, Leaf } from 'lucide-react';
import type { Plant, WaterSavingsData, UserProfile } from '../types';

interface DashboardProps {
  plants: Plant[];
  waterData: WaterSavingsData[];
  userProfile: UserProfile;
  funFacts: Array<{ id: string; text: string; icon: string; points: number }>;
  onNavigate: (page: string, plantId?: string) => void;
  onWaterPlant: (plantId: string) => void;
}

export function Dashboard({ plants, waterData, userProfile, funFacts, onNavigate, onWaterPlant }: DashboardProps) {
  const ownedPlants = plants.filter(p => p.ownership === 'owned');
  const totalWaterSaved = waterData.reduce((sum, d) => sum + d.saved, 0) / 1000; // Convert to liters
  
  const avgHealth = ownedPlants.length > 0 
    ? ownedPlants.reduce((sum, p) => sum + p.health, 0) / ownedPlants.length 
    : 0;
    
  const avgWaterPerPot = ownedPlants.length > 0
    ? waterData.reduce((sum, d) => sum + d.actual, 0) / waterData.length / ownedPlants.length
    : 0;
  
  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <Card className="p-6 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[var(--green-100)]/30 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="relative">
          <div className="flex items-center justify-between mb-6">
            <h2>Your Balcony at a Glance</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-[var(--green-100)] via-[var(--green-50)] to-white rounded-[var(--radius-lg)] p-5 border border-[var(--green-200)]/40 shadow-md hover:shadow-lg transition-all group">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-9 h-9 rounded-[var(--radius-md)] bg-gradient-to-br from-[var(--green-600)] to-[var(--green-700)] flex items-center justify-center shadow-sm">
                  <Droplet className="w-5 h-5 text-white" />
                </div>
                <p className="text-sm text-[var(--green-700)] font-medium">Water Saved</p>
              </div>
              <p className="text-3xl text-[var(--green-700)] font-bold mb-1">{totalWaterSaved.toFixed(1)} L</p>
              <p className="text-xs text-[var(--green-600)]">This week</p>
            </div>
            <div className="bg-gradient-to-br from-blue-100 via-blue-50 to-white rounded-[var(--radius-lg)] p-5 border border-blue-200/40 shadow-md hover:shadow-lg transition-all group">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-9 h-9 rounded-[var(--radius-md)] bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-sm">
                  <Leaf className="w-5 h-5 text-white" />
                </div>
                <p className="text-sm text-blue-700 font-medium">Active Plants</p>
              </div>
              <p className="text-3xl text-blue-700 font-bold mb-1">{ownedPlants.length}</p>
              <p className="text-xs text-blue-600">{plants.filter(p => p.ownership === 'wishlist').length} in wishlist</p>
            </div>
            <div className="bg-gradient-to-br from-[var(--terracotta-100)] via-[var(--terracotta-50)] to-white rounded-[var(--radius-lg)] p-5 border border-[var(--terracotta-200)]/40 shadow-md hover:shadow-lg transition-all group">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-9 h-9 rounded-[var(--radius-md)] bg-gradient-to-br from-[var(--terracotta-600)] to-[var(--terracotta-700)] flex items-center justify-center shadow-sm">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <p className="text-sm text-[var(--terracotta-700)] font-medium">Due Today</p>
              </div>
              <p className="text-3xl text-[var(--terracotta-700)] font-bold mb-1">
                {ownedPlants.filter(p => {
                  if (!p.nextWaterDue) return false;
                  const daysUntil = Math.ceil((p.nextWaterDue.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
                  return daysUntil <= 0;
                }).length}
              </p>
              <p className="text-xs text-[var(--terracotta-600)]">Plants need water</p>
            </div>
            <div className="bg-gradient-to-br from-purple-100 via-purple-50 to-white rounded-[var(--radius-lg)] p-5 border border-purple-200/40 shadow-md hover:shadow-lg transition-all group">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-9 h-9 rounded-[var(--radius-md)] bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-sm">
                  <Trophy className="w-5 h-5 text-white" />
                </div>
                <p className="text-sm text-purple-700 font-medium">Total Points</p>
              </div>
              <p className="text-3xl text-purple-700 font-bold mb-1">{userProfile.points}</p>
              <p className="text-xs text-purple-600">Level {userProfile.level}</p>
            </div>
          </div>
        </div>
      </Card>
      
      {/* Gamification Strip */}
      <GamificationStrip
        points={userProfile.points}
        streak={userProfile.streak}
        level={userProfile.level}
        nextLevelPoints={500}
        currentBadge="Garden Enthusiast"
        onRedeem={() => onNavigate('gamification')}
      />
      
      {/* Top Plants Scroller */}
      <div>
        <div className="flex items-center justify-between mb-4 px-2">
          <h2>Your Plants</h2>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onNavigate('collection')}
          >
            View All →
          </Button>
        </div>
        <div className="overflow-x-auto pb-4 px-2 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <style>{`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          <div className="flex gap-4 min-w-min">
            {ownedPlants.slice(0, 4).map(plant => (
              <div key={plant.id} className="w-80 flex-shrink-0">
                <PlantCard 
                  plant={plant} 
                  variant="medium"
                  onWater={onWaterPlant}
                  onClick={() => onNavigate('plant-detail', plant.id)}
                />
              </div>
            ))}
            <button
              onClick={() => onNavigate('collection')}
              className="w-80 flex-shrink-0 border-2 border-dashed border-[var(--muted-300)] rounded-[var(--radius-md)] flex flex-col items-center justify-center gap-3 hover:border-[var(--green-600)] hover:bg-[var(--green-100)] transition-all p-8"
            >
              <Plus className="w-12 h-12 text-[var(--text-muted)]" />
              <p className="text-[var(--text-muted)]">Add more plants</p>
            </button>
          </div>
        </div>
      </div>
      
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Water Waste Graph */}
          <WaterWasteGraph data={waterData} />
          
          {/* Fun Facts Carousel */}
          <Carousel items={funFacts} autoplay interval={5000} />
        </div>
        
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card paper className="p-6">
            <h3 className="mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button 
                variant="primary" 
                className="w-full"
                icon={<Plus className="w-5 h-5" />}
                onClick={() => onNavigate('collection')}
              >
                Add Plant
              </Button>
              <Button 
                variant="secondary" 
                className="w-full"
                icon={<Droplet className="w-5 h-5" />}
                onClick={() => {
                  ownedPlants.forEach(p => onWaterPlant(p.id));
                }}
              >
                Water All
              </Button>
              <Button 
                variant="ghost" 
                className="w-full"
                icon={<Sun className="w-5 h-5" />}
                onClick={() => onNavigate('map')}
              >
                Edit Sun Map
              </Button>
            </div>
          </Card>
          
          {/* Analytics Cards */}
          <div className="space-y-4">
            <AnalyticsCard
              title="Avg Health"
              value={avgHealth.toFixed(0)}
              unit="%"
              change={8}
              color="green"
              icon={<Sprout className="w-12 h-12" />}
              helpText="Average health score across all your plants"
            />
            <AnalyticsCard
              title="Avg Water/Pot"
              value={avgWaterPerPot.toFixed(0)}
              unit="mL"
              change={-5}
              color="blue"
              icon={<Droplets className="w-12 h-12" />}
              helpText="Average daily water usage per plant"
            />
            <AnalyticsCard
              title="Efficiency Rate"
              value="94"
              unit="%"
              change={12}
              color="terracotta"
              icon={<Percent className="w-12 h-12" />}
              helpText="How efficiently you're using water vs recommendations"
            />
          </div>
          
          {/* Microclimate Snapshot */}
          <Card paper className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Sun className="w-5 h-5 text-yellow-600" />
              <h4>Today's Sunlight</h4>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[var(--text-secondary)]">Morning</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div 
                      key={i} 
                      className={`w-2 h-8 rounded-sm ${i <= 3 ? 'bg-yellow-400' : 'bg-[var(--muted-200)]'}`}
                    />
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[var(--text-secondary)]">Afternoon</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div 
                      key={i} 
                      className={`w-2 h-8 rounded-sm ${i <= 5 ? 'bg-yellow-400' : 'bg-[var(--muted-200)]'}`}
                    />
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[var(--text-secondary)]">Evening</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div 
                      key={i} 
                      className={`w-2 h-8 rounded-sm ${i <= 2 ? 'bg-yellow-400' : 'bg-[var(--muted-200)]'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full mt-4"
              onClick={() => onNavigate('map')}
            >
              View Full Map →
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}