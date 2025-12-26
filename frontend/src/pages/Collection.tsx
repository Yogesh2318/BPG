import React, { useState } from 'react';
import { Search, Filter, Grid3x3, List, Download, Plus, Sprout } from 'lucide-react';
import { PlantCard } from '../components/PlantCard';
import { Button } from '../components/Button';
import { Pill } from '../components/Pill';
import type { Plant } from '../types';

interface CollectionProps {
  plants: Plant[];
  onNavigate: (page: string, plantId?: string) => void;
  onWaterPlant: (plantId: string) => void;
}

export function Collection({ plants, onNavigate, onWaterPlant }: CollectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOwnership, setFilterOwnership] = useState<'all' | 'owned' | 'wishlist'>('all');
  const [filterSun, setFilterSun] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'health' | 'nextWater' | 'points'>('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const filteredPlants = plants
    .filter(p => {
      if (filterOwnership !== 'all' && p.ownership !== filterOwnership) return false;
      if (filterSun !== 'all' && p.sunRequirement !== filterSun) return false;
      if (searchTerm && !p.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'health':
          return b.health - a.health;
        case 'nextWater':
          if (!a.nextWaterDue) return 1;
          if (!b.nextWaterDue) return -1;
          return a.nextWaterDue.getTime() - b.nextWaterDue.getTime();
        case 'points':
          return b.points - a.points;
        default:
          return 0;
      }
    });
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="mb-2">My Plant Collection</h2>
          <p className="text-[var(--text-muted)]">
            {filteredPlants.length} plants • {plants.filter(p => p.ownership === 'owned').length} owned, {plants.filter(p => p.ownership === 'wishlist').length} wishlist
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" icon={<Download className="w-4 h-4" />}>
            Export CSV
          </Button>
          <Button variant="primary" size="sm" icon={<Plus className="w-4 h-4" />}>
            Add Plant
          </Button>
        </div>
      </div>
      
      {/* Filters & Search */}
      <div className="bg-[var(--bg-secondary)] rounded-[var(--radius-md)] p-6 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
            <input
              type="text"
              placeholder="Search plants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-[var(--muted-300)] rounded-[var(--radius-md)] focus:outline-none focus:ring-2 focus:ring-[var(--green-600)] bg-[var(--bg-primary)]"
            />
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2.5 rounded-[var(--radius-sm)] transition-colors ${
                viewMode === 'grid' ? 'bg-[var(--green-100)] text-[var(--green-700)]' : 'hover:bg-[var(--bg-tertiary)]'
              }`}
              aria-label="Grid view"
            >
              <Grid3x3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2.5 rounded-[var(--radius-sm)] transition-colors ${
                viewMode === 'list' ? 'bg-[var(--green-100)] text-[var(--green-700)]' : 'hover:bg-[var(--bg-tertiary)]'
              }`}
              aria-label="List view"
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[var(--text-muted)]" />
            <span className="text-sm text-[var(--text-muted)]">Filters:</span>
          </div>
          
          <select
            value={filterOwnership}
            onChange={(e) => setFilterOwnership(e.target.value as any)}
            className="px-4 py-2 border border-[var(--muted-300)] rounded-[var(--radius-sm)] text-sm bg-[var(--bg-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--green-600)]"
          >
            <option value="all">All Plants</option>
            <option value="owned">Owned</option>
            <option value="wishlist">Wishlist</option>
          </select>
          
          <select
            value={filterSun}
            onChange={(e) => setFilterSun(e.target.value as any)}
            className="px-4 py-2 border border-[var(--muted-300)] rounded-[var(--radius-sm)] text-sm bg-[var(--bg-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--green-600)]"
          >
            <option value="all">All Sun Levels</option>
            <option value="high">High Sun</option>
            <option value="medium">Medium Sun</option>
            <option value="low">Low Sun</option>
          </select>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-4 py-2 border border-[var(--muted-300)] rounded-[var(--radius-sm)] text-sm bg-[var(--bg-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--green-600)]"
          >
            <option value="name">Sort: Name</option>
            <option value="health">Sort: Health</option>
            <option value="nextWater">Sort: Next Water</option>
            <option value="points">Sort: Points</option>
          </select>
        </div>
      </div>
      
      {/* Plants Display */}
      {filteredPlants.length === 0 ? (
        <div className="bg-[var(--bg-secondary)] rounded-[var(--radius-lg)] p-16 text-center">
          <Sprout className="w-16 h-16 mx-auto mb-4 text-[var(--green-600)]" />
          <h3 className="mb-2">No plants found</h3>
          <p className="text-[var(--text-muted)] mb-6">
            {searchTerm || filterOwnership !== 'all' || filterSun !== 'all'
              ? 'Try adjusting your filters'
              : 'Your balcony is ready. Add a plant to begin tracking water & care.'}
          </p>
          <Button variant="primary" icon={<Plus className="w-5 h-5" />}>
            Add Your First Plant
          </Button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlants.map(plant => (
            <PlantCard
              key={plant.id}
              plant={plant}
              variant="medium"
              onWater={onWaterPlant}
              onClick={() => onNavigate('plant-detail', plant.id)}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredPlants.map(plant => (
            <PlantCard
              key={plant.id}
              plant={plant}
              variant="small"
              onWater={onWaterPlant}
              onClick={() => onNavigate('plant-detail', plant.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}