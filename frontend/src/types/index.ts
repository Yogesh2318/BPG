export type PlantOwnership = 'owned' | 'wishlist';

export type SunRequirement = 'high' | 'medium' | 'low';

export type WaterNeed = 'high' | 'medium' | 'low';

export type PlantHealth = number; // 0-100

export interface Plant {
  id: string;
  name: string;
  scientificName: string;
  ownership: PlantOwnership;
  health: PlantHealth;
  sunRequirement: SunRequirement;
  waterNeed: WaterNeed;
  imageUrl?: string;
  tags: string[];
  lastWatered?: Date;
  nextWaterDue?: Date;
  potSize: number; // liters
  soilType: string;
  microzoneId?: string;
  points: number;
  checklistItems: ChecklistItem[];
}

export interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  completedAt?: Date;
  points: number;
}

export interface WaterEvent {
  id: string;
  plantId: string;
  date: Date;
  amount: number; // mL
  notes?: string;
}

export interface Microzone {
  id: string;
  name: string;
  shadowPercentage: number;
  sunHoursPerDay: number;
  windExposure: 'low' | 'medium' | 'high';
  polygon: { x: number; y: number }[];
}

export interface PotMarker {
  id: string;
  x: number;
  y: number;
  plantId?: string;
  potSize: number;
  microzoneId?: string;
}

export interface BalconyMap {
  id: string;
  name: string;
  width: number;
  height: number;
  microzones: Microzone[];
  pots: PotMarker[];
}

export interface WaterSchedule {
  id: string;
  plantId: string;
  recurrence: 'daily' | 'every-2-days' | 'weekly' | 'custom';
  customDays?: number[];
  amount: number; // mL
  time: string;
  enabled: boolean;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  rarity: 'common' | 'rare' | 'legendary';
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
  points: number;
}

export interface UserProfile {
  id: string;
  name: string;
  points: number;
  streak: number;
  level: number;
  badges: Badge[];
  preferences: {
    units: 'liters' | 'gallons';
    theme: 'light' | 'dark' | 'high-contrast';
    accentColor: string;
    notifications: boolean;
    quietHours: { start: string; end: string };
    cloudSync: boolean;
  };
}

export interface WaterSavingsData {
  date: string;
  recommended: number;
  actual: number;
  saved: number;
}
