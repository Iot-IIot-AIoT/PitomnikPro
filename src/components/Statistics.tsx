import { Plant, PlantType } from '../types';
import { PLANT_TYPE_LABELS, PLANT_TYPE_EMOJIS, HEALTH_LABELS, HEALTH_COLORS, STATUS_LABELS, STATUS_COLORS } from '../data';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line } from 'recharts';
import { TrendingUp, Activity, BarChart3, PieChart as PieChartIcon } from 'lucide-react';

interface StatisticsProps {
  plants: Plant[];
}

export default function Statistics({ plants }: StatisticsProps) {
  // Data for charts
  const typeData = Object.entries(
    plants.reduce((acc, p) => {
      acc[p.type] = (acc[p.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([type, count]) => ({
    name: PLANT_TYPE_LABELS[type as PlantType],
    value: count,
    emoji: PLANT_TYPE_EMOJIS[type as PlantType],
  }));

  const healthData = Object.entries(
    plants.reduce((acc, p) => {
      acc[p.health] = (acc[p.health] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([health, count]) => ({
    name: HEALTH_LABELS[health as keyof typeof HEALTH_LABELS],
    value: count,
    color: HEALTH_COLORS[health as keyof typeof HEALTH_COLORS],
  }));

  const statusData = Object.entries(
    plants.reduce((acc, p) => {
      acc[p.status] = (acc[p.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([status, count]) => ({
    name: STATUS_LABELS[status as keyof typeof STATUS_LABELS],
    value: count,
    color: STATUS_COLORS[status as keyof typeof STATUS_COLORS],
  }));

  const zoneData = Object.entries(
    plants.reduce((acc, p) => {
      acc[p.zone] = (acc[p.zone] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([zone, count]) => ({
    name: zone,
    count,
  }));

  // Height distribution
  const heightRanges = [
    { range: '0-50', min: 0, max: 50 },
    { range: '51-100', min: 51, max: 100 },
    { range: '101-150', min: 101, max: 150 },
    { range: '151-200', min: 151, max: 200 },
    { range: '200+', min: 201, max: 9999 },
  ];
  const heightData = heightRanges.map(r => ({
    range: r.range,
    count: plants.filter(p => p.height >= r.min && p.height <= r.max).length,
  }));

  // Age distribution
  const ageRanges = [
    { range: '1-2', min: 1, max: 2 },
    { range: '3-4', min: 3, max: 4 },
    { range: '5-6', min: 5, max: 6 },
    { range: '7+', min: 7, max: 99 },
  ];
  const ageData = ageRanges.map(r => ({
    range: r.range,
    count: plants.filter(p => p.age >= r.min && p.age <= r.max).length,
  }));

  // Growth trend (simulated monthly growth)
  const growthTrend = [
    { month: 'Июл', avgHeight: 85 },
    { month: 'Авг', avgHeight: 90 },
    { month: 'Сен', avgHeight: 95 },
    { month: 'Окт', avgHeight: 98 },
    { month: 'Ноя', avgHeight: 100 },
    { month: 'Дек', avgHeight: 102 },
  ];

  const COLORS = ['#22c55e', '#3b82f6', '#a855f7', '#f59e0b', '#ef4444', '#06b6d4', '#ec4899', '#84cc16'];

  const totalHeight = plants.reduce((s, p) => s + p.height, 0);
  const avgHeight = plants.length > 0 ? Math.round(totalHeight / plants.length) : 0;
  const maxHeight = plants.length > 0 ? Math.max(...plants.map(p => p.height)) : 0;
  const avgAge = plants.length > 0 ? (plants.reduce((s, p) => s + p.age, 0) / plants.length).toFixed(1) : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Статистика</h1>
        <p className="text-gray-500 mt-1">Аналитика по вашему питомнику</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center">
          <p className="text-3xl font-bold text-emerald-600">{plants.length}</p>
          <p className="text-sm text-gray-500 mt-1">Всего растений</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center">
          <p className="text-3xl font-bold text-blue-600">{avgHeight} см</p>
          <p className="text-sm text-gray-500 mt-1">Средняя высота</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center">
          <p className="text-3xl font-bold text-purple-600">{maxHeight} см</p>
          <p className="text-sm text-gray-500 mt-1">Макс. высота</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center">
          <p className="text-3xl font-bold text-amber-600">{avgAge}</p>
          <p className="text-sm text-gray-500 mt-1">Средний возраст (лет)</p>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Plant Types Pie Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <PieChartIcon className="w-5 h-5 text-emerald-500" />
            Распределение по видам
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={typeData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {typeData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Health Status Pie Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-green-500" />
            Состояние здоровья
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={healthData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
                labelLine={false}
              >
                {healthData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Height Distribution Bar Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-500" />
            Распределение по высоте (см)
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={heightData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="range" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Количество" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Age Distribution Bar Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-purple-500" />
            Распределение по возрасту (лет)
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={ageData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="range" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="count" fill="#a855f7" radius={[4, 4, 0, 0]} name="Количество" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Growth Trend */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-emerald-500" />
          Динамика роста (средняя высота, см)
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={growthTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Line type="monotone" dataKey="avgHeight" stroke="#22c55e" strokeWidth={3} dot={{ fill: '#22c55e', r: 5 }} name="Средняя высота" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Zone Distribution */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-amber-500" />
          Растения по зонам
        </h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={zoneData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis type="number" tick={{ fontSize: 12 }} />
            <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} width={60} />
            <Tooltip />
            <Bar dataKey="count" fill="#f59e0b" radius={[0, 4, 4, 0]} name="Количество" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
