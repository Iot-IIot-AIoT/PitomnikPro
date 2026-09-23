import { useState } from 'react';
import { GrowthPlan, PlantType } from '../types';
import { PLANT_TYPE_LABELS } from '../data';
import { CheckCircle2, Circle, Plus, Trash2, Clock, Calendar, Target, AlertTriangle, Lightbulb, Thermometer, Droplets, ChevronDown, ChevronRight } from 'lucide-react';

const SEED_STAGES = [
  {
    id: 's1', order: 1, title: 'Сбор и подготовка семян', subtitle: 'Заготовка посадочного материала',
    icon: '🌰', duration: '2–4 недели', season: 'Осень',
    description: 'Сбор зрелых шишек, извлечение семян, очистка и сортировка.',
    steps: ['Собрать зрелые шишки с здоровых деревьев', 'Высушить 3–5 дней при комнатной температуре', 'Извлечь семена и отсортировать', 'Обработать фунгицидом'],
    tips: ['Собирайте с деревьев старше 10 лет', 'Семена сосны сохраняют всхожесть 2–3 года'],
    warnings: ['Не собирайте с больных деревьев'],
    temperature: '15–20°C', humidity: '40–50%',
  },
  {
    id: 's2', order: 2, title: 'Стратификация', subtitle: 'Холодная обработка',
    icon: '❄️', duration: '30–90 дней', season: 'Зима',
    description: 'Имитация зимних условий для пробуждения зародыша.',
    steps: ['Замочить семена на 24–48 часов', 'Смешать с влажным песком (1:3)', 'Хранить в холодильнике при +2...+5°C', 'Проверять влажность каждые 7–10 дней'],
    tips: ['Сосна: 30–45 дней', 'Ель: 45–60 дней', 'Можжевельник: 90–120 дней'],
    warnings: ['Не допускайте пересыхания', 'При температуре выше +7°C могут заплесневеть'],
    temperature: '+2...+5°C', humidity: '60–70%',
  },
  {
    id: 's3', order: 3, title: 'Посев', subtitle: 'Высадка в субстрат',
    icon: '🌱', duration: '1–2 дня', season: 'Весна',
    description: 'Посев стратифицированных семян в подготовленный субстрат.',
    steps: ['Подготовить субстрат: торф + песок + перлит (2:1:1)', 'Пролить тёплой водой', 'Разложить семена на расстоянии 2–3 см', 'Присыпать слоем 0.5–2 см', 'Накрыть плёнкой'],
    tips: ['Глубина заделки: диаметр семени × 2', 'Температура прорастания: +22...+25°C'],
    warnings: ['Не заглубляйте слишком сильно', 'Избегайте прямого солнца'],
    temperature: '+20...+25°C', humidity: '80–90%',
  },
  {
    id: 's4', order: 4, title: 'Проращивание', subtitle: 'Уход за всходами',
    icon: '🌿', duration: '2–6 недель', season: 'Весна',
    description: 'Период от появления всходов до раскрытия семядолей.',
    steps: ['Снять укрытие после появления 50% всходов', 'Обеспечить свет 12–14 часов', 'Поливать из пульверизатора', 'Провести профилактику от чёрной ножки'],
    tips: ['Всходы появляются через 10–25 дней', 'Первые 2 недели поливайте только из пульверизатора'],
    warnings: ['Чёрная ножка — главный враг сеянцев', 'Пересушка губительна'],
    temperature: '+18...+22°C', humidity: '70–80%',
  },
  {
    id: 's5', order: 5, title: 'Пикировка', subtitle: 'Пересадка сеянцев',
    icon: '🪴', duration: '3–5 дней', season: 'Весна–лето',
    description: 'Пересадка в индивидуальные ёмкости для развития корневой системы.',
    steps: ['За 2 часа обильно полить сеянцы', 'Подготовить стаканчики 200–300 мл', 'Укоротить центральный корень на 1/3', 'Высадить на ту же глубину', 'Полить раствором «Корневина»'],
    tips: ['Пикируйте в пасмурную погоду', 'Схема: 5×5 см на гряде'],
    warnings: ['Не допускайте подсыхания корней', 'Не заглубляйте корневую шейку'],
    temperature: '+16...+20°C', humidity: '75–85%',
  },
  {
    id: 's6', order: 6, title: 'Доращивание', subtitle: 'Формирование корневой системы',
    icon: '🌲', duration: '1–2 года', season: 'Круглогодично',
    description: 'Основной период роста. Формируется корневая система.',
    steps: ['Высадить в школку с шагом 15×20 см', 'Мульчировать корой 3–5 см', 'Поливать 1–2 раза в неделю', 'Подкармливать каждые 3–4 недели', 'Подготовить к зиме'],
    tips: ['Прирост первого года: 3–7 см', 'Осенью только калий и фосфор'],
    warnings: ['Не перекармливайте азотом осенью', 'Защитите от весенних ожогов'],
  },
  {
    id: 's7', order: 7, title: 'Пересадка в контейнеры', subtitle: 'Подготовка к продаже',
    icon: '📦', duration: '1 день', season: 'Весна или осень',
    description: 'Перевалка в торговые контейнеры для продажи.',
    steps: ['Выбрать контейнер по размеру', 'На дно дренаж 2–3 см', 'Перевалить с комом земли', 'Заполнить субстратом', 'Полить и притенить на 7–10 дней'],
    tips: ['C2 (2 л) — для 15–30 см', 'C5 (5 л) — для 30–60 см'],
    warnings: ['Не повреждайте земляной ком', 'Зимой контейнеры промерзают'],
  },
  {
    id: 's8', order: 8, title: 'Реализация', subtitle: 'Продажа или высадка',
    icon: '🏡', duration: 'По мере готовности', season: 'Круглогодично',
    description: 'Финальный этап — продажа готового саженца.',
    steps: ['Оценить качество', 'Составить паспорт растения', 'Сфотографировать', 'Подготовить рекомендации по уходу'],
    tips: ['Оптимальный возраст: 3–5 лет', 'Саженцы с ЗКС приживаются в 3 раза лучше'],
    warnings: ['Не продавайте больные растения'],
  },
];

