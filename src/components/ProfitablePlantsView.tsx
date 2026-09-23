import { useState } from 'react';
import { ProfitablePlant } from '../types';
import {
  TrendingUp, DollarSign, Clock, AlertTriangle, Star,
  Search, Filter, ChevronDown, ChevronRight, Zap,
  Target, Award, BarChart3, Leaf, TreePine, Cherry,
  Apple, Flower2, Info, Calendar
} from 'lucide-react';

const PROFITABLE_PLANTS: ProfitablePlant[] = [
  // ХВОЙНЫЕ
  {
    id: 'p1',
    name: 'Туя западная Смарагд',
    latinName: 'Thuja occidentalis Smaragd',
    category: 'conifer',
    variety: 'Smaragd',
    difficulty: 'easy',
    growthTime: '2–3 года',
    costPerUnit: 150,
    sellingPrice: 800,
    profitPerUnit: 650,
    roi: 433,
    paybackMonths: 8,
    demand: 'very-high',
    season: 'Круглый год',
    description: 'Один из самых популярных и прибыльных хвойных. Отлично черенкуется, быстро растёт, востребован для живых изгородей и солитерных посадок.',
    keyBenefits: [
      'Высокая укореняемость черенков (85–95%)',
      'Стабильный спрос круглый год',
      'Хорошо переносит стрижку и формовку',
      'Зимостойкость до -35°C',
      'Минимальный уход после укоренения',
    ],
    challenges: [
      'Конкуренция с крупными питомниками',
      'Нужна теплица для черенкования',
      'Весенние ожоги на открытом солнце',
    ],
    marketTips: [
      'Продавайте в контейнерах C3–C5 — выше маржа',
      'Стриженные формы стоят в 2–3 раза дороже',
      'Оптимальный размер для продажи: 60–100 см',
      'Спрос максимален в апреле–мае и сентябре–октябре',
    ],
  },
  {
    id: 'p2',
    name: 'Можжевельник казацкий',
    latinName: 'Juniperus sabina',
    category: 'conifer',
    variety: 'Разные сорта',
    difficulty: 'easy',
    growthTime: '1.5–2 года',
    costPerUnit: 100,
    sellingPrice: 600,
    profitPerUnit: 500,
    roi: 500,
    paybackMonths: 6,
    demand: 'very-high',
    season: 'Круглый год',
    description: 'Быстрорастущий почвопокровный можжевельник. Идеален для альпийских горок, откосов и массовых посадок. Один из самых рентабельных хвойных.',
    keyBenefits: [
      'Очень быстрое укоренение (3–4 недели)',
      'Быстрый прирост 15–20 см/год',
      'Неприхотлив к почвам и поливу',
      'Засухоустойчив',
      'Низкая себестоимость производства',
    ],
    challenges: [
      'Ядовит — нужна маркировка',
      'Может поражаться ржавчиной',
      'Расползается — контроль размера',
    ],
    marketTips: [
      'Продавайте группами по 5–10 шт — для ландшафтных проектов',
      'Штамбовые формы стоят дороже',
      'Популярен у застройщиков для благоустройства',
    ],
  },
  {
    id: 'p3',
    name: 'Ель коника (Канадская)',
    latinName: 'Picea glauca Conica',
    category: 'conifer',
    variety: 'Conica',
    difficulty: 'medium',
    growthTime: '3–5 лет',
    costPerUnit: 300,
    sellingPrice: 1500,
    profitPerUnit: 1200,
    roi: 400,
    paybackMonths: 10,
    demand: 'high',
    season: 'Круглый год (пик — декабрь)',
    description: 'Карликовая ель с идеальной конической формой. Хит новогодних продаж! Медленный рост компенсируется высокой ценой.',
    keyBenefits: [
      'Идеальная форма без обрезки',
      'Высокая цена за компактный размер',
      'Популярна как новогоднее дерево в горшке',
      'Медленный рост = меньше пересадок',
    ],
    challenges: [
      'Медленный рост (5–10 см/год)',
      'Чувствительна к паутинному клещу',
      'Требует притенения летом',
      'Долгий цикл выращивания',
    ],
    marketTips: [
      'Пик продаж — ноябрь–декабрь (новогодний подарок)',
      'Контейнерные растения продаются в 3 раза дороже ОКС',
      'Размер 30–50 см — оптимальный для продажи',
      'Можно продавать с декором (ленты, шары)',
    ],
  },
  {
    id: 'p4',
    name: 'Сосна горная Мугус',
    latinName: 'Pinus mugo Mughus',
    category: 'conifer',
    variety: 'Mughus',
    difficulty: 'medium',
    growthTime: '3–4 года',
    costPerUnit: 200,
    sellingPrice: 900,
    profitPerUnit: 700,
    roi: 350,
    paybackMonths: 9,
    demand: 'high',
    season: 'Круглый год',
    description: 'Многоствольный кустарник с густой кроной. Идеальна для альпинариев, рокариев и групповых посадок. Хорошо стрижётся.',
    keyBenefits: [
      'Компактная форма',
      'Зимостойкость и засухоустойчивость',
      'Хорошо переносит городские условия',
      'Отлично стрижётся',
    ],
    challenges: [
      'Сложнее черенкуется, чем туя',
      'Нужна стратификация семян (если из семян)',
      'Медленный рост в первые 2 года',
    ],
    marketTips: [
      'Формованные шары и подушки — премиум-сегмент',
      'Популярна у ландшафтных дизайнеров',
      'Хорошо продаётся в составе композиций',
    ],
  },
  // ЯГОДНЫЕ КУЛЬТУРЫ
  {
    id: 'p5',
    name: 'Голубика высокорослая',
    latinName: 'Vaccinium corymbosum',
    category: 'berry',
    variety: 'Патриот, Блюкроп, Дюк',
    difficulty: 'medium',
    growthTime: '2–3 года до плодоношения',
    costPerUnit: 200,
    sellingPrice: 800,
    profitPerUnit: 600,
    roi: 300,
    paybackMonths: 12,
    demand: 'very-high',
    season: 'Весна–осень',
    description: 'Суперфуд с огромным спросом. Ягоды стоят 500–1500 руб/кг. Растёт на кислых почвах, плодоносит 30+ лет. Один из самых прибыльных ягодных кустарников.',
    keyBenefits: [
      'Огромный и растущий рынок',
      'Ягоды стоят 500–1500 руб/кг',
      'Долголетие — плодоносит 30+ лет',
      'Высокая морозостойкость',
      'Мало вредителей',
    ],
    challenges: [
      'Нужна кислая почва (pH 3.5–4.5)',
      'Требует регулярного полива',
      'Перекрёстное опыление — нужно 2+ сорта',
      'Конкуренция с импортной ягодой',
    ],
    marketTips: [
      'Продавайте 2–3 летние саженцы — они уже дают урожай',
      'Набор из 3 сортов для опыления — хит продаж',
      'Давайте памятку по подготовке кислого субстрата',
      'Ягода на рынке: 800–1500 руб/кг',
    ],
  },
  {
    id: 'p6',
    name: 'Жимолость съедобная',
    latinName: 'Lonicera caerulea',
    category: 'berry',
    variety: 'Бакчарская, Синичка',
    difficulty: 'easy',
    growthTime: '2 года до плодоношения',
    costPerUnit: 100,
    sellingPrice: 400,
    profitPerUnit: 300,
    roi: 300,
    paybackMonths: 8,
    demand: 'high',
    season: 'Весна–осень',
    description: 'Самая ранняя ягода! Созревает в июне, раньше земляники. Очень зимостойкая, неприхотливая. Растущий рынок — мало кто выращивает.',
    keyBenefits: [
      'Первая ягода сезона (июнь)',
      'Зимостойкость до -50°C',
      'Неприхотлива к почвам',
      'Мало конкурентов на рынке',
      'Легко размножается черенками',
    ],
    challenges: [
      'Нужно 2+ сорта для опыления',
      'Ягода осыпается — нужен сбор в сетку',
      'Не все покупатели знакомы с культурой',
    ],
    marketTips: [
      'Продавайте парами сортов для опыления',
      'Образовательный контент помогает продажам',
      'Ягода на рынке: 300–600 руб/кг',
      'Популярна у садоводов-энтузиастов',
    ],
  },
  {
    id: 'p7',
    name: 'Клубника (земляника садовая)',
    latinName: 'Fragaria × ananassa',
    category: 'berry',
    variety: 'Ремонтантные сорта',
    difficulty: 'easy',
    growthTime: '1 сезон',
    costPerUnit: 30,
    sellingPrice: 100,
    profitPerUnit: 70,
    roi: 233,
    paybackMonths: 3,
    demand: 'very-high',
    season: 'Весна–лето',
    description: 'Самая популярная ягода. Ремонтантные сорта плодоносят с июня по октябрь. Быстрый оборот — от уса до продажи 2–3 месяца.',
    keyBenefits: [
      'Очень быстрое размножение (усы)',
      'Высокий спрос — все знают и любят',
      'Ремонтантные сорта — урожай всё лето',
      'Низкая себестоимость',
      'Быстрый оборот средств',
    ],
    challenges: [
      'Высокая конкуренция',
      'Нужно обновление каждые 3–4 года',
      'Болезни (серая гниль, вертициллёз)',
      'Сезонность спроса',
    ],
    marketTips: [
      'Рассада фриго (замороженная) — всесезонный продукт',
      'Продавайте сорта с разными сроками созревания',
      'Наборы "клубничная грядка" — 20–50 кустов',
      'Кассетная рассада стоит дороже',
    ],
  },
  // ДЕКОРАТИВНЫЕ ЛИСТВЕННЫЕ
  {
    id: 'p8',
    name: 'Гортензия метельчатая',
    latinName: 'Hydrangea paniculata',
    category: 'ornamental',
    variety: 'Лаймлайт, Ванилла Фрайз',
    difficulty: 'easy',
    growthTime: '2–3 года',
    costPerUnit: 150,
    sellingPrice: 700,
    profitPerUnit: 550,
    roi: 367,
    paybackMonths: 8,
    demand: 'very-high',
    season: 'Весна–осень',
    description: 'Тренд последних лет! Огромные соцветия, неприхотливость, зимостойкость. Легко размножается черенками. Один из самых продаваемых кустарников.',
    keyBenefits: [
      'Очень легко черенкуется (90%+)',
      'Быстрый рост (30–50 см/год)',
      'Огромный спрос — тренд',
      'Зимостойкость без укрытия',
      'Цветёт на побегах текущего года',
    ],
    challenges: [
      'Требует обильного полива',
      'Нужна обрезка для обильного цветения',
      'Конкуренция с импортными сортами',
    ],
    marketTips: [
      'Новые сорта стоят в 2–3 раза дороже',
      'Штамбовые формы — премиум-сегмент',
      'Продавайте в период цветения — эффектнее',
      'Размер 40–60 см — оптимальный для продажи',
    ],
  },
  {
    id: 'p9',
    name: 'Розы (шрабы и кустовые)',
    latinName: 'Rosa',
    category: 'ornamental',
    variety: 'Разные сорта',
    difficulty: 'hard',
    growthTime: '2–3 года',
    costPerUnit: 250,
    sellingPrice: 900,
    profitPerUnit: 650,
    roi: 260,
    paybackMonths: 10,
    demand: 'high',
    season: 'Весна–осень',
    description: 'Королева сада. Высокая цена, стабильный спрос. Сложнее в выращивании, но маржа отличная. Современные сорта устойчивы к болезням.',
    keyBenefits: [
      'Высокая цена продажи',
      'Стабильный спрос десятилетиями',
      'Огромный выбор сортов',
      'Возможность продажи через интернет',
    ],
    challenges: [
      'Сложная зимовка в большинстве регионов',
      'Требует укрытия на зиму',
      'Подвержена болезням (мучнистая роса, ЧП)',
      'Нужна регулярная обработка',
      'Сложность черенкования некоторых сортов',
    ],
    marketTips: [
      'Зимостойкие сорта (Kordes, Meilland) — хиты',
      'Продавайте с подробной инструкцией по уходу',
      'ОКС дешевле, но контейнерные популярнее',
      'Групповые посадки — наборы по 3–5 сортов',
    ],
  },
  {
    id: 'p10',
    name: 'Сирень (сортовая)',
    latinName: 'Syringa vulgaris',
    category: 'ornamental',
    variety: 'Красавица Москвы, Мадам Лемуан',
    difficulty: 'medium',
    growthTime: '3–4 года',
    costPerUnit: 200,
    sellingPrice: 800,
    profitPerUnit: 600,
    roi: 300,
    paybackMonths: 10,
    demand: 'high',
    season: 'Весна (цветение) и осень',
    description: 'Классика русского сада. Сортовые сирени с махровыми цветками очень ценятся. Хорошо прививается на бирючину.',
    keyBenefits: [
      'Долговечность — живёт 50+ лет',
      'Зимостойкость абсолютная',
      'Неприхотливость',
      'Высокая цена сортовых форм',
      'Ностальгический спрос',
    ],
    challenges: [
      'Медленный рост привитых форм',
      'Нужен подвой (бирючина или сеянец)',
      'Долгий цикл до продажи',
      'Поражается мучнистой росой',
    ],
    marketTips: [
      'Привитые на бирючину — компактные и дорогие',
      'Продавайте в период цветения — максимальный эффект',
      'Коллекционные сорта стоят 1500–3000 руб',
      'Популярна у старшего поколения',
    ],
  },
  // ПЛОДОВЫЕ
  {
    id: 'p11',
    name: 'Яблоня (карликовые подвои)',
    latinName: 'Malus domestica',
    category: 'fruit',
    variety: 'Разные сорта',
    difficulty: 'medium',
    growthTime: '2–3 года',
    costPerUnit: 300,
    sellingPrice: 1000,
    profitPerUnit: 700,
    roi: 233,
    paybackMonths: 10,
    demand: 'very-high',
    season: 'Весна и осень',
    description: 'Самое популярное плодовое дерево. Карликовые подвои (ММ106, 54-118) — современный стандарт. Начинают плодоносить на 2–3 год.',
    keyBenefits: [
      'Огромный стабильный спрос',
      'Карликовые — компактные и скороспелые',
      'Можно выращивать в контейнерах',
      'Высокая цена за сортовые саженцы',
      'Возможность продажи комплектами',
    ],
    challenges: [
      'Нужна прививка (или покупка подвоя)',
      'Конкуренция с рынками и супермаркетами',
      'Требует знаний в помологии',
      'Сезонность продаж',
    ],
    marketTips: [
      'Наборы "сад" — яблоня + груша + слива',
      'Самоплодные сорта — без проблем с опылением',
      'Колонновидные яблони — для маленьких участков',
      'Давайте схему посадки и ухода',
    ],
  },
  {
    id: 'p12',
    name: 'Лаванда узколистная',
    latinName: 'Lavandula angustifolia',
    category: 'ornamental',
    variety: 'Hidcote, Munstead',
    difficulty: 'medium',
    growthTime: '1–2 года',
    costPerUnit: 80,
    sellingPrice: 350,
    profitPerUnit: 270,
    roi: 338,
    paybackMonths: 6,
    demand: 'high',
    season: 'Лето (цветение)',
    description: 'Трендовое ароматное растение. Популярна для альпинариев, бордюров и контейнерного озеленения. Легко размножается черенками.',
    keyBenefits: [
      'Тренд — все хотят лаванду',
      'Легко черенкуется',
      'Аромат — дополнительная ценность',
      'Засухоустойчива',
      'Можно продавать в цветущем виде',
    ],
    challenges: [
      'В средней полосе требует укрытия',
      'Не переносит переувлажнения',
      'Нужна обрезка после цветения',
      'Вымерзание в суровые зимы',
    ],
    marketTips: [
      'Продавайте в период цветения — аромат продаёт',
      'Английская лаванда зимостойнее французской',
      'Контейнерные — дороже и популярнее',
      'Наборы для "прованского сада"',
    ],
  },
  {
    id: 'p13',
    name: 'Самшит вечнозелёный',
    latinName: 'Buxus sempervirens',
    category: 'ornamental',
    variety: 'Suffruticosa, Blauer Heinz',
    difficulty: 'easy',
    growthTime: '2–3 года',
    costPerUnit: 120,
    sellingPrice: 500,
    profitPerUnit: 380,
    roi: 317,
    paybackMonths: 8,
    demand: 'high',
    season: 'Круглый год',
    description: 'Идеальное растение для топиарного искусства и бордюров. Вечнозелёный, прекрасно стрижётся. Классика формальных садов.',
    keyBenefits: [
      'Идеален для стрижки и топиария',
      'Вечнозелёный — декоративен круглый год',
      'Легко черенкуется',
      'Медленный рост = меньше обрезок',
      'Высокая цена за формованные экземпляры',
    ],
    challenges: [
      'Самшитовая огнёвка — новый вредитель',
      'Может подмерзать в суровые зимы',
      'Медленный рост',
      'Нужна профилактика от огнёвки',
    ],
    marketTips: [
      'Шары, кубы, спирали — в 3–5 раз дороже',
      'Бордюрный самшит — продажа погонными метрами',
      'Давайте средство от огнёвки в комплекте',
      'Популярен для японских и средиземноморских садов',
    ],
  },
  {
    id: 'p14',
    name: 'Виноград столовый',
    latinName: 'Vitis vinifera',
    category: 'fruit',
    variety: 'Столовые сорта',
    difficulty: 'hard',
    growthTime: '2–3 года',
    costPerUnit: 200,
    sellingPrice: 700,
    profitPerUnit: 500,
    roi: 250,
    paybackMonths: 10,
    demand: 'high',
    season: 'Весна–осень',
    description: 'Столовый виноград для беседок и арок. Ранние сорта успевают вызреть в средней полосе. Высокий спрос на саженцы.',
    keyBenefits: [
      'Быстрый рост (2–3 м за сезон)',
      'Высокая декоративность',
      'Плодоношение на 2–3 год',
      'Легко размножается черенками',
      'Ягоды — дополнительный доход',
    ],
    challenges: [
      'Требует укрытия на зиму в большинстве регионов',
      'Болезни (милдью, оидиум)',
      'Нужна обрезка и формирование',
      'Знание сортов — обязательно',
    ],
    marketTips: [
      'Неукрывные сорта — дороже и популярнее',
      'Продавайте с описанием вкуса и сроков',
      'Наборы для беседки — 3–4 куста',
      'Популярен в южных регионах без ограничений',
    ],
  },
  {
    id: 'p15',
    name: 'Спирея японская',
    latinName: 'Spiraea japonica',
    category: 'ornamental',
    variety: 'Голден Принцесс, Антони Ватерер',
    difficulty: 'easy',
    growthTime: '1.5–2 года',
    costPerUnit: 80,
    sellingPrice: 350,
    profitPerUnit: 270,
    roi: 338,
    paybackMonths: 6,
    demand: 'high',
    season: 'Весна–осень',
    description: 'Неприхотливый декоративный кустарник с яркой листвой. Идеален для бордюров, массовых посадок и городского озеленения. Очень легко размножается.',
    keyBenefits: [
      'Очень легко черенкуется (95%+)',
      'Быстрый рост',
      'Яркая листва (жёлтая, красная)',
      'Абсолютная зимостойкость',
      'Низкая себестоимость',
    ],
    challenges: [
      'Нужна стрижка для компактности',
      'Конкуренция — много кто выращивает',
      'Недолговечна без омолаживания',
    ],
    marketTips: [
      'Продавайте в цветущем виде',
      'Массовые посадки — от 10 шт со скидкой',
      'Популярна у застройщиков и муниципалитетов',
      'Контрастные композиции — 2–3 сорта вместе',
    ],
  },
];

