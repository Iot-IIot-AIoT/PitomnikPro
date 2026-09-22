import { useState } from 'react';
import { GrowthStage, GrowthPlan, PlantType } from '../types';
import { PLANT_TYPE_LABELS } from '../data';
import {
  Sprout, Droplets, Sun, Thermometer, Scissors, Package,
  Snowflake, Truck, CheckCircle2, Circle, ChevronRight,
  ChevronDown, Plus, AlertTriangle, Lightbulb, Clock,
  Calendar, Target, ChevronLeft, Trash2, Eye
} from 'lucide-react';

const SEED_STAGES: Omit<GrowthStage, 'completed'>[] = [
  {
    id: 's1',
    order: 1,
    title: 'Сбор и подготовка семян',
    subtitle: 'Заготовка посадочного материала',
    icon: '🌰',
    duration: '2–4 недели',
    season: 'Осень (сентябрь–октябрь)',
    description: 'Сбор зрелых шишек, извлечение семян, предварительная очистка и сортировка. От качества семян зависит всхожесть и здоровье будущих растений.',
    steps: [
      'Собрать зрелые шишки с здоровых материнских растений',
      'Высушить шишки при комнатной температуре 3–5 дней',
      'Извлечь семена из раскрытых чешуек',
      'Отсортировать: удалить пустые, повреждённые, мелкие',
      'Провести тест на всхожесть (замочить 10 семян на 24 часа)',
      'Обработать семена фунгицидом (раствор марганцовки 0.5%)',
    ],
    tips: [
      'Собирайте шишки с деревьев старше 10 лет — семена более жизнеспособны',
      'Оптимальная влажность семян для хранения: 8–12%',
      'Семена сосны сохраняют всхожесть 2–3 года, ели — до 4 лет',
    ],
    warnings: [
      'Не собирайте шишки с больных или ослабленных деревьев',
      'Избегайте перегрева при сушке — температура не выше 40°C',
    ],
    temperature: '15–20°C',
    humidity: '40–50%',
  },
  {
    id: 's2',
    order: 2,
    title: 'Стратификация',
    subtitle: 'Холодная обработка семян',
    icon: '❄️',
    duration: '30–90 дней',
    season: 'Зима (ноябрь–февраль)',
    description: 'Имитация зимних условий для пробуждения зародыша. Без стратификации семена большинства хвойных не прорастают. Длительность зависит от вида.',
    steps: [
      'Замочить семена в воде комнатной температуры на 24–48 часов',
      'Смешать с влажным песком или перлитом (пропорция 1:3)',
      'Поместить в контейнер с вентиляционными отверстиями',
      'Хранить в холодильнике при +2...+5°C',
      'Проверять влажность субстрата каждые 7–10 дней',
      'При появлении белых корешков — семена готовы к посеву',
    ],
    tips: [
      'Сосна: 30–45 дней стратификации',
      'Ель, пихта: 45–60 дней',
      'Можжевельник, тис: 90–120 дней (двойная стратификация)',
      'Добавьте фунгицид в субстрат для профилактики плесени',
    ],
    warnings: [
      'Не допускайте пересыхания субстрата — семена погибнут',
      'При температуре выше +7°C семена могут заплесневеть',
      'Следите за появлением плесени — при обнаружении промойте и замените субстрат',
    ],
    temperature: '+2...+5°C',
    humidity: '60–70%',
  },
  {
    id: 's3',
    order: 3,
    title: 'Посев',
    subtitle: 'Высадка в субстрат',
    icon: '🌱',
    duration: '1–2 дня',
    season: 'Весна (март–апрель)',
    description: 'Посев стратифицированных семян в подготовленный субстрат. Правильная глубина заделки и плотность посева критически важны для равномерных всходов.',
    steps: [
      'Подготовить субстрат: торф + песок + перлит (2:1:1)',
      'Заполнить контейнеры или грядки, уплотнить поверхность',
      'Пролить субстрат тёплой водой с фунгицидом',
      'Разложить семена на расстоянии 2–3 см друг от друга',
      'Присыпать слоем песка 0.5–1 см (для мелких семян) или 1–2 см (для крупных)',
      'Накрыть плёнкой или стеклом для создания микроклимата',
      'Поместить в тёплое светлое место',
    ],
    tips: [
      'Глубина заделки: диаметр семени × 2',
      'Для сосны оптимальная температура прорастания: +22...+25°C',
      'Используйте фитолампы при недостатке естественного света',
      'Посев в бороздки упрощает дальнейшую пикировку',
    ],
    warnings: [
      'Не заглубляйте семена слишком сильно — всходы не пробьются',
      'Избегайте прямого солнечного света до появления всходов',
      'Не переувлажняйте — застой воды вызывает гниль корневой шейки',
    ],
    temperature: '+20...+25°C',
    humidity: '80–90%',
  },
  {
    id: 's4',
    order: 4,
    title: 'Проращивание и уход за всходами',
    subtitle: 'Первые недели жизни',
    icon: '🌿',
    duration: '2–6 недель',
    season: 'Весна (апрель–май)',
    description: 'Период от появления первых петель до раскрытия семядолей. Самый критичный этап — сеянцы крайне уязвимы к болезням и неправильному поливу.',
    steps: [
      'Снять укрытие после появления 50% всходов',
      'Обеспечить рассеянный свет 12–14 часов в сутки',
      'Поливать из пульверизатора 1–2 раза в день',
      'Поддерживать температуру +18...+22°C',
      'Провести профилактическую обработку от чёрной ножки',
      'Проредить загущённые всходы через 2 недели',
      'Начать закаливание за 2 недели до высадки',
    ],
    tips: [
      'Всходы появляются через 10–25 дней после посева',
      'Первые 2 недели поливайте только из пульверизатора',
      'При появлении чёрной ножки удалите больные сеянцы и обработайте «Фитоспорином»',
      'Идеальный световой день: 14 часов при 5000–8000 люкс',
    ],
    warnings: [
      'Чёрная ножка — главный враг сеянцев хвойных',
      'Пересушка губительна — корни сеянцев тонкие и быстро высыхают',
      'Не допускайте перепада температур более 5°C',
    ],
    temperature: '+18...+22°C',
    humidity: '70–80%',
  },
  {
    id: 's5',
    order: 5,
    title: 'Пикировка',
    subtitle: 'Пересадка сеянцев',
    icon: '🪴',
    duration: '3–5 дней',
    season: 'Весна–лето (май–июнь)',
    description: 'Пересадка сеянцев в индивидуальные ёмкости или на гряды с увеличенным расстоянием. Стимулирует развитие корневой системы и даёт каждому растению пространство.',
    steps: [
      'За 2 часа до пикировки обильно полить сеянцы',
      'Подготовить индивидуальные стаканчики (200–300 мл) с дренажем',
      'Заполнить субстратом: дерновая земля + торф + песок (2:1:1)',
      'Аккуратно извлечь сеянец с комом земли',
      'Укоротить центральный корень на 1/3 (для стимуляции боковых)',
      'Высадить на ту же глубину, что и раньше',
      'Обильно полить и притенить на 3–5 дней',
    ],
    tips: [
      'Пикируйте в пасмурную погоду или вечером',
      'Используйте палочку или карандаш для изготовления лунок',
      'После пикировки полейте раствором «Корневина»',
      'Оптимальная схема: 5×5 см на гряде, стаканчики 200 мл',
    ],
    warnings: [
      'Не допускайте подсыхания корней при пересадке',
      'Не заглубляйте корневую шейку — это вызывает выпревание',
      'Первые 5–7 дней после пикировки притеняйте от прямого солнца',
    ],
    temperature: '+16...+20°C',
    humidity: '75–85%',
  },
  {
    id: 's6',
    order: 6,
    title: 'Доращивание в школке',
    subtitle: 'Формирование корневой системы',
    icon: '🌲',
    duration: '1–2 года',
    season: 'Круглогодично',
    description: 'Основной период роста молодого растения. Формируется корневая система, начинается одревеснение побегов. Регулярный уход определяет качество будущего саженца.',
    steps: [
      'Высадить в открытый грунт школки с шагом 15×20 см',
      'Мульчировать корой или щепой слоем 3–5 см',
      'Поливать 1–2 раза в неделю (в зависимости от погоды)',
      'Подкармливать комплексным удобрением каждые 3–4 недели',
      'Пропалывать сорняки регулярно',
      'Проводить профилактику болезней каждые 2 недели',
      'Подготовить к зиме: укрыть лапником, обильно полить осенью',
    ],
    tips: [
      'Удобрение: «Кемира-универсал» или специализированное для хвойных',
      'В первый год прирост составит 3–7 см, во второй — 7–15 см',
      'Для туи и можжевельника можно начать формирующую обрезку',
      'Осенью прекратите азотные подкормки — только калий и фосфор',
    ],
    warnings: [
      'Не перекармливайте азотом осенью — побеги не успеют одревеснеть',
      'Застой воды в школке приводит к корневым гнилям',
      'Защитите от весенних ожогов — укройте нетканым материалом',
    ],
    temperature: 'Сезонная',
    humidity: '60–70%',
  },
  {
    id: 's7',
    order: 7,
    title: 'Пересадка в контейнеры',
    subtitle: 'Подготовка к продаже',
    icon: '📦',
    duration: '1 день + адаптация',
    season: 'Весна или осень',
    description: 'Перевалка подросших саженцев в торговые контейнеры. Растения с закрытой корневой системой (ЗКС) лучше приживаются и могут продаваться круглый год.',
    steps: [
      'Выбрать контейнер по размеру корневой системы',
      'Подготовить субстрат: верховой торф + кора + перлит (3:1:1)',
      'На дно контейнера — дренаж 2–3 см (керамзит)',
      'Аккуратно перевалить растение с комом земли',
      'Заполнить пустоты субстратом, слегка уплотнить',
      'Обильно полить и установить в тени на 7–10 дней',
      'Маркировать контейнер: вид, сорт, дата',
    ],
    tips: [
      'Контейнер C2 (2 л) — для саженцев 15–30 см',
      'Контейнер C5 (5 л) — для саженцев 30–60 см',
      'Контейнер C7.5–C15 — для крупномеров',
      'Добавьте в субстрат гидрогель для удержания влаги',
    ],
    warnings: [
      'Не повреждайте земляной ком — это стресс для растения',
      'Не оставляйте контейнеры на солнце — корни перегреваются',
      'Зимой контейнеры промерзают — укройте или прикопайте в грунт',
    ],
    temperature: '+10...+20°C',
    humidity: '65–75%',
  },
  {
    id: 's8',
    order: 8,
    title: 'Формирование кроны',
    subtitle: 'Декоративная обрезка',
    icon: '✂️',
    duration: 'Ежегодно',
    season: 'Весна (апрель–май)',
    description: 'Придание растению желаемой формы. Для хвойных важна аккуратность — они медленно восстанавливаются. Формирование начинается с 2–3 года.',
    steps: [
      'Определить желаемую форму (конус, шар, колонна, бонсай)',
      'Провести санитарную обрезку: удалить сухие, больные ветви',
      'Укоротить молодые побеги («свечки») на 1/3–1/2',
      'Для густоты: прищипнуть верхушечные почки',
      'Обработать срезы садовым варом (для крупных ветвей)',
      'После обрезки подкормить и полить',
      'Повторять ежегодно для поддержания формы',
    ],
    tips: [
      'Обрезайте в пасмурную погоду — меньше стресса',
      'Для сосны: укорачивайте «свечки» в мае–июне',
      'Для ели: прищипывайте верхушечные почки весной',
      'Для туи: стрижка 2–3 раза за сезон для плотной кроны',
      'Инструмент должен быть острым и продезинфицированным',
    ],
    warnings: [
      'Не обрезайте до старой древесины — хвойные не дают спящих почек на стволе',
      'Осенью обрезка стимулирует рост — побеги не перезимуют',
      'При сильной обрезке растение может заболеть',
    ],
  },
  {
    id: 's9',
    order: 9,
    title: 'Подготовка к зиме',
    subtitle: 'Защита от морозов и ожогов',
    icon: '🌨️',
    duration: '2–3 недели',
    season: 'Осень (октябрь–ноябрь)',
    description: 'Комплекс мероприятий по подготовке растений к зимнему периоду. Влагозарядковый полив, мульчирование, защита от снежных ломок и солнечных ожогов.',
    steps: [
      'Прекратить азотные подкормки с августа',
      'Провести влагозарядковый полив (50–100 л на растение)',
      'Мульчировать приствольные круги торфом или корой (7–10 см)',
      'Связать кроны колонновидных форм шпагатом',
      'Установить каркасы для защиты от снеголома',
      'Укрыть молодые растения нетканым материалом',
      'Обработать от грибковых заболеваний',
    ],
    tips: [
      'Влагозарядковый полив — самый важный этап подготовки',
      'Нетканый материал защищает от ожогов лучше, чем плёнка',
      'Для можжевельников: обязательна обвязка от разламывания снегом',
      'Снимайте укрытие постепенно, начиная с марта',
    ],
    warnings: [
      'Не укрывайте плёнкой — растение сопреет',
      'Раннее укрытие при плюсовой температуре вызывает выпревание',
      'Снег на ветвях = поломка кроны. Стряхивайте тяжёлый мокрый снег',
    ],
    temperature: 'До –5°C до укрытия',
  },
  {
    id: 's10',
    order: 10,
    title: 'Реализация',
    subtitle: 'Продажа или высадка на ПМЖ',
    icon: '🏡',
    duration: 'По мере готовности',
    season: 'Круглогодично (лучше весна/осень)',
    description: 'Финальный этап — продажа готового саженца или высадка на постоянное место. Растения с ЗКС можно пересаживать в течение всего сезона.',
    steps: [
      'Оценить качество: здоровье, форма, размер корневой системы',
      'Составить паспорт растения: вид, сорт, возраст, размеры',
      'Сфотографировать для каталога',
      'Подготовить рекомендации по посадке и уходу для покупателя',
      'При продаже: обеспечить правильную транспортировку',
      'При высадке: подготовить посадочную яму, заправить удобрением',
      'Обеспечить послепосадочный уход первые 2–3 месяца',
    ],
    tips: [
      'Оптимальный возраст для продажи: 3–5 лет',
      'Саженцы с ЗКС приживаются в 3 раза лучше, чем с ОКС',
      'Давайте клиентам памятку по уходу — это снижает возвраты',
      'Лучшее время посадки: апрель или сентябрь',
    ],
    warnings: [
      'Не продавайте больные или ослабленные растения',
      'При транспортировке защитите крону от ветра',
      'После посадки необходим обильный полив и притенение',
    ],
  },
];

