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

export interface GrowthStage {
  id: string;
  order: number;
  title: string;
  subtitle: string;
  icon: string;
  duration: string;
  season: string;
  description: string;
  steps: string[];
  tips: string[];
  warnings: string[];
  temperature?: string;
  humidity?: string;
  completed: boolean;
}

export interface GrowthPlan {
  id: string;
  plantName: string;
  plantType: PlantType;
  method: 'seeds' | 'cuttings' | 'grafting';
  startDate: string;
  stages: GrowthStage[];
  notes: string;
}

export interface ProfitablePlant {
  id: string;
  name: string;
  latinName: string;
  category: 'conifer' | 'deciduous' | 'berry' | 'fruit' | 'ornamental';
  variety: string;
  difficulty: 'easy' | 'medium' | 'hard';
  growthTime: string;
  costPerUnit: number;
  sellingPrice: number;
  profitPerUnit: number;
  roi: number;
  paybackMonths: number;
  demand: 'low' | 'medium' | 'high' | 'very-high';
  season: string;
  description: string;
  keyBenefits: string[];
  challenges: string[];
  marketTips: string[];
}

export type PageView = 'dashboard' | 'plants' | 'zones' | 'tasks' | 'statistics' | 'growth-plan' | 'profitable';
