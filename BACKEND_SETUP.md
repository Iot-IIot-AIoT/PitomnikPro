# Настройка бэкенда для ПитомникПро

## 🎯 Архитектура

```
┌─────────────────┐
│   Фронтенд      │  React + Vite (порт 5173)
│   (браузер)     │
└────────┬────────┘
         │ HTTP/REST API
         ▼
┌─────────────────┐
│   Бэкенд        │  Node.js + Express (порт 3001)
│   API сервер    │
└────────┬────────┘
         │ SQL
         ▼
┌─────────────────┐
│   PostgreSQL    │  База данных (порт 5432)
│   Database      │
└─────────────────┘
```

---

## 📋 Требования

- Node.js 18+
- PostgreSQL 14+
- npm или yarn

---

## 🏗️ Шаг 1: Создание бэкенд-проекта

### Создайте отдельную папку для бэкенда:
```bash
mkdir питомникпро-backend
cd питомникпро-backend
npm init -y
```

### Установите зависимости:
```bash
npm install express cors dotenv pg bcryptjs jsonwebtoken multer
npm install --save-dev nodemon @types/express @types/node typescript ts-node
```

---

## 📁 Шаг 2: Структура проекта

Создайте следующую структуру:

```
питомникпро-backend/
├── src/
│   ├── config/
│   │   └── database.ts
│   ├── middleware/
│   │   └── auth.ts
│   ├── models/
│   │   ├── Customer.ts
│   │   ├── Order.ts
│   │   ├── Plant.ts
│   │   └── Deal.ts
│   ├── routes/
│   │   ├── auth.ts
│   │   ├── customers.ts
│   │   ├── orders.ts
│   │   ├── plants.ts
│   │   └── deals.ts
│   ├── migrations/
│   │   └── 001_init.sql
│   ├── seeds/
│   │   └── 001_seed.sql
│   ├── uploads/
│   ├── server.ts
│   └── .env
├── package.json
└── tsconfig.json
```

---

## 🔧 Шаг 3: Конфигурация

### Создайте `src/.env`:
```env
# Сервер
PORT=3001
NODE_ENV=development

# База данных
DB_HOST=localhost
DB_PORT=5432
DB_NAME=pitomnik_pro
DB_USER=postgres
DB_PASSWORD=ваш_пароль

# JWT
JWT_SECRET=ваш_секретный_ключ_минимум_32_символа
JWT_EXPIRES_IN=7d

# Загрузка файлов
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=5242880
```

### Создайте `tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

---

## 🗄️ Шаг 4: База данных

### Установите PostgreSQL:

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

**macOS (Homebrew):**
```bash
brew install postgresql
brew services start postgresql
```

**Windows:**
Скачайте с https://www.postgresql.org/download/windows/

### Создайте базу данных:
```bash
sudo -u postgres psql
```

В консоли PostgreSQL:
```sql
CREATE DATABASE pitomnik_pro;
CREATE USER pitomnik_user WITH PASSWORD 'ваш_пароль';
GRANT ALL PRIVILEGES ON DATABASE pitomnik_pro TO pitomnik_user;
\q
```

---

## 📊 Шаг 5: Миграции

### Создайте `src/migrations/001_init.sql`:

```sql
-- Таблица пользователей (админы)
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'admin',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица клиентов
CREATE TABLE customers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  email VARCHAR(255),
  address TEXT,
  type VARCHAR(50) DEFAULT 'individual',
  source VARCHAR(100),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  total_orders INTEGER DEFAULT 0,
  total_spent DECIMAL(12, 2) DEFAULT 0
);

-- Таблица растений
CREATE TABLE plants (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  latin_name VARCHAR(255),
  type VARCHAR(50) NOT NULL,
  variety VARCHAR(100),
  health VARCHAR(50) DEFAULT 'good',
  status VARCHAR(50) DEFAULT 'growing',
  zone VARCHAR(100),
  planted_date DATE,
  height INTEGER DEFAULT 0,
  age INTEGER DEFAULT 1,
  notes TEXT,
  last_watered DATE,
  last_fertilized DATE,
  image_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица заказов
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  customer_id INTEGER REFERENCES customers(id),
  total_amount DECIMAL(12, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'new',
  payment_status VARCHAR(50) DEFAULT 'pending',
  delivery_date DATE,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица позиций заказа
CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  plant_id INTEGER REFERENCES plants(id),
  plant_name VARCHAR(255) NOT NULL,
  quantity INTEGER NOT NULL,
  price DECIMAL(10, 2) NOT NULL
);

-- Таблица сделок
CREATE TABLE deals (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  customer_id INTEGER REFERENCES customers(id),
  value DECIMAL(12, 2) NOT NULL,
  stage VARCHAR(50) DEFAULT 'lead',
  probability INTEGER DEFAULT 0,
  expected_close_date DATE,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица зон
CREATE TABLE zones (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  capacity INTEGER NOT NULL,
  current_count INTEGER DEFAULT 0,
  description TEXT
);

-- Таблица задач
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  plant_id INTEGER REFERENCES plants(id),
  plant_name VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL,
  due_date DATE NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Индексы для ускорения запросов
CREATE INDEX idx_customers_type ON customers(type);
CREATE INDEX idx_plants_type ON plants(type);
CREATE INDEX idx_plants_zone ON plants(zone);
CREATE INDEX idx_orders_customer ON orders(customer_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_deals_stage ON deals(stage);
CREATE INDEX idx_tasks_plant ON tasks(plant_id);
```

