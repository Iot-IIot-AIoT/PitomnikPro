import { useState } from 'react';
import { Search, Lightbulb, ChevronDown, ChevronRight, Flame, Star, ThumbsUp, CheckCircle2, Award, Rocket, BookOpen } from 'lucide-react';

interface AdviceItem {
  id: string;
  title: string;
  content: string;
  example?: string;
  metric?: string;
  priority: 'critical' | 'high' | 'medium';
}

interface AdviceCategory {
  id: string;
  title: string;
  icon: string;
  color: string;
  description: string;
  items: AdviceItem[];
}

const ADVICE_CATEGORIES: AdviceCategory[] = [
  {
    id: 'marketing', title: 'Маркетинг и продвижение', icon: '📢', color: 'bg-pink-50 border-pink-200',
    description: 'Как привлечь клиентов и выделиться',
    items: [
      { id: 'm1', title: 'Создайте Instagram-витрину', content: 'Фотографии растений в интерьере продают лучше слов. Публикуйте 3–5 раз в неделю.', example: 'Питомник набрал 15 000 подписчиков за 6 месяцев. Продажи выросли на 40%.', metric: '+40% продаж', priority: 'critical' },
      { id: 'm2', title: 'Ведите Telegram-канал', content: 'Идеальная площадка для экспертного контента. Канал с 1000+ подписчиков = стабильный поток заказов.', metric: '15–20 заказов/неделю', priority: 'high' },
      { id: 'm3', title: 'Снимайте видео', content: 'Видеоконтент — самый эффективный формат. Короткие видео для TikTok, длинные для YouTube.', example: 'Видео набрало 500 000 просмотров и принесло 200+ заказов.', metric: '500K просмотров = 200+ заказов', priority: 'high' },
      { id: 'm4', title: 'Работайте с дизайнерами', content: 'Дизайнеры — лучшие партнёры. Предлагайте скидки 10–15%. Один дизайнер = 50–100 заказов в сезон.', metric: '30% выручки от 5 дизайнеров', priority: 'critical' },
    ],
  },
  {
    id: 'finance', title: 'Финансы и ценообразование', icon: '💰', color: 'bg-emerald-50 border-emerald-200',
    description: 'Управление деньгами и расчёт себестоимости',
    items: [
      { id: 'f1', title: 'Считайте полную себестоимость', content: 'Себестоимость = субстрат + черенки + удобрения + вода + работа + упаковка + потери. Многие считают только субстрат.', example: 'Реальная себестоимость туи 60 см: 180 руб (не 50). Прибыль: 620 руб (не 750).', metric: '+25% к прибыли', priority: 'critical' },
      { id: 'f2', title: 'Формула цены x3', content: 'Минимальная цена = себестоимость × 3. Одна часть — себестоимость, вторая — расходы, третья — прибыль.', metric: 'Маржа 66% минимум', priority: 'critical' },
      { id: 'f3', title: 'Ведите учёт', content: 'Фиксируйте каждую продажу и расход. Анализируйте: какие растения приносят больше прибыли.', example: 'Анализ выявил: 20% ассортимента даёт 80% прибыли.', metric: 'Принцип Парето: 20/80', priority: 'critical' },
      { id: 'f4', title: 'Создайте финансовую подушку', content: 'Откладывайте 15–20% прибыли. Зимой расходы продолжаются, а продажи падают.', metric: '3 месяца расходов в резерве', priority: 'high' },
    ],
  },
  {
    id: 'assortment', title: 'Ассортиментная политика', icon: '🌿', color: 'bg-green-50 border-green-200',
    description: 'Что выращивать и как формировать ассортимент',
    items: [
      { id: 'a1', title: 'Правило 70/20/10', content: '70% — проверенные хиты. 20% — перспективные новинки. 10% — эксперименты. Баланс стабильности и развития.', metric: 'Стабильность + рост 15%/год', priority: 'critical' },
      { id: 'a2', title: 'Следите за трендами', content: 'Модные растения меняются каждые 3–5 лет. Сейчас в тренде: гортензии, лаванда, злаки.', example: 'Заход в гортензии 3 года назад дал x5 рост продаж.', metric: 'Ранний вход = x5 прибыли', priority: 'high' },
      { id: 'a3', title: 'Предлагайте композиции', content: 'Контейнерные композиции из 3–5 растений стоят в 2–3 раза дороже суммы отдельных.', example: 'Композиция: себестоимость 400 руб, продажа 1500 руб.', metric: 'Маржа x3.75', priority: 'high' },
      { id: 'a4', title: 'Продавайте разные размеры', content: 'Один вид в 3–4 размерах. Маленькие — для привлечения, большие — для прибыли.', metric: '4 ценовых сегмента', priority: 'high' },
    ],
  },
  {
    id: 'clients', title: 'Работа с клиентами', icon: '👥', color: 'bg-blue-50 border-blue-200',
    description: 'Сервис, удержание, работа с возражениями',
    items: [
      { id: 'c1', title: 'Давайте гарантию', content: 'Гарантия приживаемости 3–6 месяцев — мощный инструмент продаж. Потери по гарантии — менее 3%.', metric: '+35% конверсии', priority: 'critical' },
      { id: 'c2', title: 'Прилагайте инструкцию', content: 'К каждому растению — памятка: как посадить, как поливать, как подготовить к зиме.', example: 'Памятки снизили жалобы на 60%.', metric: '-60% жалоб', priority: 'high' },
      { id: 'c3', title: 'Отвечайте быстро', content: 'Отвечайте на заявки в течение 15 минут. Клиент, которому ответили первым, покупает у вас.', metric: 'x8 конверсия', priority: 'critical' },
      { id: 'c4', title: 'Консультируйте', content: 'Помогите выбрать: спросите про участок, освещение, почву. Клиент, которому помогли, возвращается.', metric: '+40% средний чек', priority: 'high' },
    ],
  },
  {
    id: 'scaling', title: 'Масштабирование', icon: '🚀', color: 'bg-indigo-50 border-indigo-200',
    description: 'Рост и расширение бизнеса',
    items: [
      { id: 'sc1', title: 'Нанимайте при выручке 500K', content: 'Когда работаете 12 часов и не успеваете — пора нанимать. Первый сотрудник — помощник.', example: 'Помощник освободил 4 часа в день. Выручка выросла на 30%.', metric: 'Выручка +30%', priority: 'high' },
      { id: 'sc2', title: 'Автоматизируйте полив', content: 'Система автополива экономит 3–4 часа работы в день. Окупается за 1 сезон.', metric: 'Экономия 800 часов/год', priority: 'high' },
      { id: 'sc3', title: 'Откройте интернет-магазин', content: 'Расширяет географию на всю страну. Инвестиция 100–300 тыс, окупаемость 6–12 мес.', metric: 'Выручка +120%', priority: 'medium' },
      { id: 'sc4', title: 'Диверсифицируйте доходы', content: 'Не только продажа: дизайн, посадка, уход, консультации, мастер-классы.', metric: '+25% выручки от услуг', priority: 'medium' },
    ],
  },
  {
    id: 'risks', title: 'Управление рисками', icon: '🛡️', color: 'bg-red-50 border-red-200',
    description: 'Защита бизнеса от потерь',
    items: [
      { id: 'r1', title: 'Диверсифицируйте ассортимент', content: 'Не вкладывайтесь в один вид. Если рынок рухнет — потеряете всё. 10–15 видов минимум.', example: 'Питомник с 3 видами потерял 60% выручки. С 15 видами — 5%.', metric: 'Снижение риска x12', priority: 'critical' },
      { id: 'r2', title: 'Создайте резервный фонд', content: '3–6 месяцев расходов в резерве. Защищает от неурожая, потери клиента, поломок.', metric: '6 месяцев безопасности', priority: 'critical' },
      { id: 'r3', title: 'Контролируйте здоровье', content: 'Регулярные осмотры, профилактика болезней. Потеря 100 растений = потеря 100 000+ руб.', metric: 'Потери: 10% → 2%', priority: 'high' },
      { id: 'r4', title: 'Защитите территорию', content: 'Забор, видеонаблюдение, сигнализация. Кражи — реальная проблема.', example: 'Видеонаблюдение предотвратило кражи на 300 000 руб.', metric: 'Защита x6', priority: 'high' },
    ],
  },
];

