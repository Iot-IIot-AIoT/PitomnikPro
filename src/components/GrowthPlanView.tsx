import { useState } from 'react';
import { Plant, GrowthPlan, PlantType } from '../types';
import { PLANT_TYPE_LABELS, PLANT_TYPE_EMOJIS } from '../data';
import { CheckCircle2, Circle, Clock, Calendar, Target, AlertTriangle, Lightbulb, Thermometer, Droplets, ChevronDown, ChevronRight, TreePine, Sprout, Search, Filter, Download, Upload, BarChart3 } from 'lucide-react';

interface GrowthPlanViewProps {
  plants: Plant[];
  growthPlans: GrowthPlan[];
  onSaveGrowthPlans: (plans: GrowthPlan[]) => void;
}

export default function GrowthPlanView({ plants, growthPlans, onSaveGrowthPlans }: GrowthPlanViewProps) {
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(growthPlans[0]?.id || null);
  const [expandedStage, setExpandedStage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<PlantType | ''>('');
  const [filterMethod, setFilterMethod] = useState<'all' | 'seeds' | 'cuttings'>('all');
  const [filterProgress, setFilterProgress] = useState<'all' | 'not-started' | 'in-progress' | 'completed'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'progress' | 'date'>('name');

  const selectedPlan = growthPlans.find(p => p.id === selectedPlanId);
  const selectedPlant = selectedPlan ? plants.find(p => p.id === selectedPlan.plantId) : null;

  const savePlans = (updated: GrowthPlan[]) => {
    onSaveGrowthPlans(updated);
  };

  const toggleStage = (stageId: string) => {
    if (!selectedPlan) return;
    const updated = growthPlans.map(p => {
      if (p.id !== selectedPlan.id) return p;
      return { ...p, stages: p.stages.map(s => s.id === stageId ? { ...s, completed: !s.completed } : s) };
    });
    savePlans(updated);
  };

  const getProgress = (plan: GrowthPlan) => {
    const completed = plan.stages.filter(s => s.completed).length;
    return Math.round((completed / plan.stages.length) * 100);
  };

  const getCurrentStage = (plan: GrowthPlan) => {
    return plan.stages.find(s => !s.completed);
  };

  // Фильтрация и сортировка
  const filteredPlans = growthPlans
    .filter(plan => {
      const plant = plants.find(p => p.id === plan.plantId);
      if (!plant) return false;

      // Поиск по названию
      if (searchQuery && !plant.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Фильтр по типу
      if (filterType && plant.type !== filterType) {
        return false;
      }

      // Фильтр по методу
      if (filterMethod !== 'all' && plan.method !== filterMethod) {
        return false;
      }

      // Фильтр по прогрессу
      if (filterProgress !== 'all') {
        const progress = getProgress(plan);
        if (filterProgress === 'not-started' && progress !== 0) return false;
        if (filterProgress === 'in-progress' && (progress === 0 || progress === 100)) return false;
        if (filterProgress === 'completed' && progress !== 100) return false;
      }

      return true;
    })
    .sort((a, b) => {
      const plantA = plants.find(p => p.id === a.plantId);
      const plantB = plants.find(p => p.id === b.plantId);
      if (!plantA || !plantB) return 0;

      if (sortBy === 'name') {
        return plantA.name.localeCompare(plantB.name);
      } else if (sortBy === 'progress') {
        return getProgress(b) - getProgress(a);
      } else if (sortBy === 'date') {
        return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
      }
      return 0;
    });

  // Статистика
  const stats = {
    total: growthPlans.length,
    completed: growthPlans.filter(p => getProgress(p) === 100).length,
    inProgress: growthPlans.filter(p => {
      const progress = getProgress(p);
      return progress > 0 && progress < 100;
    }).length,
    notStarted: growthPlans.filter(p => getProgress(p) === 0).length,
    avgProgress: Math.round(
      growthPlans.reduce((sum, p) => sum + getProgress(p), 0) / growthPlans.length
    ) || 0,
  };

  const exportData = () => {
    const data = {
      plants,
      growthPlans,
      exportDate: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `питомник_планы_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Планы выращивания</h1>
        <p className="text-gray-500 mt-1">Индивидуальные планы для каждого растения</p>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <BarChart3 className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              <p className="text-xs text-gray-500">Всего планов</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-50 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
              <p className="text-xs text-gray-500">Завершено</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-50 rounded-lg">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.inProgress}</p>
              <p className="text-xs text-gray-500">В процессе</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-50 rounded-lg">
              <Circle className="w-5 h-5 text-gray-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.notStarted}</p>
              <p className="text-xs text-gray-500">Не начато</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Sprout className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.avgProgress}%</p>
              <p className="text-xs text-gray-500">Средний прогресс</p>
            </div>
          </div>
        </div>
      </div>

      {/* Фильтры и поиск */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="space-y-3">
          {/* Поиск */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск по названию растения..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          {/* Фильтры */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Тип растения</label>
              <select
                value={filterType}
                onChange={e => setFilterType(e.target.value as PlantType | '')}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
              >
                <option value="">Все типы</option>
                {Object.entries(PLANT_TYPE_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Метод</label>
              <select
                value={filterMethod}
                onChange={e => setFilterMethod(e.target.value as 'all' | 'seeds' | 'cuttings')}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
              >
                <option value="all">Все методы</option>
                <option value="seeds">🌰 Семена</option>
                <option value="cuttings">✂️ Черенки</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Прогресс</label>
              <select
                value={filterProgress}
                onChange={e => setFilterProgress(e.target.value as 'all' | 'not-started' | 'in-progress' | 'completed')}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
              >
                <option value="all">Все</option>
                <option value="not-started">Не начато</option>
                <option value="in-progress">В процессе</option>
                <option value="completed">Завершено</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Сортировка</label>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as 'name' | 'progress' | 'date')}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
              >
                <option value="name">По названию</option>
                <option value="progress">По прогрессу</option>
                <option value="date">По дате начала</option>
              </select>
            </div>
          </div>

          {/* Кнопки действий */}
          <div className="flex gap-2">
            <button
              onClick={exportData}
              className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Download className="w-4 h-4" />
              Экспорт данных
            </button>
            {(searchQuery || filterType || filterMethod !== 'all' || filterProgress !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setFilterType('');
                  setFilterMethod('all');
                  setFilterProgress('all');
                }}
                className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Filter className="w-4 h-4" />
                Сбросить фильтры
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Результаты */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Найдено: <span className="font-semibold text-gray-700">{filteredPlans.length}</span> из {growthPlans.length} планов
        </p>
      </div>

      {/* Plans List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredPlans.map(plan => {
          const plant = plants.find(p => p.id === plan.plantId);
          if (!plant) return null;
          
          const progress = getProgress(plan);
          const isSelected = plan.id === selectedPlanId;
          const currentStage = getCurrentStage(plan);
          
          return (
            <button
              key={plan.id}
              onClick={() => setSelectedPlanId(plan.id)}
              className={`p-4 rounded-xl border-2 transition-all text-left ${
                isSelected ? 'border-emerald-500 bg-emerald-50 shadow-md' : 'border-gray-100 bg-white hover:border-gray-200'
              }`}
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="text-3xl">{PLANT_TYPE_EMOJIS[plant.type]}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{plant.name}</p>
                  <p className="text-xs text-gray-500 truncate">{plant.variety}</p>
                </div>
                {progress === 100 && (
                  <div className="flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs flex-wrap">
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">
                    {plan.method === 'seeds' ? '🌰 Семена' : '✂️ Черенки'}
                  </span>
                  <span className="text-gray-500">📍 {plant.zone}</span>
                  <span className="text-gray-500">📏 {plant.height} см</span>
                </div>
                
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-500">Прогресс</span>
                    <span className="font-semibold text-gray-700">{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all ${
                        progress === 100 ? 'bg-emerald-500' : progress > 0 ? 'bg-blue-500' : 'bg-gray-300'
                      }`} 
                      style={{ width: `${progress}%` }} 
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">
                    {plan.stages.filter(s => s.completed).length} из {plan.stages.length} этапов
                  </span>
                  {currentStage && (
                    <span className="text-blue-600 truncate ml-2" title={currentStage.title}>
                      {currentStage.icon} {currentStage.title}
                    </span>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Пустой результат */}
      {filteredPlans.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-gray-500 text-lg">Планы не найдены</p>
          <p className="text-gray-400 text-sm mt-1">Попробуйте изменить параметры фильтрации</p>
        </div>
      )}

      {/* Selected Plan */}
      {selectedPlan && selectedPlant && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-4xl">{PLANT_TYPE_EMOJIS[selectedPlant.type]}</span>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{selectedPlant.name}</h2>
                    <p className="text-sm text-gray-500">{selectedPlant.latinName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600 mt-3 flex-wrap">
                  <span className="flex items-center gap-1">
                    <Sprout className="w-4 h-4" />
                    {selectedPlan.method === 'seeds' ? 'Выращивание из семян' : 'Размножение черенками'}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Начало: {new Date(selectedPlan.startDate).toLocaleDateString('ru-RU')}
                  </span>
                  <span className="flex items-center gap-1">
                    <TreePine className="w-4 h-4" />
                    {selectedPlant.height} см • {selectedPlant.age} лет
                  </span>
                  <span className="flex items-center gap-1">
                    📍 {selectedPlant.zone}
                  </span>
                </div>
                {selectedPlan.notes && (
                  <p className="text-sm text-gray-600 mt-3 bg-gray-50 px-3 py-2 rounded-lg">{selectedPlan.notes}</p>
                )}
              </div>
              <div className="text-center">
                <div className="relative w-24 h-24">
                  <svg className="w-24 h-24 -rotate-90">
                    <circle cx="48" cy="48" r="42" fill="none" stroke="#e5e7eb" strokeWidth="6" />
                    <circle cx="48" cy="48" r="42" fill="none" 
                      stroke={getProgress(selectedPlan) === 100 ? '#22c55e' : '#3b82f6'} 
                      strokeWidth="6"
                      strokeDasharray={`${2 * Math.PI * 42}`}
                      strokeDashoffset={`${2 * Math.PI * 42 * (1 - getProgress(selectedPlan) / 100)}`}
                      strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-gray-900">
                      {getProgress(selectedPlan)}%
                    </span>
                    <span className="text-xs text-gray-500">
                      {selectedPlan.stages.filter(s => s.completed).length}/{selectedPlan.stages.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Текущий этап */}
            {(() => {
              const currentStage = getCurrentStage(selectedPlan);
              if (currentStage) {
                return (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-start gap-3">
                      <span className="text-3xl">{currentStage.icon}</span>
                      <div className="flex-1">
                        <p className="text-xs font-medium text-blue-600 mb-1">Текущий этап</p>
                        <h3 className="text-lg font-semibold text-blue-900">{currentStage.title}</h3>
                        <p className="text-sm text-blue-700 mt-1">{currentStage.subtitle}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-blue-600">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {currentStage.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> {currentStage.season}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              } else if (getProgress(selectedPlan) === 100) {
                return (
                  <div className="mt-4 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                      <div>
                        <p className="text-xs font-medium text-emerald-600 mb-1">План завершён</p>
                        <h3 className="text-lg font-semibold text-emerald-900">Все этапы выполнены</h3>
                        <p className="text-sm text-emerald-700 mt-1">Растение прошло все этапы выращивания</p>
                      </div>
                    </div>
                  </div>
                );
              }
              return null;
            })()}
          </div>

          {/* Визуальная временная шкала */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Временная шкала этапов</h3>
            <div className="flex items-center gap-1 overflow-x-auto pb-2">
              {selectedPlan.stages.map((stage, index) => {
                const isCompleted = stage.completed;
                const isCurrent = !isCompleted && (index === 0 || selectedPlan.stages[index - 1].completed);
                
                return (
                  <div key={stage.id} className="flex items-center flex-shrink-0">
                    <div className="flex flex-col items-center">
                      <div 
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                          isCompleted ? 'bg-emerald-500 text-white' : 
                          isCurrent ? 'bg-blue-500 text-white ring-4 ring-blue-200' : 
                          'bg-gray-200 text-gray-400'
                        }`}
                      >
                        {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : stage.icon}
                      </div>
                      <p className={`text-xs mt-1 text-center max-w-[80px] truncate ${
                        isCompleted ? 'text-emerald-600 font-medium' : 
                        isCurrent ? 'text-blue-600 font-medium' : 
                        'text-gray-400'
                      }`}>
                        {stage.title}
                      </p>
                    </div>
                    {index < selectedPlan.stages.length - 1 && (
                      <div className={`w-8 h-0.5 mx-1 ${
                        isCompleted ? 'bg-emerald-500' : 'bg-gray-200'
                      }`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Stages */}
          <div className="space-y-3">
            {selectedPlan.stages.map((stage) => {
              const isExpanded = expandedStage === stage.id;
              return (
                <div key={stage.id} className={`bg-white rounded-xl shadow-sm border transition-all ${
                  stage.completed ? 'border-emerald-200 bg-emerald-50/30' : 'border-gray-100'
                }`}>
                  <div className="p-4 flex items-start gap-4">
                    <button onClick={() => toggleStage(stage.id)} className="flex-shrink-0">
                      {stage.completed ? (
                        <div className="w-9 h-9 bg-emerald-500 rounded-full flex items-center justify-center">
                          <CheckCircle2 className="w-5 h-5 text-white" />
                        </div>
                      ) : (
                        <div className="w-9 h-9 rounded-full flex items-center justify-center border-2 border-gray-300 bg-white">
                          <span className="text-sm font-bold text-gray-500">{stage.order}</span>
                        </div>
                      )}
                    </button>

                    <div className="flex-1">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="text-2xl">{stage.icon}</span>
                        <div className="flex-1">
                          <h3 className={`font-semibold ${stage.completed ? 'text-emerald-700 line-through' : 'text-gray-900'}`}>
                            {stage.title}
                          </h3>
                          <p className="text-sm text-gray-500">{stage.subtitle}</p>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {stage.duration}</span>
                          <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {stage.season}</span>
                        </div>
                        <button onClick={() => setExpandedStage(isExpanded ? null : stage.id)}
                          className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                          {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="px-4 pb-5 pt-2 border-t border-gray-100">
                      <p className="text-sm text-gray-700 mb-4">{stage.description}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-blue-50 rounded-xl p-4">
                          <h4 className="text-sm font-semibold text-blue-800 mb-3 flex items-center gap-2">
                            <Target className="w-4 h-4" /> Порядок действий
                          </h4>
                          <ol className="space-y-2">
                            {stage.steps.map((step, i) => (
                              <li key={i} className="flex gap-2 text-sm text-blue-700">
                                <span className="flex-shrink-0 w-5 h-5 bg-blue-200 rounded-full flex items-center justify-center text-xs font-bold">{i + 1}</span>
                                <span>{step}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
                        <div className="space-y-3">
                          <div className="bg-emerald-50 rounded-xl p-4">
                            <h4 className="text-sm font-semibold text-emerald-800 mb-2 flex items-center gap-2">
                              <Lightbulb className="w-4 h-4" /> Советы
                            </h4>
                            <ul className="space-y-1.5">
                              {stage.tips.map((tip, i) => (
                                <li key={i} className="text-sm text-emerald-700 flex gap-2">
                                  <span>💡</span><span>{tip}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          {stage.warnings.length > 0 && (
                            <div className="bg-red-50 rounded-xl p-4">
                              <h4 className="text-sm font-semibold text-red-800 mb-2 flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4" /> Внимание!
                              </h4>
                              <ul className="space-y-1.5">
                                {stage.warnings.map((warn, i) => (
                                  <li key={i} className="text-sm text-red-700 flex gap-2">
                                    <span>⚠️</span><span>{warn}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                      {(stage.temperature || stage.humidity) && (
                        <div className="flex gap-4 mt-4 flex-wrap">
                          {stage.temperature && (
                            <div className="flex items-center gap-2 px-3 py-2 bg-orange-50 rounded-lg">
                              <Thermometer className="w-4 h-4 text-orange-500" />
                              <span className="text-sm text-orange-700">Температура: {stage.temperature}</span>
                            </div>
                          )}
                          {stage.humidity && (
                            <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-lg">
                              <Droplets className="w-4 h-4 text-blue-500" />
                              <span className="text-sm text-blue-700">Влажность: {stage.humidity}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
