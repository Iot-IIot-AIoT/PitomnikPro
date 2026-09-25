import { useState } from 'react';
import { Customer, Order, Deal } from '../types';
import { initialCustomers, initialOrders, initialDeals } from '../crmData';
import {
  Users, ShoppingCart, TrendingUp, Plus, Search, Phone, Mail,
  MapPin, Calendar, DollarSign, CheckCircle2, Clock, XCircle,
  Edit2, Trash2, Eye, Filter, ChevronDown, ChevronRight,
  UserPlus, Package, AlertCircle, Target, Award, BarChart3
} from 'lucide-react';

type CRMView = 'customers' | 'orders' | 'deals' | 'funnel';

export default function CRMView() {
  const [currentView, setCurrentView] = useState<CRMView>('customers');
  const [customers, setCustomers] = useState<Customer[]>(() => {
    const saved = localStorage.getItem('crm-customers');
    return saved ? JSON.parse(saved) : initialCustomers;
  });
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('crm-orders');
    return saved ? JSON.parse(saved) : initialOrders;
  });
  const [deals, setDeals] = useState<Deal[]>(() => {
    const saved = localStorage.getItem('crm-deals');
    return saved ? JSON.parse(saved) : initialDeals;
  });

  const saveCustomers = (data: Customer[]) => {
    setCustomers(data);
    localStorage.setItem('crm-customers', JSON.stringify(data));
  };

  const saveOrders = (data: Order[]) => {
    setOrders(data);
    localStorage.setItem('crm-orders', JSON.stringify(data));
  };

  const saveDeals = (data: Deal[]) => {
    setDeals(data);
    localStorage.setItem('crm-deals', JSON.stringify(data));
  };

  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const wonDealsValue = deals.filter(d => d.stage === 'won').reduce((sum, d) => sum + d.value, 0);
  const pipelineValue = deals.filter(d => !['won', 'lost'].includes(d.stage)).reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">CRM Система</h1>
        <p className="text-gray-500 mt-1">Управление клиентами, заказами и сделками</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-50 rounded-xl">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Клиенты</p>
              <p className="text-2xl font-bold text-gray-900">{customers.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-50 rounded-xl">
              <ShoppingCart className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Заказы</p>
              <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-50 rounded-xl">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Выручка</p>
              <p className="text-2xl font-bold text-gray-900">{(totalRevenue / 1000).toFixed(0)}K ₽</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-50 rounded-xl">
              <TrendingUp className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Воронка</p>
              <p className="text-2xl font-bold text-gray-900">{(pipelineValue / 1000).toFixed(0)}K ₽</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2">
        <div className="flex gap-2">
          {[
            { id: 'customers', label: 'Клиенты', icon: Users },
            { id: 'orders', label: 'Заказы', icon: ShoppingCart },
            { id: 'deals', label: 'Сделки', icon: Target },
            { id: 'funnel', label: 'Воронка продаж', icon: BarChart3 },
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setCurrentView(tab.id as CRMView)}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  currentView === tab.id
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      {currentView === 'customers' && (
        <CustomersView customers={customers} onSave={saveCustomers} />
      )}
      {currentView === 'orders' && (
        <OrdersView orders={orders} customers={customers} onSave={saveOrders} />
      )}
      {currentView === 'deals' && (
        <DealsView deals={deals} onSave={saveDeals} />
      )}
      {currentView === 'funnel' && (
        <FunnelView deals={deals} />
      )}
    </div>
  );
}

