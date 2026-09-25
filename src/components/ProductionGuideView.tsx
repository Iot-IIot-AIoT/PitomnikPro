import { useState } from 'react';
import { Calculator, Cpu, Droplets, Bug, Lightbulb, Sprout, TrendingUp, AlertTriangle, CheckCircle2, Thermometer, Leaf } from 'lucide-react';

type TabType = 'volume' | 'automation' | 'soil' | 'pests' | 'tips' | 'blueberry';

export default function ProductionGuideView() {
  const [activeTab, setActiveTab] = useState<TabType>('volume');

  const tabs = [
    { id: 'volume' as TabType, label: 'Объёмы производства', icon: Calculator },
    { id: 'automation' as TabType, label: 'Автоматизация', icon: Cpu },
    { id: 'soil' as TabType, label: 'Требования к грунту', icon: Droplets },
    { id: 'pests' as TabType, label: 'Вредители', icon: Bug },
    { id: 'tips' as TabType, label: 'Советы по выращиванию', icon: Lightbulb },
    { id: 'blueberry' as TabType, label: 'Выращивание голубики', icon: Sprout },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Руководство по производству</h1>
        <p className="text-gray-500 mt-1">Практические рекомендации для эффективного выращивания</p>
      </div>

      {/* Табы */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden md:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Контент */}
      {activeTab === 'volume' && <VolumeCalculator />}
      {activeTab === 'automation' && <AutomationGuide />}
      {activeTab === 'soil' && <SoilRequirements />}
      {activeTab === 'pests' && <PestsGuide />}
      {activeTab === 'tips' && <GrowingTips />}
      {activeTab === 'blueberry' && <BlueberryGuide />}
    </div>
  );
}

