import { useState } from 'react';
import { TrendingUp, MapPin, Thermometer, Snowflake, Sun, Target, DollarSign, AlertTriangle, CheckCircle2, Lightbulb, BarChart3 } from 'lucide-react';

interface MarketIdea {
  id: string;
  name: string;
  category: 'conifer' | 'berry' | 'fruit' | 'ornamental' | 'annual';
  whyProfitable: string;
  climateFit: 'excellent' | 'good' | 'medium' | 'poor';
  demand: 'very-high' | 'high' | 'medium' | 'low';
  competition: 'low' | 'medium' | 'high';
  investment: number;
  paybackMonths: number;
  roi: number;
  seasonality: string;
  tips: string[];
  risks: string[];
}

const BASHKORTOSTAN_IDEAS: MarketIdea[] = [
  {
    id: 'b1',
    name: 'Туя западная (Смарагд, Брабант)',
    category: 'conifer',
    whyProfitable: 'Высокий спрос на живые изгороди в коттеджных посёлках. Зимостойка до -35°C. Быстро растёт.',
    climateFit: 'excellent',
    demand: 'very-high',
    competition: 'medium',
    investment: 150,
    paybackMonths: 8,
    roi: 433,
    seasonality: 'Круглый год (пик: апрель-май, сентябрь)',
    tips: [
      'Фокус на размерах 60-100 см для быстрого оборота',
      'Стриженные формы стоят в 2-3 раза дороже',
      'Работайте с застройщиками коттеджных посёлков',
      'Предлагайте услугу посадки с гарантией',
    ],
    risks: [
      'Весенние ожоги - нужно притенение',
      'Конкуренция с крупными питомниками',
    ],
  },
  {
    id: 'b2',
    name: 'Можжевельник казацкий',
    category: 'conifer',
    whyProfitable: 'Неприхотлив, быстро разрастается. Идеален для альпинариев и откосов. Низкая себестоимость.',
    climateFit: 'excellent',
    demand: 'high',
    competition: 'low',
    investment: 80,
    paybackMonths: 6,
    roi: 500,
    seasonality: 'Круглый год',
    tips: [
      'Продавайте группами по 5-10 шт',
      'Популярен у ландшафтных дизайнеров',
      'Можно выращивать на штамбе - премиум цена',
    ],
    risks: [
      'Ядовит - нужна маркировка',
      'Может поражаться ржавчиной',
    ],
  },
  {
    id: 'b3',
    name: 'Ель коника (канадская)',
    category: 'conifer',
    whyProfitable: 'Хит новогодних продаж! Компактная, декоративная. Высокая маржа на маленьких размерах.',
    climateFit: 'excellent',
    demand: 'very-high',
    competition: 'medium',
    investment: 250,
    paybackMonths: 10,
    roi: 400,
    seasonality: 'Пик: ноябрь-декабрь (новогодние)',
    tips: [
      'Готовьте к новогодним продажам заранее',
      'Размеры 30-50 см - оптимальные для продажи',
      'Продавайте в декоративных кашпо',
      'Предлагайте последующую высадку в грунт',
    ],
    risks: [
      'Медленный рост',
      'Чувствительна к паутинному клещу',
    ],
  },
  {
    id: 'b4',
    name: 'Голубика высокорослая',
    category: 'berry',
    whyProfitable: 'Суперфуд с растущим спросом. Ягоды 800-1500 руб/кг. В Башкирии мало кто выращивает.',
    climateFit: 'good',
    demand: 'very-high',
    competition: 'low',
    investment: 200,
    paybackMonths: 12,
    roi: 300,
    seasonality: 'Плодоношение: июль-август',
    tips: [
      'Нужна кислая почва (pH 3.5-4.5) - готовьте субстрат',
      'Продавайте 2-3 летние саженцы с первыми ягодами',
      'Набор из 3 сортов для опыления - хит продаж',
      'Давайте памятку по подготовке кислого субстрата',
    ],
    risks: [
      'Требует специфической почвы',
      'Нужно регулярное подкисление',
      'Конкуренция с импортной ягодой',
    ],
  },
  {
    id: 'b5',
    name: 'Жимолость съедобная',
    category: 'berry',
    whyProfitable: 'Самая ранняя ягода (июнь)! Зимостойкость до -50°C. Неприхотлива. Мало конкурентов.',
    climateFit: 'excellent',
    demand: 'high',
    competition: 'low',
    investment: 100,
    paybackMonths: 8,
    roi: 300,
    seasonality: 'Плодоношение: июнь',
    tips: [
      'Продавайте парами сортов для опыления',
      'Акцент на "первая ягода сезона"',
      'Зимостойкость - главное преимущество для Башкирии',
      'Образовательный контент помогает продажам',
    ],
    risks: [
      'Ягода осыпается - нужен сбор в сетку',
      'Не все знакомы с культурой',
    ],
  },
  {
    id: 'b6',
    name: 'Гортензия метельчатая',
    category: 'ornamental',
    whyProfitable: 'Тренд последних лет! Огромные соцветия, неприхотлива. Легко черенкуется (90%+).',
    climateFit: 'good',
    demand: 'very-high',
    competition: 'medium',
    investment: 120,
    paybackMonths: 8,
    roi: 367,
    seasonality: 'Цветение: июль-сентябрь',
    tips: [
      'Новые сорта стоят в 2-3 раза дороже',
      'Штамбовые формы - премиум сегмент',
      'Продавайте в период цветения',
      'Размер 40-60 см - оптимальный для продажи',
    ],
    risks: [
      'Требует обильного полива',
      'Нужна обрезка для обильного цветения',
    ],
  },
  {
    id: 'b7',
    name: 'Спирея японская',
    category: 'ornamental',
    whyProfitable: 'Абсолютная зимостойкость. Неприхотлива. Идеальна для городского озеленения и бордюров.',
    climateFit: 'excellent',
    demand: 'high',
    competition: 'medium',
    investment: 60,
    paybackMonths: 6,
    roi: 338,
    seasonality: 'Круглый год (декоративна весь сезон)',
    tips: [
      'Продавайте в цветущем виде',
      'Массовые посадки - от 10 шт со скидкой',
      'Популярна у застройщиков и муниципалитетов',
      'Контрастные композиции - 2-3 сорта вместе',
    ],
    risks: [
      'Нужна стрижка для компактности',
      'Высокая конкуренция',
    ],
  },
  {
    id: 'b8',
    name: 'Яблоня на карликовых подвоях',
    category: 'fruit',
    whyProfitable: 'Самое популярное плодовое дерево. Карликовые начинают плодоносить на 2-3 год. Стабильный спрос.',
    climateFit: 'excellent',
    demand: 'very-high',
    competition: 'high',
    investment: 250,
    paybackMonths: 10,
    roi: 233,
    seasonality: 'Посадка: апрель, октябрь',
    tips: [
      'Наборы "сад" - яблоня + груша + слива',
      'Самоплодные сорта - без проблем с опылением',
      'Колонновидные яблони - для маленьких участков',
      'Давайте схему посадки и ухода',
    ],
    risks: [
      'Нужна прививка (или покупка подвоя)',
      'Высокая конкуренция',
      'Сезонность продаж',
    ],
  },
  {
    id: 'b9',
    name: 'Лаванда узколистная',
    category: 'ornamental',
    whyProfitable: 'Трендовое ароматное растение. Популярна для альпинариев. Засухоустойчива.',
    climateFit: 'medium',
    demand: 'high',
    competition: 'low',
    investment: 70,
    paybackMonths: 6,
    roi: 338,
    seasonality: 'Цветение: июль-август',
    tips: [
      'Продавайте в цветущем виде - аромат продаёт',
      'Английская лаванда зимостойнее французской',
      'Контейнерные - дороже и популярнее',
      'Наборы для "прованского сада"',
    ],
    risks: [
      'В Башкирии требует укрытия на зиму',
      'Не переносит переувлажнения',
    ],
  },
  {
    id: 'b10',
    name: 'Сосна горная Мугус',
    category: 'conifer',
    whyProfitable: 'Компактная форма. Зимостойка. Засухоустойчива. Идеальна для альпинариев.',
    climateFit: 'excellent',
    demand: 'high',
    competition: 'medium',
    investment: 180,
    paybackMonths: 9,
    roi: 350,
    seasonality: 'Круглый год',
    tips: [
      'Формованные шары и подушки - премиум сегмент',
      'Популярна у ландшафтных дизайнеров',
      'Хорошо продаётся в составе композиций',
    ],
    risks: [
      'Сложнее черенкуется, чем туя',
      'Медленный рост в первые 2 года',
    ],
  },
];

