import { useState } from 'react';
import { Plant, Task, GrowthPlan, PlantType, PlantHealth, PlantStatus, PlantHistoryEntry } from '../types';
import { PLANT_TYPE_LABELS, PLANT_TYPE_EMOJIS, HEALTH_LABELS, HEALTH_COLORS, STATUS_LABELS, STATUS_COLORS } from '../data';
import { Search, Filter, Plus, Edit2, Trash2, Eye, CheckCircle2, Clock, Sprout, History, TrendingUp, DollarSign } from 'lucide-react';

interface PlantListProps {
  plants: Plant[];
  tasks: Task[];
  growthPlans: GrowthPlan[];
  onAdd: () => void;
  onEdit: (plant: Plant) => void;
  onDelete: (id: string) => void;
}

export default function PlantList({ plants, tasks, growthPlans, onAdd, onEdit, onDelete }: PlantListProps) {
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<PlantType | ''>('');
  const [filterHealth, setFilterHealth] = useState<PlantHealth | ''>('');
  const [filterStatus, setFilterStatus] = useState<PlantStatus | ''>('');
  const [filterZone, setFilterZone] = useState('');
  const [filterProfitable, setFilterProfitable] = useState(false);
  const [sortBy, setSortBy] = useState<'name' | 'roi' | 'profit'>('name');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const zones = [...new Set(plants.map(p => p.zone))];

  const filtered = plants
    .filter(p => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.latinName.toLowerCase().includes(search.toLowerCase()) ||
        p.variety.toLowerCase().includes(search.toLowerCase());
      const matchType = !filterType || p.type === filterType;
      const matchHealth = !filterHealth || p.health === filterHealth;
      const matchStatus = !filterStatus || p.status === filterStatus;
      const matchZone = !filterZone || p.zone === filterZone;
      const matchProfitable = !filterProfitable || p.financials;
      return matchSearch && matchType && matchHealth && matchStatus && matchZone && matchProfitable;
    })
    .sort((a, b) => {
      if (sortBy === 'roi' && a.financials && b.financials) {
        return b.financials.roi - a.financials.roi;
      }
      if (sortBy === 'profit' && a.financials && b.financials) {
        return b.financials.profitPerUnit - a.financials.profitPerUnit;
      }
      return a.name.localeCompare(b.name);
    });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Каталог растений</h1>
          <p className="text-gray-500 mt-1">Управление коллекцией растений</p>
        </div>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors shadow-sm"
        >
          <Plus className="w-5 h-5" />
          Добавить растение
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex gap-3 items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск по названию, виду, сорту..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2.5 border rounded-lg transition-colors ${
              showFilters ? 'border-emerald-500 text-emerald-600 bg-emerald-50' : 'border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Filter className="w-5 h-5" />
            Фильтры
          </button>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mt-4 pt-4 border-t border-gray-100">
            <select
              value={filterType}
              onChange={e => setFilterType(e.target.value as PlantType | '')}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
            >
              <option value="">Все виды</option>
              {Object.entries(PLANT_TYPE_LABELS).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
            <button
              onClick={() => setFilterProfitable(!filterProfitable)}
              className={`flex items-center justify-center gap-2 px-3 py-2 border rounded-lg text-sm transition-colors ${
                filterProfitable 
                  ? 'border-emerald-500 text-emerald-700 bg-emerald-50' 
                  : 'border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <DollarSign className="w-4 h-4" />
              Только прибыльные
            </button>
            <select
              value={filterHealth}
              onChange={e => setFilterHealth(e.target.value as PlantHealth | '')}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
            >
              <option value="">Все состояния</option>
              {Object.entries(HEALTH_LABELS).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>

            <select
              value={filterZone}
              onChange={e => setFilterZone(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
            >
              <option value="">Все зоны</option>
              {zones.map(z => (
                <option key={z} value={z}>{z}</option>
              ))}
            </select>
            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value as PlantStatus | '')}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
            >
              <option value="">Все статусы</option>
              {Object.entries(STATUS_LABELS).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as 'name' | 'roi' | 'profit')}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
            >
              <option value="name">По названию</option>
              <option value="roi">По ROI</option>
              <option value="profit">По прибыли</option>
            </select>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Найдено: <span className="font-semibold text-gray-700">{filtered.length}</span> растений
          {filterProfitable && <span className="ml-2 text-emerald-600">💰 Только прибыльные</span>}
        </p>
        {filterProfitable && (
          <div className="text-sm text-emerald-600 font-medium">
            Средняя прибыль: {Math.round(filtered.reduce((sum, p) => sum + (p.financials?.profitPerUnit || 0), 0) / filtered.filter(p => p.financials).length) || 0} ₽
          </div>
        )}
      </div>

      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
            <div className="text-5xl mb-4">🌱</div>
            <p className="text-gray-500 text-lg">Нет растений</p>
            <p className="text-gray-400 text-sm mt-1">Добавьте первое растение или сбросьте фильтры</p>
            {(search || filterType || filterHealth || filterStatus || filterZone || filterProfitable) && (
              <button
                onClick={() => {
                  setSearch('');
                  setFilterType('');
                  setFilterHealth('');
                  setFilterStatus('');
                  setFilterZone('');
                  setFilterProfitable(false);
                }}
                className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm"
              >
                Сбросить фильтры
              </button>
            )}
          </div>
        )}
        {filtered.map(plant => (
          <div
            key={plant.id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="p-4 flex items-center gap-4">
              <div className="text-3xl w-12 h-12 flex items-center justify-center bg-emerald-50 rounded-xl">
                {PLANT_TYPE_EMOJIS[plant.type]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold text-gray-900 truncate">{plant.name}</h3>
                  <span className="text-xs text-gray-400 italic">{plant.latinName}</span>
                </div>
                <div className="flex items-center gap-3 mt-1 flex-wrap">
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: `${HEALTH_COLORS[plant.health]}20`, color: HEALTH_COLORS[plant.health] }}>
                    {HEALTH_LABELS[plant.health]}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: `${STATUS_COLORS[plant.status]}20`, color: STATUS_COLORS[plant.status] }}>
                    {STATUS_LABELS[plant.status]}
                  </span>
                  {(() => {
                    const growthPlan = growthPlans.find(p => p.plantId === plant.id);
                    if (growthPlan) {
                      const completedStages = growthPlan.stages.filter(s => s.completed).length;
                      const totalStages = growthPlan.stages.length;
                      const progress = Math.round((completedStages / totalStages) * 100);
                      return (
                        <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-blue-100 text-blue-700 flex items-center gap-1">
                          <Sprout className="w-3 h-3" />
                          {growthPlan.method === 'seeds' ? '🌰 Семена' : '✂️ Черенки'} • {progress}%
                        </span>
                      );
                    }
                    return null;
                  })()}
                  <span className="text-xs text-gray-500">📍 {plant.zone}</span>
                  <span className="text-xs text-gray-500">📏 {plant.height} см</span>
                  {plant.financials && (
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-emerald-100 text-emerald-700 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      ROI {plant.financials.roi}% • {plant.financials.profitPerUnit}₽
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setExpandedId(expandedId === plant.id ? null : plant.id)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Подробнее"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onEdit(plant)}
                  className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Редактировать"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDelete(plant.id)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Удалить"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {expandedId === plant.id && (
              <div className="px-4 pb-4 pt-2 border-t border-gray-100 bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Сорт</p>
                    <p className="text-sm font-medium text-gray-800">{plant.variety}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Дата посадки</p>
                    <p className="text-sm font-medium text-gray-800">{new Date(plant.plantedDate).toLocaleDateString('ru-RU')}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Последний полив</p>
                    <p className="text-sm font-medium text-gray-800">{new Date(plant.lastWatered).toLocaleDateString('ru-RU')}</p>
                  </div>
                </div>
                {plant.notes && (
                  <div className="mt-3">
                    <p className="text-xs text-gray-500 mb-1">Заметки</p>
                    <p className="text-sm text-gray-700 bg-white p-3 rounded-lg border border-gray-100">{plant.notes}</p>
                  </div>
                )}

                {/* Финансовые показатели */}
                {plant.financials && (
                  <div className="mt-4 p-4 bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg border border-emerald-200">
                    <p className="text-sm font-semibold text-emerald-800 mb-3 flex items-center gap-2">
                      <DollarSign className="w-4 h-4" /> Финансовые показатели
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                      <div>
                        <p className="text-xs text-emerald-600 mb-1">Себестоимость</p>
                        <p className="text-lg font-bold text-gray-900">{plant.financials.costPerUnit} ₽</p>
                      </div>
                      <div>
                        <p className="text-xs text-emerald-600 mb-1">Цена продажи</p>
                        <p className="text-lg font-bold text-blue-600">{plant.financials.sellingPrice} ₽</p>
                      </div>
                      <div>
                        <p className="text-xs text-emerald-600 mb-1">Прибыль</p>
                        <p className="text-lg font-bold text-emerald-600">{plant.financials.profitPerUnit} ₽</p>
                      </div>
                      <div>
                        <p className="text-xs text-emerald-600 mb-1">ROI</p>
                        <p className="text-lg font-bold text-purple-600">{plant.financials.roi}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-emerald-600 mb-1">Окупаемость</p>
                        <p className="text-lg font-bold text-amber-600">{plant.financials.paybackMonths} мес</p>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-emerald-200">
                      <p className="text-xs text-emerald-700">
                        💡 Спрос: <span className="font-semibold">
                          {plant.financials.demand === 'very-high' ? 'Очень высокий 🔥' : 
                           plant.financials.demand === 'high' ? 'Высокий 📈' : 
                           plant.financials.demand === 'medium' ? 'Средний 📊' : 'Низкий 📉'}
                        </span>
                      </p>
                    </div>
                  </div>
                )}
                
                {/* Связанные задачи */}
                {(() => {
                  const plantTasks = tasks.filter(t => t.plantId === plant.id);
                  const growthPlan = growthPlans.find(p => p.plantId === plant.id);
                  
                  return (
                    <>
                      {plantTasks.length > 0 && (
                        <div className="mt-4">
                          <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                            <Clock className="w-3 h-3" /> Задачи ({plantTasks.length})
                          </p>
                          <div className="space-y-2">
                            {plantTasks.map(task => (
                              <div key={task.id} className="flex items-center gap-2 p-2 bg-white rounded-lg border border-gray-100">
                                {task.completed ? (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                                ) : (
                                  <Clock className="w-4 h-4 text-amber-500 flex-shrink-0" />
                                )}
                                <div className="flex-1 min-w-0">
                                  <p className={`text-sm ${task.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                                    {task.type === 'watering' ? '💧' : task.type === 'fertilizing' ? '🧪' : task.type === 'pruning' ? '✂️' : task.type === 'transplanting' ? '🔄' : '🔍'} {task.notes || task.type}
                                  </p>
                                  <p className="text-xs text-gray-500">{new Date(task.dueDate).toLocaleDateString('ru-RU')}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* План выращивания */}
                      {growthPlan && (
                        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                          <p className="text-xs font-semibold text-blue-700 mb-2 flex items-center gap-1">
                            <Sprout className="w-3 h-3" /> План выращивания
                          </p>
                          <div className="space-y-1 text-xs text-blue-600">
                            <p><strong>Метод:</strong> {growthPlan.method === 'seeds' ? '🌰 Из семян' : '✂️ Черенкование'}</p>
                            <p><strong>Этапов:</strong> {growthPlan.stages.length}</p>
                            <p><strong>Выполнено:</strong> {growthPlan.stages.filter(s => s.completed).length} из {growthPlan.stages.length}</p>
                            {growthPlan.notes && <p className="mt-2 text-blue-500">{growthPlan.notes}</p>}
                          </div>
                        </div>
                      )}

                      {/* История изменений */}
                      {plant.history && plant.history.length > 0 && (
                        <div className="mt-4">
                          <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                            <History className="w-3 h-3" /> История изменений ({plant.history.length})
                          </p>
                          <div className="space-y-2 max-h-40 overflow-y-auto">
                            {plant.history.slice(0, 5).map((entry: PlantHistoryEntry) => (
                              <div key={entry.id} className="flex items-start gap-2 p-2 bg-white rounded-lg border border-gray-100 text-xs">
                                <span className="text-gray-400 flex-shrink-0">
                                  {new Date(entry.date).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' })}
                                </span>
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-gray-700">{entry.action}</p>
                                  {entry.details && <p className="text-gray-500 truncate">{entry.details}</p>}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  );
                })()}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
