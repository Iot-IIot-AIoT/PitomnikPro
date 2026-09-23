import { useState } from 'react';
import { ProfitablePlant } from '../types';
import { Search, TrendingUp, Award, Clock, DollarSign, Star, AlertTriangle, Target, ChevronRight, ChevronDown } from 'lucide-react';

const PROFITABLE_PLANTS: ProfitablePlant[] = [
  {
    id: 'p1', name: 'Туя западная Смарагд', latinName: 'Thuja occidentalis Smaragd',
    category: 'conifer', difficulty: 'easy', growthTime: '2–3 года',
    costPerUnit: 150, sellingPrice: 800, profitPerUnit: 650, roi: 433, paybackMonths: 8,
    demand: 'very-high', season: 'Круглый год',
    description: 'Один из самых популярных хвойных. Отлично черенкуется, востребован для живых изгородей.',
    keyBenefits: ['Высокая укореняемость (85–95%)', 'Стабильный спрос', 'Зимостойкость до -35°C'],
    challenges: ['Конкуренция с крупными питомниками', 'Весенние ожоги'],
    marketTips: ['Продавайте в контейнерах C3–C5', 'Стриженные формы стоят в 2–3 раза дороже'],
  },
  {
    id: 'p2', name: 'Можжевельник казацкий', latinName: 'Juniperus sabina',
    category: 'conifer', difficulty: 'easy', growthTime: '1.5–2 года',
    costPerUnit: 100, sellingPrice: 600, profitPerUnit: 500, roi: 500, paybackMonths: 6,
    demand: 'very-high', season: 'Круглый год',
    description: 'Быстрорастущий почвопокровный можжевельник. Идеален для альпийских горок.',
    keyBenefits: ['Быстрое укоренение (3–4 недели)', 'Неприхотлив к почвам', 'Низкая себестоимость'],
    challenges: ['Ядовит — нужна маркировка', 'Может поражаться ржавчиной'],
    marketTips: ['Продавайте группами по 5–10 шт', 'Популярен у застройщиков'],
  },
  {
    id: 'p3', name: 'Голубика высокорослая', latinName: 'Vaccinium corymbosum',
    category: 'berry', difficulty: 'medium', growthTime: '2–3 года',
    costPerUnit: 200, sellingPrice: 800, profitPerUnit: 600, roi: 300, paybackMonths: 12,
    demand: 'very-high', season: 'Весна–осень',
    description: 'Суперфуд с огромным спросом. Ягоды стоят 500–1500 руб/кг. Плодоносит 30+ лет.',
    keyBenefits: ['Ягоды 500–1500 руб/кг', 'Плодоносит 30+ лет', 'Мало вредителей'],
    challenges: ['Нужна кислая почва (pH 3.5–4.5)', 'Требуется 2+ сорта для опыления'],
    marketTips: ['Продавайте 2–3 летние саженцы', 'Набор из 3 сортов — хит продаж'],
  },
  {
    id: 'p4', name: 'Гортензия метельчатая', latinName: 'Hydrangea paniculata',
    category: 'ornamental', difficulty: 'easy', growthTime: '2–3 года',
    costPerUnit: 150, sellingPrice: 700, profitPerUnit: 550, roi: 367, paybackMonths: 8,
    demand: 'very-high', season: 'Весна–осень',
    description: 'Тренд последних лет! Огромные соцветия, неприхотливость. Легко черенкуется.',
    keyBenefits: ['Укореняемость 90%+', 'Быстрый рост', 'Огромный спрос'],
    challenges: ['Требует обильного полива', 'Нужна обрезка'],
    marketTips: ['Новые сорта стоят в 2–3 раза дороже', 'Штамбовые формы — премиум'],
  },
  {
    id: 'p5', name: 'Ель коника', latinName: 'Picea glauca Conica',
    category: 'conifer', difficulty: 'medium', growthTime: '3–5 лет',
    costPerUnit: 300, sellingPrice: 1500, profitPerUnit: 1200, roi: 400, paybackMonths: 10,
    demand: 'high', season: 'Круглый год',
    description: 'Карликовая ель с идеальной формой. Хит новогодних продаж!',
    keyBenefits: ['Идеальная форма без обрезки', 'Высокая цена', 'Популярна как новогоднее дерево'],
    challenges: ['Медленный рост', 'Чувствительна к клещу'],
    marketTips: ['Пик продаж — ноябрь–декабрь', 'Контейнерные в 3 раза дороже'],
  },
  {
    id: 'p6', name: 'Жимолость съедобная', latinName: 'Lonicera caerulea',
    category: 'berry', difficulty: 'easy', growthTime: '2 года',
    costPerUnit: 100, sellingPrice: 400, profitPerUnit: 300, roi: 300, paybackMonths: 8,
    demand: 'high', season: 'Весна–осень',
    description: 'Самая ранняя ягода! Созревает в июне. Очень зимостойкая, неприхотливая.',
    keyBenefits: ['Первая ягода сезона', 'Зимостойкость до -50°C', 'Мало конкурентов'],
    challenges: ['Нужно 2+ сорта', 'Ягода осыпается'],
    marketTips: ['Продавайте парами сортов', 'Ягода на рынке: 300–600 руб/кг'],
  },
  {
    id: 'p7', name: 'Спирея японская', latinName: 'Spiraea japonica',
    category: 'ornamental', difficulty: 'easy', growthTime: '1.5–2 года',
    costPerUnit: 80, sellingPrice: 350, profitPerUnit: 270, roi: 338, paybackMonths: 6,
    demand: 'high', season: 'Весна–осень',
    description: 'Неприхотливый кустарник с яркой листвой. Идеален для бордюров.',
    keyBenefits: ['Укореняемость 95%+', 'Абсолютная зимостойкость', 'Низкая себестоимость'],
    challenges: ['Нужна стрижка', 'Высокая конкуренция'],
    marketTips: ['Продавайте в цветущем виде', 'Популярна у застройщиков'],
  },
  {
    id: 'p8', name: 'Сосна горная Мугус', latinName: 'Pinus mugo Mughus',
    category: 'conifer', difficulty: 'medium', growthTime: '3–4 года',
    costPerUnit: 200, sellingPrice: 900, profitPerUnit: 700, roi: 350, paybackMonths: 9,
    demand: 'high', season: 'Круглый год',
    description: 'Многоствольный кустарник с густой кроной. Идеальна для альпинариев.',
    keyBenefits: ['Компактная форма', 'Засухоустойчивость', 'Хорошо стрижётся'],
    challenges: ['Сложнее черенкуется', 'Медленный рост в первые 2 года'],
    marketTips: ['Формованные шары — премиум', 'Популярна у дизайнеров'],
  },
  {
    id: 'p9', name: 'Яблоня карликовая', latinName: 'Malus domestica',
    category: 'fruit', difficulty: 'medium', growthTime: '2–3 года',
    costPerUnit: 300, sellingPrice: 1000, profitPerUnit: 700, roi: 233, paybackMonths: 10,
    demand: 'very-high', season: 'Весна и осень',
    description: 'Самое популярное плодовое дерево. Карликовые подвои начинают плодоносить на 2–3 год.',
    keyBenefits: ['Огромный спрос', 'Скороспелые', 'Можно в контейнерах'],
    challenges: ['Нужна прививка', 'Сезонность продаж'],
    marketTips: ['Наборы "сад" — яблоня + груша', 'Колонновидные для маленьких участков'],
  },
  {
    id: 'p10', name: 'Лаванда узколистная', latinName: 'Lavandula angustifolia',
    category: 'ornamental', difficulty: 'medium', growthTime: '1–2 года',
    costPerUnit: 80, sellingPrice: 350, profitPerUnit: 270, roi: 338, paybackMonths: 6,
    demand: 'high', season: 'Лето',
    description: 'Трендовое ароматное растение. Популярна для альпинариев и бордюров.',
    keyBenefits: ['Тренд', 'Легко черенкуется', 'Засухоустойчива'],
    challenges: ['Требует укрытия в средней полосе', 'Не переносит переувлажнения'],
    marketTips: ['Продавайте в цветущем виде', 'Английская зимостойнее'],
  },
];