### Запустите миграцию:
```bash
psql -U pitomnik_user -d pitomnik_pro -f src/migrations/001_init.sql
```

---

## 🔌 Шаг 6: Код бэкенда

### `src/config/database.ts`:
```typescript
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

export default pool;
```

### `src/middleware/auth.ts`:
```typescript
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  userId?: number;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Токен не предоставлен' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Неверный токен' });
  }
};
```

### `src/routes/customers.ts`:
```typescript
import { Router, Request, Response } from 'express';
import pool from '../config/database';
import { authMiddleware, AuthRequest } from '../middleware/auth';

const router = Router();

// Получить всех клиентов
router.get('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM customers ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Получить клиента по ID
router.get('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM customers WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Клиент не найден' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Создать клиента
router.post('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { name, phone, email, address, type, source, notes } = req.body;
    
    const result = await pool.query(
      `INSERT INTO customers (name, phone, email, address, type, source, notes)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [name, phone, email, address, type, source, notes]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Обновить клиента
router.put('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { name, phone, email, address, type, source, notes } = req.body;
    
    const result = await pool.query(
      `UPDATE customers
       SET name = $1, phone = $2, email = $3, address = $4, type = $5, source = $6, notes = $7
       WHERE id = $8
       RETURNING *`,
      [name, phone, email, address, type, source, notes, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Клиент не найден' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Удалить клиента
router.delete('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM customers WHERE id = $1', [id]);
    res.json({ message: 'Клиент удалён' });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

export default router;
```

### Аналогично создайте `routes/orders.ts`, `routes/plants.ts`, `routes/deals.ts`

### `src/server.ts`:
```typescript
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import customersRouter from './routes/customers';
import ordersRouter from './routes/orders';
import plantsRouter from './routes/plants';
import dealsRouter from './routes/deals';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/customers', customersRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/plants', plantsRouter);
app.use('/api/deals', dealsRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на порту ${PORT}`);
});
```

### Добавьте в `package.json`:
```json
{
  "scripts": {
    "dev": "nodemon --exec ts-node src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js"
  }
}
```

---

## 🔗 Шаг 7: Интеграция фронтенда с бэкендом

### Создайте `src/api.ts` во фронтенде:
```typescript
const API_URL = 'http://localhost:3001/api';

const getToken = () => localStorage.getItem('auth-token');

export const api = {
  async get(endpoint: string) {
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return response.json();
  },

  async post(endpoint: string, data: any) {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  async put(endpoint: string, data: any) {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  async delete(endpoint: string) {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return response.json();
  },
};
```

### Используйте в компонентах:
```typescript
import { api } from '../api';

// Загрузка клиентов
const loadCustomers = async () => {
  const customers = await api.get('/customers');
  setCustomers(customers);
};

// Создание клиента
const createCustomer = async (data: Customer) => {
  const newCustomer = await api.post('/customers', data);
  setCustomers([...customers, newCustomer]);
};
```

---

## 🚀 Шаг 8: Запуск

### Запустите бэкенд:
```bash
npm run dev
```

### Запустите фронтенд:
```bash
npm run dev
```

Теперь фронтенд работает на `http://localhost:5173`, бэкенд на `http://localhost:3001`

---

## 🌐 Шаг 9: Деплой бэкенда

### Вариант 1: VPS (Timeweb, Beget)

1. Арендуйте VPS с Ubuntu
2. Установите Node.js и PostgreSQL
3. Скопируйте код бэкенда
4. Настройте systemd сервис:

Создайте `/etc/systemd/system/pitomnik-backend.service`:
```ini
[Unit]
Description=ПитомникПро Backend
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/pitomnik-backend
ExecStart=/usr/bin/npm start
Restart=always
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
```

5. Запустите:
```bash
sudo systemctl start pitomnik-backend
sudo systemctl enable pitomnik-backend
```

### Вариант 2: Railway.app

1. Зарегистрируйтесь на https://railway.app
2. Создайте новый проект
3. Подключите GitHub репозиторий
4. Добавьте PostgreSQL базу данных
5. Настройте переменные окружения
6. Задеплойте

### Вариант 3: Render.com

1. Зарегистрируйтесь на https://render.com
2. Создайте Web Service
3. Подключите репозиторий
4. Build Command: `npm run build`
5. Start Command: `npm start`
6. Добавьте PostgreSQL базу

---

## 🔒 Шаг 10: Безопасность

### Настройте SSL (Let's Encrypt):
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d api.ваш-домен.ru
```

### Настройте CORS в бэкенде:
```typescript
app.use(cors({
  origin: ['https://ваш-домен.ru', 'http://localhost:5173'],
  credentials: true,
}));
```

### Используйте переменные окружения для секретов:
- Никогда не коммитьте `.env` в Git
- Добавьте `.env` в `.gitignore`

---

## 📊 Мониторинг

### Добавьте логирование:
```bash
npm install winston
```

### Используйте PM2 для управления процессами:
```bash
npm install -g pm2
pm2 start dist/server.js --name pitomnik-backend
pm2 save
pm2 startup
```

---

## ✅ Чеклист готовности к продакшену

- [ ] Бэкенд развёрнут на сервере
- [ ] PostgreSQL настроена и работает
- [ ] SSL сертификат установлен
- [ ] Переменные окружения настроены
- [ ] Фронтенд подключён к бэкенду
- [ ] Тесты пройдены
- [ ] Резервное копирование настроено
- [ ] Мониторинг настроен
- [ ] Документация API создана

---

**Готово!** Ваш бэкенд готов к продакшену.
