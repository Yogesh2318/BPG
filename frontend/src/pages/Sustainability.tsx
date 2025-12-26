import React from 'react';
import { Droplets, Leaf, Sprout, TrendingDown, Award, BookOpen } from 'lucide-react';
import { Card } from '../components/Card';
import { AnalyticsCard } from '../components/AnalyticsCard';
import { Button } from '../components/Button';
import { Pill } from '../components/Pill';

interface SustainabilityProps {
  totalWaterSaved: number;
  plants: Array<{ name: string; tags: string[] }>;
}

export function Sustainability({ totalWaterSaved, plants }: SustainabilityProps) {
  const co2Saved = totalWaterSaved * 0.0003; // Simplified conversion
  const nativePlants = plants.filter(p => p.tags.includes('native')).length;
  const lowWaterPlants = plants.filter(p => p.tags.includes('low-water')).length;
  
  const challenges = [
    {
      id: '1',
      title: 'Water Saver Week',
      description: 'Reduce water usage by 20% this week',
      progress: 65,
      points: 50,
      badge: '💧',
      active: true,
    },
    {
      id: '2',
      title: 'Native Plant Champion',
      description: 'Add 3 native plants to your collection',
      progress: nativePlants * 33,
      points: 100,
      badge: '🌿',
      active: true,
    },
    {
      id: '3',
      title: 'Composting Hero',
      description: 'Start composting kitchen waste',
      progress: 0,
      points: 75,
      badge: '♻️',
      active: false,
    },
  ];
  
  const resources = [
    {
      title: 'Rainwater Collection',
      description: 'Set up a simple balcony rainwater collection system to reduce tap water use',
      icon: '🌧️',
      tags: ['water-saving', 'diy'],
    },
    {
      title: 'Upcycle Containers',
      description: 'Turn old containers, bottles, and cans into creative plant pots',
      icon: '♻️',
      tags: ['waste-reduction', 'creative'],
    },
    {
      title: 'Organic Manure Guide',
      description: 'Learn where to source and how to use organic fertilizers for healthier plants',
      icon: '🌱',
      tags: ['organic', 'soil-health'],
    },
    {
      title: 'Native Plants Database',
      description: 'Discover drought-tolerant native plants perfect for your region',
      icon: '🏞️',
      tags: ['native', 'low-water'],
    },
  ];
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-2">🌍 Sustainability Hub</h2>
        <p className="text-[var(--text-muted)]">
          Track your environmental impact and discover eco-friendly gardening practices
        </p>
      </div>
      
      {/* Impact Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <AnalyticsCard
          title="Water Saved"
          value={totalWaterSaved.toFixed(1)}
          unit="L"
          change={15}
          color="green"
          icon={<Droplets className="w-12 h-12" />}
          helpText="Total water conserved through efficient watering practices"
        />
        
        <AnalyticsCard
          title="CO₂ Avoided"
          value={co2Saved.toFixed(2)}
          unit="kg"
          change={12}
          color="blue"
          icon={<TrendingDown className="w-12 h-12" />}
          helpText="Estimated carbon emissions avoided through water conservation"
        />
        
        <AnalyticsCard
          title="Native Plants"
          value={nativePlants}
          change={25}
          color="terracotta"
          icon={<Leaf className="w-12 h-12" />}
          helpText="Native plants require less water and support local ecosystems"
        />
        
        <AnalyticsCard
          title="Low-Water Plants"
          value={lowWaterPlants}
          change={10}
          color="gray"
          icon={<Sprout className="w-12 h-12" />}
          helpText="Drought-tolerant plants that thrive with minimal watering"
        />
      </div>
      
      {/* Impact Visualization */}
      <Card paper className="p-6">
        <h3 className="mb-4">💧 Your Water Impact</h3>
        
        <div className="mb-6">
          <div className="flex items-end justify-between mb-2">
            <p className="text-4xl text-[var(--green-700)]">{totalWaterSaved.toFixed(1)} L</p>
            <p className="text-sm text-[var(--text-muted)]">This month</p>
          </div>
          <p className="text-[var(--text-secondary)] mb-6">
            You saved <strong>{totalWaterSaved.toFixed(1)} liters</strong> of water — equivalent to{' '}
            <strong>{(totalWaterSaved / 0.5).toFixed(1)} short showers</strong> or{' '}
            <strong>{(totalWaterSaved / 0.25).toFixed(0)} cups of coffee</strong>.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 bg-[var(--green-100)] rounded-[var(--radius-md)]">
              <p className="text-sm text-[var(--green-700)] mb-1">If everyone did this:</p>
              <p className="text-lg text-[var(--green-700)]">
                {(totalWaterSaved * 1000000).toFixed(0)} L saved citywide
              </p>
            </div>
            <div className="p-5 bg-blue-100 rounded-[var(--radius-md)]">
              <p className="text-sm text-blue-700 mb-1">Annual projection:</p>
              <p className="text-lg text-blue-700">
                {(totalWaterSaved * 12).toFixed(1)} L saved per year
              </p>
            </div>
            <div className="p-5 bg-[var(--terracotta-100)] rounded-[var(--radius-md)]">
              <p className="text-sm text-[var(--terracotta-700)] mb-1">Trees equivalent:</p>
              <p className="text-lg text-[var(--terracotta-700)]">
                ~{(totalWaterSaved / 50).toFixed(1)} trees' water needs
              </p>
            </div>
          </div>
        </div>
        
        <div className="p-5 bg-[var(--muted-100)] rounded-[var(--radius-md)]">
          <p className="text-sm">
            <strong>🌟 Well done!</strong> Your efficient watering practices are making a real difference. 
            Consider adding more native plants to further reduce water consumption.
          </p>
        </div>
      </Card>
      
      {/* Challenges */}
      <div>
        <h3 className="mb-4">🏆 Sustainability Challenges</h3>
        <div className="space-y-3">
          {challenges.map(challenge => (
            <Card key={challenge.id} hover paper className="p-5">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--green-400)] to-[var(--green-600)] flex items-center justify-center text-3xl flex-shrink-0">
                  {challenge.badge}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="mb-1">{challenge.title}</h4>
                      <p className="text-sm text-[var(--text-muted)]">{challenge.description}</p>
                    </div>
                    <Pill variant={challenge.active ? 'green' : 'gray'} size="sm">
                      {challenge.active ? 'Active' : 'Locked'}
                    </Pill>
                  </div>
                  
                  <div className="mb-2">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-[var(--text-muted)]">Progress</span>
                      <span className="text-[var(--green-700)]">{challenge.progress}%</span>
                    </div>
                    <div className="h-2 bg-[var(--muted-200)] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[var(--green-600)] to-[var(--green-400)] transition-all"
                        style={{ width: `${challenge.progress}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[var(--green-700)]">+{challenge.points} pts</span>
                    {challenge.active && challenge.progress < 100 && (
                      <Button variant="ghost" size="sm">
                        Learn More →
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Resources */}
      <div>
        <h3 className="mb-4">📚 Eco-Friendly Resources</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {resources.map((resource, index) => (
            <Card key={index} hover paper className="p-5">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--muted-200)] to-[var(--muted-300)] flex items-center justify-center text-2xl flex-shrink-0">
                  {resource.icon}
                </div>
                
                <div className="flex-1">
                  <h4 className="mb-2">{resource.title}</h4>
                  <p className="text-sm text-[var(--text-muted)] mb-3">{resource.description}</p>
                  
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {resource.tags.map(tag => (
                      <Pill key={tag} variant="gray" size="sm">{tag}</Pill>
                    ))}
                  </div>
                  
                  <Button variant="ghost" size="sm">
                    Read More →
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Tips Section */}
      <Card paper className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <BookOpen className="w-6 h-6 text-[var(--green-700)]" />
          <h3>💡 Water-Saving Tips</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[var(--green-100)] flex items-center justify-center text-[var(--green-700)] flex-shrink-0">
              1
            </div>
            <div>
              <p><strong>Bottom watering:</strong> Place pots in trays of water to prevent runoff and overwatering</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[var(--green-100)] flex items-center justify-center text-[var(--green-700)] flex-shrink-0">
              2
            </div>
            <div>
              <p><strong>Mulching:</strong> Add a layer of organic mulch to reduce evaporation by up to 70%</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[var(--green-100)] flex items-center justify-center text-[var(--green-700)] flex-shrink-0">
              3
            </div>
            <div>
              <p><strong>Group plants:</strong> Cluster plants with similar water needs to create humid microclimates</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[var(--green-100)] flex items-center justify-center text-[var(--green-700)] flex-shrink-0">
              4
            </div>
            <div>
              <p><strong>Water timing:</strong> Water early morning or evening to minimize evaporation losses</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[var(--green-100)] flex items-center justify-center text-[var(--green-700)] flex-shrink-0">
              5
            </div>
            <div>
              <p><strong>Native plants:</strong> Choose local species adapted to your climate — they need 50% less water</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}