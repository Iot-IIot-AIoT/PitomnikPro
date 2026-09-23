import { Plant, Zone, Task, PlantType } from './types';

export const PLANT_TYPE_LABELS: Record<PlantType, string> = {
  pine: 'Сосна',
  spruce: 'Ель',
  fir: 'Пихта',
  juniper: 'Можжевельник',
  cypress: 'Кипарисовик',
  thuja: 'Туя',
  yew: 'Тис',
  larch: 'Лиственница',
};

export const PLANT_TYPE_EMOJIS: Record<PlantType, string> = {
  pine: '🌲',
  spruce: '🎄',
  fir: '🌲',
  juniper: '🌿',
  cypress: '🌳',
  thuja: '🌲',
  yew: '🌿',
  larch: '🍃',
};

export const HEALTH_LABELS = {
  excellent: 'Отличное',
  good: 'Хорошее',
  fair: 'Удовлетворительное',
  poor: 'Плохое',
  critical: 'Критическое',
};

export const HEALTH_COLORS = {
  excellent: '#22c55e',
  good: '#84cc16',
  fair: '#eab308',
  poor: '#f97316',
  critical: '#ef4444',
};

export const STATUS_LABELS = {
  growing: 'Растёт',
  transplanting: 'Пересадка',
  resting: 'Покой',
  sold: 'Продано',
  planned: 'Запланировано',
};

export const STATUS_COLORS = {
  growing: '#22c55e',
  transplanting: '#3b82f6',
  resting: '#a855f7',
  sold: '#6b7280',
  planned: '#f59e0b',
};

export const initialPlants: Plant[] = [
  {
    id: '1',
    name: 'Сосна горная Мугус',
    latinName: 'Pinus mugo Mughus',
    type: 'pine',
    variety: 'Mughus',
    health: 'excellent',
    status: 'growing',
    zone: 'Зона А',
    plantedDate: '2022-03-15',
    height: 85,
    age: 4,
    notes: 'Хорошо перенесла зиму. Нужна формирующая обрезка весной.',
    lastWatered: '2024-12-20',
    lastFertilized: '2024-11-01',
  },
  {
    id: '2',
    name: 'Ель голубая',
    latinName: 'Picea pungens',
    type: 'spruce',
    variety: 'Hoopsii',
    health: 'good',
    status: 'growing',
    zone: 'Зона Б',
    plantedDate: '2021-05-20',
    height: 145,
    age: 6,
    notes: 'Активный рост. Требуется подкормка.',
    lastWatered: '2024-12-18',
    lastFertilized: '2024-10-15',
  },
  {
    id: '3',
    name: 'Можжевельник казацкий',
    latinName: 'Juniperus sabina',
    type: 'juniper',
    variety: 'Tamariscifolia',
    health: 'good',
    status: 'growing',
    zone: 'Зона А',
    plantedDate: '2023-04-10',
    height: 35,
    age: 2,
    notes: 'Молодое растение. Хорошо укоренилось.',
    lastWatered: '2024-12-19',
    lastFertilized: '2024-11-20',
  },
];

export const initialZones: Zone[] = [
  { id: 'z1', name: 'Зона А', capacity: 50, currentCount: 2, description: 'Молодые саженцы' },
  { id: 'z2', name: 'Зона Б', capacity: 40, currentCount: 1, description: 'Крупномерные' },
];

export const initialTasks: Task[] = [
  {
    id: 't1',
    plantId: '1',
    plantName: 'Сосна горная Мугус',
    type: 'pruning',
    dueDate: '2025-03-01',
    completed: false,
    notes: 'Формирующая обрезка',
  },
  {
    id: 't2',
    plantId: '2',
    plantName: 'Ель голубая',
    type: 'fertilizing',
    dueDate: '2025-01-10',
    completed: false,
    notes: 'Комплексная подкормка',
  },
];
