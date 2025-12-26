import type { Plant, WaterEvent, Badge, UserProfile, WaterSavingsData, BalconyMap, WaterSchedule } from '../types';

export const demoPlants: Plant[] = [
  {
    id: '1',
    name: 'Snake Plant',
    scientificName: 'Sansevieria trifasciata',
    ownership: 'owned',
    health: 92,
    sunRequirement: 'low',
    waterNeed: 'low',
    tags: ['low-water', 'air-purifying', 'beginner'],
    lastWatered: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    nextWaterDue: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
    potSize: 2,
    soilType: 'well-draining',
    points: 120,
    checklistItems: [
      { id: 'c1', title: 'Check placement', description: 'Ensure indirect light', completed: true, completedAt: new Date(), points: 5 },
      { id: 'c2', title: 'Inspect soil', description: 'Soil should be dry between waterings', completed: true, points: 5 },
      { id: 'c3', title: 'Prune dead leaves', description: 'Remove any yellow or brown leaves', completed: false, points: 5 },
    ]
  },
  {
    id: '2',
    name: 'Money Plant',
    scientificName: 'Epipremnum aureum',
    ownership: 'owned',
    health: 88,
    sunRequirement: 'medium',
    waterNeed: 'medium',
    tags: ['air-purifying', 'trailing', 'easy-care'],
    lastWatered: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    nextWaterDue: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    potSize: 1.5,
    soilType: 'standard potting',
    points: 95,
    checklistItems: [
      { id: 'c4', title: 'Check vines', description: 'Trim leggy growth', completed: false, points: 5 },
      { id: 'c5', title: 'Water check', description: 'Top inch of soil dry', completed: true, completedAt: new Date(), points: 5 },
    ]
  },
  {
    id: '3',
    name: 'Lavender',
    scientificName: 'Lavandula',
    ownership: 'wishlist',
    health: 0,
    sunRequirement: 'high',
    waterNeed: 'low',
    tags: ['native', 'aromatic', 'drought-tolerant'],
    potSize: 3,
    soilType: 'sandy',
    points: 0,
    checklistItems: []
  },
  {
    id: '4',
    name: 'Basil',
    scientificName: 'Ocimum basilicum',
    ownership: 'owned',
    health: 85,
    sunRequirement: 'high',
    waterNeed: 'high',
    tags: ['edible', 'aromatic', 'annual'],
    lastWatered: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    nextWaterDue: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    potSize: 2,
    soilType: 'rich potting',
    points: 80,
    checklistItems: [
      { id: 'c6', title: 'Pinch flowers', description: 'Remove flower buds for bushier growth', completed: false, points: 5 },
      { id: 'c7', title: 'Check moisture', description: 'Keep soil consistently moist', completed: true, completedAt: new Date(), points: 5 },
    ]
  },
];

export const demoWaterEvents: WaterEvent[] = [
  { id: 'w1', plantId: '1', date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), amount: 300 },
  { id: 'w2', plantId: '1', date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), amount: 200 },
  { id: 'w3', plantId: '1', date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), amount: 450 },
  { id: 'w4', plantId: '1', date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), amount: 300 },
  { id: 'w5', plantId: '1', date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), amount: 0 },
  { id: 'w6', plantId: '1', date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), amount: 200 },
  { id: 'w7', plantId: '1', date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), amount: 100 },
  
  { id: 'w8', plantId: '2', date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), amount: 250 },
  { id: 'w9', plantId: '2', date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), amount: 300 },
  { id: 'w10', plantId: '2', date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), amount: 200 },
  { id: 'w11', plantId: '2', date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), amount: 250 },
  
  { id: 'w12', plantId: '4', date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), amount: 400 },
  { id: 'w13', plantId: '4', date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), amount: 350 },
  { id: 'w14', plantId: '4', date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), amount: 400 },
  { id: 'w15', plantId: '4', date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), amount: 300 },
  { id: 'w16', plantId: '4', date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), amount: 350 },
  { id: 'w17', plantId: '4', date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), amount: 400 },
  { id: 'w18', plantId: '4', date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), amount: 300 },
];

