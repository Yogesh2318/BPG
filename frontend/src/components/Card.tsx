import React from 'react';
import { motion } from 'motion/react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  paper?: boolean;
  glass?: boolean;
  glow?: boolean;
  onClick?: () => void;
}

export function Card({ children, className = '', hover = false, paper = false, glass = false, glow = false, onClick }: CardProps) {
  const baseStyles = glass 
    ? 'backdrop-blur-xl bg-[var(--bg-glass)] border border-white/20 rounded-[var(--radius-md)] shadow-[var(--shadow-card)] transition-all duration-[var(--duration-small)]'
    : 'bg-[var(--bg-secondary)] rounded-[var(--radius-md)] shadow-[var(--shadow-card)] border border-[var(--muted-200)]/30 transition-all duration-[var(--duration-small)]';
  const hoverStyles = hover ? 'cursor-pointer hover:shadow-[var(--shadow-hover)] hover:-translate-y-1 hover:border-[var(--green-200)]' : '';
  const paperStyles = paper ? 'paper-texture' : '';
  const glowStyles = glow ? 'shadow-[var(--shadow-glow)]' : '';
  
  const Component = hover ? motion.div : 'div';
  
  return (
    <Component
      className={`${baseStyles} ${hoverStyles} ${paperStyles} ${glowStyles} ${className}`}
      onClick={onClick}
      {...(hover ? { 
        whileHover: { y: -6, scale: 1.01 },
        transition: { type: 'spring', stiffness: 300, damping: 20 }
      } : {})}
    >
      {children}
    </Component>
  );
}