const CUTTING_STAGES = [
  {
    id: 'c1', order: 1, title: 'Заготовка черенков', subtitle: 'Нарезка материала',
    icon: '✂️', duration: '1 день', season: 'Весна или осень',
    description: 'Нарезка полуодревесневших черенков с материнских растений.',
    steps: ['Нарезать черенки 10–15 см с «пяткой»', 'Удалить хвою в нижней трети', 'Обработать стимулятором корнеобразования', 'Поместить в субстрат'],
    tips: ['Черенки с «пяткой» укореняются в 2 раза лучше', 'Нарезайте рано утром'],
    warnings: ['Не используйте верхушечные побеги'],
    temperature: '+15...+20°C', humidity: '90–100%',
  },
  {
    id: 'c2', order: 2, title: 'Укоренение', subtitle: 'Формирование корней',
    icon: '🌱', duration: '1–6 месяцев', season: 'Круглогодично',
    description: 'Создание оптимальных условий для образования корней.',
    steps: ['Подготовить субстрат: перлит + торф (1:1)', 'Высадить под углом 45°', 'Создать туманообразующую установку', 'Поддерживать +20...+24°C', 'Опрыскивать 3–5 раз в день'],
    tips: ['Можжевельник: 1–2 месяца', 'Туя: 2–3 месяца', 'Нижний подогрев ускоряет на 30%'],
    warnings: ['Перелив вызывает загнивание', 'При +28°C черенки перегреваются'],
    temperature: '+20...+24°C', humidity: '90–100%',
  },
  {
    id: 'c3', order: 3, title: 'Доращивание', subtitle: 'Адаптация и рост',
    icon: '🌿', duration: '1–2 года', season: 'Круглогодично',
    description: 'Адаптация к обычным условиям и интенсивный рост.',
    steps: ['Постепенно снять укрытие', 'Пересадить в стаканчики', 'Поливать умеренно', 'Подкармливать слабым раствором', 'Высадить в школку'],
    tips: ['Первый месяц — самый критичный', 'Прирост: 3–10 см'],
    warnings: ['Резкое снятие укрытия — шок'],
    temperature: '+15...+22°C', humidity: '70–80%',
  },
  {
    id: 'c4', order: 4, title: 'Реализация', subtitle: 'Подготовка к продаже',
    icon: '🌲', duration: '1–2 года', season: 'Круглогодично',
    description: 'Финальное формирование и подготовка к продаже.',
    steps: ['Пересадить в контейнер', 'Начать формирующую обрезку', 'Оценить товарные качества', 'Подготовить к реализации'],
    tips: ['Оптимальный возраст: 2–4 года', 'Маркируйте каждый сорт'],
    warnings: ['Проверьте, что корни оплели ком'],
  },
];

