import { useState, useEffect } from 'react';
import { Plant, PlantType, PlantHealth, PlantStatus } from '../types';
import { PLANT_TYPE_LABELS, HEALTH_LABELS, STATUS_LABELS } from '../data';
import { X, Save } from 'lucide-react';

interface PlantFormProps {
  plant?: Plant | null;
  onSave: (plant: Plant) => void;
  onCancel: () => void;
}

export default function PlantForm({ plant, onSave, onCancel }: PlantFormProps) {
  const [form, setForm] = useState<Partial<Plant>>({
    name: '',
    latinName: '',
    type: 'pine',
    variety: '',
    health: 'good',
    status: 'growing',
    zone: 'Зона А',
    plantedDate: new Date().toISOString().split('T')[0],
    height: 0,
    age: 1,
    notes: '',
    lastWatered: new Date().toISOString().split('T')[0],
    lastFertilized: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    if (plant) {
      setForm(plant);
    }
  }, [plant]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPlant: Plant = {
      id: plant?.id || Date.now().toString(36) + Math.random().toString(36).substr(2),
      name: form.name || '',
      latinName: form.latinName || '',
      type: form.type as PlantType,
      variety: form.variety || '',
      health: form.health as PlantHealth,
      status: form.status as PlantStatus,
      zone: form.zone || 'Зона А',
      plantedDate: form.plantedDate || new Date().toISOString().split('T')[0],
      height: form.height || 0,
      age: form.age || 1,
      notes: form.notes || '',
      lastWatered: form.lastWatered || new Date().toISOString().split('T')[0],
      lastFertilized: form.lastFertilized || new Date().toISOString().split('T')[0],
    };
    onSave(newPlant);
  };

  const updateField = (field: string, value: string | number) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl z-10">
          <h2 className="text-xl font-bold text-gray-900">
            {plant ? 'Редактировать растение' : 'Новое растение'}
          </h2>
          <button onClick={onCancel} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Название *</label>
              <input
                type="text"
                value={form.name}
                onChange={e => updateField('name', e.target.value)}
                required
                placeholder="Сосна горная Мугус"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Латинское название</label>
              <input
                type="text"
                value={form.latinName}
                onChange={e => updateField('latinName', e.target.value)}
                placeholder="Pinus mugo Mughus"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Вид *</label>
              <select
                value={form.type}
                onChange={e => updateField('type', e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
              >
                {Object.entries(PLANT_TYPE_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Сорт</label>
              <input
                type="text"
                value={form.variety}
                onChange={e => updateField('variety', e.target.value)}
                placeholder="Mughus"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Зона</label>
              <select
                value={form.zone}
                onChange={e => updateField('zone', e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
              >
                <option value="Зона А">Зона А</option>
                <option value="Зона Б">Зона Б</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Здоровье</label>
              <select
                value={form.health}
                onChange={e => updateField('health', e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
              >
                {Object.entries(HEALTH_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Статус</label>
              <select
                value={form.status}
                onChange={e => updateField('status', e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
              >
                {Object.entries(STATUS_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Высота (см)</label>
              <input
                type="number"
                value={form.height}
                onChange={e => updateField('height', parseInt(e.target.value) || 0)}
                min={0}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Заметки</label>
            <textarea
              value={form.notes}
              onChange={e => updateField('notes', e.target.value)}
              rows={3}
              placeholder="Особенности ухода, наблюдения, проблемы..."
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none resize-none"
            />
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-100">
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
            >
              <Save className="w-5 h-5" />
              {plant ? 'Сохранить изменения' : 'Добавить растение'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
