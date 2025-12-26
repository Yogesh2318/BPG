import React from 'react';
import { Card } from './Card';
import { HelpCircle } from 'lucide-react';

interface AnalyticsCardProps {
  title: string;
  value: string | number;
  change?: number;
  unit?: string;
  helpText?: string;
  icon?: React.ReactNode;
  color?: 'green' | 'terracotta' | 'blue' | 'gray';
}

export function AnalyticsCard({ 
  title, 
  value, 
  change, 
  unit, 
  helpText,
  icon,
  color = 'green' 
}: AnalyticsCardProps) {
  const colors = {
    green: 'from-[var(--green-100)] via-[var(--green-50)] to-white',
    terracotta: 'from-[var(--terracotta-100)] via-[var(--terracotta-50)] to-white',
    blue: 'from-blue-100 via-blue-50 to-white',
    gray: 'from-[var(--muted-200)] via-[var(--muted-100)] to-white',
  };
  
  const textColors = {
    green: 'text-[var(--green-700)]',
    terracotta: 'text-[var(--terracotta-700)]',
    blue: 'text-blue-700',
    gray: 'text-[var(--gray-700)]',
  };

  const borderColors = {
    green: 'border-[var(--green-200)]/40',
    terracotta: 'border-[var(--terracotta-200)]/40',
    blue: 'border-blue-200/40',
    gray: 'border-[var(--gray-200)]/40',
  };
  
  return (
    <Card className={`p-6 bg-gradient-to-br ${colors[color]} border ${borderColors[color]} overflow-hidden relative group hover:shadow-lg transition-all`}>
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/50 to-transparent rounded-full blur-2xl pointer-events-none" />
      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <p className="text-sm text-[var(--text-secondary)] font-medium">{title}</p>
          {helpText && (
            <div className="group/tooltip relative">
              <HelpCircle className="w-4 h-4 text-[var(--text-muted)] cursor-help hover:text-[var(--text-secondary)] transition-colors" />
              <div className="absolute right-0 top-6 w-48 bg-white border border-[var(--muted-300)] rounded-[var(--radius-md)] p-3 shadow-lg opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all z-10">
                <p className="text-xs text-[var(--text-secondary)]">{helpText}</p>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex items-end justify-between">
          <div>
            <p className={`text-4xl mb-2 font-bold ${textColors[color]}`}>
              {value}
              {unit && <span className="text-xl ml-1 font-semibold">{unit}</span>}
            </p>
            {change !== undefined && (
              <div className={`text-xs font-medium px-2 py-1 rounded-full inline-flex items-center gap-1 ${change >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                <span>{change >= 0 ? '↑' : '↓'}</span>
                <span>{Math.abs(change)}%</span>
              </div>
            )}
          </div>
          {icon && (
            <div className={`${textColors[color]} opacity-15 group-hover:opacity-25 transition-opacity`}>
              {icon}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}