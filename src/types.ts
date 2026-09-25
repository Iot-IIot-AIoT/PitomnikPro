export type PlantHealth = 'excellent' | 'good' | 'fair' | 'poor' | 'critical';
export type PlantStatus = 'growing' | 'transplanting' | 'resting' | 'sold' | 'planned';
export type PlantType = 
  | 'pine' | 'spruce' | 'fir' | 'juniper' | 'cypress' | 'thuja' | 'yew' | 'larch'
  | 'blueberry' | 'honeysuckle' | 'hydrangea' | 'spirea' | 'lavender' | 'apple' | 'other';
export type PropagationMethod = 'seeds' | 'cuttings' | 'grafting' | 'division' | 'layering';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  createdAt: string;
}

export interface PlantHistoryEntry {
  id: string;
  date: string;
  action: string;
  details: string;
}

export interface PlantPhoto {
  id: string;
  url: string;
  date: string;
  caption: string;
}

export interface PlantFinancials {
  costPerUnit: number;
  sellingPrice: number;
  profitPerUnit: number;
  roi: number;
  paybackMonths: number;
  demand: 'low' | 'medium' | 'high' | 'very-high';
}

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
  height: number;
  age: number;
  notes: string;
  lastWatered: string;
  lastFertilized: string;
  image?: string;
  photos?: PlantPhoto[];
  history?: PlantHistoryEntry[];
  financials?: PlantFinancials;
  propagationMethod?: PropagationMethod;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  type: 'individual' | 'business' | 'designer' | 'developer';
  source: string;
  notes: string;
  createdAt: string;
  totalOrders: number;
  totalSpent: number;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'new' | 'processing' | 'ready' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'partial';
  createdAt: string;
  deliveryDate: string;
  notes: string;
}

export interface OrderItem {
  plantId: string;
  plantName: string;
  quantity: number;
  price: number;
}

export interface Deal {
  id: string;
  title: string;
  customerName: string;
  value: number;
  stage: 'lead' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost';
  probability: number;
  expectedCloseDate: string;
  createdAt: string;
  notes: string;
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

export interface PlantWithRelations extends Plant {
  tasks: Task[];
  growthPlan?: GrowthPlan;
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
  plantId: string; // Привязка к конкретному растению
  method: 'seeds' | 'cuttings';
  startDate: string;
  stages: GrowthStage[];
  notes: string;
}

export interface GrowthPlanTemplate {
  plantType: PlantType;
  method: 'seeds' | 'cuttings';
  defaultStages: Omit<GrowthStage, 'completed'>[];
  notes: string;
}

export interface ProfitablePlant {
  id: string;
  name: string;
  latinName: string;
  variety: string;
  category: 'conifer' | 'berry' | 'fruit' | 'ornamental';
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

export type PageView = 'dashboard' | 'plants' | 'zones' | 'tasks' | 'statistics' | 'growth-plan' | 'profitable' | 'business' | 'bashkortostan-market' | 'profile' | 'mvp-strategy' | 'production';
