import { useState } from 'react';
import { Rocket, Target, DollarSign, Calendar, TrendingUp, AlertTriangle, CheckCircle2, Clock, Users, MapPin, Package, BarChart3 } from 'lucide-react';

interface MVPPhase {
  id: string;
  phase: number;
  title: string;
  duration: string;
  budget: string;
  description: string;
  tasks: string[];
  kpi: string[];
  risks: string[];
  priority: 'critical' | 'high' | 'medium';
}

const MVP_PHASES: MVPPhase[] = [
  {
    id: 'phase-1',
    phase: 1,
    title: 'Подготовка и анализ',
    duration: '1-2 месяца',
    budget: '50 000 - 100 000 ₽',
    description: 'Анализ рынка, выбор участка, регистрация бизнеса, разработка бизнес-плана',
    tasks: [
      'Изучить конкурентов в радиусе 50 км',
      'Определить целевую аудиторию (частники, дизайнеры, застройщики)',
      'Найти участок 0.5-1 га с хорошей почвой и доступом к воде',
      'Зарегистрировать ИП или ООО',
      'Открыть расчётный счёт',
      'Разработать бизнес-план на 3 года',
      'Определить ассортимент (10-15 видов для старта)',
      'Найти поставщиков субстрата, удобрений, контейнеров',
    ],
    kpi: [
      'Участок найден и арендован/куплен',
      'Бизнес зарегистрирован',
      'Бизнес-план готов',
      'Ассортимент определён',
    ],
    risks: [
      'Неправильный выбор участка (плохая почва, нет воды)',
      'Недооценка конкурентов',
      'Ошибки в бизнес-плане',
    ],
    priority: 'critical',
  },
  {
    id: 'phase-2',
    phase: 2,
    title: 'Инфраструктура',
    duration: '2-3 месяца',
    budget: '300 000 - 500 000 ₽',
    description: 'Подготовка участка, строительство теплицы, система полива, закупка оборудования',
    tasks: [
      'Очистка и планировка участка',
      'Установка теплицы 50-100 м² (каркасной или поликарбонатной)',
      'Монтаж системы капельного полива',
      'Организация водоснабжения (скважина или подключение)',
      'Закупка инструментов (лопаты, секаторы, тачки)',
      'Закупка субстрата (торф, перлит, кора) - 5-10 тонн',
      'Закупка контейнеров C1, C2, C5 - 1000-2000 шт',
      'Организация зоны хранения',
      'Установка signage (указатели, вывеска)',
    ],
    kpi: [
      'Теплица готова и введена в эксплуатацию',
      'Система полива работает',
      'Инструменты и материалы закуплены',
      'Участок готов к посадке',
    ],
    risks: [
      'Превышение бюджета на инфраструктуру',
      'Задержки в строительстве',
      'Некачественное оборудование',
    ],
    priority: 'critical',
  },
  {
    id: 'phase-3',
    phase: 3,
    title: 'Закупка маточников',
    duration: '1 месяц',
    budget: '150 000 - 300 000 ₽',
    description: 'Закупка маточных растений для размножения, создание маточника',
    tasks: [
      'Закупить маточники приоритетных культур (10-15 видов)',
      'Приоритет: туя, можжевельник, гортензия, спирея',
      'Выбрать здоровые растения без болезней',
      'Транспортировка с соблюдением условий',
      'Посадка маточников в маточнике',
      'Организация ухода (полив, подкормки)',
      'Маркировка каждого растения',
      'Ведение журнала состояния маточников',
    ],
    kpi: [
      '50-100 маточных растений закуплено',
      'Все растения прижились (>95%)',
      'Маточник организован и маркирован',
    ],
    risks: [
      'Гибель маточников при транспортировке',
      'Низкое качество закупленных растений',
      'Болезни и вредители',
    ],
    priority: 'critical',
  },
  {
    id: 'phase-4',
    phase: 4,
    title: 'Размножение и доращивание',
    duration: '6-12 месяцев',
    budget: '100 000 - 200 000 ₽',
    description: 'Черенкование, посев семян, доращивание саженцев до товарного размера',
    tasks: [
      'Черенкование туи, можжевельника, гортензии (весна/лето)',
      'Посев семян хвойных (осень/весна)',
      'Организация череночника с туманообразованием',
      'Укоренение черенков (контроль влажности, температуры)',
      'Пикировка сеянцев',
      'Пересадка в контейнеры C1, C2',
      'Регулярный уход (полив, подкормки, защита от болезней)',
      'Формирующая обрезка',
      'Подготовка к зиме (укрытие, мульчирование)',
    ],
    kpi: [
      'Укореняемость черенков >80%',
      'Всхожесть семян >70%',
      '500-1000 саженцев готово к продаже',
      'Потери <10%',
    ],
    risks: [
      'Низкая укореняемость черенков',
      'Болезни и вредители',
      'Неправильный уход',
      'Погодные условия',
    ],
    priority: 'high',
  },
  {
    id: 'phase-5',
    phase: 5,
    title: 'Маркетинг и продажи',
    duration: 'Постоянно',
    budget: '50 000 - 100 000 ₽/год',
    description: 'Создание сайта, соцсети, первые продажи, формирование клиентской базы',
    tasks: [
      'Создать сайт-визитку с каталогом',
      'Зарегистрироваться в Instagram, VK, Telegram',
      'Начать публикацию контента (3-5 раз в неделю)',
      'Разместить объявления на Авито, Юле',
      'Связаться с ландшафтными дизайнерами (10-20 контактов)',
      'Предложить сотрудничество застройщикам',
      'Участвовать в выставках и ярмарках',
      'Запустить программу лояльности',
      'Собирать отзывы и фото клиентов',
      'Анализировать продажи и корректировать ассортимент',
    ],
    kpi: [
      'Сайт запущен',
      '1000+ подписчиков в соцсетях',
      '10-20 продаж в месяц',
      '5-10 постоянных клиентов',
      'Выручка 50 000 - 100 000 ₽/мес',
    ],
    risks: [
      'Низкий трафик на сайт',
      'Мало подписчиков в соцсетях',
      'Высокая конкуренция',
      'Сезонность продаж',
    ],
    priority: 'high',
  },
  {
    id: 'phase-6',
    phase: 6,
    title: 'Масштабирование',
    duration: '12-24 месяца',
    budget: 'Реинвестирование прибыли',
    description: 'Расширение ассортимента, увеличение площадей, наём сотрудников',
    tasks: [
      'Добавить новые виды растений (до 30-50 видов)',
      'Расширить теплицу или построить вторую',
      'Автоматизировать полив полностью',
      'Нанять первого помощника',
      'Запустить интернет-магазин',
      'Увеличить бюджет на маркетинг',
      'Развить B2B направление (дизайнеры, застройщики)',
      'Внедрить CRM-систему',
      'Оптимизировать логистику и доставку',
      'Рассмотреть франшизу или партнёрства',
    ],
    kpi: [
      'Ассортимент 30-50 видов',
      'Выручка 200 000 - 500 000 ₽/мес',
      '5-10 постоянных B2B клиентов',
      '1-2 сотрудника',
      'Рентабельность >30%',
    ],
    risks: [
      'Слишком быстрое расширение',
      'Кассовые разрывы',
      'Проблемы с качеством при росте',
      'Сложности с управлением персоналом',
    ],
    priority: 'medium',
  },
];

