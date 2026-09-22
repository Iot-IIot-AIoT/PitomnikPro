export type PlantHealth = 'excellent' | 'good' | 'fair' | 'poor' | 'critical';
export type PlantStatus = 'growing' | 'transplanting' | 'resting' | 'sold' | 'planned';
export type PlantType = 'pine' | 'spruce' | 'fir' | 'juniper' | 'cypress' | 'thuja' | 'yew' | 'larch';

export interface Plant {
  id: string;
  name: string;
  latinName: string;
  type: PlantType;
  variety: string;
  health: PlantHealth;
  status: PlantStatus;
  zone: string;
  plantedDate: string;
  height: number; // cm
  age: number; // years
  notes: string;
  lastWatered: string;
  lastFertilized: string;
  image?: string;
}

export interface Zone {
  id: string;
  name: string;
  capacity: number;
  currentCount: number;
  description: string;
}

export interface Task {
  id: string;
  plantId: string;
  plantName: string;
  type: 'watering' | 'fertilizing' | 'pruning' | 'transplanting' | 'inspection';
  dueDate: string;
  completed: boolean;
  notes: string;
}

export type PageView = 'dashboard' | 'plants' | 'zones' | 'tasks' | 'statistics';