const CUTTING_STAGES: Omit<GrowthStage, 'completed'>[] = [
  {
    id: 'c1',
    order: 1,
    title: 'Заготовка черенков',
    subtitle: 'Нарезка посадочного материала',
    icon: '✂️',
    duration: '1 день',
    season: 'Весна (апрель) или осень (октябрь)',
    description: 'Нарезка полуодревесневших черенков с материнских растений. Качество черенков напрямую влияет на процент укоренения.',
    steps: [
      'Выбрать здоровое материнское растение',
      'Нарезать черенки длиной 10–15 см с «пяткой»',
      'Удалить хвою в нижней трети черенка',
      'Обработать стимулятором корнеобразования («Корневин»)',
      'Поместить в воду или сразу в субстрат',
      'Маркировать по сортам',
    ],
    tips: [
      'Черенки с «пяткой» укореняются в 2 раза лучше',
      'Нарезайте рано утром — в это время максимальная влажность тканей',
      'Используйте острый стерильный нож',
      'Лучшие черенки — с боковых побегов, направленных вверх',
    ],
    warnings: [
      'Не используйте черенки с верхушечных побегов — они плохо укореняются',
      'Не допускайте подсыхания черенков — работайте быстро',
      'Избегайте черенков с признаками болезней',
    ],
    temperature: '+15...+20°C',
    humidity: '90–100%',
  },
  {
    id: 'c2',
    order: 2,
    title: 'Укоренение',
    subtitle: 'Формирование корневой системы',
    icon: '🌱',
    duration: '1–6 месяцев',
    season: 'Круглогодично (в теплице)',
    description: 'Создание оптимальных условий для образования корней. Требует высокой влажности и стабильной температуры. У разных видов скорость укоренения сильно отличается.',
    steps: [
      'Подготовить субстрат: перлит + торф (1:1)',
      'Заполнить череночник, увлажнить',
      'Высадить черенки под углом 45°, на глубину 3–5 см',
      'Создать туманообразующую установку или накрыть плёнкой',
      'Поддерживать температуру +20...+24°C',
      'Проветривать ежедневно 15–20 минут',
      'Опрыскивать 3–5 раз в день',
    ],
    tips: [
      'Можжевельник казацкий укореняется за 1–2 месяца',
      'Туя западная — 2–3 месяца',
      'Сосна и ель — 4–6 месяцев (сложнее укореняются)',
      'Нижний подогрев ускоряет укоренение на 30%',
      'Используйте «Гетероауксин» для труднорукореняемых видов',
    ],
    warnings: [
      'Перелив вызывает загнивание черенков',
      'При температуре выше +28°C черенки перегреваются',
      'Плесень — сигнал о плохой вентиляции',
    ],
    temperature: '+20...+24°C',
    humidity: '90–100%',
  },
  {
    id: 'c3',
    order: 3,
    title: 'Доращивание укоренённых черенков',
    subtitle: 'Адаптация и рост',
    icon: '🌿',
    duration: '1–2 года',
    season: 'Круглогодично',
    description: 'Период адаптации укоренённых черенков к обычным условиям и интенсивного роста. Постепенное закаливание и формирование корневой системы.',
    steps: [
      'Постепенно снять укрытие (в течение 2 недель)',
      'Пересадить в стаканчики 200–300 мл',
      'Поливать умеренно, не допуская пересушки',
      'Подкармливать слабым раствором удобрений каждые 2 недели',
      'Закаливать: выносить на улицу на несколько часов',
      'Высадить в школку через 2–3 месяца',
      'Подготовить к первой зимовке',
    ],
    tips: [
      'Первый месяц после снятия укрытия — самый критичный',
      'Концентрация удобрений — в 2 раза слабее, чем для взрослых',
      'Прирост первого года: 3–10 см в зависимости от вида',
    ],
    warnings: [
      'Резкое снятие укрытия — шок для растения',
      'Прямое солнце может обжечь молодые хвоинки',
    ],
    temperature: '+15...+22°C',
    humidity: '70–80%',
  },
  {
    id: 'c4',
    order: 4,
    title: 'Формирование и реализация',
    subtitle: 'Подготовка к продаже',
    icon: '🌲',
    duration: '1–2 года',
    season: 'Круглогодично',
    description: 'Финальное формирование саженца, пересадка в торговые контейнеры, подготовка к продаже или высадке на постоянное место.',
    steps: [
      'Пересадить в контейнер подходящего размера',
      'Начать формирующую обрезку',
      'Подкармливать по стандартной схеме для хвойных',
      'Защитить от болезней и вредителей',
      'Оценить товарные качества',
      'Подготовить к реализации',
    ],
    tips: [
      'Черенкованные растения сохраняют все признаки материнского',
      'Оптимальный возраст для продажи: 2–4 года после укоренения',
      'Маркируйте каждый сорт — покупатели ценят информацию',
    ],
    warnings: [
      'Не продавайте растения с неразвитой корневой системой',
      'Проверьте, что корни оплели весь ком — признак готовности',
    ],
  },
];