const PRIORITY_CULTURES = [
  {
    name: 'Туя западная',
    method: 'Черенкование',
    timeToSale: '2-3 года',
    roi: '400-500%',
    why: 'Самый высокий спрос, легко размножается, стабильная цена',
  },
  {
    name: 'Можжевельник казацкий',
    method: 'Черенкование',
    timeToSale: '1.5-2 года',
    roi: '500-600%',
    why: 'Быстрый рост, низкая себестоимость, высокий спрос',
  },
  {
    name: 'Гортензия метельчатая',
    method: 'Черенкование',
    timeToSale: '2-3 года',
    roi: '350-400%',
    why: 'Тренд, высокая маржа, легко черенкуется',
  },
  {
    name: 'Спирея японская',
    method: 'Черенкование',
    timeToSale: '1-2 года',
    roi: '300-400%',
    why: 'Неприхотлива, быстрая оборачиваемость, массовый спрос',
  },
  {
    name: 'Сосна горная',
    method: 'Семена + прививка',
    timeToSale: '3-4 года',
    roi: '300-350%',
    why: 'Стабильный спрос, высокая цена, декоративность',
  },
];

const FINANCIAL_PLAN = {
  initialInvestment: {
    min: 500000,
    max: 1000000,
    breakdown: [
      { item: 'Аренда участка (1 год)', amount: '100 000 - 200 000 ₽' },
      { item: 'Теплица 50-100 м²', amount: '150 000 - 250 000 ₽' },
      { item: 'Система полива', amount: '50 000 - 100 000 ₽' },
      { item: 'Маточники', amount: '100 000 - 200 000 ₽' },
      { item: 'Инструменты и оборудование', amount: '50 000 - 100 000 ₽' },
      { item: 'Субстрат и контейнеры', amount: '50 000 - 100 000 ₽' },
      { item: 'Маркетинг (первый год)', amount: '50 000 - 100 000 ₽' },
    ],
  },
  monthlyExpenses: {
    min: 30000,
    max: 80000,
    breakdown: [
      { item: 'Аренда участка', amount: '8 000 - 15 000 ₽' },
      { item: 'Вода и электричество', amount: '5 000 - 10 000 ₽' },
      { item: 'Удобрения и средства защиты', amount: '5 000 - 10 000 ₽' },
      { item: 'Контейнеры и субстрат', amount: '5 000 - 15 000 ₽' },
      { item: 'Маркетинг', amount: '5 000 - 15 000 ₽' },
      { item: 'Прочие расходы', amount: '2 000 - 15 000 ₽' },
    ],
  },
  revenueProjection: {
    year1: { min: 300000, max: 600000, note: 'Первые продажи, формирование клиентской базы' },
    year2: { min: 800000, max: 1500000, note: 'Рост продаж, расширение ассортимента' },
    year3: { min: 2000000, max: 4000000, note: 'Стабильный бизнес, масштабирование' },
  },
};