const CLIMATE_INFO = {
  region: 'Республика Башкортостан',
  climate: 'Континентальный',
  winterTemp: '-25...-35°C',
  summerTemp: '+25...+35°C',
  frostFree: '120-130 дней',
  precipitation: '400-600 мм/год',
  soilType: 'Серые лесные, чернозёмы',
  keyChallenges: [
    'Суровые зимы с морозами до -35°C',
    'Возвратные заморозки до конца мая',
    'Жаркое сухое лето',
    'Короткий вегетационный период',
  ],
};

export default function BashkortostanMarketView() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = BASHKORTOSTAN_IDEAS.filter(idea => 
    selectedCategory === 'all' || idea.category === selectedCategory
  );

  const totalInvestment = filtered.reduce((sum, idea) => sum + idea.investment, 0);
  const avgROI = Math.round(filtered.reduce((sum, idea) => sum + idea.roi, 0) / filtered.length);
  const topIdeas = [...filtered].sort((a, b) => b.roi - a.roi).slice(0, 3);

  const categoryLabels = {
    all: 'Все категории',
    conifer: '🌲 Хвойные',
    berry: '🫐 Ягодные',
    fruit: '🍎 Плодовые',
    ornamental: '🌸 Декоративные',
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Прибыльные идеи для Башкортостана</h1>
        <p className="text-gray-500 mt-1">Анализ рынка и рекомендации для вашего региона</p>
      </div>

      {/* Климатическая справка */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5" /> Климатические особенности Башкортостана
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="bg-white rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Thermometer className="w-4 h-4 text-red-500" />
              <span className="text-xs text-gray-500">Лето</span>
            </div>
            <p className="text-lg font-bold text-gray-900">{CLIMATE_INFO.summerTemp}</p>
          </div>
          <div className="bg-white rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Snowflake className="w-4 h-4 text-blue-500" />
              <span className="text-xs text-gray-500">Зима</span>
            </div>
            <p className="text-lg font-bold text-gray-900">{CLIMATE_INFO.winterTemp}</p>
          </div>
          <div className="bg-white rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Sun className="w-4 h-4 text-amber-500" />
              <span className="text-xs text-gray-500">Без морозов</span>
            </div>
            <p className="text-lg font-bold text-gray-900">{CLIMATE_INFO.frostFree}</p>
          </div>
          <div className="bg-white rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Thermometer className="w-4 h-4 text-cyan-500" />
              <span className="text-xs text-gray-500">Осадки</span>
            </div>
            <p className="text-lg font-bold text-gray-900">{CLIMATE_INFO.precipitation}</p>
          </div>
        </div>
        <div className="bg-blue-100 rounded-lg p-4">
          <p className="text-sm font-semibold text-blue-800 mb-2 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" /> Ключевые вызовы:
          </p>
          <ul className="space-y-1">
            {CLIMATE_INFO.keyChallenges.map((challenge, i) => (
              <li key={i} className="text-sm text-blue-700 flex items-start gap-2">
                <span className="text-blue-500 mt-0.5">•</span>
                <span>{challenge}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-50 rounded-xl">
              <Target className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Идей</p>
              <p className="text-2xl font-bold text-gray-900">{BASHKORTOSTAN_IDEAS.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-50 rounded-xl">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Средний ROI</p>
              <p className="text-2xl font-bold text-gray-900">{avgROI}%</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-50 rounded-xl">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Лучший ROI</p>
              <p className="text-2xl font-bold text-gray-900">{topIdeas[0]?.roi}%</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-50 rounded-xl">
              <BarChart3 className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Мин. окупаемость</p>
              <p className="text-2xl font-bold text-gray-900">6 мес</p>
            </div>
          </div>
        </div>
      </div>

      {/* ТОП-3 идеи */}
      <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Lightbulb className="w-6 h-6" /> ТОП-3 самых прибыльных идеи для Башкирии
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topIdeas.map((idea, index) => (
            <div key={idea.id} className="bg-white/10 backdrop-blur rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <h4 className="font-semibold">{idea.name}</h4>
              </div>
              <div className="space-y-1 text-sm">
                <p>ROI: <span className="font-bold">{idea.roi}%</span></p>
                <p>Окупаемость: <span className="font-bold">{idea.paybackMonths} мес</span></p>
                <p>Спрос: <span className="font-bold">{idea.demand === 'very-high' ? 'Очень высокий 🔥' : idea.demand === 'high' ? 'Высокий 📈' : 'Средний 📊'}</span></p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Фильтры */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex gap-2 flex-wrap">
          {Object.entries(categoryLabels).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === key 
                  ? 'bg-emerald-100 text-emerald-700' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Список идей */}
      <div className="space-y-3">
        {filtered.map(idea => {
          const isExpanded = expandedId === idea.id;
          const climateFitColors = {
            excellent: 'bg-emerald-100 text-emerald-700',
            good: 'bg-blue-100 text-blue-700',
            medium: 'bg-amber-100 text-amber-700',
            poor: 'bg-red-100 text-red-700',
          };

          return (
            <div key={idea.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-5">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{idea.name}</h3>
                      {idea.climateFit === 'excellent' && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-medium">
                          ✓ Идеально для климата
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{idea.whyProfitable}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">ROI</p>
                        <p className="text-lg font-bold text-emerald-600">{idea.roi}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Окупаемость</p>
                        <p className="text-lg font-bold text-blue-600">{idea.paybackMonths} мес</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Спрос</p>
                        <p className="text-sm font-semibold text-gray-700">
                          {idea.demand === 'very-high' ? '🔥 Очень высокий' : 
                           idea.demand === 'high' ? '📈 Высокий' : 
                           idea.demand === 'medium' ? '📊 Средний' : '📉 Низкий'}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Климат</p>
                        <p className={`text-sm font-semibold px-2 py-0.5 rounded inline-block ${climateFitColors[idea.climateFit]}`}>
                          {idea.climateFit === 'excellent' ? 'Отлично' : 
                           idea.climateFit === 'good' ? 'Хорошо' : 
                           idea.climateFit === 'medium' ? 'Средне' : 'Сложно'}
                        </p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : idea.id)}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    {isExpanded ? '▼' : '▶'}
                  </button>
                </div>
              </div>

              {isExpanded && (
                <div className="px-5 pb-5 pt-2 border-t border-gray-100 bg-gray-50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-emerald-50 rounded-lg p-4">
                      <h4 className="text-sm font-semibold text-emerald-800 mb-3 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" /> Советы по выращиванию и продаже
                      </h4>
                      <ul className="space-y-2">
                        {idea.tips.map((tip, i) => (
                          <li key={i} className="text-sm text-emerald-700 flex items-start gap-2">
                            <span className="text-emerald-500 mt-0.5">💡</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-amber-50 rounded-lg p-4">
                      <h4 className="text-sm font-semibold text-amber-800 mb-3 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" /> Риски и сложности
                      </h4>
                      <ul className="space-y-2">
                        {idea.risks.map((risk, i) => (
                          <li key={i} className="text-sm text-amber-700 flex items-start gap-2">
                            <span className="text-amber-500 mt-0.5">⚠️</span>
                            <span>{risk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                    <div className="bg-white p-3 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1">Инвестиции</p>
                      <p className="text-lg font-bold text-gray-900">{idea.investment} ₽</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1">Конкуренция</p>
                      <p className="text-sm font-semibold text-gray-700">
                        {idea.competition === 'low' ? '🟢 Низкая' : 
                         idea.competition === 'medium' ? '🟡 Средняя' : '🔴 Высокая'}
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded-lg col-span-2">
                      <p className="text-xs text-gray-500 mb-1">Сезонность</p>
                      <p className="text-sm font-medium text-gray-700">{idea.seasonality}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Итоговые рекомендации */}
      <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl p-6 text-white shadow-lg">
        <h3 className="text-xl font-bold mb-4">🎯 Стратегические рекомендации для Башкортостана</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <p className="text-sm">
              <strong>1. Фокус на зимостойких культурах</strong><br/>
              Выбирайте растения с зимостойкостью до -35°C. Туя, можжевельник, жимолость - идеальный выбор.
            </p>
            <p className="text-sm">
              <strong>2. Используйте низкую конкуренцию</strong><br/>
              Голубика и жимолость - нишевые культуры с высоким спросом и низкой конкуренцией в регионе.
            </p>
            <p className="text-sm">
              <strong>3. Работайте с застройщиками</strong><br/>
              Коттеджные посёлки активно строятся. Предлагайте комплексное озеленение с гарантией.
            </p>
          </div>
          <div className="space-y-3">
            <p className="text-sm">
              <strong>4. Диверсифицируйте ассортимент</strong><br/>
              Сочетайте хвойные (70%), ягодные (20%) и декоративные (10%) культуры для стабильности.
            </p>
            <p className="text-sm">
              <strong>5. Предлагайте услуги</strong><br/>
              Посадка, уход, гарантия приживаемости - это увеличивает средний чек в 2-3 раза.
            </p>
            <p className="text-sm">
              <strong>6. Готовьтесь к сезону заранее</strong><br/>
              Вегетационный период короткий. Начинайте подготовку в феврале-марте.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
