import { PageView } from '../types';
import { LayoutDashboard, TreePine, MapPin, ClipboardList, BarChart3, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface SidebarProps {
  currentPage: PageView;
  onPageChange: (page: PageView) => void;
  plantCount: number;
  taskCount: number;
}

export default function Sidebar({ currentPage, onPageChange, plantCount, taskCount }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { id: 'dashboard' as PageView, label: 'Панель', icon: LayoutDashboard },
    { id: 'plants' as PageView, label: 'Растения', icon: TreePine, badge: plantCount },
    { id: 'zones' as PageView, label: 'Зоны', icon: MapPin },
    { id: 'tasks' as PageView, label: 'Задачи', icon: ClipboardList, badge: taskCount },
    { id: 'statistics' as PageView, label: 'Статистика', icon: BarChart3 },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white text-lg">🌲</span>
          </div>
          <div>
            <h1 className="font-bold text-gray-900 text-lg leading-tight">ХвойныйУчёт</h1>
            <p className="text-xs text-gray-500">Питомник хвойных</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => { onPageChange(item.id); setMobileOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-emerald-50 text-emerald-700 shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-600' : 'text-gray-400'}`} />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge !== undefined && item.badge > 0 && (
                <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                  isActive ? 'bg-emerald-200 text-emerald-800' : 'bg-gray-100 text-gray-600'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100">
        <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-4">
          <p className="text-sm font-medium text-emerald-800">🌿 Совет дня</p>
          <p className="text-xs text-emerald-600 mt-1">Хвойные растения не нуждаются в частом поливе зимой. Проверяйте влажность почвы перед поливом.</p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2.5 bg-white shadow-lg rounded-xl border border-gray-200"
      >
        {mobileOpen ? <X className="w-5 h-5 text-gray-600" /> : <Menu className="w-5 h-5 text-gray-600" />}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/30 z-40" onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-72 bg-white border-r border-gray-100 transform transition-transform lg:transform-none ${
        mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        {sidebarContent}
      </aside>
    </>
  );
}
