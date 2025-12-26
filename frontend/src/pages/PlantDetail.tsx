import React, { useState } from 'react';
import { ArrowLeft, Droplet, Calendar, CheckCircle2, Circle, Plus, TrendingUp, AlertTriangle, Sun, Trophy, Sprout, HeartPulse, MapPin, Sunrise, Wind } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Pill } from '../components/Pill';
import type { Plant, WaterEvent, ChecklistItem } from '../types';

interface PlantDetailProps {
  plant: Plant;
  waterEvents: WaterEvent[];
  onBack: () => void;
  onWaterPlant: (plantId: string, amount: number) => void;
  onToggleChecklistItem: (plantId: string, itemId: string) => void;
}

export function PlantDetail({ plant, waterEvents, onBack, onWaterPlant, onToggleChecklistItem }: PlantDetailProps) {
  const [waterAmount, setWaterAmount] = useState(250);
  const [showWaterInput, setShowWaterInput] = useState(false);
  
  const plantEvents = waterEvents
    .filter(e => e.plantId === plant.id)
    .sort((a, b) => b.date.getTime() - a.date.getTime());
  
  const timelineData = plantEvents.slice(0, 10).reverse().map(event => ({
    date: new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    amount: event.amount,
    timestamp: event.date.getTime(),
  }));
  
  const handleWater = () => {
    onWaterPlant(plant.id, waterAmount);
    setShowWaterInput(false);
  };
  
  const healthStatus = plant.health >= 80 ? 'good' : plant.health >= 50 ? 'monitor' : 'at-risk';
  const healthColor = healthStatus === 'good' ? 'green' : healthStatus === 'monitor' ? 'blue' : 'terracotta';
  const healthLabel = healthStatus === 'good' ? 'Good' : healthStatus === 'monitor' ? 'Monitor' : 'At Risk';
  const HealthIcon = healthStatus === 'good' ? CheckCircle2 : healthStatus === 'monitor' ? AlertTriangle : AlertTriangle;
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start gap-4">
        <button
          onClick={onBack}
          className="p-2.5 hover:bg-[var(--bg-tertiary)] rounded-[var(--radius-md)] transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h1 className="mb-1">{plant.name}</h1>
              <p className="text-[var(--text-muted)] italic">{plant.scientificName}</p>
            </div>
            <Pill variant={plant.ownership === 'owned' ? 'green' : 'blue'}>
              {plant.ownership === 'owned' ? 'Owned' : 'Wishlist'}
            </Pill>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {plant.tags.map(tag => (
              <Pill key={tag} variant="gray" size="sm">{tag}</Pill>
            ))}
          </div>
        </div>
      </div>
      
      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Plant Image & Basic Info */}
          <Card paper className="overflow-hidden">
            <div className="h-64 bg-gradient-to-br from-[var(--green-100)] to-[var(--green-200)] flex items-center justify-center">
              <Sprout className="w-32 h-32 text-[var(--green-700)]" />
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    <Sun className="w-4 h-4 text-[var(--text-muted)]" />
                    <p className="text-sm text-[var(--text-muted)]">Sun Need</p>
                  </div>
                  <p className="capitalize">{plant.sunRequirement}</p>
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    <Droplet className="w-4 h-4 text-[var(--text-muted)]" />
                    <p className="text-sm text-[var(--text-muted)]">Water Need</p>
                  </div>
                  <p className="capitalize">{plant.waterNeed}</p>
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    <Sprout className="w-4 h-4 text-[var(--text-muted)]" />
                    <p className="text-sm text-[var(--text-muted)]">Pot Size</p>
                  </div>
                  <p>{plant.potSize} L</p>
                </div>
              </div>
            </div>
          </Card>
          
          {/* Water Timeline */}
          <Card paper className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Droplet className="w-5 h-5 text-[var(--green-700)]" />
              <h3>Watering Timeline</h3>
            </div>
            
            {plantEvents.length > 0 ? (
              <>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={timelineData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--muted-300)" />
                    <XAxis 
                      dataKey="date" 
                      stroke="var(--text-muted)"
                      style={{ fontSize: '12px' }}
                    />
                    <YAxis 
                      stroke="var(--text-muted)"
                      style={{ fontSize: '12px' }}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'var(--bg-secondary)',
                        border: '1px solid var(--muted-300)',
                        borderRadius: 'var(--radius-sm)',
                        padding: '8px 12px'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="amount" 
                      stroke="var(--green-600)" 
                      strokeWidth={3}
                      dot={{ fill: 'var(--green-600)', r: 5 }}
                      name="Water (mL)"
                    />
                  </LineChart>
                </ResponsiveContainer>
                
                <div className="mt-6 space-y-2">
                  <h4 className="text-sm mb-3">Recent Events</h4>
                  {plantEvents.slice(0, 5).map(event => (
                    <div key={event.id} className="flex items-center justify-between px-4 py-3 bg-[var(--bg-tertiary)] rounded-[var(--radius-md)]">
                      <div className="flex items-center gap-3">
                        <Droplet className="w-4 h-4 text-[var(--green-600)]" />
                        <span className="text-sm">
                          {new Date(event.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                      <span className="text-sm">{event.amount} mL</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12 px-6">
                <Droplet className="w-12 h-12 mx-auto mb-3 text-[var(--text-muted)]" />
                <p className="text-[var(--text-muted)]">No watering events recorded yet</p>
              </div>
            )}
          </Card>
          
          {/* Care Checklist */}
          <Card paper className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className="w-5 h-5 text-[var(--green-700)]" />
              <h3>Care Checklist</h3>
            </div>
            <div className="space-y-3">
              {plant.checklistItems.map(item => (
                <motion.div
                  key={item.id}
                  whileHover={{ scale: 1.01 }}
                  className={`p-4 rounded-[var(--radius-md)] border-2 transition-all cursor-pointer ${
                    item.completed 
                      ? 'border-[var(--green-600)] bg-[var(--green-100)]' 
                      : 'border-[var(--muted-300)] bg-[var(--bg-secondary)]'
                  }`}
                  onClick={() => onToggleChecklistItem(plant.id, item.id)}
                >
                  <div className="flex items-start gap-3">
                    {item.completed ? (
                      <CheckCircle2 className="w-6 h-6 text-[var(--green-700)] flex-shrink-0 mt-0.5" />
                    ) : (
                      <Circle className="w-6 h-6 text-[var(--text-muted)] flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className={item.completed ? 'line-through text-[var(--text-muted)]' : ''}>{item.title}</p>
                      <p className="text-sm text-[var(--text-muted)] mt-1">{item.description}</p>
                      {item.completed && item.completedAt && (
                        <p className="text-xs text-[var(--green-700)] mt-2">
                          Completed {new Date(item.completedAt).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                    <span className="text-sm text-[var(--green-700)]">+{item.points} pts</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>
        
        {/* Right Column */}
        <div className="space-y-6">
          {/* Health Status */}
          <Card paper className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <HeartPulse className="w-5 h-5 text-[var(--green-700)]" />
              <h4>Plant Health</h4>
            </div>
            
            <div className="relative w-32 h-32 mx-auto mb-4">
              <svg className="w-32 h-32 -rotate-90">
                <circle cx="64" cy="64" r="56" fill="none" stroke="var(--muted-200)" strokeWidth="8" />
                <circle 
                  cx="64" 
                  cy="64" 
                  r="56" 
                  fill="none" 
                  stroke={`var(--${healthColor}-600)`}
                  strokeWidth="8"
                  strokeDasharray={`${plant.health * 3.52} 352`}
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl mb-1"><HealthIcon className="w-6 h-6" /></div>
                  <p className="text-2xl">{plant.health}%</p>
                </div>
              </div>
            </div>
            
            <div className={`p-4 rounded-[var(--radius-md)] bg-gradient-to-br from-${healthColor}-100 to-${healthColor}-200`}>
              <p className={`text-sm mb-2 text-${healthColor}-700`}>
                Status: <strong>{healthLabel}</strong>
              </p>
              <p className="text-sm text-[var(--text-secondary)]">
                {healthStatus === 'good' && 'Your plant is thriving! Keep up the great care.'}
                {healthStatus === 'monitor' && 'Plant health is acceptable. Check watering schedule.'}
                {healthStatus === 'at-risk' && 'Action needed! Review care checklist and adjust watering.'}
              </p>
            </div>
          </Card>
          
          {/* Watering Actions */}
          <Card paper className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Droplet className="w-5 h-5 text-[var(--green-700)]" />
              <h4>Water Plant</h4>
            </div>
            
            {plant.lastWatered && (
              <p className="text-sm text-[var(--text-muted)] mb-4">
                Last watered {Math.floor((Date.now() - plant.lastWatered.getTime()) / (1000 * 60 * 60 * 24))} days ago
              </p>
            )}
            
            {plant.nextWaterDue && (
              <div className="flex items-center gap-2 p-3 bg-[var(--muted-100)] rounded-[var(--radius-md)] mb-4">
                <Calendar className="w-4 h-4 text-[var(--text-secondary)]" />
                <p className="text-sm">
                  Next due: {new Date(plant.nextWaterDue).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric'
                  })}
                </p>
              </div>
            )}
            
            <AnimatePresence>
              {showWaterInput ? (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4"
                >
                  <div>
                    <label className="text-sm text-[var(--text-muted)] mb-2 block">Amount (mL)</label>
                    <input
                      type="number"
                      value={waterAmount}
                      onChange={(e) => setWaterAmount(Number(e.target.value))}
                      className="w-full px-4 py-2 border border-[var(--muted-300)] rounded-[var(--radius-md)] focus:outline-none focus:ring-2 focus:ring-[var(--green-600)]"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[50, 100, 250, 500].map(amount => (
                      <button
                        key={amount}
                        onClick={() => setWaterAmount(amount)}
                        className="px-3 py-1 text-sm border border-[var(--muted-300)] rounded-[var(--radius-sm)] hover:bg-[var(--green-100)] hover:border-[var(--green-600)] transition-colors"
                      >
                        {amount} mL
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="primary" className="flex-1" onClick={handleWater}>
                      Confirm
                    </Button>
                    <Button variant="ghost" onClick={() => setShowWaterInput(false)}>
                      Cancel
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <Button 
                  variant="primary" 
                  className="w-full"
                  icon={<Droplet className="w-5 h-5" />}
                  onClick={() => setShowWaterInput(true)}
                >
                  Water Now
                </Button>
              )}
            </AnimatePresence>
          </Card>
          
          {/* Points & Progress */}
          <Card paper className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="w-5 h-5 text-[var(--green-700)]" />
              <h4>Points Earned</h4>
            </div>
            <div className="text-center">
              <p className="text-4xl text-[var(--green-700)] mb-2">{plant.points}</p>
              <p className="text-sm text-[var(--text-muted)]">Total points from this plant</p>
            </div>
            
            <div className="mt-6 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[var(--text-muted)]">Watering events</span>
                <span>{plantEvents.length} × 2 pts</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[var(--text-muted)]">Checklist items</span>
                <span>{plant.checklistItems.filter(i => i.completed).length} × 5 pts</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[var(--text-muted)]">Registration bonus</span>
                <span>20 pts</span>
              </div>
            </div>
          </Card>
          
          {/* Placement Tips */}
          <Card paper className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-[var(--green-700)]" />
              <h4>Placement Tips</h4>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-[var(--muted-100)] rounded-[var(--radius-md)]">
                <div className="flex items-center gap-2 mb-2">
                  <Sunrise className="w-4 h-4 text-[var(--text-muted)]" />
                  <p className="text-sm">Recommended microzone</p>
                </div>
                <p className="text-sm text-[var(--text-muted)]">
                  {plant.sunRequirement === 'high' && 'East Corner - Morning Sun (6+ hours)'}
                  {plant.sunRequirement === 'medium' && 'Partial shade area (3-5 hours)'}
                  {plant.sunRequirement === 'low' && 'Shaded area (< 3 hours)'}
                </p>
              </div>
              
              <div className="p-3 bg-[var(--muted-100)] rounded-[var(--radius-md)]">
                <div className="flex items-center gap-2 mb-2">
                  <Wind className="w-4 h-4 text-[var(--text-muted)]" />
                  <p className="text-sm">Wind exposure</p>
                </div>
                <p className="text-sm text-[var(--text-muted)]">
                  {plant.waterNeed === 'high' ? 'Protect from strong winds' : 'Moderate wind tolerance'}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}