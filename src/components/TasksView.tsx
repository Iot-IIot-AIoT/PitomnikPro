import { useState } from 'react';
import { Task, Plant } from '../types';
import { PLANT_TYPE_EMOJIS } from '../data';
import { CheckCircle2, Circle, Plus, Calendar, Filter, Trash2, TreePine, LayoutGrid } from 'lucide-react';

interface TasksViewProps {
  tasks: Task[];
  plants: Plant[];
  onToggleTask: (id: string) => void;
  onAddTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
}

export default function TasksView({ tasks, plants, onToggleTask, onAddTask, onDeleteTask }: TasksViewProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [newTask, setNewTask] = useState({
    plantId: '',
    plantName: '',
    type: 'watering' as Task['type'],
    dueDate: new Date().toISOString().split('T')[0],
    notes: '',
  });

  const filteredTasks = tasks.filter(t => {
    if (filter === 'pending') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  }).sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
  });

  const handleAdd = () => {
    if (!newTask.plantId || !newTask.plantName) return;
    // Безопасная генерация ID для всех браузеров
    const taskId = Date.now().toString(36) + Math.random().toString(36).substr(2);
    onAddTask({
      id: taskId,
      plantId: newTask.plantId,
      plantName: newTask.plantName,
      type: newTask.type,
      dueDate: newTask.dueDate,
      completed: false,
      notes: newTask.notes,
    });
    setNewTask({ plantId: '', plantName: '', type: 'watering', dueDate: new Date().toISOString().split('T')[0], notes: '' });
    setShowAddForm(false);
  };

  const taskTypeConfig = {
    watering: { icon: '💧', label: 'Полив', color: 'bg-blue-100 text-blue-700' },
    fertilizing: { icon: '🧪', label: 'Подкормка', color: 'bg-green-100 text-green-700' },
    pruning: { icon: '✂️', label: 'Обрезка', color: 'bg-purple-100 text-purple-700' },
    transplanting: { icon: '🔄', label: 'Пересадка', color: 'bg-amber-100 text-amber-700' },
    inspection: { icon: '🔍', label: 'Осмотр', color: 'bg-gray-100 text-gray-700' },
  };

  const pendingCount = tasks.filter(t => !t.completed).length;
  const completedCount = tasks.filter(t => t.completed).length;
  const overdueCount = tasks.filter(t => !t.completed && new Date(t.dueDate) < new Date()).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Задачи по уходу</h1>
          <p className="text-gray-500 mt-1">Планирование и отслеживание работ</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors shadow-sm"
        >
          <Plus className="w-5 h-5" />
          Новая задача
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center gap-3">
          <div className="p-2.5 bg-amber-50 rounded-xl">
            <Calendar className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{pendingCount}</p>
            <p className="text-sm text-gray-500">Ожидают выполнения</p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center gap-3">
          <div className="p-2.5 bg-emerald-50 rounded-xl">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{completedCount}</p>
            <p className="text-sm text-gray-500">Выполнено</p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center gap-3">
          <div className="p-2.5 bg-red-50 rounded-xl">
            <Calendar className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{overdueCount}</p>
            <p className="text-sm text-gray-500">Просрочено</p>
          </div>
        </div>
      </div>

      {showAddForm && (
        <div className="bg-white rounded-xl shadow-sm border border-emerald-200 p-5">
          <h3 className="font-semibold text-gray-800 mb-4">Новая задача</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Растение *</label>
              <select
                value={newTask.plantId}
                onChange={e => {
                  const selectedPlant = plants.find(p => p.id === e.target.value);
                  setNewTask({ 
                    ...newTask, 
                    plantId: e.target.value,
                    plantName: selectedPlant?.name || ''
                  });
                }}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
              >
                <option value="">Выберите растение</option>
                {plants.map(plant => (
                  <option key={plant.id} value={plant.id}>
                    {PLANT_TYPE_EMOJIS[plant.type]} {plant.name} ({plant.zone})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Тип работы</label>
              <select
                value={newTask.type}
                onChange={e => setNewTask({ ...newTask, type: e.target.value as Task['type'] })}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
              >
                <option value="watering">💧 Полив</option>
                <option value="fertilizing">🧪 Подкормка</option>
                <option value="pruning">✂️ Обрезка</option>
                <option value="transplanting">🔄 Пересадка</option>
                <option value="inspection">🔍 Осмотр</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Срок</label>
              <input
                type="date"
                value={newTask.dueDate}
                onChange={e => setNewTask({ ...newTask, dueDate: e.target.value })}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Заметки</label>
              <input
                type="text"
                value={newTask.notes}
                onChange={e => setNewTask({ ...newTask, notes: e.target.value })}
                placeholder="Описание задачи"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={handleAdd} className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium">
              Создать задачу
            </button>
            <button onClick={() => setShowAddForm(false)} className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors text-sm">
              Отмена
            </button>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${filter === 'all' ? 'bg-emerald-100 text-emerald-700' : 'text-gray-500 hover:bg-gray-100'}`}
          >
            Все ({tasks.length})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${filter === 'pending' ? 'bg-amber-100 text-amber-700' : 'text-gray-500 hover:bg-gray-100'}`}
          >
            Ожидают ({pendingCount})
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${filter === 'completed' ? 'bg-green-100 text-green-700' : 'text-gray-500 hover:bg-gray-100'}`}
          >
            Выполнены ({completedCount})
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('list')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${viewMode === 'list' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:bg-gray-100'}`}
          >
            📋 Список
          </button>
          <button
            onClick={() => setViewMode('calendar')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${viewMode === 'calendar' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:bg-gray-100'}`}
          >
            📅 Календарь
          </button>
        </div>
      </div>

      {viewMode === 'list' ? (
      <div className="space-y-2">
        {filteredTasks.map(task => {
          const config = taskTypeConfig[task.type];
          const isOverdue = !task.completed && new Date(task.dueDate) < new Date();
          const plant = plants.find(p => p.id === task.plantId);

          return (
            <div
              key={task.id}
              className={`bg-white rounded-xl shadow-sm border p-4 flex items-center gap-4 transition-all hover:shadow-md ${
                task.completed ? 'border-gray-100 opacity-60' : isOverdue ? 'border-red-200' : 'border-gray-100'
              }`}
            >
              <button
                onClick={() => onToggleTask(task.id)}
                className="flex-shrink-0"
              >
                {task.completed ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                ) : (
                  <Circle className="w-6 h-6 text-gray-300 hover:text-emerald-500 transition-colors" />
                )}
              </button>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`font-medium ${task.completed ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                    {task.plantName}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${config.color}`}>
                    {config.icon} {config.label}
                  </span>
                  {isOverdue && (
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-red-100 text-red-700">
                      Просрочено!
                    </span>
                  )}
                </div>
                {task.notes && (
                  <p className={`text-sm mt-1 ${task.completed ? 'text-gray-400' : 'text-gray-500'}`}>
                    {task.notes}
                  </p>
                )}
                {/* Информация о растении */}
                {plant && (
                  <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <span>{PLANT_TYPE_EMOJIS[plant.type]}</span>
                      <span>{plant.variety}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <TreePine className="w-3 h-3" />
                      <span>{plant.height} см</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <span>📍</span>
                      <span>{plant.zone}</span>
                    </span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3 flex-shrink-0">
                <span className={`text-sm ${isOverdue ? 'text-red-600 font-medium' : 'text-gray-500'}`}>
                  {new Date(task.dueDate).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })}
                </span>
                <button
                  onClick={() => onDeleteTask(task.id)}
                  className="p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
      ) : (
        <CalendarView tasks={filteredTasks} plants={plants} onToggleTask={onToggleTask} />
      )}

      {filteredTasks.length === 0 && (
        <div className="text-center py-12">
          <div className="text-5xl mb-4">✅</div>
          <p className="text-gray-500 text-lg">Нет задач</p>
          <p className="text-gray-400 text-sm mt-1">Создайте новую задачу для ухода за растениями</p>
        </div>
      )}
    </div>
  );
}

function CalendarView({ tasks, plants, onToggleTask }: { tasks: Task[]; plants: Plant[]; onToggleTask: (id: string) => void }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();
  
  const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
  
  const getTasksForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return tasks.filter(t => t.dueDate === dateStr);
  };
  
  const days = [];
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(<div key={`empty-${i}`} className="h-24 bg-gray-50"></div>);
  }
  
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const dayTasks = getTasksForDate(date);
    const isToday = date.toDateString() === new Date().toDateString();
    
    days.push(
      <div key={day} className={`h-24 p-2 border border-gray-200 ${isToday ? 'bg-blue-50' : 'bg-white'} hover:bg-gray-50 transition-colors`}>
        <div className={`text-sm font-medium mb-1 ${isToday ? 'text-blue-600' : 'text-gray-700'}`}>
          {day}
        </div>
        <div className="space-y-1 overflow-y-auto max-h-16">
          {dayTasks.slice(0, 3).map(task => (
            <button
              key={task.id}
              onClick={() => onToggleTask(task.id)}
              className={`w-full text-left text-xs p-1 rounded truncate ${
                task.completed ? 'bg-green-100 text-green-700 line-through' : 'bg-amber-100 text-amber-700'
              }`}
              title={`${task.plantName}: ${task.notes || task.type}`}
            >
              {task.type === 'watering' ? '💧' : task.type === 'fertilizing' ? '🧪' : task.type === 'pruning' ? '✂️' : task.type === 'transplanting' ? '🔄' : '🔍'} {task.plantName.split(' ')[0]}
            </button>
          ))}
          {dayTasks.length > 3 && (
            <div className="text-xs text-gray-500">+{dayTasks.length - 3} ещё</div>
          )}
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setCurrentDate(new Date(year, month - 1, 1))}
          className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50"
        >
          ← Пред.
        </button>
        <h3 className="text-lg font-semibold text-gray-900">
          {monthNames[month]} {year}
        </h3>
        <button
          onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
          className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50"
        >
          След. →
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'].map(day => (
          <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days}
      </div>
    </div>
  );
}