const DEFAULT_PLANS: GrowthPlan[] = [
  {
    id: 'plan-1',
    plantName: 'Сосна обыкновенная',
    plantType: 'pine',
    method: 'seeds',
    startDate: '2024-09-01',
    stages: SEED_STAGES.map(s => ({ ...s, completed: false })),
    notes: 'Классический цикл выращивания из семян. Стратификация 45 дней.',
  },
  {
    id: 'plan-2',
    plantName: 'Туя западная Смарагд',
    plantType: 'thuja',
    method: 'cuttings',
    startDate: '2024-04-15',
    stages: CUTTING_STAGES.map(s => ({ ...s, completed: false })),
    notes: 'Размножение зелёными черенками. Укореняемость до 90%.',
  },
  {
    id: 'plan-3',
    plantName: 'Можжевельник казацкий',
    plantType: 'juniper',
    method: 'cuttings',
    startDate: '2024-10-01',
    stages: CUTTING_STAGES.map(s => ({ ...s, completed: false })),
    notes: 'Осеннее черенкование. Укоренение в теплице с туманом.',
  },
];

export default function GrowthPlanView() {
  const [plans, setPlans] = useState<GrowthPlan[]>(() => {
    const saved = localStorage.getItem('conifer-growth-plans');
    return saved ? JSON.parse(saved) : DEFAULT_PLANS;
  });
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(plans[0]?.id || null);
  const [expandedStage, setExpandedStage] = useState<string | null>(null);
  const [showNewPlan, setShowNewPlan] = useState(false);
  const [newPlanForm, setNewPlanForm] = useState({
    plantName: '',
    plantType: 'pine' as PlantType,
    method: 'seeds' as 'seeds' | 'cuttings',
    notes: '',
  });

  const selectedPlan = plans.find(p => p.id === selectedPlanId);

  const savePlans = (updated: GrowthPlan[]) => {
    setPlans(updated);
    localStorage.setItem('conifer-growth-plans', JSON.stringify(updated));
  };

  const toggleStage = (stageId: string) => {
    if (!selectedPlan) return;
    const updated = plans.map(p => {
      if (p.id !== selectedPlan.id) return p;
      return {
        ...p,
        stages: p.stages.map(s => s.id === stageId ? { ...s, completed: !s.completed } : s),
      };
    });
    savePlans(updated);
  };

  const createPlan = () => {
    if (!newPlanForm.plantName) return;
    const stages = newPlanForm.method === 'seeds' ? SEED_STAGES : CUTTING_STAGES;
    const newPlan: GrowthPlan = {
      id: crypto.randomUUID(),
      plantName: newPlanForm.plantName,
      plantType: newPlanForm.plantType,
      method: newPlanForm.method,
      startDate: new Date().toISOString().split('T')[0],
      stages: stages.map(s => ({ ...s, completed: false })),
      notes: newPlanForm.notes,
    };
    savePlans([...plans, newPlan]);
    setSelectedPlanId(newPlan.id);
    setShowNewPlan(false);
    setNewPlanForm({ plantName: '', plantType: 'pine', method: 'seeds', notes: '' });
  };

  const deletePlan = (id: string) => {
    const updated = plans.filter(p => p.id !== id);
    savePlans(updated);
    if (selectedPlanId === id) {
      setSelectedPlanId(updated[0]?.id || null);
    }
  };

  const getProgress = (plan: GrowthPlan) => {
    const completed = plan.stages.filter(s => s.completed).length;
    return Math.round((completed / plan.stages.length) * 100);
  };

  const getCurrentStage = (plan: GrowthPlan) => {
    return plan.stages.find(s => !s.completed);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">План выращивания</h1>
          <p className="text-gray-500 mt-1">Поэтапное руководство от семян до реализации</p>
        </div>
        <button
          onClick={() => setShowNewPlan(!showNewPlan)}
          className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors shadow-sm"
        >
          <Plus className="w-5 h-5" />
          Новый план
        </button>
      </div>

      {/* New Plan Form */}
      {showNewPlan && (
        <div className="bg-white rounded-xl shadow-sm border border-emerald-200 p-5 animate-fade-in">
          <h3 className="font-semibold text-gray-800 mb-4">Создать новый план выращивания</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Название растения</label>
              <input
                type="text"
                value={newPlanForm.plantName}
                onChange={e => setNewPlanForm({ ...newPlanForm, plantName: e.target.value })}
                placeholder="Ель голубая Hoopsii"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Вид</label>
              <select
                value={newPlanForm.plantType}
                onChange={e => setNewPlanForm({ ...newPlanForm, plantType: e.target.value as PlantType })}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
              >
                {Object.entries(PLANT_TYPE_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Способ размножения</label>
              <select
                value={newPlanForm.method}
                onChange={e => setNewPlanForm({ ...newPlanForm, method: e.target.value as 'seeds' | 'cuttings' })}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
              >
                <option value="seeds">🌰 Из семян</option>
                <option value="cuttings">✂️ Черенкование</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Заметки</label>
              <input
                type="text"
                value={newPlanForm.notes}
                onChange={e => setNewPlanForm({ ...newPlanForm, notes: e.target.value })}
                placeholder="Особенности, источник семян..."
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={createPlan} className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium">
              Создать план
            </button>
            <button onClick={() => setShowNewPlan(false)} className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors text-sm">
              Отмена
            </button>
          </div>
        </div>
      )}

      {/* Plans List */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {plans.map(plan => {
          const progress = getProgress(plan);
          const current = getCurrentStage(plan);
          const isSelected = plan.id === selectedPlanId;
          return (
            <button
              key={plan.id}
              onClick={() => setSelectedPlanId(plan.id)}
              className={`flex-shrink-0 p-4 rounded-xl border-2 transition-all min-w-[200px] text-left ${
                isSelected ? 'border-emerald-500 bg-emerald-50 shadow-md' : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-900 truncate">{plan.plantName}</span>
                <button
                  onClick={e => { e.stopPropagation(); deletePlan(plan.id); }}
                  className="p-1 text-gray-300 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-xs text-gray-500 mb-2">
                {plan.method === 'seeds' ? '🌰 Семена' : '✂️ Черенки'} • {PLANT_TYPE_LABELS[plan.plantType]}
              </p>
              <div className="w-full bg-gray-100 rounded-full h-2 mb-1">
                <div className="bg-emerald-500 h-2 rounded-full transition-all" style={{ width: `${progress}%` }} />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">{progress}%</span>
                {current && <span className="text-xs text-emerald-600 truncate ml-2">{current.icon} {current.title}</span>}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Plan Detail */}
      {selectedPlan && (
        <div className="space-y-4">
          {/* Plan Header */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{selectedPlan.plantName}</h2>
                <p className="text-sm text-gray-500 mt-1">
                  {selectedPlan.method === 'seeds' ? '🌰 Выращивание из семян' : '✂️ Размножение черенками'} •
                  Начало: {new Date(selectedPlan.startDate).toLocaleDateString('ru-RU')}
                </p>
                {selectedPlan.notes && (
                  <p className="text-sm text-gray-600 mt-2 bg-gray-50 px-3 py-2 rounded-lg">{selectedPlan.notes}</p>
                )}
              </div>
              <div className="text-center">
                <div className="relative w-20 h-20">
                  <svg className="w-20 h-20 -rotate-90">
                    <circle cx="40" cy="40" r="35" fill="none" stroke="#e5e7eb" strokeWidth="6" />
                    <circle
                      cx="40" cy="40" r="35" fill="none" stroke="#22c55e" strokeWidth="6"
                      strokeDasharray={`${2 * Math.PI * 35}`}
                      strokeDashoffset={`${2 * Math.PI * 35 * (1 - getProgress(selectedPlan) / 100)}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-emerald-600">
                    {getProgress(selectedPlan)}%
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Прогресс</p>
              </div>
            </div>
          </div>

          {/* Stages Timeline */}
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 hidden md:block" />
            <div className="space-y-3">
              {selectedPlan.stages.map((stage, index) => {
                const isExpanded = expandedStage === stage.id;
                const isCurrent = !stage.completed && (index === 0 || selectedPlan.stages[index - 1].completed);

                return (
                  <div
                    key={stage.id}
                    className={`relative bg-white rounded-xl shadow-sm border transition-all ${
                      stage.completed ? 'border-emerald-200 bg-emerald-50/30' :
                      isCurrent ? 'border-amber-300 ring-2 ring-amber-100' :
                      'border-gray-100'
                    }`}
                  >
                    <div className="p-4 md:pl-16 flex items-start gap-4">
                      {/* Stage number / checkbox */}
                      <button
                        onClick={() => toggleStage(stage.id)}
                        className="absolute left-4 top-4 hidden md:flex"
                      >
                        {stage.completed ? (
                          <div className="w-9 h-9 bg-emerald-500 rounded-full flex items-center justify-center shadow-sm">
                            <CheckCircle2 className="w-5 h-5 text-white" />
                          </div>
                        ) : (
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center border-2 ${
                            isCurrent ? 'border-amber-400 bg-amber-50' : 'border-gray-300 bg-white'
                          }`}>
                            <span className="text-sm font-bold text-gray-500">{stage.order}</span>
                          </div>
                        )}
                      </button>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 flex-wrap">
                          <span className="text-2xl">{stage.icon}</span>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className={`font-semibold ${stage.completed ? 'text-emerald-700 line-through' : 'text-gray-900'}`}>
                                {stage.title}
                              </h3>
                              {isCurrent && (
                                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-medium animate-pulse">
                                  Текущий этап
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-500">{stage.subtitle}</p>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-gray-500 flex-wrap">
                            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {stage.duration}</span>
                            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {stage.season}</span>
                          </div>
                          <button
                            onClick={() => setExpandedStage(isExpanded ? null : stage.id)}
                            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                          </button>
                        </div>

                        {/* Mobile checkbox */}
                        <div className="md:hidden mt-2">
                          <button
                            onClick={() => toggleStage(stage.id)}
                            className={`text-xs px-3 py-1 rounded-full font-medium ${
                              stage.completed ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            {stage.completed ? '✓ Выполнено' : 'Отметить выполненным'}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {isExpanded && (
                      <div className="px-4 pb-5 pt-2 md:pl-16 border-t border-gray-100 animate-fade-in">
                        <p className="text-sm text-gray-700 mb-4 leading-relaxed">{stage.description}</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Steps */}
                          <div className="bg-blue-50 rounded-xl p-4">
                            <h4 className="text-sm font-semibold text-blue-800 mb-3 flex items-center gap-2">
                              <Target className="w-4 h-4" /> Порядок действий
                            </h4>
                            <ol className="space-y-2">
                              {stage.steps.map((step, i) => (
                                <li key={i} className="flex gap-2 text-sm text-blue-700">
                                  <span className="flex-shrink-0 w-5 h-5 bg-blue-200 rounded-full flex items-center justify-center text-xs font-bold text-blue-800">{i + 1}</span>
                                  <span>{step}</span>
                                </li>
                              ))}
                            </ol>
                          </div>

                          {/* Tips & Warnings */}
                          <div className="space-y-3">
                            <div className="bg-emerald-50 rounded-xl p-4">
                              <h4 className="text-sm font-semibold text-emerald-800 mb-2 flex items-center gap-2">
                                <Lightbulb className="w-4 h-4" /> Советы
                              </h4>
                              <ul className="space-y-1.5">
                                {stage.tips.map((tip, i) => (
                                  <li key={i} className="text-sm text-emerald-700 flex gap-2">
                                    <span className="text-emerald-500">💡</span>
                                    <span>{tip}</span>
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
                                      <span>⚠️</span>
                                      <span>{warn}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Conditions */}
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
        </div>
      )}

      {plans.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🌱</div>
          <p className="text-gray-500 text-lg">Нет планов выращивания</p>
          <p className="text-gray-400 text-sm mt-1">Создайте первый план, чтобы начать отслеживание</p>
          <button
            onClick={() => setShowNewPlan(true)}
            className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Создать план
          </button>
        </div>
      )}
    </div>
  );
}