const CATEGORY_CONFIG = {
  conifer: { label: 'Хвойные', icon: '🌲', color: 'emerald' },
  deciduous: { label: 'Лиственные', icon: '🍂', color: 'amber' },
  berry: { label: 'Ягодные', icon: '🫐', color: 'purple' },
  fruit: { label: 'Плодовые', icon: '🍎', color: 'red' },
  ornamental: { label: 'Декоративные', icon: '🌸', color: 'pink' },
};

const DIFFICULTY_CONFIG = {
  easy: { label: 'Легко', color: 'bg-green-100 text-green-700', stars: 1 },
  medium: { label: 'Средне', color: 'bg-amber-100 text-amber-700', stars: 2 },
  hard: { label: 'Сложно', color: 'bg-red-100 text-red-700', stars: 3 },
};

const DEMAND_CONFIG = {
  'low': { label: 'Низкий', color: 'text-gray-500' },
  'medium': { label: 'Средний', color: 'text-blue-600' },
  'high': { label: 'Высокий', color: 'text-amber-600' },
  'very-high': { label: 'Очень высокий', color: 'text-red-600' },
};

export default function ProfitablePlantsView() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'roi' | 'profit' | 'payback'>('roi');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = PROFITABLE_PLANTS
    .filter(p => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.latinName.toLowerCase().includes(search.toLowerCase());
      const matchCategory = category === 'all' || p.category === category;
      return matchSearch && matchCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'roi') return b.roi - a.roi;
      if (sortBy === 'profit') return b.profitPerUnit - a.profitPerUnit;
      return a.paybackMonths - b.paybackMonths;
    });

  const totalPotential = PROFITABLE_PLANTS.reduce((s, p) => s + p.profitPerUnit, 0);
  const avgRoi = Math.round(PROFITABLE_PLANTS.reduce((s, p) => s + p.roi, 0) / PROFITABLE_PLANTS.length);
  const topPlants = [...PROFITABLE_PLANTS].sort((a, b) => b.roi - a.roi).slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Самые прибыльные растения</h1>
        <p className="text-gray-500 mt-1">Рентабельные культуры для вашего питомника</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl p-5 text-white shadow-lg">
          <DollarSign className="w-8 h-8 mb-2 opacity-80" />
          <p className="text-2xl font-bold">{PROFITABLE_PLANTS.length}</p>
          <p className="text-sm opacity-80">Растений в каталоге</p>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-5 text-white shadow-lg">
          <TrendingUp className="w-8 h-8 mb-2 opacity-80" />
          <p className="text-2xl font-bold">{avgRoi}%</p>
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
          <p className="text-sm opacity-80">Мин. срок окупаемости</p>
        </div>
      </div>

      {/* Top 5 Plants */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-500" />
          ТОП-5 самых рентабельных
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {topPlants.map((plant, index) => (
            <div key={plant.id} className="relative p-4 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:shadow-md transition-shadow">
              <div className="absolute -top-2 -left-2 w-7 h-7 bg-amber-400 text-white rounded-full flex items-center justify-center text-xs font-bold shadow">
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
            <input
              type="text"
              placeholder="Поиск растения..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setCategory('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                category === 'all' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Все
            </button>
            {Object.entries(CATEGORY_CONFIG).map(([key, config]) => (
              <button
                key={key}
                onClick={() => setCategory(key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  category === key ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {config.icon} {config.label}
              </button>
            ))}
          </div>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as typeof sortBy)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
          >
            <option value="roi">По рентабельности</option>
            <option value="profit">По прибыли</option>
            <option value="payback">По окупаемости</option>
          </select>
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-gray-500">Найдено: <span className="font-semibold text-gray-700">{filtered.length}</span> растений</p>

      {/* Plant Cards */}
      <div className="space-y-3">
        {filtered.map(plant => {
          const isExpanded = expandedId === plant.id;
          const catConfig = CATEGORY_CONFIG[plant.category];
          const diffConfig = DIFFICULTY_CONFIG[plant.difficulty];
          const demandConfig = DEMAND_CONFIG[plant.demand];

          return (
            <div
              key={plant.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-4 md:p-5">
                <div className="flex items-start gap-4">
                  <div className="text-3xl w-12 h-12 flex items-center justify-center bg-gray-50 rounded-xl flex-shrink-0">
                    {catConfig.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-gray-900">{plant.name}</h3>
                      <span className="text-xs text-gray-400 italic">{plant.latinName}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">{plant.description}</p>

                    {/* Tags */}
                    <div className="flex items-center gap-2 mt-3 flex-wrap">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${diffConfig.color}`}>
                        {'⭐'.repeat(diffConfig.stars)} {diffConfig.label}
                      </span>
                      <span className="text-xs text-gray-500">
                        <Clock className="w-3 h-3 inline" /> {plant.growthTime}
                      </span>
                      <span className={`text-xs font-medium ${demandConfig.color}`}>
                        📈 Спрос: {demandConfig.label}
                      </span>
                    </div>
                  </div>

                  {/* Financial Block */}
                  <div className="hidden md:flex flex-col items-end gap-1 flex-shrink-0">
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Прибыль с 1 шт</p>
                      <p className="text-xl font-bold text-emerald-600">{plant.profitPerUnit} ₽</p>
                    </div>
                    <div className="flex gap-3 text-xs text-gray-500">
                      <span>ROI: <span className="font-semibold text-gray-700">{plant.roi}%</span></span>
                      <span>Окупаемость: <span className="font-semibold text-gray-700">{plant.paybackMonths} мес</span></span>
                    </div>
                  </div>

                  <button
                    onClick={() => setExpandedId(isExpanded ? null : plant.id)}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
                  >
                    {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                  </button>
                </div>

                {/* Mobile Financial Block */}
                <div className="md:hidden grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-gray-100">
                  <div className="text-center">
                    <p className="text-xs text-gray-500">Прибыль</p>
                    <p className="text-lg font-bold text-emerald-600">{plant.profitPerUnit}₽</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500">ROI</p>
                    <p className="text-lg font-bold text-blue-600">{plant.roi}%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500">Окупаемость</p>
                    <p className="text-lg font-bold text-purple-600">{plant.paybackMonths} мес</p>
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              {isExpanded && (
                <div className="px-4 md:px-5 pb-5 pt-2 border-t border-gray-100 bg-gray-50 animate-fade-in">
                  {/* Financial Details */}
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
                    {/* Key Benefits */}
                    <div className="bg-emerald-50 rounded-xl p-4">
                      <h4 className="text-sm font-semibold text-emerald-800 mb-3 flex items-center gap-2">
                        <Star className="w-4 h-4" /> Преимущества
                      </h4>
                      <ul className="space-y-1.5">
                        {plant.keyBenefits.map((b, i) => (
                          <li key={i} className="text-sm text-emerald-700 flex gap-2">
                            <span>✅</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Challenges */}
                    <div className="bg-amber-50 rounded-xl p-4">
                      <h4 className="text-sm font-semibold text-amber-800 mb-3 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" /> Сложности
                      </h4>
                      <ul className="space-y-1.5">
                        {plant.challenges.map((c, i) => (
                          <li key={i} className="text-sm text-amber-700 flex gap-2">
                            <span>⚠️</span>
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Market Tips */}
                    <div className="bg-blue-50 rounded-xl p-4">
                      <h4 className="text-sm font-semibold text-blue-800 mb-3 flex items-center gap-2">
                        <Target className="w-4 h-4" /> Советы по продажам
                      </h4>
                      <ul className="space-y-1.5">
                        {plant.marketTips.map((t, i) => (
                          <li key={i} className="text-sm text-blue-700 flex gap-2">
                            <span>💡</span>
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-3 flex-wrap text-xs text-gray-500">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Сезон: {plant.season}</span>
                    <span className="flex items-center gap-1">🏷️ Сорт: {plant.variety}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-gray-500 text-lg">Растения не найдены</p>
          <p className="text-gray-400 text-sm mt-1">Попробуйте изменить параметры поиска</p>
        </div>
      )}

      {/* Business Tips */}
      <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl border border-emerald-100 p-6">
        <h3 className="text-lg font-semibold text-emerald-800 mb-4 flex items-center gap-2">
          <Info className="w-5 h-5" /> Бизнес-советы для питомника
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-sm text-emerald-700">📊 <strong>Диверсификация</strong> — не вкладывайтесь в один вид. Сочетайте хвойные, ягодные и декоративные.</p>
            <p className="text-sm text-emerald-700">💰 <strong>Контейнерные растения</strong> — маржа в 2–3 раза выше, чем у ОКС. Инвестируйте в контейнеры.</p>
            <p className="text-sm text-emerald-700">🌱 <strong>Черенкование</strong> — самый дешёвый способ размножения. Освойте его для туи, спиреи, гортензии.</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-emerald-700">📱 <strong>Онлайн-продажи</strong> — соцсети и маркетплейсы увеличивают продажи в 3–5 раз.</p>
            <p className="text-sm text-emerald-700">🤝 <strong>B2B</strong> — ландшафтные дизайнеры и застройщики — оптовые постоянные клиенты.</p>
            <p className="text-sm text-emerald-700">📅 <strong>Сезонность</strong> — пик продаж: апрель–май и сентябрь–октябрь. Готовьте ассортимент заранее.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