export default function MVPStrategyView() {
  const [expandedPhase, setExpandedPhase] = useState<string | null>('phase-1');

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-700 border-red-200';
      case 'high': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'medium': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'critical': return '🔥 Критично';
      case 'high': return '⭐ Важно';
      case 'medium': return '💡 Желательно';
      default: return priority;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Стратегия MVP для питомника</h1>
        <p className="text-gray-500 mt-1">Пошаговый план запуска бизнеса с минимальными вложениями</p>
      </div>

      {/* Ключевые цифры */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl p-5 text-white shadow-lg">
          <DollarSign className="w-8 h-8 mb-2 opacity-80" />
          <p className="text-sm opacity-80">Стартовые вложения</p>
          <p className="text-2xl font-bold">500K - 1M ₽</p>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-5 text-white shadow-lg">
          <Clock className="w-8 h-8 mb-2 opacity-80" />
          <p className="text-sm opacity-80">Время до первых продаж</p>
          <p className="text-2xl font-bold">6-9 мес</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-5 text-white shadow-lg">
          <TrendingUp className="w-8 h-8 mb-2 opacity-80" />
          <p className="text-sm opacity-80">Окупаемость</p>
          <p className="text-2xl font-bold">18-24 мес</p>
        </div>
        <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl p-5 text-white shadow-lg">
          <Target className="w-8 h-8 mb-2 opacity-80" />
          <p className="text-sm opacity-80">Целевая рентабельность</p>
          <p className="text-2xl font-bold">30-50%</p>
        </div>
      </div>

      {/* Приоритетные культуры */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-emerald-500" />
          ТОП-5 культур для старта
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {PRIORITY_CULTURES.map((culture, index) => (
            <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-bold text-gray-900">{culture.name}</h4>
                <span className="text-xs px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full font-medium">
                  ROI {culture.roi}
                </span>
              </div>
              <div className="space-y-1 text-sm text-gray-600">
                <p><span className="font-medium">Метод:</span> {culture.method}</p>
                <p><span className="font-medium">До продажи:</span> {culture.timeToSale}</p>
                <p className="text-xs text-gray-500 mt-2">{culture.why}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Этапы MVP */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <Rocket className="w-5 h-5 text-blue-500" />
          6 этапов запуска питомника
        </h3>
        
        {MVP_PHASES.map((phase) => {
          const isExpanded = expandedPhase === phase.id;
          const priorityColor = getPriorityColor(phase.priority);
          
          return (
            <div key={phase.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <button
                onClick={() => setExpandedPhase(isExpanded ? null : phase.id)}
                className="w-full p-5 flex items-center gap-4 hover:bg-gray-50 transition-colors text-left"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                  {phase.phase}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-lg font-bold text-gray-900">{phase.title}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium border ${priorityColor}`}>
                      {getPriorityLabel(phase.priority)}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {phase.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      {phase.budget}
                    </span>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  {isExpanded ? (
                    <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </div>
              </button>

              {isExpanded && (
                <div className="px-5 pb-5 pt-2 border-t border-gray-100 bg-gray-50">
                  <p className="text-sm text-gray-700 mb-4">{phase.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Задачи */}
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <h4 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        Задачи
                      </h4>
                      <ul className="space-y-2">
                        {phase.tasks.map((task, i) => (
                          <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                            <span className="text-emerald-500 mt-0.5">✓</span>
                            <span>{task}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* KPI */}
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <h4 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <BarChart3 className="w-4 h-4 text-blue-500" />
                        Критерии успеха (KPI)
                      </h4>
                      <ul className="space-y-2">
                        {phase.kpi.map((kpi, i) => (
                          <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                            <span className="text-blue-500 mt-0.5">📊</span>
                            <span>{kpi}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Риски */}
                  {phase.risks.length > 0 && (
                    <div className="mt-4 bg-amber-50 rounded-lg p-4 border border-amber-200">
                      <h4 className="text-sm font-semibold text-amber-800 mb-2 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" />
                        Риски и как их минимизировать
                      </h4>
                      <ul className="space-y-1.5">
                        {phase.risks.map((risk, i) => (
                          <li key={i} className="text-sm text-amber-700 flex items-start gap-2">
                            <span>⚠️</span>
                            <span>{risk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Финансовый план */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-emerald-500" />
          Финансовый план
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Стартовые вложения */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Стартовые вложения</h4>
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg p-4 border border-emerald-200">
              <p className="text-2xl font-bold text-emerald-700 mb-3">
                {FINANCIAL_PLAN.initialInvestment.min.toLocaleString()} - {FINANCIAL_PLAN.initialInvestment.max.toLocaleString()} ₽
              </p>
              <div className="space-y-2">
                {FINANCIAL_PLAN.initialInvestment.breakdown.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-gray-600">{item.item}</span>
                    <span className="font-medium text-gray-900">{item.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Ежемесячные расходы */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Ежемесячные расходы</h4>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
              <p className="text-2xl font-bold text-blue-700 mb-3">
                {FINANCIAL_PLAN.monthlyExpenses.min.toLocaleString()} - {FINANCIAL_PLAN.monthlyExpenses.max.toLocaleString()} ₽
              </p>
              <div className="space-y-2">
                {FINANCIAL_PLAN.monthlyExpenses.breakdown.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-gray-600">{item.item}</span>
                    <span className="font-medium text-gray-900">{item.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Прогноз выручки */}
        <div className="mt-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Прогноз выручки по годам</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
              <p className="text-xs text-purple-600 mb-1">Год 1</p>
              <p className="text-xl font-bold text-purple-700">
                {(FINANCIAL_PLAN.revenueProjection.year1.min / 1000).toFixed(0)}K - {(FINANCIAL_PLAN.revenueProjection.year1.max / 1000).toFixed(0)}K ₽
              </p>
              <p className="text-xs text-gray-500 mt-2">{FINANCIAL_PLAN.revenueProjection.year1.note}</p>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-4 border border-amber-200">
              <p className="text-xs text-amber-600 mb-1">Год 2</p>
              <p className="text-xl font-bold text-amber-700">
                {(FINANCIAL_PLAN.revenueProjection.year2.min / 1000).toFixed(0)}K - {(FINANCIAL_PLAN.revenueProjection.year2.max / 1000).toFixed(0)}K ₽
              </p>
              <p className="text-xs text-gray-500 mt-2">{FINANCIAL_PLAN.revenueProjection.year2.note}</p>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg p-4 border border-emerald-200">
              <p className="text-xs text-emerald-600 mb-1">Год 3</p>
              <p className="text-xl font-bold text-emerald-700">
                {(FINANCIAL_PLAN.revenueProjection.year3.min / 1000000).toFixed(1)}M - {(FINANCIAL_PLAN.revenueProjection.year3.max / 1000000).toFixed(1)}M ₽
              </p>
              <p className="text-xs text-gray-500 mt-2">{FINANCIAL_PLAN.revenueProjection.year3.note}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Ключевые рекомендации */}
      <div className="bg-gradient-to-br from-emerald-600 to-green-700 rounded-xl p-6 text-white shadow-lg">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Rocket className="w-6 h-6" />
          Ключевые рекомендации для успеха
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <p className="text-sm">
              <strong>1. Начинайте с малого</strong><br/>
              Не пытайтесь охватить всё сразу. Сфокусируйтесь на 5-10 культурах, которые хорошо растут в вашем регионе.
            </p>
            <p className="text-sm">
              <strong>2. Инвестируйте в качество</strong><br/>
              Лучше меньше растений, но высокого качества. Репутация важнее количества.
            </p>
            <p className="text-sm">
              <strong>3. Стройте отношения</strong><br/>
              Ландшафтные дизайнеры и застройщики — ваши лучшие клиенты. Работайте на долгосрочную перспективу.
            </p>
          </div>
          <div className="space-y-3">
            <p className="text-sm">
              <strong>4. Автоматизируйте с первого дня</strong><br/>
              Система полива, учёт в CRM, онлайн-продажи — это экономит время и деньги.
            </p>
            <p className="text-sm">
              <strong>5. Учитесь на ошибках</strong><br/>
              Первые потери неизбежны. Важно извлечь уроки и не повторять ошибок.
            </p>
            <p className="text-sm">
              <strong>6. Диверсифицируйте доходы</strong><br/>
              Не только продажа растений: услуги посадки, ухода, консультации, мастер-классы.
            </p>
          </div>
        </div>
      </div>

      {/* Чек-лист */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          Чек-лист запуска
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            'Бизнес-план готов',
            'Участок найден и арендован',
            'Бизнес зарегистрирован',
            'Теплица построена',
            'Система полива установлена',
            'Маточники закуплены',
            'Первые черенки/семена высажены',
            'Сайт запущен',
            'Соцсети созданы',
            'Первые 10 клиентов найдены',
            'Первая продажа совершена',
            'Отзывы клиентов получены',
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <input type="checkbox" id={`check-${i}`} className="w-4 h-4 text-emerald-600 rounded" />
              <label htmlFor={`check-${i}`} className="text-sm text-gray-700 cursor-pointer">
                {item}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