const CATEGORY_CONFIG = {
  conifer: { label: 'Хвойные', icon: '🌲', color: 'emerald' },
  berry: { label: 'Ягодные', icon: '🫐', color: 'purple' },
  fruit: { label: 'Плодовые', icon: '🍎', color: 'red' },
  ornamental: { label: 'Декоративные', icon: '🌸', color: 'pink' },
};

const DIFFICULTY_CONFIG = {
  easy: { label: 'Легко', color: 'bg-green-100 text-green-700' },
  medium: { label: 'Средне', color: 'bg-amber-100 text-amber-700' },
  hard: { label: 'Сложно', color: 'bg-red-100 text-red-700' },
};

export default function ProfitablePlantsView() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'roi' | 'profit' | 'payback'>('roi');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = PROFITABLE_PLANTS
    .filter(p => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.latinName.toLowerCase().includes(search.toLowerCase());
      const matchCategory = category === 'all' || p.category === category;
      return matchSearch && matchCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'roi') return b.roi - a.roi;
      if (sortBy === 'profit') return b.profitPerUnit - a.profitPerUnit;
      return a.paybackMonths - b.paybackMonths;
    });

  const topPlants = [...PROFITABLE_PLANTS].sort((a, b) => b.roi - a.roi).slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Самые прибыльные растения</h1>
        <p className="text-gray-500 mt-1">Рентабельные культуры для вашего питомника</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl p-5 text-white shadow-lg">
          <DollarSign className="w-8 h-8 mb-2 opacity-80" />
          <p className="text-2xl font-bold">{PROFITABLE_PLANTS.length}</p>
          <p className="text-sm opacity-80">Растений в каталоге</p>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-5 text-white shadow-lg">
          <TrendingUp className="w-8 h-8 mb-2 opacity-80" />
          <p className="text-2xl font-bold">{Math.round(PROFITABLE_PLANTS.reduce((s, p) => s + p.roi, 0) / PROFITABLE_PLANTS.length)}%</p>
          <p className="text-sm opacity-80">Средняя рентабельность</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-5 text-white shadow-lg">
          <Award className="w-8 h-8 mb-2 opacity-80" />
          <p className="text-2xl font-bold">{topPlants[0]?.roi}%</p>
          <p className="text-sm opacity-80">Макс. рентабельность</p>
        </div>
        <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl p-5 text-white shadow-lg">
          <Clock className="w-8 h-8 mb-2 opacity-80" />
          <p className="text-2xl font-bold">6 мес</p>
          <p className="text-sm opacity-80">Мин. окупаемость</p>
        </div>
      </div>

      {/* Top 5 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-500" /> ТОП-5 самых рентабельных
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {topPlants.map((plant, index) => (
            <div key={plant.id} className="relative p-4 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-100">
              <div className="absolute -top-2 -left-2 w-7 h-7 bg-amber-400 text-white rounded-full flex items-center justify-center text-xs font-bold">
                {index + 1}
              </div>
              <p className="text-sm font-semibold text-gray-900 truncate mb-1">{plant.name}</p>
              <p className="text-xs text-gray-500 mb-2">{CATEGORY_CONFIG[plant.category].icon} {CATEGORY_CONFIG[plant.category].label}</p>
              <p className="text-lg font-bold text-emerald-600">{plant.roi}%</p>
              <p className="text-xs text-gray-400">ROI</p>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input type="text" placeholder="Поиск растения..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
          </div>
          <div className="flex gap-2 flex-wrap">
            <button onClick={() => setCategory('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${category === 'all' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}>
              Все
            </button>
            {Object.entries(CATEGORY_CONFIG).map(([key, config]) => (
              <button key={key} onClick={() => setCategory(key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${category === key ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}>
                {config.icon} {config.label}
              </button>
            ))}
          </div>
          <select value={sortBy} onChange={e => setSortBy(e.target.value as typeof sortBy)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm">
            <option value="roi">По рентабельности</option>
            <option value="profit">По прибыли</option>
            <option value="payback">По окупаемости</option>
          </select>
        </div>
      </div>

      {/* Plants List */}
      <div className="space-y-3">
        {filtered.map(plant => {
          const isExpanded = expandedId === plant.id;
          const catConfig = CATEGORY_CONFIG[plant.category];
          const diffConfig = DIFFICULTY_CONFIG[plant.difficulty];

          return (
            <div key={plant.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-5">
                <div className="flex items-start gap-4">
                  <div className="text-3xl w-12 h-12 flex items-center justify-center bg-gray-50 rounded-xl flex-shrink-0">
                    {catConfig.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-gray-900">{plant.name}</h3>
                      <span className="text-xs text-gray-400 italic">{plant.latinName}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{plant.description}</p>
                    <div className="flex items-center gap-2 mt-3 flex-wrap">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${diffConfig.color}`}>{diffConfig.label}</span>
                      <span className="text-xs text-gray-500"><Clock className="w-3 h-3 inline" /> {plant.growthTime}</span>
                    </div>
                  </div>
                  <div className="hidden md:flex flex-col items-end gap-1 flex-shrink-0">
                    <p className="text-xs text-gray-500">Прибыль с 1 шт</p>
                    <p className="text-xl font-bold text-emerald-600">{plant.profitPerUnit} ₽</p>
                    <div className="flex gap-3 text-xs text-gray-500">
                      <span>ROI: <span className="font-semibold text-gray-700">{plant.roi}%</span></span>
                      <span>Окупаемость: <span className="font-semibold text-gray-700">{plant.paybackMonths} мес</span></span>
                    </div>
                  </div>
                  <button onClick={() => setExpandedId(isExpanded ? null : plant.id)}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg flex-shrink-0">
                    {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {isExpanded && (
                <div className="px-5 pb-5 pt-2 border-t border-gray-100 bg-gray-50">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
                    <div className="bg-white p-3 rounded-lg border border-gray-100">
                      <p className="text-xs text-gray-500">Себестоимость</p>
                      <p className="text-lg font-bold text-gray-800">{plant.costPerUnit} ₽</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-gray-100">
                      <p className="text-xs text-gray-500">Цена продажи</p>
                      <p className="text-lg font-bold text-blue-600">{plant.sellingPrice} ₽</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-gray-100">
                      <p className="text-xs text-gray-500">Прибыль</p>
                      <p className="text-lg font-bold text-emerald-600">{plant.profitPerUnit} ₽</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-gray-100">
                      <p className="text-xs text-gray-500">Рентабельность</p>
                      <p className="text-lg font-bold text-purple-600">{plant.roi}%</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-emerald-50 rounded-xl p-4">
                      <h4 className="text-sm font-semibold text-emerald-800 mb-3 flex items-center gap-2">
                        <Star className="w-4 h-4" /> Преимущества
                      </h4>
                      <ul className="space-y-1.5">
                        {plant.keyBenefits.map((b, i) => (
                          <li key={i} className="text-sm text-emerald-700 flex gap-2"><span>✅</span><span>{b}</span></li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-amber-50 rounded-xl p-4">
                      <h4 className="text-sm font-semibold text-amber-800 mb-3 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" /> Сложности
                      </h4>
                      <ul className="space-y-1.5">
                        {plant.challenges.map((c, i) => (
                          <li key={i} className="text-sm text-amber-700 flex gap-2"><span>⚠️</span><span>{c}</span></li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-blue-50 rounded-xl p-4">
                      <h4 className="text-sm font-semibold text-blue-800 mb-3 flex items-center gap-2">
                        <Target className="w-4 h-4" /> Советы по продажам
                      </h4>
                      <ul className="space-y-1.5">
                        {plant.marketTips.map((t, i) => (
                          <li key={i} className="text-sm text-blue-700 flex gap-2"><span>💡</span><span>{t}</span></li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
