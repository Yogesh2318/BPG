import React from 'react';

interface PillProps {
  children: React.ReactNode;
  variant?: 'green' | 'blue' | 'terracotta' | 'gray';
  size?: 'sm' | 'md';
  className?: string;
}

export function Pill({ children, variant = 'green', size = 'sm', className = '' }: PillProps) {
  const variants = {
    green: 'bg-gradient-to-r from-[var(--green-100)] to-[var(--green-50)] text-[var(--green-700)] border-[var(--green-200)]/50',
    blue: 'bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 border-blue-200/50',
    terracotta: 'bg-gradient-to-r from-[var(--terracotta-100)] to-[var(--terracotta-50)] text-[var(--terracotta-700)] border-[var(--terracotta-200)]/50',
    gray: 'bg-gradient-to-r from-[var(--gray-100)] to-[var(--gray-50)] text-[var(--gray-700)] border-[var(--gray-200)]/50',
  };
  
  const sizes = {
    sm: 'px-3 py-1 text-xs',
    md: 'px-4 py-2 text-sm',
  };
  
  return (
    <span className={`inline-flex items-center rounded-full border font-medium shadow-sm ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </span>
  );
}