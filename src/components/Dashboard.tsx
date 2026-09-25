import type { ReactNode } from 'react';
import { Plant, Task, Zone } from '../types';
import { PLANT_TYPE_LABELS, PLANT_TYPE_EMOJIS, HEALTH_COLORS, STATUS_LABELS, STATUS_COLORS } from '../data';
import { PlantType } from '../types';
import { TreePine, Droplets, AlertTriangle, CheckCircle2, TrendingUp, Leaf } from 'lucide-react';

interface DashboardProps {
  plants: Plant[];
  zones: Zone[];
  tasks: Task[];
}

export default function Dashboard({ plants, zones, tasks }: DashboardProps) {
  const activePlants = plants.filter(p => p.status === 'growing');
  const poorHealth = plants.filter(p => p.health === 'poor' || p.health === 'critical');
  const pendingTasks = tasks.filter(t => !t.completed);
  const totalHeight = plants.reduce((sum, p) => sum + p.height, 0);
  const avgHeight = plants.length > 0 ? Math.round(totalHeight / plants.length) : 0;

  const typeCounts = plants.reduce((acc, p) => {
    acc[p.type] = (acc[p.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const statusCounts = plants.reduce((acc, p) => {
    acc[p.status] = (acc[p.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Панель управления</h1>
          <p className="text-gray-500 mt-1">Обзор вашего питомника</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Сегодня</p>
          <p className="text-lg font-semibold text-gray-700">{new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<TreePine className="w-6 h-6" />}
          label="Всего растений"
          value={plants.length}
          sublabel={`${activePlants.length} активный рост`}
          color="bg-emerald-50 text-emerald-600"
          iconBg="bg-emerald-100"
        />
        <StatCard
          icon={<Droplets className="w-6 h-6" />}
          label="Зоны посадки"
          value={zones.length}
          sublabel={`${zones.reduce((s, z) => s + z.currentCount, 0)} / ${zones.reduce((s, z) => s + z.capacity, 0)} мест`}
          color="bg-blue-50 text-blue-600"
          iconBg="bg-blue-100"
        />
        <StatCard
          icon={<AlertTriangle className="w-6 h-6" />}
          label="Требуют внимания"
          value={poorHealth.length}
          sublabel="Плохое здоровье"
          color="bg-amber-50 text-amber-600"
          iconBg="bg-amber-100"
        />
        <StatCard
          icon={<CheckCircle2 className="w-6 h-6" />}
          label="Задачи"
          value={pendingTasks.length}
          sublabel={`${tasks.filter(t => t.completed).length} выполнено`}
          color="bg-purple-50 text-purple-600"
          iconBg="bg-purple-100"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Leaf className="w-5 h-5 text-emerald-500" />
            Виды растений
          </h3>
          <div className="space-y-3">
            {Object.entries(typeCounts).sort((a, b) => b[1] - a[1]).map(([type, count]) => (
              <div key={type} className="flex items-center gap-3">
                <span className="text-xl">{PLANT_TYPE_EMOJIS[type as PlantType]}</span>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">{PLANT_TYPE_LABELS[type as PlantType]}</span>
                    <span className="text-sm text-gray-500">{count} шт.</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className="bg-emerald-500 h-2 rounded-full transition-all"
                      style={{ width: `${(count / plants.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-500" />
            Статусы
          </h3>
          <div className="space-y-3">
            {Object.entries(statusCounts).map(([status, count]) => (
              <div key={status} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: STATUS_COLORS[status as keyof typeof STATUS_COLORS] }} />
                  <span className="text-sm font-medium text-gray-700">{STATUS_LABELS[status as keyof typeof STATUS_LABELS]}</span>
                </div>
                <span className="text-lg font-bold text-gray-800">{count}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Средняя высота</span>
              <span className="font-semibold text-gray-700">{avgHeight} см</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            Ближайшие задачи
          </h3>
          <div className="space-y-3">
            {pendingTasks.slice(0, 5).map(task => {
              const plant = plants.find(p => p.id === task.plantId);
              return (
                <div key={task.id} className="p-3 rounded-lg bg-gray-50 border border-gray-100">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      {plant && <span className="text-sm">{PLANT_TYPE_EMOJIS[plant.type]}</span>}
                      <span className="text-sm font-medium text-gray-800">{task.plantName}</span>
                    </div>
                    <span className="text-xs text-gray-500">{new Date(task.dueDate).toLocaleDateString('ru-RU')}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                      {task.type === 'watering' ? '💧 Полив' : task.type === 'fertilizing' ? '🧪 Подкормка' : task.type === 'pruning' ? '✂️ Обрезка' : task.type === 'transplanting' ? '🔄 Пересадка' : '🔍 Осмотр'}
                    </span>
                    {plant && <span className="text-xs text-gray-500">📍 {plant.zone}</span>}
                  </div>
                  <p className="text-xs text-gray-500">{task.notes}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, sublabel, color, iconBg }: {
  icon: ReactNode;
  label: string;
  value: number | string;
  sublabel: string;
  color: string;
  iconBg: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-xl ${iconBg} ${color.split(' ')[1]}`}>
          {icon}
        </div>
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <p className="text-xs text-gray-400 mt-0.5">{sublabel}</p>
        </div>
      </div>
    </div>
  );
}