const DEFAULT_PLANS: GrowthPlan[] = [
  {
    id: 'plan-1', plantName: 'Сосна обыкновенная', plantType: 'pine', method: 'seeds',
    startDate: '2024-09-01', stages: SEED_STAGES.map(s => ({ ...s, completed: false })),
    notes: 'Классический цикл из семян. Стратификация 45 дней.',
  },
  {
    id: 'plan-2', plantName: 'Туя западная Смарагд', plantType: 'thuja', method: 'cuttings',
    startDate: '2024-04-15', stages: CUTTING_STAGES.map(s => ({ ...s, completed: false })),
    notes: 'Размножение черенками. Укореняемость до 90%.',
  },
];

export default function GrowthPlanView() {
  const [plans, setPlans] = useState<GrowthPlan[]>(() => {
    const saved = localStorage.getItem('growth-plans');
    return saved ? JSON.parse(saved) : DEFAULT_PLANS;
  });
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(plans[0]?.id || null);
  const [expandedStage, setExpandedStage] = useState<string | null>(null);

  const selectedPlan = plans.find(p => p.id === selectedPlanId);

  const savePlans = (updated: GrowthPlan[]) => {
    setPlans(updated);
    localStorage.setItem('growth-plans', JSON.stringify(updated));
  };

  const toggleStage = (stageId: string) => {
    if (!selectedPlan) return;
    const updated = plans.map(p => {
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
        <h1 className="text-3xl font-bold text-gray-900">План выращивания</h1>
        <p className="text-gray-500 mt-1">Поэтапное руководство от семян до реализации</p>
      </div>

      {/* Plans List */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {plans.map(plan => {
          const progress = getProgress(plan);
          const isSelected = plan.id === selectedPlanId;
          return (
            <button
              key={plan.id}
              onClick={() => setSelectedPlanId(plan.id)}
              className={`flex-shrink-0 p-4 rounded-xl border-2 transition-all min-w-[200px] text-left ${
                isSelected ? 'border-emerald-500 bg-emerald-50 shadow-md' : 'border-gray-100 bg-white hover:border-gray-200'
              }`}
            >
              <p className="text-sm font-semibold text-gray-900 truncate">{plan.plantName}</p>
              <p className="text-xs text-gray-500 mb-2">
                {plan.method === 'seeds' ? '🌰 Семена' : '✂️ Черенки'} • {PLANT_TYPE_LABELS[plan.plantType]}
              </p>
              <div className="w-full bg-gray-100 rounded-full h-2 mb-1">
                <div className="bg-emerald-500 h-2 rounded-full transition-all" style={{ width: `${progress}%` }} />
              </div>
              <span className="text-xs text-gray-500">{progress}%</span>
            </button>
          );
        })}
      </div>

      {/* Selected Plan */}
      {selectedPlan && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{selectedPlan.plantName}</h2>
                <p className="text-sm text-gray-500 mt-1">
                  {selectedPlan.method === 'seeds' ? '🌰 Выращивание из семян' : '✂️ Размножение черенками'} •
                  Начало: {new Date(selectedPlan.startDate).toLocaleDateString('ru-RU')}
                </p>
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