function CustomersView({ customers, onSave }: { customers: Customer[]; onSave: (data: Customer[]) => void }) {
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  const filtered = customers.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search) ||
      c.email.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === 'all' || c.type === filterType;
    return matchSearch && matchType;
  });

  const typeLabels = {
    individual: 'Частное лицо',
    business: 'Компания',
    designer: 'Дизайнер',
    developer: 'Застройщик',
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Клиенты</h2>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
          <UserPlus className="w-5 h-5" />
          Добавить клиента
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск по имени, телефону, email..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>
          <select
            value={filterType}
            onChange={e => setFilterType(e.target.value)}
            className="px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
          >
            <option value="all">Все типы</option>
            <option value="individual">Частные лица</option>
            <option value="business">Компании</option>
            <option value="designer">Дизайнеры</option>
            <option value="developer">Застройщики</option>
          </select>
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map(customer => (
          <div key={customer.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                {customer.name.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-gray-900">{customer.name}</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                    {typeLabels[customer.type]}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Phone className="w-4 h-4" />
                    {customer.phone}
                  </div>
                  <div className="flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    {customer.email}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span className="truncate">{customer.address}</span>
                  </div>
                </div>
                {customer.notes && (
                  <p className="text-sm text-gray-500 mt-2">{customer.notes}</p>
                )}
                <div className="flex gap-4 mt-3 text-sm">
                  <span className="text-gray-500">
                    Заказов: <span className="font-semibold text-gray-900">{customer.totalOrders}</span>
                  </span>
                  <span className="text-gray-500">
                    Потрачено: <span className="font-semibold text-emerald-600">{customer.totalSpent.toLocaleString()} ₽</span>
                  </span>
                  <span className="text-gray-500">
                    Источник: <span className="font-semibold text-gray-700">{customer.source}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function OrdersView({ orders, customers, onSave }: { orders: Order[]; customers: Customer[]; onSave: (data: Order[]) => void }) {
  const statusConfig = {
    new: { label: 'Новый', color: 'bg-blue-100 text-blue-700', icon: <Clock className="w-4 h-4" /> },
    processing: { label: 'В работе', color: 'bg-amber-100 text-amber-700', icon: <Clock className="w-4 h-4" /> },
    ready: { label: 'Готов', color: 'bg-purple-100 text-purple-700', icon: <Package className="w-4 h-4" /> },
    delivered: { label: 'Доставлен', color: 'bg-emerald-100 text-emerald-700', icon: <CheckCircle2 className="w-4 h-4" /> },
    cancelled: { label: 'Отменён', color: 'bg-red-100 text-red-700', icon: <XCircle className="w-4 h-4" /> },
  };

  const paymentConfig = {
    pending: { label: 'Ожидает', color: 'text-amber-600' },
    paid: { label: 'Оплачен', color: 'text-emerald-600' },
    partial: { label: 'Частично', color: 'text-blue-600' },
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Заказы</h2>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
          <Plus className="w-5 h-5" />
          Новый заказ
        </button>
      </div>

      <div className="space-y-3">
        {orders.map(order => {
          const status = statusConfig[order.status];
          const payment = paymentConfig[order.paymentStatus];

          return (
            <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-900">Заказ #{order.id.slice(-4)}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1 ${status.color}`}>
                      {status.icon}
                      {status.label}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{order.customerName}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">{order.totalAmount.toLocaleString()} ₽</p>
                  <p className={`text-sm ${payment.color}`}>💳 {payment.label}</p>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-3">
                <div className="space-y-1">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="text-gray-700">{item.plantName} × {item.quantity}</span>
                      <span className="text-gray-600">{(item.price * item.quantity).toLocaleString()} ₽</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 mt-3 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Создан: {new Date(order.createdAt).toLocaleDateString('ru-RU')}
                </span>
                <span className="flex items-center gap-1">
                  <Package className="w-4 h-4" />
                  Доставка: {new Date(order.deliveryDate).toLocaleDateString('ru-RU')}
                </span>
              </div>

              {order.notes && (
                <p className="text-sm text-gray-500 mt-2 bg-gray-50 p-2 rounded-lg">{order.notes}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DealsView({ deals, onSave }: { deals: Deal[]; onSave: (data: Deal[]) => void }) {
  const stageConfig = {
    lead: { label: 'Лид', color: 'bg-gray-100 text-gray-700' },
    qualified: { label: 'Квалифицирован', color: 'bg-blue-100 text-blue-700' },
    proposal: { label: 'Предложение', color: 'bg-purple-100 text-purple-700' },
    negotiation: { label: 'Переговоры', color: 'bg-amber-100 text-amber-700' },
    won: { label: 'Выиграна', color: 'bg-emerald-100 text-emerald-700' },
    lost: { label: 'Проиграна', color: 'bg-red-100 text-red-700' },
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Сделки</h2>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
          <Plus className="w-5 h-5" />
          Новая сделка
        </button>
      </div>

      <div className="space-y-3">
        {deals.map(deal => {
          const stage = stageConfig[deal.stage];
          return (
            <div key={deal.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{deal.title}</h3>
                  <p className="text-sm text-gray-600">{deal.customerName}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">{deal.value.toLocaleString()} ₽</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${stage.color}`}>
                    {stage.label}
                  </span>
                </div>
              </div>

              <div className="mt-3">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500">Вероятность закрытия</span>
                  <span className="font-semibold text-gray-700">{deal.probability}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-emerald-500 h-2 rounded-full transition-all"
                    style={{ width: `${deal.probability}%` }}
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-3 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Ожидается: {new Date(deal.expectedCloseDate).toLocaleDateString('ru-RU')}
                </span>
              </div>

              {deal.notes && (
                <p className="text-sm text-gray-500 mt-2 bg-gray-50 p-2 rounded-lg">{deal.notes}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FunnelView({ deals }: { deals: Deal[] }) {
  const stages = [
    { id: 'lead', label: 'Лиды', color: 'bg-gray-500' },
    { id: 'qualified', label: 'Квалифицированы', color: 'bg-blue-500' },
    { id: 'proposal', label: 'Предложения', color: 'bg-purple-500' },
    { id: 'negotiation', label: 'Переговоры', color: 'bg-amber-500' },
    { id: 'won', label: 'Выиграны', color: 'bg-emerald-500' },
  ];

  const funnelData = stages.map(stage => {
    const stageDeals = deals.filter(d => d.stage === stage.id);
    return {
      ...stage,
      count: stageDeals.length,
      value: stageDeals.reduce((sum, d) => sum + d.value, 0),
    };
  });

  const maxCount = Math.max(...funnelData.map(f => f.count), 1);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-900">Воронка продаж</h2>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="space-y-3">
          {funnelData.map((stage, index) => (
            <div key={stage.id} className="flex items-center gap-4">
              <div className="w-40 text-right">
                <p className="text-sm font-medium text-gray-700">{stage.label}</p>
                <p className="text-xs text-gray-500">{stage.count} сделок</p>
              </div>
              <div className="flex-1 relative">
                <div className="w-full bg-gray-100 rounded-lg h-12 flex items-center">
                  <div
                    className={`${stage.color} h-full rounded-lg flex items-center justify-end pr-4 transition-all`}
                    style={{ width: `${(stage.count / maxCount) * 100}%` }}
                  >
                    <span className="text-white font-bold">{stage.value.toLocaleString()} ₽</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl p-5 text-white">
          <Award className="w-8 h-8 mb-2 opacity-80" />
          <p className="text-sm opacity-80">Выиграно сделок</p>
          <p className="text-2xl font-bold">{deals.filter(d => d.stage === 'won').length}</p>
          <p className="text-sm opacity-80 mt-1">
            {deals.filter(d => d.stage === 'won').reduce((s, d) => s + d.value, 0).toLocaleString()} ₽
          </p>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-5 text-white">
          <Target className="w-8 h-8 mb-2 opacity-80" />
          <p className="text-sm opacity-80">В работе</p>
          <p className="text-2xl font-bold">{deals.filter(d => !['won', 'lost'].includes(d.stage)).length}</p>
          <p className="text-sm opacity-80 mt-1">
            {deals.filter(d => !['won', 'lost'].includes(d.stage)).reduce((s, d) => s + d.value, 0).toLocaleString()} ₽
          </p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-5 text-white">
          <TrendingUp className="w-8 h-8 mb-2 opacity-80" />
          <p className="text-sm opacity-80">Конверсия</p>
          <p className="text-2xl font-bold">
            {deals.length > 0 ? Math.round((deals.filter(d => d.stage === 'won').length / deals.length) * 100) : 0}%
          </p>
          <p className="text-sm opacity-80 mt-1">Выиграно / Всего</p>
        </div>
      </div>
    </div>
  );
}
