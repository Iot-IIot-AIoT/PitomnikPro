// Совместимая функция генерации уникальных ID
// Работает во всех браузерах, включая старые

export function generateId(): string {
  // Используем crypto.randomUUID() если доступен (современные браузеры)
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  
  // Fallback: генерируем UUID вручную
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// Альтернативная простая версия (если нужна только уникальность)
export function simpleId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
