import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card } from './Card';
import { Button } from './Button';
import type { WaterSavingsData } from '../types';

interface WaterWasteGraphProps {
  data: WaterSavingsData[];
}

export function WaterWasteGraph({ data }: WaterWasteGraphProps) {
  const [timeframe, setTimeframe] = useState<'day' | 'week' | 'month'>('week');
  
  const totalSaved = data.reduce((sum, d) => sum + d.saved, 0);
  const avgSaved = totalSaved / data.length;
  const overwaterEvents = data.filter(d => d.saved < 0).length;
  
  const processedData = data.map(d => ({
    ...d,
    overwater: d.actual > d.recommended ? d.actual - d.recommended : 0,
    efficient: d.actual <= d.recommended ? d.actual : d.recommended,
    date: new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
  }));
  
  return (
    <Card paper className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="mb-2">Watering Efficiency</h3>
          <p className="text-sm text-[var(--text-muted)]">Track your water usage vs recommendations</p>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant={timeframe === 'day' ? 'primary' : 'ghost'} 
            size="sm"
            onClick={() => setTimeframe('day')}
          >
            Day
          </Button>
          <Button 
            variant={timeframe === 'week' ? 'primary' : 'ghost'} 
            size="sm"
            onClick={() => setTimeframe('week')}
          >
            Week
          </Button>
          <Button 
            variant={timeframe === 'month' ? 'primary' : 'ghost'} 
            size="sm"
            onClick={() => setTimeframe('month')}
          >
            Month
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-[var(--green-100)] rounded-[var(--radius-md)] p-5">
          <p className="text-sm text-[var(--green-700)] mb-1">Total Saved</p>
          <p className="text-2xl text-[var(--green-700)]">{totalSaved.toFixed(1)} mL</p>
        </div>
        <div className="bg-[var(--muted-200)] rounded-[var(--radius-md)] p-5">
          <p className="text-sm text-[var(--text-secondary)] mb-1">Avg Saved/Day</p>
          <p className="text-2xl text-[var(--text-primary)]">{avgSaved.toFixed(1)} mL</p>
        </div>
        <div className="bg-[var(--terracotta-100)] rounded-[var(--radius-md)] p-5">
          <p className="text-sm text-[var(--terracotta-700)] mb-1">Overwater Events</p>
          <p className="text-2xl text-[var(--terracotta-700)]">{overwaterEvents}</p>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={processedData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorEfficient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--green-600)" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="var(--green-600)" stopOpacity={0.05}/>
            </linearGradient>
            <linearGradient id="colorOverwater" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--terracotta-600)" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="var(--terracotta-600)" stopOpacity={0.05}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--muted-300)" />
          <XAxis 
            dataKey="date" 
            stroke="var(--text-muted)"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="var(--text-muted)"
            style={{ fontSize: '12px' }}
            label={{ value: 'mL', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'var(--bg-secondary)', 
              border: '1px solid var(--muted-300)',
              borderRadius: 'var(--radius-sm)',
              boxShadow: 'var(--shadow-card)'
            }}
            labelStyle={{ color: 'var(--text-primary)' }}
          />
          <Legend />
          <Area 
            type="monotone" 
            dataKey="recommended" 
            stroke="var(--gray-400)" 
            strokeWidth={2}
            strokeDasharray="5 5"
            fill="none"
            name="Recommended"
          />
          <Area 
            type="monotone" 
            dataKey="efficient" 
            stroke="var(--green-600)" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorEfficient)"
            name="Efficient Usage"
          />
          <Area 
            type="monotone" 
            dataKey="overwater" 
            stroke="var(--terracotta-600)" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorOverwater)"
            name="Overwatering"
            stackId="1"
          />
        </AreaChart>
      </ResponsiveContainer>
      
      <div className="mt-4 p-4 bg-[var(--muted-100)] rounded-[var(--radius-md)]">
        <p className="text-sm">
          <strong className="text-[var(--green-700)]">You saved {totalSaved.toFixed(1)} mL this week</strong> — 
          equivalent to {(totalSaved / 500).toFixed(1)} short showers. 
          {overwaterEvents > 0 && ` Reduce overwatering by ${((overwaterEvents / data.length) * 100).toFixed(0)}% for even better results!`}
        </p>
      </div>
    </Card>
  );
}