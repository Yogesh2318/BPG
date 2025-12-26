import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Edit, Trash2 } from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Pill } from '../components/Pill';
import type { WaterSchedule, Plant } from '../types';

interface SchedulerProps {
  schedules: WaterSchedule[];
  plants: Plant[];
  onAddSchedule: () => void;
  onEditSchedule: (scheduleId: string) => void;
  onDeleteSchedule: (scheduleId: string) => void;
}

export function Scheduler({ schedules, plants, onAddSchedule, onEditSchedule, onDeleteSchedule }: SchedulerProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'week' | 'month'>('week');
  
  const getDaysInWeek = (date: Date) => {
    const start = new Date(date);
    start.setDate(start.getDate() - start.getDay());
    return Array.from({ length: 7 }, (_, i) => {
      const day = new Date(start);
      day.setDate(start.getDate() + i);
      return day;
    });
  };
  
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDay = firstDay.getDay();
    
    const days = [];
    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };
  
  const getSchedulesForDay = (date: Date) => {
    return schedules.filter(schedule => {
      if (!schedule.enabled) return false;
      
      const dayOfWeek = date.getDay();
      
      switch (schedule.recurrence) {
        case 'daily':
          return true;
        case 'every-2-days':
          const daysSinceEpoch = Math.floor(date.getTime() / (1000 * 60 * 60 * 24));
          return daysSinceEpoch % 2 === 0;
        case 'weekly':
          return dayOfWeek === 1; // Monday
        case 'custom':
          return schedule.customDays?.includes(dayOfWeek);
        default:
          return false;
      }
    });
  };
  
  const goToPrevious = () => {
    const newDate = new Date(currentDate);
    if (view === 'week') {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setMonth(newDate.getMonth() - 1);
    }
    setCurrentDate(newDate);
  };
  
  const goToNext = () => {
    const newDate = new Date(currentDate);
    if (view === 'week') {
      newDate.setDate(newDate.getDate() + 7);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };
  
  const goToToday = () => {
    setCurrentDate(new Date());
  };
  
  const days = view === 'week' ? getDaysInWeek(currentDate) : getDaysInMonth(currentDate);
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="mb-2">📅 Watering Scheduler</h2>
          <p className="text-[var(--text-muted)]">
            {schedules.filter(s => s.enabled).length} active schedules • {schedules.length} total
          </p>
        </div>
        <Button variant="primary" size="sm" icon={<Plus className="w-4 h-4" />} onClick={onAddSchedule}>
          Add Schedule
        </Button>
      </div>
      
      {/* Calendar Header */}
      <Card paper className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={goToPrevious}
              className="p-2 hover:bg-[var(--bg-tertiary)] rounded-[var(--radius-sm)] transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h3>
              {view === 'week' 
                ? `Week of ${currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
                : currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h3>
            <button
              onClick={goToNext}
              className="p-2 hover:bg-[var(--bg-tertiary)] rounded-[var(--radius-sm)] transition-colors"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={goToToday}>
              Today
            </Button>
            <Button 
              variant={view === 'week' ? 'primary' : 'ghost'} 
              size="sm"
              onClick={() => setView('week')}
            >
              Week
            </Button>
            <Button 
              variant={view === 'month' ? 'primary' : 'ghost'} 
              size="sm"
              onClick={() => setView('month')}
            >
              Month
            </Button>
          </div>
        </div>
        
        {/* Calendar Grid */}
        <div className={view === 'week' ? 'grid grid-cols-7 gap-2' : 'grid grid-cols-7 gap-1'}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center py-2 text-sm text-[var(--text-muted)]">
              {day}
            </div>
          ))}
          
          {days.map((day, index) => {
            if (!day) {
              return <div key={`empty-${index}`} className="aspect-square" />;
            }
            
            const isToday = day.toDateString() === new Date().toDateString();
            const daySchedules = getSchedulesForDay(day);
            
            return (
              <div
                key={day.toISOString()}
                className={`aspect-square border border-[var(--muted-300)] rounded-[var(--radius-md)] p-2 ${
                  isToday ? 'bg-[var(--green-100)] border-[var(--green-600)]' : 'bg-[var(--bg-secondary)]'
                } hover:shadow-md transition-all cursor-pointer`}
              >
                <div className="flex flex-col h-full">
                  <span className={`text-sm mb-1 ${isToday ? 'text-[var(--green-700)]' : ''}`}>
                    {day.getDate()}
                  </span>
                  <div className="flex-1 space-y-1 overflow-y-auto">
                    {daySchedules.slice(0, view === 'week' ? 5 : 2).map(schedule => {
                      const plant = plants.find(p => p.id === schedule.plantId);
                      return (
                        <div
                          key={schedule.id}
                          className="text-xs px-2 py-1.5 bg-blue-100 text-blue-700 rounded truncate"
                          title={`${plant?.name} - ${schedule.amount}mL at ${schedule.time}`}
                        >
                          💧 {plant?.name.substring(0, 8)}
                        </div>
                      );
                    })}
                    {daySchedules.length > (view === 'week' ? 5 : 2) && (
                      <div className="text-xs text-[var(--text-muted)] px-2">
                        +{daySchedules.length - (view === 'week' ? 5 : 2)} more
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
      
      {/* Schedule List */}
      <div>
        <h3 className="mb-4">All Schedules</h3>
        <div className="space-y-3">
          {schedules.length === 0 ? (
            <Card className="p-12 text-center">
              <div className="text-6xl mb-4">📅</div>
              <h3 className="mb-2">No schedules yet</h3>
              <p className="text-[var(--text-muted)] mb-6">Create your first watering schedule to automate plant care</p>
              <Button variant="primary" icon={<Plus className="w-5 h-5" />} onClick={onAddSchedule}>
                Create Schedule
              </Button>
            </Card>
          ) : (
            schedules.map(schedule => {
              const plant = plants.find(p => p.id === schedule.plantId);
              const recurrenceLabel = {
                'daily': 'Daily',
                'every-2-days': 'Every 2 days',
                'weekly': 'Weekly',
                'custom': 'Custom',
              }[schedule.recurrence];
              
              return (
                <Card key={schedule.id} hover paper className="p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xl">
                        💧
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4>{plant?.name || 'Unknown Plant'}</h4>
                          <Pill variant={schedule.enabled ? 'green' : 'gray'} size="sm">
                            {schedule.enabled ? 'Active' : 'Disabled'}
                          </Pill>
                        </div>
                        <p className="text-sm text-[var(--text-muted)]">
                          {recurrenceLabel} • {schedule.amount} mL • {schedule.time}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => onEditSchedule(schedule.id)}
                        className="p-2 hover:bg-[var(--bg-tertiary)] rounded-[var(--radius-sm)] transition-colors"
                        aria-label="Edit schedule"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDeleteSchedule(schedule.id)}
                        className="p-2 hover:bg-[var(--terracotta-100)] text-[var(--terracotta-600)] rounded-[var(--radius-sm)] transition-colors"
                        aria-label="Delete schedule"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </Card>
              );
            })
          )}
        </div>
      </div>
      
      {/* Smart Suggestions */}
      {schedules.length > 0 && (
        <Card paper className="p-6">
          <h4 className="mb-4">💡 Smart Suggestions</h4>
          <div className="space-y-3">
            <div className="p-5 bg-[var(--green-100)] rounded-[var(--radius-md)]">
              <p className="text-sm text-[var(--green-700)]">
                <strong>Tip:</strong> Water high-sun plants in early morning (6-8 AM) for best results
              </p>
            </div>
            <div className="p-5 bg-blue-100 rounded-[var(--radius-md)]">
              <p className="text-sm text-blue-700">
                <strong>Suggestion:</strong> Group similar watering schedules to save time
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}