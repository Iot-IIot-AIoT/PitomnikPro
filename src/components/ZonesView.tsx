import { Plant, Zone } from '../types';
import { MapPin, TreePine, AlertCircle } from 'lucide-react';

interface ZonesViewProps {
  zones: Zone[];
  plants: Plant[];
}

export default function ZonesView({ zones, plants }: ZonesViewProps) {
  const getZonePlants = (zoneName: string) => plants.filter(p => p.zone === zoneName);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Зоны посадки</h1>
        <p className="text-gray-500 mt-1">Распределение растений по зонам питомника</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {zones.map(zone => {
          const zonePlants = getZonePlants(zone.name);
          const fillPercent = Math.round((zone.currentCount / zone.capacity) * 100);
          const healthGood = zonePlants.filter(p => p.health === 'excellent' || p.health === 'good').length;
          const healthBad = zonePlants.filter(p => p.health === 'poor' || p.health === 'critical').length;

          return (
            <div key={zone.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 bg-emerald-50 rounded-xl">
                  <MapPin className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{zone.name}</h3>
                  <p className="text-xs text-gray-500">{zone.description}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500">Заполненность</span>
                    <span className="font-semibold text-gray-700">{zone.currentCount}/{zone.capacity}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full transition-all ${
                        fillPercent > 80 ? 'bg-red-500' : fillPercent > 50 ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${fillPercent}%` }}
                    />
                  </div>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-1 text-green-600">
                    <TreePine className="w-3.5 h-3.5" />
                    Здоровые: {healthGood}
                  </span>
                  {healthBad > 0 && (
                    <span className="flex items-center gap-1 text-red-600">
                      <AlertCircle className="w-3.5 h-3.5" />
                      Проблемные: {healthBad}
                    </span>
                  )}
                </div>

                <div className="pt-3 border-t border-gray-100">
                  <p className="text-xs text-gray-500 mb-2">Растения в зоне:</p>
                  <div className="space-y-1.5">
                    {zonePlants.map(plant => (
                      <div key={plant.id} className="flex items-center gap-2 text-sm">
                        <span className="text-base">🌲</span>
                        <span className="text-gray-700 truncate flex-1">{plant.name}</span>
                        <span className="text-xs text-gray-400">{plant.height}см</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Сводка по зонам</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-emerald-50 rounded-xl">
            <p className="text-2xl font-bold text-emerald-700">{zones.reduce((s, z) => s + z.capacity, 0)}</p>
            <p className="text-sm text-emerald-600">Общая вместимость</p>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-xl">
            <p className="text-2xl font-bold text-blue-700">{zones.reduce((s, z) => s + z.currentCount, 0)}</p>
            <p className="text-sm text-blue-600">Занято мест</p>
          </div>
          <div className="text-center p-4 bg-amber-50 rounded-xl">
            <p className="text-2xl font-bold text-amber-700">{zones.reduce((s, z) => s + z.capacity, 0) - zones.reduce((s, z) => s + z.currentCount, 0)}</p>
            <p className="text-sm text-amber-600">Свободных мест</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-xl">
            <p className="text-2xl font-bold text-purple-700">{Math.round((zones.reduce((s, z) => s + z.currentCount, 0) / zones.reduce((s, z) => s + z.capacity, 0)) * 100)}%</p>
            <p className="text-sm text-purple-600">Загруженность</p>
          </div>
        </div>
      </div>
    </div>
  );
}
