import React, { useRef, useEffect, useState } from 'react';
import { Undo, Redo, Save, Trash2, Sun, Circle, Square, Move, Lightbulb, Plus, Grid3x3, Play, Settings } from 'lucide-react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import type { BalconyMap, Microzone, PotMarker, Plant } from '../types';

interface SunlightMapProps {
  map: BalconyMap;
  plants: Plant[];
  onSaveMap: (map: BalconyMap) => void;
}

export function SunlightMap({ map, plants, onSaveMap }: SunlightMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tool, setTool] = useState<'select' | 'zone' | 'pot'>('select');
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [selectedPot, setSelectedPot] = useState<string | null>(null);
  const [showGrid, setShowGrid] = useState(true);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationTime, setSimulationTime] = useState(0);
  const [draggingPot, setDraggingPot] = useState<string | null>(null);
  const [localMap, setLocalMap] = useState(map);
  
  useEffect(() => {
    drawCanvas();
  }, [localMap, showGrid, simulationTime, selectedZone, selectedPot]);
  
  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--bg-primary');
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid
    if (showGrid) {
      ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--muted-300');
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 50) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 50) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    }
    
    // Draw microzones
    localMap.microzones.forEach(zone => {
      ctx.fillStyle = zone.id === selectedZone 
        ? 'rgba(47, 122, 74, 0.3)' 
        : `rgba(255, 193, 7, ${0.2 + (zone.sunHoursPerDay / 12) * 0.3})`;
      ctx.strokeStyle = zone.id === selectedZone ? '#2F7A4A' : '#D6D1CA';
      ctx.lineWidth = zone.id === selectedZone ? 3 : 2;
      
      ctx.beginPath();
      zone.polygon.forEach((point, i) => {
        if (i === 0) {
          ctx.moveTo(point.x, point.y);
        } else {
          ctx.lineTo(point.x, point.y);
        }
      });
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      
      // Draw zone label
      const centerX = zone.polygon.reduce((sum, p) => sum + p.x, 0) / zone.polygon.length;
      const centerY = zone.polygon.reduce((sum, p) => sum + p.y, 0) / zone.polygon.length;
      ctx.fillStyle = '#2F7A4A';
      ctx.font = '12px Inter';
      ctx.textAlign = 'center';
      ctx.fillText(`${zone.sunHoursPerDay}h sun`, centerX, centerY);
    });
    
    // Draw sun simulation overlay
    if (isSimulating) {
      const sunAngle = (simulationTime / 24) * Math.PI * 2 - Math.PI / 2;
      const sunX = canvas.width / 2 + Math.cos(sunAngle) * (canvas.width * 0.4);
      const sunY = 50;
      
      // Draw sun
      ctx.fillStyle = '#FFA500';
      ctx.beginPath();
      ctx.arc(sunX, sunY, 20, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw time
      ctx.fillStyle = '#000';
      ctx.font = '14px Inter';
      ctx.textAlign = 'center';
      ctx.fillText(`${simulationTime.toFixed(0)}:00`, sunX, sunY + 40);
    }
    
    // Draw pots
    localMap.pots.forEach(pot => {
      const plant = plants.find(p => p.id === pot.plantId);
      const isPotSelected = pot.id === selectedPot;
      
      ctx.fillStyle = isPotSelected ? '#C4563A' : '#8B7355';
      ctx.strokeStyle = isPotSelected ? '#A13D28' : '#6B5945';
      ctx.lineWidth = isPotSelected ? 3 : 2;
      
      ctx.beginPath();
      ctx.arc(pot.x, pot.y, 20, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      
      // Draw plant emoji if assigned
      if (plant) {
        ctx.font = '24px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('🌿', pot.x, pot.y);
      } else {
        ctx.font = '20px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('🪴', pot.x, pot.y);
      }
    });
  };
  
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    if (tool === 'pot') {
      // Add new pot
      const newPot: PotMarker = {
        id: `pot-${Date.now()}`,
        x: Math.round(x / 50) * 50, // Snap to grid
        y: Math.round(y / 50) * 50,
        potSize: 2,
      };
      setLocalMap({ ...localMap, pots: [...localMap.pots, newPot] });
    } else {
      // Check if clicked on pot
      const clickedPot = localMap.pots.find(pot => {
        const dist = Math.sqrt((pot.x - x) ** 2 + (pot.y - y) ** 2);
        return dist < 20;
      });
      
      if (clickedPot) {
        setSelectedPot(clickedPot.id);
        setSelectedZone(null);
      } else {
        // Check if clicked in zone
        const clickedZone = localMap.microzones.find(zone => {
          return isPointInPolygon({ x, y }, zone.polygon);
        });
        
        if (clickedZone) {
          setSelectedZone(clickedZone.id);
          setSelectedPot(null);
        }
      }
    }
  };
  
  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const clickedPot = localMap.pots.find(pot => {
      const dist = Math.sqrt((pot.x - x) ** 2 + (pot.y - y) ** 2);
      return dist < 20;
    });
    
    if (clickedPot) {
      setDraggingPot(clickedPot.id);
    }
  };
  
  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!draggingPot) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = Math.round((e.clientX - rect.left) / 50) * 50; // Snap to grid
    const y = Math.round((e.clientY - rect.top) / 50) * 50;
    
    setLocalMap({
      ...localMap,
      pots: localMap.pots.map(pot => 
        pot.id === draggingPot ? { ...pot, x, y } : pot
      )
    });
  };
  
  const handleCanvasMouseUp = () => {
    setDraggingPot(null);
  };
  
  const isPointInPolygon = (point: { x: number; y: number }, polygon: { x: number; y: number }[]) => {
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i].x, yi = polygon[i].y;
      const xj = polygon[j].x, yj = polygon[j].y;
      
      const intersect = ((yi > point.y) !== (yj > point.y))
        && (point.x < (xj - xi) * (point.y - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
    }
    return inside;
  };
  
  const runSimulation = () => {
    setIsSimulating(true);
    let time = 0;
    const interval = setInterval(() => {
      time += 0.5;
      setSimulationTime(time);
      if (time >= 24) {
        clearInterval(interval);
        setIsSimulating(false);
        setSimulationTime(0);
      }
    }, 100);
  };
  
  const deleteSelected = () => {
    if (selectedPot) {
      setLocalMap({
        ...localMap,
        pots: localMap.pots.filter(p => p.id !== selectedPot)
      });
      setSelectedPot(null);
    }
  };
  
  const selectedZoneData = localMap.microzones.find(z => z.id === selectedZone);
  const selectedPotData = localMap.pots.find(p => p.id === selectedPot);
  
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Sun className="w-6 h-6 text-yellow-600" />
            <h2>Sunlight Map Editor</h2>
          </div>
          <p className="text-[var(--text-muted)]">Design your balcony microzones and place pots</p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" icon={<Undo className="w-4 h-4" />} />
          <Button variant="ghost" size="sm" icon={<Redo className="w-4 h-4" />} />
          <Button 
            variant="primary" 
            size="sm" 
            icon={<Save className="w-4 h-4" />}
            onClick={() => onSaveMap(localMap)}
          >
            Save Map
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Toolbar */}
        <Card paper className="p-6 h-fit">
          <div className="flex items-center gap-2 mb-4">
            <Settings className="w-5 h-5 text-[var(--green-700)]" />
            <h4>Tools</h4>
          </div>
          
          <div className="space-y-2 mb-6">
            <button
              onClick={() => setTool('select')}
              className={`w-full flex items-center gap-3 p-3 rounded-[var(--radius-md)] transition-all ${
                tool === 'select' 
                  ? 'bg-[var(--green-100)] text-[var(--green-700)]' 
                  : 'hover:bg-[var(--bg-tertiary)]'
              }`}
            >
              <Circle className="w-5 h-5" />
              <span>Select</span>
            </button>
            <button
              onClick={() => setTool('zone')}
              className={`w-full flex items-center gap-3 p-3 rounded-[var(--radius-md)] transition-all ${
                tool === 'zone' 
                  ? 'bg-[var(--green-100)] text-[var(--green-700)]' 
                  : 'hover:bg-[var(--bg-tertiary)]'
              }`}
            >
              <Square className="w-5 h-5" />
              <span>Draw Zone</span>
            </button>
            <button
              onClick={() => setTool('pot')}
              className={`w-full flex items-center gap-3 p-3 rounded-[var(--radius-md)] transition-all ${
                tool === 'pot' 
                  ? 'bg-[var(--green-100)] text-[var(--green-700)]' 
                  : 'hover:bg-[var(--bg-tertiary)]'
              }`}
            >
              <Plus className="w-5 h-5" />
              <span>Add Pot</span>
            </button>
          </div>
          
          <div className="space-y-3 mb-6">
            <button
              onClick={() => setShowGrid(!showGrid)}
              className="w-full flex items-center justify-between p-3 rounded-[var(--radius-md)] bg-[var(--bg-tertiary)]"
            >
              <div className="flex items-center gap-3">
                <Grid3x3 className="w-5 h-5" />
                <span>Show Grid</span>
              </div>
              <div className={`w-10 h-6 rounded-full transition-colors ${showGrid ? 'bg-[var(--green-600)]' : 'bg-[var(--gray-400)]'}`}>
                <div className={`w-4 h-4 bg-white rounded-full m-1 transition-transform ${showGrid ? 'translate-x-4' : ''}`} />
              </div>
            </button>
            
            <Button 
              variant="secondary" 
              className="w-full"
              icon={<Play className="w-4 h-4" />}
              onClick={runSimulation}
              disabled={isSimulating}
            >
              {isSimulating ? 'Simulating...' : 'Simulate Sun'}
            </Button>
            
            {(selectedPot || selectedZone) && (
              <Button 
                variant="danger" 
                className="w-full"
                icon={<Trash2 className="w-4 h-4" />}
                onClick={deleteSelected}
              >
                Delete Selected
              </Button>
            )}
          </div>
          
          <div className="pt-4 border-t border-[var(--muted-300)]">
            <div className="flex items-center gap-2 mb-3 px-1">
              <Lightbulb className="w-4 h-4 text-[var(--green-700)]" />
              <p className="text-sm text-[var(--text-muted)]">Tips:</p>
            </div>
            <ul className="text-sm text-[var(--text-muted)] space-y-2 px-2">
              <li>• Click to add pots</li>
              <li>• Drag pots to move</li>
              <li>• Zones snap to grid</li>
              <li>• Simulate to see sun path</li>
            </ul>
          </div>
        </Card>
        
        {/* Canvas */}
        <Card paper className="lg:col-span-2 p-6">
          <canvas
            ref={canvasRef}
            width={600}
            height={400}
            className="w-full border border-[var(--muted-300)] rounded-[var(--radius-md)] cursor-crosshair"
            onClick={handleCanvasClick}
            onMouseDown={handleCanvasMouseDown}
            onMouseMove={handleCanvasMouseMove}
            onMouseUp={handleCanvasMouseUp}
            onMouseLeave={handleCanvasMouseUp}
          />
          
          <div className="mt-4 flex items-center justify-between">
            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-sm bg-yellow-300 opacity-50" />
                <span className="text-[var(--text-muted)]">High Sun</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-sm bg-yellow-300 opacity-30" />
                <span className="text-[var(--text-muted)]">Partial Sun</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-sm bg-yellow-300 opacity-20" />
                <span className="text-[var(--text-muted)]">Shade</span>
              </div>
            </div>
            <p className="text-sm text-[var(--text-muted)]">
              {localMap.pots.length} pots • {localMap.microzones.length} zones
            </p>
          </div>
        </Card>
        
        {/* Properties Panel */}
        <Card paper className="p-6 h-fit">
          <div className="flex items-center gap-2 mb-4">
            <Settings className="w-5 h-5 text-[var(--green-700)]" />
            <h4>Properties</h4>
          </div>
          
          {selectedZoneData ? (
            <div className="space-y-4">
              <div>
                <label className="text-sm text-[var(--text-muted)] mb-2 block">Zone Name</label>
                <input
                  type="text"
                  value={selectedZoneData.name}
                  className="w-full px-3 py-2 border border-[var(--muted-300)] rounded-[var(--radius-md)] focus:outline-none focus:ring-2 focus:ring-[var(--green-600)]"
                  readOnly
                />
              </div>
              
              <div>
                <label className="text-sm text-[var(--text-muted)] mb-2 block">Sun Hours/Day</label>
                <p className="text-2xl text-[var(--green-700)]">{selectedZoneData.sunHoursPerDay}h</p>
              </div>
              
              <div>
                <label className="text-sm text-[var(--text-muted)] mb-2 block">Shadow %</label>
                <p className="text-2xl">{selectedZoneData.shadowPercentage}%</p>
              </div>
              
              <div>
                <label className="text-sm text-[var(--text-muted)] mb-2 block">Wind Exposure</label>
                <p className="capitalize">{selectedZoneData.windExposure}</p>
              </div>
            </div>
          ) : selectedPotData ? (
            <div className="space-y-4">
              <div>
                <label className="text-sm text-[var(--text-muted)] mb-2 block">Pot ID</label>
                <p className="text-sm">{selectedPotData.id}</p>
              </div>
              
              <div>
                <label className="text-sm text-[var(--text-muted)] mb-2 block">Position</label>
                <p className="text-sm">X: {selectedPotData.x}, Y: {selectedPotData.y}</p>
              </div>
              
              <div>
                <label className="text-sm text-[var(--text-muted)] mb-2 block">Pot Size (L)</label>
                <input
                  type="number"
                  value={selectedPotData.potSize}
                  onChange={(e) => {
                    setLocalMap({
                      ...localMap,
                      pots: localMap.pots.map(p => 
                        p.id === selectedPotData.id ? { ...p, potSize: Number(e.target.value) } : p
                      )
                    });
                  }}
                  className="w-full px-3 py-2 border border-[var(--muted-300)] rounded-[var(--radius-md)] focus:outline-none focus:ring-2 focus:ring-[var(--green-600)]"
                />
              </div>
              
              {selectedPotData.plantId && (
                <div>
                  <label className="text-sm text-[var(--text-muted)] mb-2 block">Assigned Plant</label>
                  <p>{plants.find(p => p.id === selectedPotData.plantId)?.name || 'Unknown'}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-[var(--text-muted)]">Select a zone or pot to view properties</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}