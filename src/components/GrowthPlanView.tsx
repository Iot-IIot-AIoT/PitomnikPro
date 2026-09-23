import { useState } from 'react';
import { Plant, GrowthPlan } from '../types';
import { PLANT_TYPE_EMOJIS } from '../data';
import { CheckCircle2, Circle, Clock, Calendar, Target, AlertTriangle, Lightbulb, Thermometer, Droplets, ChevronDown, ChevronRight, TreePine, Sprout } from 'lucide-react';

interface GrowthPlanViewProps {
  plants: Plant[];
  growthPlans: GrowthPlan[];
  onSaveGrowthPlans: (plans: GrowthPlan[]) => void;
}

export default function GrowthPlanView({ plants, growthPlans, onSaveGrowthPlans }: GrowthPlanViewProps) {
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(growthPlans[0]?.id || null);
  const [expandedStage, setExpandedStage] = useState<string | null>(null);

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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Планы выращивания</h1>
        <p className="text-gray-500 mt-1">Индивидуальные планы для каждого растения</p>
      </div>

      {/* Plans List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {growthPlans.map(plan => {
          const plant = plants.find(p => p.id === plan.plantId);
          if (!plant) return null;
          
          const progress = getProgress(plan);
          const isSelected = plan.id === selectedPlanId;
          
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
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs">
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">
                    {plan.method === 'seeds' ? '🌰 Семена' : '✂️ Черенки'}
                  </span>
                  <span className="text-gray-500">📍 {plant.zone}</span>
                </div>
                
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-500">Прогресс</span>
                    <span className="font-semibold text-gray-700">{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div 
                      className="bg-emerald-500 h-2 rounded-full transition-all" 
                      style={{ width: `${progress}%` }} 
                    />
                  </div>
                </div>
                
                <div className="text-xs text-gray-500">
                  {plan.stages.filter(s => s.completed).length} из {plan.stages.length} этапов
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Plan */}
      {selectedPlan && selectedPlant && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-4xl">{PLANT_TYPE_EMOJIS[selectedPlant.type]}</span>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{selectedPlant.name}</h2>
                    <p className="text-sm text-gray-500">{selectedPlant.latinName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600 mt-3">
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
                </div>
                {selectedPlan.notes && (
                  <p className="text-sm text-gray-600 mt-3 bg-gray-50 px-3 py-2 rounded-lg">{selectedPlan.notes}</p>
                )}
              </div>
              <div className="text-center">
                <div className="relative w-20 h-20">
                  <svg className="w-20 h-20 -rotate-90">
                    <circle cx="40" cy="40" r="35" fill="none" stroke="#e5e7eb" strokeWidth="6" />
                    <circle cx="40" cy="40" r="35" fill="none" stroke="#22c55e" strokeWidth="6"
                      strokeDasharray={`${2 * Math.PI * 35}`}
                      strokeDashoffset={`${2 * Math.PI * 35 * (1 - getProgress(selectedPlan) / 100)}`}
                      strokeLinecap="round" />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-emerald-600">
                    {getProgress(selectedPlan)}%
                  </span>
                </div>
              </div>
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