export const demoBadges: Badge[] = [
  {
    id: 'b1',
    name: 'First 3 Plants',
    description: 'Registered your first 3 plants',
    rarity: 'common',
    icon: 'Sprout',
    unlocked: true,
    unlockedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    points: 50
  },
  {
    id: 'b2',
    name: '7 Day Saver',
    description: 'Saved water for 7 consecutive days',
    rarity: 'rare',
    icon: 'Droplets',
    unlocked: true,
    unlockedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    points: 100
  },
  {
    id: 'b3',
    name: '10L Milestone',
    description: 'Saved 10 liters of water',
    rarity: 'rare',
    icon: 'Trophy',
    unlocked: false,
    points: 150
  },
  {
    id: 'b4',
    name: 'Native Champion',
    description: 'Grow 3 native plants',
    rarity: 'legendary',
    icon: 'TreeDeciduous',
    unlocked: false,
    points: 200
  },
];

export const demoUserProfile: UserProfile = {
  id: 'user1',
  name: 'Sumeet',
  points: 420,
  streak: 6,
  level: 5,
  badges: demoBadges,
  preferences: {
    units: 'liters',
    theme: 'light',
    accentColor: '#2F7A4A',
    notifications: true,
    quietHours: { start: '22:00', end: '07:00' },
    cloudSync: false,
  }
};

export const demoWaterSavingsData: WaterSavingsData[] = [
  { date: '2025-12-18', recommended: 150, actual: 130, saved: 20 },
  { date: '2025-12-19', recommended: 150, actual: 120, saved: 30 },
  { date: '2025-12-20', recommended: 150, actual: 180, saved: -30 },
  { date: '2025-12-21', recommended: 150, actual: 140, saved: 10 },
  { date: '2025-12-22', recommended: 150, actual: 100, saved: 50 },
  { date: '2025-12-23', recommended: 150, actual: 135, saved: 15 },
  { date: '2025-12-24', recommended: 150, actual: 125, saved: 25 },
];

export const demoBalconyMap: BalconyMap = {
  id: 'map1',
  name: 'Main Balcony',
  width: 600,
  height: 400,
  microzones: [
    {
      id: 'mz1',
      name: 'East Corner - Morning Sun',
      shadowPercentage: 30,
      sunHoursPerDay: 6,
      windExposure: 'low',
      polygon: [
        { x: 50, y: 50 },
        { x: 200, y: 50 },
        { x: 200, y: 200 },
        { x: 50, y: 200 },
      ]
    },
    {
      id: 'mz2',
      name: 'Shaded Area',
      shadowPercentage: 70,
      sunHoursPerDay: 3,
      windExposure: 'medium',
      polygon: [
        { x: 220, y: 50 },
        { x: 380, y: 50 },
        { x: 380, y: 200 },
        { x: 220, y: 200 },
      ]
    },
  ],
  pots: [
    { id: 'pot1', x: 100, y: 100, plantId: '1', potSize: 2, microzoneId: 'mz1' },
    { id: 'pot2', x: 280, y: 120, plantId: '2', potSize: 1.5, microzoneId: 'mz2' },
    { id: 'pot3', x: 150, y: 150, plantId: '4', potSize: 2, microzoneId: 'mz1' },
  ]
};

export const demoSchedules: WaterSchedule[] = [
  {
    id: 's1',
    plantId: '1',
    recurrence: 'weekly',
    amount: 300,
    time: '08:00',
    enabled: true,
  },
  {
    id: 's2',
    plantId: '2',
    recurrence: 'every-2-days',
    amount: 250,
    time: '09:00',
    enabled: true,
  },
  {
    id: 's3',
    plantId: '4',
    recurrence: 'daily',
    amount: 350,
    time: '08:30',
    enabled: true,
  },
];

export const funFacts = [
  { id: 'f1', text: 'Snake plants can survive with minimal water for weeks!', icon: 'Lightbulb', points: 5 },
  { id: 'f2', text: 'Bottom watering prevents overwatering and root rot.', icon: 'Droplet', points: 5 },
  { id: 'f3', text: 'Native plants use 50% less water than exotic species.', icon: 'Leaf', points: 5 },
  { id: 'f4', text: 'Grouping plants creates a microclimate that retains moisture.', icon: 'Wind', points: 5 },
  { id: 'f5', text: 'Add a native plant today and earn +10 bonus points!', icon: 'Award', points: 10 },
];