// 1. Калькулятор объёмов
function VolumeCalculator() {
  const [targetProfit, setTargetProfit] = useState(100000);
  const [avgProfit, setAvgProfit] = useState(600);

  const monthlySales = Math.ceil(targetProfit / avgProfit);
  const plantsInRotation = monthlySales * 3; // Запас на 3 месяца
  const cuttingSuccess = 0.8; // 80% укореняемость
  const cuttingsNeeded = Math.ceil(plantsInRotation / cuttingSuccess);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Calculator className="w-6 h-6 text-emerald-500" />
          Расчёт объёмов производства
        </h2>

        {/* Ввод данных */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Целевая прибыль в месяц (₽)
            </label>
            <input
              type="number"
              value={targetProfit}
              onChange={(e) => setTargetProfit(Number(e.target.value))}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Средняя прибыль с растения (₽)
            </label>
            <input
              type="number"
              value={avgProfit}
              onChange={(e) => setAvgProfit(Number(e.target.value))}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>
        </div>

        {/* Результаты */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg p-4 border border-emerald-200">
            <p className="text-sm text-emerald-600 mb-1">Продаж в месяц</p>
            <p className="text-3xl font-bold text-emerald-700">{monthlySales}</p>
            <p className="text-xs text-gray-500 mt-1">растений</p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
            <p className="text-sm text-blue-600 mb-1">Растений в обороте</p>
            <p className="text-3xl font-bold text-blue-700">{plantsInRotation}</p>
            <p className="text-xs text-gray-500 mt-1">запас на 3 месяца</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
            <p className="text-sm text-purple-600 mb-1">Черенков/семян</p>
            <p className="text-3xl font-bold text-purple-700">{cuttingsNeeded}</p>
            <p className="text-xs text-gray-500 mt-1">с учётом 80% успеха</p>
          </div>
        </div>

        {/* Примеры расчётов */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold text-gray-800 mb-3">Примеры для разных культур:</h3>
          <div className="space-y-3">
            {[
              { name: 'Туя Смарагд', profit: 650, time: '2-3 года', area: '0.5 м²' },
              { name: 'Можжевельник', profit: 500, time: '1.5-2 года', area: '0.3 м²' },
              { name: 'Гортензия', profit: 550, time: '2-3 года', area: '0.7 м²' },
              { name: 'Голубика', profit: 600, time: '2-3 года', area: '1 м²' },
            ].map((plant, i) => {
              const sales = Math.ceil(targetProfit / plant.profit);
              return (
                <div key={i} className="flex items-center justify-between bg-white rounded-lg p-3">
                  <div>
                    <p className="font-medium text-gray-900">{plant.name}</p>
                    <p className="text-xs text-gray-500">
                      Прибыль: {plant.profit}₽ • Время: {plant.time} • Площадь: {plant.area}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-emerald-600">{sales}</p>
                    <p className="text-xs text-gray-500">продаж/мес</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Рекомендации */}
        <div className="mt-6 bg-amber-50 rounded-lg p-4 border border-amber-200">
          <h3 className="font-semibold text-amber-800 mb-2 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Важные нюансы
          </h3>
          <ul className="space-y-2 text-sm text-amber-700">
            <li>• Не все растения продаются сразу - учитывайте сезонность</li>
            <li>• Часть растений остаётся на доращивание (20-30%)</li>
            <li>• Потери при выращивании: 10-20% (черенки, болезни)</li>
            <li>• Оптимальный ассортимент: 10-15 видов для старта</li>
            <li>• Фокус на 3-5 самых прибыльных культурах</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// 2. Автоматизация
function AutomationGuide() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Cpu className="w-6 h-6 text-blue-500" />
          Автоматизация производства
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Полив */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-5 border border-blue-200">
            <div className="flex items-center gap-3 mb-3">
              <Droplets className="w-8 h-8 text-blue-600" />
              <h3 className="text-lg font-bold text-blue-900">Система полива</h3>
            </div>
            <div className="space-y-2 text-sm text-blue-800">
              <p><strong>Капельный полив:</strong></p>
              <ul className="space-y-1 ml-4">
                <li>• Экономия воды: 50-70%</li>
                <li>• Стоимость: 50-100K ₽ за 100 м²</li>
                <li>• Окупаемость: 1 сезон</li>
                <li>• Таймер: 15-30K ₽</li>
              </ul>
              <p className="mt-3"><strong>Туманообразование:</strong></p>
              <ul className="space-y-1 ml-4">
                <li>• Для черенков и сеянцев</li>
                <li>• Стоимость: 80-150K ₽</li>
                <li>• Увеличивает укореняемость на 30%</li>
              </ul>
            </div>
          </div>

          {/* Климат-контроль */}
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg p-5 border border-orange-200">
            <div className="flex items-center gap-3 mb-3">
              <Thermometer className="w-8 h-8 text-orange-600" />
              <h3 className="text-lg font-bold text-orange-900">Климат-контроль</h3>
            </div>
            <div className="space-y-2 text-sm text-orange-800">
              <p><strong>Автоматические форточки:</strong></p>
              <ul className="space-y-1 ml-4">
                <li>• Термодатчики + сервоприводы</li>
                <li>• Стоимость: 30-50K ₽</li>
                <li>• Защита от перегрева</li>
              </ul>
              <p className="mt-3"><strong>Датчики:</strong></p>
              <ul className="space-y-1 ml-4">
                <li>• Влажность почвы: 5-10K ₽/шт</li>
                <li>• Температура воздуха: 3-5K ₽/шт</li>
                <li>• Освещённость: 5-8K ₽/шт</li>
                <li>• WiFi мониторинг: 15-30K ₽</li>
              </ul>
            </div>
          </div>

          {/* Освещение */}
          <div className="bg-gradient-to-br from-yellow-50 to-lime-50 rounded-lg p-5 border border-yellow-200">
            <div className="flex items-center gap-3 mb-3">
              <Lightbulb className="w-8 h-8 text-yellow-600" />
              <h3 className="text-lg font-bold text-yellow-900">Досветка</h3>
            </div>
            <div className="space-y-2 text-sm text-yellow-800">
              <p><strong>Фитолампы:</strong></p>
              <ul className="space-y-1 ml-4">
                <li>• LED панели: 10-20K ₽/шт</li>
                <li>• Для рассады и черенков</li>
                <li>• Таймеры: 2-5K ₽</li>
                <li>• Увеличивает рост на 30-40%</li>
              </ul>
              <p className="mt-3"><strong>Режим освещения:</strong></p>
              <ul className="space-y-1 ml-4">
                <li>• Рассада: 14-16 часов/день</li>
                <li>• Черенки: 12-14 часов/день</li>
                <li>• Взрослые: 10-12 часов/день</li>
              </ul>
            </div>
          </div>

          {/* Учёт */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-5 border border-purple-200">
            <div className="flex items-center gap-3 mb-3">
              <TrendingUp className="w-8 h-8 text-purple-600" />
              <h3 className="text-lg font-bold text-purple-900">Учёт и аналитика</h3>
            </div>
            <div className="space-y-2 text-sm text-purple-800">
              <p><strong>CRM-система:</strong></p>
              <ul className="space-y-1 ml-4">
                <li>• Учёт клиентов и заказов</li>
                <li>• Воронка продаж</li>
                <li>• Стоимость: 2-5K ₽/мес</li>
              </ul>
              <p className="mt-3"><strong>Штрих-коды:</strong></p>
              <ul className="space-y-1 ml-4">
                <li>• Маркировка растений</li>
                <li>• Сканер: 5-10K ₽</li>
                <li>• Принтер этикеток: 10-20K ₽</li>
                <li>• Упрощает инвентаризацию</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Итоговая смета */}
        <div className="mt-6 bg-emerald-50 rounded-lg p-5 border border-emerald-200">
          <h3 className="font-bold text-emerald-900 mb-3">Итоговая смета автоматизации:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-emerald-800 mb-2">Минимальный набор:</p>
              <ul className="space-y-1 text-sm text-emerald-700">
                <li>• Капельный полив + таймер: 65-130K ₽</li>
                <li>• Датчики + мониторинг: 20-40K ₽</li>
                <li>• CRM-система: 2-5K ₽/мес</li>
                <li className="font-bold pt-2 border-t border-emerald-300">Итого: 87-175K ₽</li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-medium text-emerald-800 mb-2">Полный набор:</p>
              <ul className="space-y-1 text-sm text-emerald-700">
                <li>• Полив + туман: 130-250K ₽</li>
                <li>• Климат-контроль: 30-50K ₽</li>
                <li>• Досветка: 50-100K ₽</li>
                <li>• Учёт + штрих-коды: 30-50K ₽</li>
                <li className="font-bold pt-2 border-t border-emerald-300">Итого: 240-450K ₽</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 3. Требования к грунту
function SoilRequirements() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Droplets className="w-6 h-6 text-amber-500" />
          Требования к грунту
        </h2>

        {/* Таблица pH */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">Оптимальная кислотность (pH):</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { name: 'Хвойные (сосна, ель, туя)', ph: '4.5-5.5', color: 'emerald' },
              { name: 'Можжевельник', ph: '5.0-6.0', color: 'green' },
              { name: 'Гортензия', ph: '5.0-6.0', color: 'blue' },
              { name: 'Голубика', ph: '3.5-4.5', color: 'purple' },
              { name: 'Спирея', ph: '6.0-7.0', color: 'pink' },
              { name: 'Яблоня', ph: '6.0-7.0', color: 'red' },
            ].map((item, i) => (
              <div key={i} className={`bg-${item.color}-50 rounded-lg p-3 border border-${item.color}-200`}>
                <p className="font-medium text-gray-900">{item.name}</p>
                <p className={`text-lg font-bold text-${item.color}-700`}>pH {item.ph}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Рецепты субстратов */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-800 mb-3">Рецепты субстратов:</h3>
          
          <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg p-4 border border-emerald-200">
            <h4 className="font-bold text-emerald-900 mb-2">Для хвойных:</h4>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div className="bg-white rounded p-2 text-center">
                <p className="font-bold text-emerald-700">50%</p>
                <p className="text-xs text-gray-600">Верховой торф</p>
              </div>
              <div className="bg-white rounded p-2 text-center">
                <p className="font-bold text-emerald-700">30%</p>
                <p className="text-xs text-gray-600">Сосновая кора</p>
              </div>
              <div className="bg-white rounded p-2 text-center">
                <p className="font-bold text-emerald-700">20%</p>
                <p className="text-xs text-gray-600">Перлит/песок</p>
              </div>
            </div>
            <p className="text-xs text-emerald-700 mt-2">pH 4.5-5.5 • Дренаж обязателен</p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
            <h4 className="font-bold text-purple-900 mb-2">Для голубики:</h4>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div className="bg-white rounded p-2 text-center">
                <p className="font-bold text-purple-700">60%</p>
                <p className="text-xs text-gray-600">Верховой торф</p>
              </div>
              <div className="bg-white rounded p-2 text-center">
                <p className="font-bold text-purple-700">25%</p>
                <p className="text-xs text-gray-600">Хвойный опад</p>
              </div>
              <div className="bg-white rounded p-2 text-center">
                <p className="font-bold text-purple-700">15%</p>
                <p className="text-xs text-gray-600">Перлит</p>
              </div>
            </div>
            <p className="text-xs text-purple-700 mt-2">pH 3.5-4.5 • Кислый субстрат критичен</p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-4 border border-blue-200">
            <h4 className="font-bold text-blue-900 mb-2">Для гортензии:</h4>
            <div className="grid grid-cols-4 gap-2 text-sm">
              <div className="bg-white rounded p-2 text-center">
                <p className="font-bold text-blue-700">40%</p>
                <p className="text-xs text-gray-600">Торф</p>
              </div>
              <div className="bg-white rounded p-2 text-center">
                <p className="font-bold text-blue-700">30%</p>
                <p className="text-xs text-gray-600">Листовая земля</p>
              </div>
              <div className="bg-white rounded p-2 text-center">
                <p className="font-bold text-blue-700">20%</p>
                <p className="text-xs text-gray-600">Перлит</p>
              </div>
              <div className="bg-white rounded p-2 text-center">
                <p className="font-bold text-blue-700">10%</p>
                <p className="text-xs text-gray-600">Кора</p>
              </div>
            </div>
            <p className="text-xs text-blue-700 mt-2">pH 5.0-6.0 • Рыхлый и влагоёмкий</p>
          </div>
        </div>

        {/* Компоненты */}
        <div className="mt-6 bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold text-gray-800 mb-3">Основные компоненты:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div>
              <p className="font-medium text-gray-900 mb-1">Верховой торф:</p>
              <ul className="space-y-1 text-gray-600 ml-4">
                <li>• Кислый pH 3.0-4.0</li>
                <li>• Цена: 800-1500 ₽/м³</li>
                <li>• Влагоёмкий, рыхлый</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-gray-900 mb-1">Перлит:</p>
              <ul className="space-y-1 text-gray-600 ml-4">
                <li>• Дренаж, аэрация</li>
                <li>• Цена: 200-400 ₽/10л</li>
                <li>• Инертный материал</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-gray-900 mb-1">Сосновая кора:</p>
              <ul className="space-y-1 text-gray-600 ml-4">
                <li>• Мульча, дренаж</li>
                <li>• Цена: 500-1000 ₽/50л</li>
                <li>• Подкисляет почву</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-gray-900 mb-1">Кокосовое волокно:</p>
              <ul className="space-y-1 text-gray-600 ml-4">
                <li>• Альтернатива торфу</li>
                <li>• Цена: 300-600 ₽/брикет</li>
                <li>• Нейтральный pH</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 4. Вредители
function PestsGuide() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Bug className="w-6 h-6 text-red-500" />
          Вредители хвойных и декоративных растений
        </h2>

        <div className="space-y-4">
          {[
            {
              name: 'Паутинный клещ',
              icon: '🕷️',
              severity: 'high',
              description: 'Мелкий вредитель, питается соками растений. Появляется в жаркую сухую погоду.',
              symptoms: 'Желтые точки на хвое, тонкая паутинка, общее угнетение растения',
              control: 'Акарицы (Санмайт, Аполло), повышение влажности, профилактические обработки каждые 2 недели',
              prevention: 'Регулярное опрыскивание, поддержание влажности 60-70%',
            },
            {
              name: 'Тля',
              icon: '🐛',
              severity: 'medium',
              description: 'Мелкие насекомые, колонии на молодых побегах. Выделяют медвяную росу.',
              symptoms: 'Скручивание побегов, липкий налёт, муравьи на растении',
              control: 'Инсектициды (Актара, Конфидор), мыльный раствор, биопрепараты (Фитоверм)',
              prevention: 'Уничтожение муравьёв, посадка растений-репеллентов (лаванда, бархатцы)',
            },
            {
              name: 'Щитовка',
              icon: '🐚',
              severity: 'high',
              description: 'Насекомые с защитным щитком. Малоподвижны, трудно заметны.',
              symptoms: 'Коричневые бляшки на побегах, липкий налёт, пожелтение хвои',
              control: 'Механическое удаление, инсектициды (Актара, Моспилан), масляные препараты',
              prevention: 'Карантин новых растений, регулярный осмотр',
            },
            {
              name: 'Хермес',
              icon: '🦟',
              severity: 'medium',
              description: 'Хвоегрызущее насекомое. Характерен для елей и пихт.',
              symptoms: 'Белый войлочный налёт на хвоинках, пожелтение и опадение хвои',
              control: 'Инсектициды (Актара, Конфидор), обработка весной при появлении',
              prevention: 'Изоляция заражённых растений, профилактические обработки',
            },
            {
              name: 'Майский жук',
              icon: '🪲',
              severity: 'high',
              description: 'Личинки повреждают корни. Взрослые жуки объедают хвою и молодые побеги.',
              symptoms: 'Внезапное увядание, повреждённые корни, объеденная хвоя',
              control: 'Препараты против личинок (Землин, Базудин), ловушки для жуков',
              prevention: 'Глубокая перекопка, привлечение птиц, nematodes',
            },
            {
              name: 'Проволочник',
              icon: '🪱',
              severity: 'medium',
              description: 'Личинка жука-щелкуна. Повреждает корни и корневую шейку.',
              symptoms: 'Увядание растений, повреждённые корни, отставание в росте',
              control: 'Препараты (Провотокс, Базудин), известкование почвы, ловушки',
              prevention: 'Севооборот, уничтожение сорняков, глубокая обработка почвы',
            },
            {
              name: 'Сосновый шелкопряд',
              icon: '🐛',
              severity: 'high',
              description: 'Гусеницы объедают хвою полностью. Массовое размножение.',
              symptoms: 'Полностью объеденная хвоя, паутина на побегах, гусеницы',
              control: 'Биопрепараты (Лепидоцид, Битоксибациллин), инсектициды (Децис)',
              prevention: 'Регулярный осмотр, феромонные ловушки, привлечение птиц',
            },
            {
              name: 'Корневая губка',
              icon: '🍄',
              severity: 'high',
              description: 'Грибковое заболевание. Поражает корни, вызывает гниль.',
              symptoms: 'Замедление роста, пожелтение хвои, белые нити у корневой шейки',
              control: 'Фунгициды (Фундазол), удаление заражённых растений, дренаж',
              prevention: 'Не заглублять корневую шейку, хороший дренаж, умеренный полив',
            },
          ].map((pest, i) => (
            <div key={i} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-start gap-3">
                <span className="text-3xl">{pest.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-bold text-gray-900">{pest.name}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      pest.severity === 'high' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {pest.severity === 'high' ? 'Опасный' : 'Средний'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{pest.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                    <div>
                      <p className="font-medium text-gray-800 mb-1">Симптомы:</p>
                      <p className="text-gray-600">{pest.symptoms}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 mb-1">Борьба:</p>
                      <p className="text-gray-600">{pest.control}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 mb-1">Профилактика:</p>
                      <p className="text-gray-600">{pest.prevention}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Общая профилактика */}
        <div className="mt-6 bg-emerald-50 rounded-lg p-5 border border-emerald-200">
          <h3 className="font-bold text-emerald-900 mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            Общая стратегия защиты
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-emerald-800">
            <div>
              <p className="font-medium mb-2">Регулярный осмотр:</p>
              <ul className="space-y-1 ml-4">
                <li>• Еженедельный осмотр всех растений</li>
                <li>• Особое внимание молодым посадкам</li>
                <li>• Карантин новых растений 2 недели</li>
              </ul>
            </div>
            <div>
              <p className="font-medium mb-2">Профилактические обработки:</p>
              <ul className="space-y-1 ml-4">
                <li>• Весной: инсектициды + фунгициды</li>
                <li>• Летом: акарицы против клещей</li>
                <li>• Осенью: искореняющая обработка</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 5. Советы по выращиванию
function GrowingTips() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Lightbulb className="w-6 h-6 text-yellow-500" />
          Советы и нюансы по выращиванию
        </h2>

        <div className="space-y-4">
          {[
            {
              category: 'Черенкование',
              tips: [
                'Черенки берите с "пяткой" - кусочком старой древесины',
                'Оптимальная длина: 10-15 см для хвойных, 5-10 см для лиственных',
                'Нижние хвоинки/листья удалите на 1/3 длины',
                'Обработайте стимулятором (Корневин, Гетероауксин)',
                'Субстрат: перлит + торф (1:1) - стерильный и рыхлый',
                'Температура укоренения: +20...+24°C',
                'Влажность: 90-100% - используйте мини-тепличку',
                'Проветривайте ежедневно 15-20 минут',
                'Укоренение занимает: туя 2-3 мес, можжевельник 1-2 мес',
              ],
            },
            {
              category: 'Полив',
              tips: [
                'Поливайте утром - меньше испарение и болезней',
                'Лучше недолить, чем перелить - корни задыхаются',
                'Проверяйте влажность: палец на 2-3 см вглубь должен быть сухим',
                'Зимой поливайте реже - раз в 2-3 недели',
                'Используйте отстоянную воду комнатной температуры',
                'Для хвойных: опрыскивание кроны полезно',
                'Капельный полив экономит 50-70% воды',
                'Мульчирование сохраняет влагу и снижает полив',
              ],
            },
            {
              category: 'Подкормки',
              tips: [
                'Весной: азотные удобрения для роста (мочевина, аммиачная селитра)',
                'Летом: комплексные (Кемира, Ава) - раз в 2-3 недели',
                'Осенью: только калий и фосфор - без азота!',
                'Не подкармливайте больные и пересаженные растения',
                'Для хвойных: специальные удобрения (хвойное Буйское)',
                'Дозировка: в 2 раза меньше, чем указано на упаковке',
                'Лучше недокормить, чем перекормить',
                'Органика: компост, биогумус - осторожно с дозировкой',
              ],
            },
            {
              category: 'Обрезка',
              tips: [
                'Санитарная обрезка: весной - удаление сухих и больных ветвей',
                'Формирующая: после окончания роста побегов',
                'Для туи: стрижка 2-3 раза за сезон для плотности',
                'Для можжевельника: только санитарная, не стричь',
                'Инструмент должен быть острым и дезинфицированным',
                'Срезы более 1 см обрабатывайте садовым варом',
                'Не обрезайте в жаркую погоду - стресс для растения',
                'После обрезки подкормите и хорошо полейте',
              ],
            },
            {
              category: 'Зимовка',
              tips: [
                'Влагозарядковый полив осенью обязателен - 50-100 л на растение',
                'Мульчирование корой/торфом 7-10 см - защита корней',
                'Обвяжите колонновидные формы от снега',
                'Укройте молодые растения нетканым материалом',
                'Не укрывайте плёнкой - растение сопреет',
                'Снимайте укрытие постепенно весной - избегайте ожогов',
                'Притените хвойные весной от яркого солнца',
                'Стряхивайте тяжёлый мокрый снег с ветвей',
              ],
            },
            {
              category: 'Пересадка',
              tips: [
                'Оптимальное время: весна (до начала роста) или осень (сентябрь)',
                'За 2 часа до пересадки обильно полейте',
                'Сохраняйте земляной ком - не повреждайте корни',
                'Новая лунка в 1.5-2 раза больше кома',
                'Не заглубляйте корневую шейку!',
                'После пересадки: обильный полив + притенение на 1-2 недели',
                'Подкормку не давайте 2-3 недели после пересадки',
                'Используйте Корневин для стимуляции корней',
              ],
            },
          ].map((section, i) => (
            <div key={i} className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-lg p-4 border border-yellow-200">
              <h3 className="font-bold text-amber-900 mb-3 flex items-center gap-2">
                <Leaf className="w-5 h-5" />
                {section.category}
              </h3>
              <ul className="space-y-2">
                {section.tips.map((tip, j) => (
                  <li key={j} className="text-sm text-amber-800 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 6. Выращивание голубики
function BlueberryGuide() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Sprout className="w-6 h-6 text-purple-500" />
          Выращивание голубики высокорослой
        </h2>

        {/* Ключевые факты */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-purple-50 rounded-lg p-3 text-center border border-purple-200">
            <p className="text-2xl font-bold text-purple-700">3.5-4.5</p>
            <p className="text-xs text-gray-600">pH почвы</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-3 text-center border border-blue-200">
            <p className="text-2xl font-bold text-blue-700">5-7 кг</p>
            <p className="text-xs text-gray-600">Урожай с куста</p>
          </div>
          <div className="bg-emerald-50 rounded-lg p-3 text-center border border-emerald-200">
            <p className="text-2xl font-bold text-emerald-700">30+ лет</p>
            <p className="text-xs text-gray-600">Плодоношение</p>
          </div>
          <div className="bg-amber-50 rounded-lg p-3 text-center border border-amber-200">
            <p className="text-2xl font-bold text-amber-700">800-1500₽</p>
            <p className="text-xs text-gray-600">Цена за кг</p>
          </div>
        </div>

        {/* Требования */}
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
            <h3 className="font-bold text-purple-900 mb-3">Требования к почве:</h3>
            <ul className="space-y-2 text-sm text-purple-800">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                <span><strong>pH 3.5-4.5</strong> - критически важно! Без кислой среды голубика не растёт</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                <span><strong>Субстрат:</strong> 60% верховой торф + 25% хвойный опад + 15% перлит</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                <span><strong>Подкисление:</strong> сера коллоидная (50 г/м²) или лимонная кислота (3 г/10 л)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                <span><strong>Дренаж обязателен</strong> - голубика не переносит застоя воды</span>
              </li>
            </ul>
          </div>

          {/* Посадка */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-4 border border-blue-200">
            <h3 className="font-bold text-blue-900 mb-3">Посадка:</h3>
            <ul className="space-y-2 text-sm text-blue-800">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <span><strong>Время:</strong> весна (апрель-май) или осень (сентябрь)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <span><strong>Схема:</strong> 1.5-2 м между кустами, 2.5-3 м между рядами</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <span><strong>Яма:</strong> 60×60×40 см, заполните кислым субстратом</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <span><strong>Мульча:</strong> сосновая кора 10-15 см - сохраняет влагу и кислотность</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <span><strong>3-4 сорта</strong> для перекрёстного опыления - обязательно!</span>
              </li>
            </ul>
          </div>

          {/* Уход */}
          <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg p-4 border border-emerald-200">
            <h3 className="font-bold text-emerald-900 mb-3">Уход:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-medium text-emerald-800 mb-2">Полив:</p>
                <ul className="space-y-1 text-sm text-emerald-700 ml-4">
                  <li>• 2-3 раза в неделю летом</li>
                  <li>• 20-30 л на куст</li>
                  <li>• Капельный полив идеален</li>
                  <li>• Вода должна быть кислой (pH 4-5)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-emerald-800 mb-2">Подкормки:</p>
                <ul className="space-y-1 text-sm text-emerald-700 ml-4">
                  <li>• Специальные удобрения для голубики</li>
                  <li>• БЕЗ хлора и извести!</li>
                  <li>• Весной: азот, летом: комплекс</li>
                  <li>• 3-4 подкормки за сезон</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-emerald-800 mb-2">Обрезка:</p>
                <ul className="space-y-1 text-sm text-emerald-700 ml-4">
                  <li>• Первые 3 года: только санитарная</li>
                  <li>• С 4 года: прореживание</li>
                  <li>• Удаление старых ветвей (5+ лет)</li>
                  <li>• Весна до набухания почек</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-emerald-800 mb-2">Подкисление:</p>
                <ul className="space-y-1 text-sm text-emerald-700 ml-4">
                  <li>• Каждые 2-3 месяца проверяйте pH</li>
                  <li>• Сера коллоидная: 50 г/м²</li>
                  <li>• Лимонная кислота: 3 г/10 л</li>
                  <li>• Мульча из хвои подкисляет</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Сорта */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-4 border border-amber-200">
            <h3 className="font-bold text-amber-900 mb-3">Рекомендуемые сорта для Башкирии:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { name: 'Патриот', ripening: 'Среднеранний', berry: 'Крупная, 1.8-2 г', yield: '5-7 кг', hardiness: 'До -35°C' },
                { name: 'Блюкроп', ripening: 'Средний', berry: 'Крупная, 1.8-2.2 г', yield: '6-9 кг', hardiness: 'До -34°C' },
                { name: 'Дюк', ripening: 'Ранний', berry: 'Крупная, 1.7-2 г', yield: '6-8 кг', hardiness: 'До -35°C' },
                { name: 'Нордкантри', ripening: 'Ранний', berry: 'Средняя, 1.5-1.8 г', yield: '4-6 кг', hardiness: 'До -40°C' },
              ].map((variety, i) => (
                <div key={i} className="bg-white rounded-lg p-3">
                  <p className="font-bold text-amber-900 mb-1">{variety.name}</p>
                  <div className="text-xs text-gray-600 space-y-1">
                    <p>Срок: {variety.ripening}</p>
                    <p>Ягода: {variety.berry}</p>
                    <p>Урожай: {variety.yield}</p>
                    <p>Зимостойкость: {variety.hardiness}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Размножение */}
          <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-lg p-4 border border-pink-200">
            <h3 className="font-bold text-pink-900 mb-3">Размножение:</h3>
            <ul className="space-y-2 text-sm text-pink-800">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-pink-600 flex-shrink-0 mt-0.5" />
                <span><strong>Зелёное черенкование:</strong> июнь-июль, укореняемость 70-80%</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-pink-600 flex-shrink-0 mt-0.5" />
                <span><strong>Субстрат:</strong> торф + перлит (2:1), pH 3.5-4.0</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-pink-600 flex-shrink-0 mt-0.5" />
                <span><strong>Туманообразование:</strong> обязательно для успеха</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-pink-600 flex-shrink-0 mt-0.5" />
                <span><strong>Укоренение:</strong> 6-8 недель при +22...+25°C</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-pink-600 flex-shrink-0 mt-0.5" />
                <span><strong>Доращивание:</strong> 1-2 года до продажи</span>
              </li>
            </ul>
          </div>

          {/* Экономика */}
          <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg p-4 border border-emerald-200">
            <h3 className="font-bold text-emerald-900 mb-3">Экономика:</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-3">
                <p className="text-xs text-gray-600 mb-1">Себестоимость саженца</p>
                <p className="text-xl font-bold text-emerald-700">150-200 ₽</p>
              </div>
              <div className="bg-white rounded-lg p-3">
                <p className="text-xs text-gray-600 mb-1">Цена продажи</p>
                <p className="text-xl font-bold text-emerald-700">600-1000 ₽</p>
              </div>
              <div className="bg-white rounded-lg p-3">
                <p className="text-xs text-gray-600 mb-1">ROI</p>
                <p className="text-xl font-bold text-emerald-700">300-400%</p>
              </div>
            </div>
            <p className="text-sm text-emerald-700 mt-3">
              <strong>Окупаемость:</strong> 12-18 месяцев при продаже 2-летних саженцев
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
