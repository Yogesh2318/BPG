import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Lightbulb, Droplet, Leaf, Wind, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Card } from './Card';

interface CarouselItem {
  id: string;
  text: string;
  icon: string;
  points: number;
}

interface CarouselProps {
  items: CarouselItem[];
  autoplay?: boolean;
  interval?: number;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Lightbulb,
  Droplet,
  Leaf,
  Wind,
  Award,
};

export function Carousel({ items, autoplay = true, interval = 5000 }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  useEffect(() => {
    if (!autoplay || isPaused) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, interval);
    
    return () => clearInterval(timer);
  }, [autoplay, isPaused, interval, items.length]);
  
  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };
  
  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };
  
  const togglePlayPause = () => {
    setIsPaused(!isPaused);
  };
  
  const currentItem = items[currentIndex];
  const IconComponent = iconMap[currentItem.icon] || Lightbulb;
  
  return (
    <Card paper className="p-6 relative overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-[var(--green-700)]" />
          <h4>Garden Tips & Facts</h4>
        </div>
        <div className="flex gap-2">
          <button
            onClick={togglePlayPause}
            className="p-2 hover:bg-[var(--bg-tertiary)] rounded-[var(--radius-sm)] transition-colors"
            aria-label={isPaused ? 'Play' : 'Pause'}
          >
            {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
          </button>
          <button
            onClick={goToPrevious}
            className="p-2 hover:bg-[var(--bg-tertiary)] rounded-[var(--radius-sm)] transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={goToNext}
            className="p-2 hover:bg-[var(--bg-tertiary)] rounded-[var(--radius-sm)] transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="relative h-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentItem.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4, ease: [0.22, 0.9, 0.38, 1] }}
            className="absolute inset-0 flex items-center gap-4"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--green-100)] to-[var(--green-200)] flex items-center justify-center flex-shrink-0">
              <IconComponent className="w-8 h-8 text-[var(--green-700)]" />
            </div>
            <div className="flex-1">
              <p className="text-lg mb-2">{currentItem.text}</p>
              {currentItem.points > 0 && (
                <p className="text-sm text-[var(--green-700)]">Try this: +{currentItem.points} pts</p>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      
      <div className="flex gap-1.5 mt-4 justify-center">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1.5 rounded-full transition-all ${
              index === currentIndex 
                ? 'w-8 bg-[var(--green-600)]' 
                : 'w-1.5 bg-[var(--muted-300)]'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </Card>
  );
}