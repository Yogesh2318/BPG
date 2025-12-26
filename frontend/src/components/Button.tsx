import React from 'react';
import { motion } from 'motion/react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  icon,
  className = '',
  disabled,
  ...props 
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center gap-2 rounded-[var(--radius-md)] font-semibold transition-all duration-[var(--duration-small)] focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95';
  
  const variants = {
    primary: 'bg-gradient-to-r from-[var(--green-600)] to-[var(--green-700)] text-white hover:from-[var(--green-700)] hover:to-[var(--green-600)] focus:ring-[var(--green-400)] shadow-md hover:shadow-lg hover:scale-[1.02]',
    secondary: 'bg-gradient-to-r from-[var(--terracotta-600)] to-[var(--terracotta-700)] text-white hover:from-[var(--terracotta-700)] hover:to-[var(--terracotta-600)] focus:ring-[var(--terracotta-300)] shadow-md hover:shadow-lg hover:scale-[1.02]',
    ghost: 'bg-transparent text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--green-600)] focus:ring-[var(--gray-300)]',
    danger: 'bg-gradient-to-r from-[var(--terracotta-600)] to-[var(--terracotta-700)] text-white hover:from-[var(--terracotta-700)] hover:to-[var(--terracotta-600)] focus:ring-[var(--terracotta-300)] shadow-md',
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };
  
  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed hover:scale-100' : '';
  
  return (
    <motion.button
      whileTap={disabled ? {} : { scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${disabledStyles} ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="inline-flex">{icon}</span>}
      {children}
    </motion.button>
  );
}