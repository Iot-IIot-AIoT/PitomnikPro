import { useState, useEffect } from 'react';
import { Plant, Task, Zone, PageView } from './types';
import { initialPlants, initialZones, initialTasks } from './data';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import PlantList from './components/PlantList';
import PlantForm from './components/PlantForm';
import ZonesView from './components/ZonesView';
import TasksView from './components/TasksView';
import Statistics from './components/Statistics';
import GrowthPlanView from './components/GrowthPlanView';

function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('dashboard');
  const [plants, setPlants] = useState<Plant[]>(() => {
    const saved = localStorage.getItem('conifer-plants');
    return saved ? JSON.parse(saved) : initialPlants;
  });
  const [zones, setZones] = useState<Zone[]>(() => {
    const saved = localStorage.getItem('conifer-zones');
    return saved ? JSON.parse(saved) : initialZones;
  });
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('conifer-tasks');
    return saved ? JSON.parse(saved) : initialTasks;
  });

  const [showPlantForm, setShowPlantForm] = useState(false);
  const [editingPlant, setEditingPlant] = useState<Plant | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('conifer-plants', JSON.stringify(plants));
  }, [plants]);

  useEffect(() => {
    localStorage.setItem('conifer-zones', JSON.stringify(zones));
  }, [zones]);

  useEffect(() => {
    localStorage.setItem('conifer-tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Update zone counts
  useEffect(() => {
    setZones(prev => prev.map(zone => ({
      ...zone,
      currentCount: plants.filter(p => p.zone === zone.name).length,
    })));
  }, [plants]);

  const handleSavePlant = (plant: Plant) => {
    setPlants(prev => {
      const existing = prev.find(p => p.id === plant.id);
      if (existing) {
        return prev.map(p => p.id === plant.id ? plant : p);
      }
      return [...prev, plant];
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
      setDeleteConfirm(null);
    }
  };

  const handleEditPlant = (plant: Plant) => {
    setEditingPlant(plant);
    setShowPlantForm(true);
  };

  const handleToggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleAddTask = (task: Task) => {
    setTasks(prev => [...prev, task]);
  };

  const handleDeleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
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
            onToggleTask={handleToggleTask}
            onAddTask={handleAddTask}
            onDeleteTask={handleDeleteTask}
          />
        );
      case 'statistics':
        return <Statistics plants={plants} />;
      case 'growth-plan':
        return <GrowthPlanView />;
      default:
        return <Dashboard plants={plants} zones={zones} tasks={tasks} />;
    }
  };

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

      {/* Plant Form Modal */}
      {showPlantForm && (
        <PlantForm
          plant={editingPlant}
          onSave={handleSavePlant}
          onCancel={() => { setShowPlantForm(false); setEditingPlant(null); }}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full">
            <div className="text-center">
              <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🗑️</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Удалить растение?</h3>
              <p className="text-sm text-gray-500 mb-6">
                Это действие нельзя отменить. Растение будет удалено из каталога.
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

export default App;
