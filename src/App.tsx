import { useState, useEffect } from 'react';
import { Plant, Task, Zone, GrowthPlan, PageView } from './types';
import { initialPlants, initialZones, initialTasks } from './data';
import { createGrowthPlanFromTemplate } from './growthPlanTemplates';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import PlantList from './components/PlantList';
import PlantForm from './components/PlantForm';
import ZonesView from './components/ZonesView';
import TasksView from './components/TasksView';
import Statistics from './components/Statistics';
import GrowthPlanView from './components/GrowthPlanView';
import BusinessAdviceView from './components/BusinessAdviceView';
import BashkortostanMarketView from './components/BashkortostanMarketView';
import MVPStrategyView from './components/MVPStrategyView';
import LoginPage from './components/LoginPage';
import ProfilePage from './components/ProfilePage';

function AppContent() {
  const { isAuthenticated } = useAuth();
  const [currentPage, setCurrentPage] = useState<PageView>('dashboard');

  // Создаем демо-пользователя при первом запуске
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.length === 0) {
      const demoUser = {
        id: 'demo-user',
        email: 'demo@pitomnik.ru',
        password: 'demo123',
        name: 'Демо Пользователь',
        role: 'admin',
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem('users', JSON.stringify([demoUser]));
    }
  }, []);
  
  const [plants, setPlants] = useState<Plant[]>(() => {
    const saved = localStorage.getItem('conifer-plants');
    if (!saved) return initialPlants;
    
    try {
      const savedPlants: Plant[] = JSON.parse(saved);
      
      // Миграция: проверяем валидность типов растений
      const validTypes = ['pine', 'spruce', 'fir', 'juniper', 'cypress', 'thuja', 'yew', 'larch', 
                          'blueberry', 'honeysuckle', 'hydrangea', 'spirea', 'lavender', 'apple', 'other'];
      
      const migratedPlants = savedPlants.map(plant => {
        // Если тип растения невалидный, меняем на 'other'
        if (!validTypes.includes(plant.type)) {
          return { ...plant, type: 'other' as any };
        }
        return plant;
      });
      
      // Добавляем новые растения из initialPlants
      const existingIds = new Set(migratedPlants.map(p => p.id));
      const newPlants = initialPlants.filter(p => !existingIds.has(p.id));
      
      return [...migratedPlants, ...newPlants];
    } catch (e) {
      console.error('Ошибка загрузки данных:', e);
      return initialPlants;
    }
  });
  
  const [zones, setZones] = useState<Zone[]>(() => {
    const saved = localStorage.getItem('conifer-zones');
    return saved ? JSON.parse(saved) : initialZones;
  });
  
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('conifer-tasks');
    return saved ? JSON.parse(saved) : initialTasks;
  });
  
  const [growthPlans, setGrowthPlans] = useState<GrowthPlan[]>(() => {
    const saved = localStorage.getItem('growth-plans');
    const savedPlans: GrowthPlan[] = saved ? JSON.parse(saved) : [];
    
    // Создаём планы для всех начальных растений
    const initialPlans = initialPlants.map(plant => 
      createGrowthPlanFromTemplate(plant.id, plant.type, plant.plantedDate)
    );
    
    // Если есть сохранённые планы, используем их, иначе начальные
    return savedPlans.length > 0 ? savedPlans : initialPlans;
  });

  const [showPlantForm, setShowPlantForm] = useState(false);
  const [editingPlant, setEditingPlant] = useState<Plant | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('conifer-plants', JSON.stringify(plants));
  }, [plants]);

  useEffect(() => {
    localStorage.setItem('conifer-zones', JSON.stringify(zones));
  }, [zones]);

  useEffect(() => {
    localStorage.setItem('conifer-tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('growth-plans', JSON.stringify(growthPlans));
  }, [growthPlans]);

  useEffect(() => {
    setZones(prev => prev.map(zone => ({
      ...zone,
      currentCount: plants.filter(p => p.zone === zone.name).length,
    })));
  }, [plants]);

  // Синхронизация планов с растениями
  useEffect(() => {
    setGrowthPlans(prevPlans => {
      // Удаляем планы для несуществующих растений
      const validPlans = prevPlans.filter(plan => 
        plants.some(plant => plant.id === plan.plantId)
      );
      
      // Находим растения без плана
      const plantsWithoutPlan = plants.filter(plant => 
        !validPlans.some(plan => plan.plantId === plant.id)
      );
      
      // Создаём планы для растений без плана
      if (plantsWithoutPlan.length > 0) {
        const newPlans = plantsWithoutPlan.map(plant => 
          createGrowthPlanFromTemplate(plant.id, plant.type, plant.plantedDate)
        );
        return [...validPlans, ...newPlans];
      }
      
      return validPlans;
    });
  }, [plants]);

  const handleSavePlant = (plant: Plant) => {
    setPlants(prev => {
      const existing = prev.find(p => p.id === plant.id);
      if (existing) {
        // Добавляем запись в историю при редактировании
        const historyEntry = {
          id: Date.now().toString(36) + Math.random().toString(36).substr(2),
          date: new Date().toISOString().split('T')[0],
          action: '✏️ Редактирование',
          details: 'Данные растения обновлены',
        };
        return prev.map(p => p.id === plant.id ? {
          ...plant,
          history: [historyEntry, ...(p.history || [])],
        } : p);
      }
      // Новое растение - создаём для него план выращивания и историю
      const newPlan = createGrowthPlanFromTemplate(plant.id, plant.type, plant.plantedDate);
      setGrowthPlans(prevPlans => [...prevPlans, newPlan]);
      
      const historyEntry = {
        id: Date.now().toString(36) + Math.random().toString(36).substr(2),
        date: new Date().toISOString().split('T')[0],
        action: '🌱 Добавление',
        details: `Растение добавлено в ${plant.zone}`,
      };
      
      return [...prev, { ...plant, history: [historyEntry] }];
    });
    setShowPlantForm(false);
    setEditingPlant(null);
  };

  const handleDeletePlant = (id: string) => {
    setDeleteConfirm(id);
  };

  const confirmDelete = () => {
    if (deleteConfirm) {
      setPlants(prev => prev.filter(p => p.id !== deleteConfirm));
      setGrowthPlans(prev => prev.filter(plan => plan.plantId !== deleteConfirm));
      setTasks(prev => prev.filter(task => task.plantId !== deleteConfirm));
      setDeleteConfirm(null);
    }
  };

  const handleEditPlant = (plant: Plant) => {
    setEditingPlant(plant);
    setShowPlantForm(true);
  };

  const handleToggleTask = (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (task && !task.completed) {
      // Добавляем запись в историю растения при выполнении задачи
      setPlants(prev => prev.map(p => {
        if (p.id === task.plantId) {
          const historyEntry = {
            id: Date.now().toString(36) + Math.random().toString(36).substr(2),
            date: new Date().toISOString().split('T')[0],
            action: task.type === 'watering' ? '💧 Полив' : 
                    task.type === 'fertilizing' ? '🧪 Подкормка' :
                    task.type === 'pruning' ? '✂️ Обрезка' :
                    task.type === 'transplanting' ? '🔄 Пересадка' : '🔍 Осмотр',
            details: task.notes || 'Задача выполнена',
          };
          return {
            ...p,
            history: [historyEntry, ...(p.history || [])],
          };
        }
        return p;
      }));
    }
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleAddTask = (task: Task) => {
    setTasks(prev => [...prev, task]);
  };

  const handleDeleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const handleSaveGrowthPlans = (plans: GrowthPlan[]) => {
    setGrowthPlans(plans);
  };

  const pendingTaskCount = tasks.filter(t => !t.completed).length;

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard plants={plants} zones={zones} tasks={tasks} />;
      case 'plants':
        return (
          <PlantList
            plants={plants}
            tasks={tasks}
            growthPlans={growthPlans}
            onAdd={() => { setEditingPlant(null); setShowPlantForm(true); }}
            onEdit={handleEditPlant}
            onDelete={handleDeletePlant}
          />
        );
      case 'zones':
        return <ZonesView zones={zones} plants={plants} />;
      case 'tasks':
        return (
          <TasksView
            tasks={tasks}
            plants={plants}
            onToggleTask={handleToggleTask}
            onAddTask={handleAddTask}
            onDeleteTask={handleDeleteTask}
          />
        );
      case 'growth-plan':
        return (
          <GrowthPlanView 
            plants={plants} 
            growthPlans={growthPlans}
            onSaveGrowthPlans={handleSaveGrowthPlans}
          />
        );
      case 'business':
        return <BusinessAdviceView />;
      case 'bashkortostan-market':
        return <BashkortostanMarketView />;
      case 'mvp-strategy':
        return <MVPStrategyView />;
      case 'statistics':
        return <Statistics plants={plants} />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <Dashboard plants={plants} zones={zones} tasks={tasks} />;
    }
  };

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        plantCount={plants.length}
        taskCount={pendingTaskCount}
      />

      <main className="flex-1 overflow-y-auto">
        <div className="p-4 lg:p-8 pt-16 lg:pt-8 max-w-7xl mx-auto">
          {renderPage()}
        </div>
      </main>

      {showPlantForm && (
        <PlantForm
          plant={editingPlant}
          onSave={handleSavePlant}
          onCancel={() => { setShowPlantForm(false); setEditingPlant(null); }}
        />
      )}

      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full">
            <div className="text-center">
              <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🗑️</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Удалить растение?</h3>
              <p className="text-sm text-gray-500 mb-6">
                Это действие нельзя отменить. Растение, его план выращивания и все задачи будут удалены.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Отмена
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  Удалить
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
