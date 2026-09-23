import { useState, useEffect } from 'react';
import { Plant, Task, Zone, GrowthPlan, PageView } from './types';
import { initialPlants, initialZones, initialTasks } from './data';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import PlantList from './components/PlantList';
import PlantForm from './components/PlantForm';
import ZonesView from './components/ZonesView';
import TasksView from './components/TasksView';
import Statistics from './components/Statistics';
import GrowthPlanView from './components/GrowthPlanView';
import ProfitablePlantsView from './components/ProfitablePlantsView';
import BusinessAdviceView from './components/BusinessAdviceView';

function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('dashboard');
  const [plants, setPlants] = useState<Plant[]>(() => {
    const saved = localStorage.getItem('conifer-plants');
    return saved ? JSON.parse(saved) : initialPlants;
  });
  const [zones, setZones] = useState<Zone[]>(() => {
    const saved = localStorage.getItem('conifer-zones');
    return saved ? JSON.parse(saved) : initialZones;
  });
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('conifer-tasks');
    return saved ? JSON.parse(saved) : initialTasks;
  });
  const [growthPlans, setGrowthPlans] = useState<GrowthPlan[]>(() => {
    const saved = localStorage.getItem('growth-plans');
    if (saved) return JSON.parse(saved);
    
    // Инициализация планов для всех типов растений
    const SEED_STAGES = [
      { id: 's1', order: 1, title: 'Сбор и подготовка семян', subtitle: 'Заготовка посадочного материала', icon: '🌰', duration: '2–4 недели', season: 'Осень', description: 'Сбор зрелых шишек, извлечение семян, очистка и сортировка.', steps: ['Собрать зрелые шишки с здоровых деревьев', 'Высушить 3–5 дней при комнатной температуре', 'Извлечь семена и отсортировать', 'Обработать фунгицидом'], tips: ['Собирайте с деревьев старше 10 лет', 'Семена сосны сохраняют всхожесть 2–3 года'], warnings: ['Не собирайте с больных деревьев'], temperature: '15–20°C', humidity: '40–50%', completed: false },
      { id: 's2', order: 2, title: 'Стратификация', subtitle: 'Холодная обработка', icon: '❄️', duration: '30–90 дней', season: 'Зима', description: 'Имитация зимних условий для пробуждения зародыша.', steps: ['Замочить семена на 24–48 часов', 'Смешать с влажным песком (1:3)', 'Хранить в холодильнике при +2...+5°C', 'Проверять влажность каждые 7–10 дней'], tips: ['Сосна: 30–45 дней', 'Ель: 45–60 дней', 'Можжевельник: 90–120 дней'], warnings: ['Не допускайте пересыхания', 'При температуре выше +7°C могут заплесневеть'], temperature: '+2...+5°C', humidity: '60–70%', completed: false },
      { id: 's3', order: 3, title: 'Посев', subtitle: 'Высадка в субстрат', icon: '🌱', duration: '1–2 дня', season: 'Весна', description: 'Посев стратифицированных семян в подготовленный субстрат.', steps: ['Подготовить субстрат: торф + песок + перлит (2:1:1)', 'Пролить тёплой водой', 'Разложить семена на расстоянии 2–3 см', 'Присыпать слоем 0.5–2 см', 'Накрыть плёнкой'], tips: ['Глубина заделки: диаметр семени × 2', 'Температура прорастания: +22...+25°C'], warnings: ['Не заглубляйте слишком сильно', 'Избегайте прямого солнца'], temperature: '+20...+25°C', humidity: '80–90%', completed: false },
      { id: 's4', order: 4, title: 'Проращивание', subtitle: 'Уход за всходами', icon: '🌿', duration: '2–6 недель', season: 'Весна', description: 'Период от появления всходов до раскрытия семядолей.', steps: ['Снять укрытие после появления 50% всходов', 'Обеспечить свет 12–14 часов', 'Поливать из пульверизатора', 'Провести профилактику от чёрной ножки'], tips: ['Всходы появляются через 10–25 дней', 'Первые 2 недели поливайте только из пульверизатора'], warnings: ['Чёрная ножка — главный враг сеянцев', 'Пересушка губительна'], temperature: '+18...+22°C', humidity: '70–80%', completed: false },
      { id: 's5', order: 5, title: 'Пикировка', subtitle: 'Пересадка сеянцев', icon: '🪴', duration: '3–5 дней', season: 'Весна–лето', description: 'Пересадка в индивидуальные ёмкости для развития корневой системы.', steps: ['За 2 часа обильно полить сеянцы', 'Подготовить стаканчики 200–300 мл', 'Укоротить центральный корень на 1/3', 'Высадить на ту же глубину', 'Полить раствором «Корневина»'], tips: ['Пикируйте в пасмурную погоду', 'Схема: 5×5 см на гряде'], warnings: ['Не допускайте подсыхания корней', 'Не заглубляйте корневую шейку'], temperature: '+16...+20°C', humidity: '75–85%', completed: false },
      { id: 's6', order: 6, title: 'Доращивание', subtitle: 'Формирование корневой системы', icon: '🌲', duration: '1–2 года', season: 'Круглогодично', description: 'Основной период роста. Формируется корневая система.', steps: ['Высадить в школку с шагом 15×20 см', 'Мульчировать корой 3–5 см', 'Поливать 1–2 раза в неделю', 'Подкармливать каждые 3–4 недели', 'Подготовить к зиме'], tips: ['Прирост первого года: 3–7 см', 'Осенью только калий и фосфор'], warnings: ['Не перекармливайте азотом осенью', 'Защитите от весенних ожогов'], completed: false },
      { id: 's7', order: 7, title: 'Пересадка в контейнеры', subtitle: 'Подготовка к продаже', icon: '📦', duration: '1 день', season: 'Весна или осень', description: 'Перевалка в торговые контейнеры для продажи.', steps: ['Выбрать контейнер по размеру', 'На дно дренаж 2–3 см', 'Перевалить с комом земли', 'Заполнить субстратом', 'Полить и притенить на 7–10 дней'], tips: ['C2 (2 л) — для 15–30 см', 'C5 (5 л) — для 30–60 см'], warnings: ['Не повреждайте земляной ком', 'Зимой контейнеры промерзают'], completed: false },
      { id: 's8', order: 8, title: 'Реализация', subtitle: 'Продажа или высадка', icon: '🏡', duration: 'По мере готовности', season: 'Круглогодично', description: 'Финальный этап — продажа готового саженца.', steps: ['Оценить качество', 'Составить паспорт растения', 'Сфотографировать', 'Подготовить рекомендации по уходу'], tips: ['Оптимальный возраст: 3–5 лет', 'Саженцы с ЗКС приживаются в 3 раза лучше'], warnings: ['Не продавайте больные растения'], completed: false },
    ];

    const CUTTING_STAGES = [
      { id: 'c1', order: 1, title: 'Заготовка черенков', subtitle: 'Нарезка материала', icon: '✂️', duration: '1 день', season: 'Весна или осень', description: 'Нарезка полуодревесневших черенков с материнских растений.', steps: ['Нарезать черенки 10–15 см с «пяткой»', 'Удалить хвою в нижней трети', 'Обработать стимулятором корнеобразования', 'Поместить в субстрат'], tips: ['Черенки с «пяткой» укореняются в 2 раза лучше', 'Нарезайте рано утром'], warnings: ['Не используйте верхушечные побеги'], temperature: '+15...+20°C', humidity: '90–100%', completed: false },
      { id: 'c2', order: 2, title: 'Укоренение', subtitle: 'Формирование корней', icon: '🌱', duration: '1–6 месяцев', season: 'Круглогодично', description: 'Создание оптимальных условий для образования корней.', steps: ['Подготовить субстрат: перлит + торф (1:1)', 'Высадить под углом 45°', 'Создать туманообразующую установку', 'Поддерживать +20...+24°C', 'Опрыскивать 3–5 раз в день'], tips: ['Можжевельник: 1–2 месяца', 'Туя: 2–3 месяца', 'Нижний подогрев ускоряет на 30%'], warnings: ['Перелив вызывает загнивание', 'При +28°C черенки перегреваются'], temperature: '+20...+24°C', humidity: '90–100%', completed: false },
      { id: 'c3', order: 3, title: 'Доращивание', subtitle: 'Адаптация и рост', icon: '🌿', duration: '1–2 года', season: 'Круглогодично', description: 'Адаптация к обычным условиям и интенсивный рост.', steps: ['Постепенно снять укрытие', 'Пересадить в стаканчики', 'Поливать умеренно', 'Подкармливать слабым раствором', 'Высадить в школку'], tips: ['Первый месяц — самый критичный', 'Прирост: 3–10 см'], warnings: ['Резкое снятие укрытия — шок'], temperature: '+15...+22°C', humidity: '70–80%', completed: false },
      { id: 'c4', order: 4, title: 'Реализация', subtitle: 'Подготовка к продаже', icon: '🌲', duration: '1–2 года', season: 'Круглогодично', description: 'Финальное формирование и подготовка к продаже.', steps: ['Пересадить в контейнер', 'Начать формирующую обрезку', 'Оценить товарные качества', 'Подготовить к реализации'], tips: ['Оптимальный возраст: 2–4 года', 'Маркируйте каждый сорт'], warnings: ['Проверьте, что корни оплели ком'], completed: false },
    ];

    return [
      { id: 'plan-pine', plantName: 'Сосна', plantType: 'pine' as const, method: 'seeds' as const, startDate: '2024-09-01', stages: SEED_STAGES.map(s => ({ ...s })), notes: 'Стратификация 45 дней. Прирост 5-10 см/год.' },
      { id: 'plan-spruce', plantName: 'Ель', plantType: 'spruce' as const, method: 'seeds' as const, startDate: '2024-09-15', stages: SEED_STAGES.map(s => ({ ...s })), notes: 'Стратификация 60 дней. Прирост 7-15 см/год.' },
      { id: 'plan-juniper', plantName: 'Можжевельник', plantType: 'juniper' as const, method: 'cuttings' as const, startDate: '2024-04-01', stages: CUTTING_STAGES.map(s => ({ ...s })), notes: 'Черенкование весной. Укоренение 1-2 месяца. Прирост 15-20 см/год.' },
      { id: 'plan-thuja', plantName: 'Туя', plantType: 'thuja' as const, method: 'cuttings' as const, startDate: '2024-04-15', stages: CUTTING_STAGES.map(s => ({ ...s })), notes: 'Черенкование весной. Укореняемость до 90%. Прирост 20-30 см/год.' },
      { id: 'plan-fir', plantName: 'Пихта', plantType: 'fir' as const, method: 'seeds' as const, startDate: '2024-10-01', stages: SEED_STAGES.map(s => ({ ...s })), notes: 'Стратификация 60 дней. Медленный рост в первые 2 года.' },
      { id: 'plan-cypress', plantName: 'Кипарисовик', plantType: 'cypress' as const, method: 'cuttings' as const, startDate: '2024-05-01', stages: CUTTING_STAGES.map(s => ({ ...s })), notes: 'Летнее черенкование. Укоренение 2-3 месяца.' },
      { id: 'plan-yew', plantName: 'Тис', plantType: 'yew' as const, method: 'cuttings' as const, startDate: '2024-08-01', stages: CUTTING_STAGES.map(s => ({ ...s })), notes: 'Осеннее черенкование. Очень медленный рост.' },
      { id: 'plan-larch', plantName: 'Лиственница', plantType: 'larch' as const, method: 'seeds' as const, startDate: '2024-09-20', stages: SEED_STAGES.map(s => ({ ...s })), notes: 'Стратификация 30 дней. Быстрый рост 30-50 см/год.' },
    ];
  });

  const [showPlantForm, setShowPlantForm] = useState(false);
  const [editingPlant, setEditingPlant] = useState<Plant | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('conifer-plants', JSON.stringify(plants));
  }, [plants]);

  useEffect(() => {
    localStorage.setItem('conifer-zones', JSON.stringify(zones));
  }, [zones]);

  useEffect(() => {
    localStorage.setItem('conifer-tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    setZones(prev => prev.map(zone => ({
      ...zone,
      currentCount: plants.filter(p => p.zone === zone.name).length,
    })));
  }, [plants]);

  const handleSavePlant = (plant: Plant) => {
    setPlants(prev => {
      const existing = prev.find(p => p.id === plant.id);
      if (existing) {
        return prev.map(p => p.id === plant.id ? plant : p);
      }
      return [...prev, plant];
    });
    setShowPlantForm(false);
    setEditingPlant(null);
  };

  const handleDeletePlant = (id: string) => {
    setDeleteConfirm(id);
  };

  const confirmDelete = () => {
    if (deleteConfirm) {
      setPlants(prev => prev.filter(p => p.id !== deleteConfirm));
      setDeleteConfirm(null);
    }
  };

  const handleEditPlant = (plant: Plant) => {
    setEditingPlant(plant);
    setShowPlantForm(true);
  };

  const handleToggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleAddTask = (task: Task) => {
    setTasks(prev => [...prev, task]);
  };

  const handleDeleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const pendingTaskCount = tasks.filter(t => !t.completed).length;

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard plants={plants} zones={zones} tasks={tasks} />;
      case 'plants':
        return (
          <PlantList
            plants={plants}
            tasks={tasks}
            growthPlans={growthPlans}
            onAdd={() => { setEditingPlant(null); setShowPlantForm(true); }}
            onEdit={handleEditPlant}
            onDelete={handleDeletePlant}
          />
        );
      case 'zones':
        return <ZonesView zones={zones} plants={plants} />;
      case 'tasks':
        return (
          <TasksView
            tasks={tasks}
            plants={plants}
            onToggleTask={handleToggleTask}
            onAddTask={handleAddTask}
            onDeleteTask={handleDeleteTask}
          />
        );
      case 'statistics':
        return <Statistics plants={plants} />;
      case 'growth-plan':
        return <GrowthPlanView plants={plants} plans={growthPlans} onSavePlans={setGrowthPlans} />;
      case 'profitable':
        return <ProfitablePlantsView />;
      case 'business':
        return <BusinessAdviceView />;
      default:
        return <Dashboard plants={plants} zones={zones} tasks={tasks} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        plantCount={plants.length}
        taskCount={pendingTaskCount}
      />

      <main className="flex-1 overflow-y-auto">
        <div className="p-4 lg:p-8 pt-16 lg:pt-8 max-w-7xl mx-auto">
          {renderPage()}
        </div>
      </main>

      {showPlantForm && (
        <PlantForm
          plant={editingPlant}
          onSave={handleSavePlant}
          onCancel={() => { setShowPlantForm(false); setEditingPlant(null); }}
        />
      )}

      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full">
            <div className="text-center">
              <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🗑️</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Удалить растение?</h3>
              <p className="text-sm text-gray-500 mb-6">
                Это действие нельзя отменить. Растение будет удалено из каталога.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Отмена
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  Удалить
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