export default function BusinessAdviceView() {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['marketing']));
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');

  const toggleCategory = (id: string) => {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const totalAdvice = ADVICE_CATEGORIES.reduce((sum, cat) => sum + cat.items.length, 0);
  const criticalCount = ADVICE_CATEGORIES.reduce((sum, cat) => sum + cat.items.filter(i => i.priority === 'critical').length, 0);

  const filteredCategories = ADVICE_CATEGORIES.map(cat => ({
    ...cat,
    items: cat.items.filter(item => {
      const matchSearch = !searchQuery || item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.content.toLowerCase().includes(searchQuery.toLowerCase());
      const matchPriority = selectedPriority === 'all' || item.priority === selectedPriority;
      return matchSearch && matchPriority;
    }),
  })).filter(cat => cat.items.length > 0);

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'critical': return { label: 'Критически важно', color: 'bg-red-100 text-red-700', icon: <Flame className="w-3 h-3" /> };
      case 'high': return { label: 'Важно', color: 'bg-amber-100 text-amber-700', icon: <Star className="w-3 h-3" /> };
      default: return { label: 'Полезно', color: 'bg-blue-100 text-blue-700', icon: <ThumbsUp className="w-3 h-3" /> };
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Бизнес-советы</h1>
        <p className="text-gray-500 mt-1">{totalAdvice} практических рекомендаций для успешного питомника</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center">
          <BookOpen className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">{ADVICE_CATEGORIES.length}</p>
          <p className="text-xs text-gray-500">Категорий</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center">
          <Lightbulb className="w-6 h-6 text-amber-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">{totalAdvice}</p>
          <p className="text-xs text-gray-500">Советов</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center">
          <Flame className="w-6 h-6 text-red-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">{criticalCount}</p>
          <p className="text-xs text-gray-500">Критически важных</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center">
          <Award className="w-6 h-6 text-purple-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">100+</p>
          <p className="text-xs text-gray-500">Примеров</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input type="text" placeholder="Поиск по советам..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
          </div>
          <div className="flex gap-2 flex-wrap">
            {[
              { value: 'all', label: 'Все' },
              { value: 'critical', label: '🔥 Критичные' },
              { value: 'high', label: '⭐ Важные' },
            ].map(opt => (
              <button key={opt.value} onClick={() => setSelectedPriority(opt.value)}
                className={`px-3 py-2 rounded-lg text-sm font-medium ${selectedPriority === opt.value ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}>
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-4">
        {filteredCategories.map(category => {
          const isExpanded = expandedCategories.has(category.id);
          return (
            <div key={category.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <button onClick={() => toggleCategory(category.id)} className="w-full p-5 flex items-center gap-4 hover:bg-gray-50 transition-colors text-left">
                <div className="text-3xl">{category.icon}</div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900">{category.title}</h3>
                  <p className="text-sm text-gray-500">{category.description}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{category.items.length} советов</span>
                  {isExpanded ? <ChevronDown className="w-5 h-5 text-gray-400" /> : <ChevronRight className="w-5 h-5 text-gray-400" />}
                </div>
              </button>

              {isExpanded && (
                <div className="px-5 pb-5 space-y-3 border-t border-gray-100 pt-4">
                  {category.items.map(item => {
                    const priorityBadge = getPriorityBadge(item.priority);
                    return (
                      <div key={item.id} className="p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all">
                        <div className="flex items-center gap-2 flex-wrap mb-2">
                          <h4 className="font-semibold text-gray-900">{item.title}</h4>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1 ${priorityBadge.color}`}>
                            {priorityBadge.icon}{priorityBadge.label}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed">{item.content}</p>
                        {item.example && (
                          <div className="mt-3 p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                            <p className="text-xs font-semibold text-emerald-700 mb-1 flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Пример:
                            </p>
                            <p className="text-sm text-emerald-700">{item.example}</p>
                          </div>
                        )}
                        {item.metric && (
                          <div className="mt-2">
                            <span className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-lg font-medium">📊 {item.metric}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Final CTA */}
      <div className="bg-gradient-to-br from-emerald-600 to-green-700 rounded-xl p-8 text-white shadow-lg">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-white/20 rounded-xl"><Rocket className="w-8 h-8" /></div>
          <div>
            <h3 className="text-xl font-bold mb-2">Главный совет</h3>
            <p className="text-emerald-50 leading-relaxed text-lg">
              Успешный питомник — это системный бизнес: маркетинг, финансы, сервис, масштабирование. Применяйте хотя бы 1 совет из каждой категории — и через год ваш бизнес будет не узнать.
            </p>
            <div className="mt-4 flex gap-3 flex-wrap">
              <span className="px-3 py-1.5 bg-white/20 rounded-lg text-sm">📈 Рост 50–100% в год</span>
              <span className="px-3 py-1.5 bg-white/20 rounded-lg text-sm">💰 Маржа 60–70%</span>
              <span className="px-3 py-1.5 bg-white/20 rounded-lg text-sm">🔄 Повторные клиенты 60%+</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
