# API Документация ПитомникПро

## Базовый URL
```
http://localhost:3001/api
```

## Аутентификация

Все запросы (кроме `/auth/login` и `/auth/register`) требуют JWT токен в заголовке:

```
Authorization: Bearer <ваш_токен>
```

---

## 🔐 Аутентификация

### Регистрация
```http
POST /auth/register
Content-Type: application/json

{
  "email": "admin@pitomnik.ru",
  "password": "secure_password_123",
  "name": "Администратор"
}
```

**Ответ:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "admin@pitomnik.ru",
    "name": "Администратор",
    "role": "admin"
  }
}
```

### Вход
```http
POST /auth/login
Content-Type: application/json

{
  "email": "admin@pitomnik.ru",
  "password": "secure_password_123"
}
```

**Ответ:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "admin@pitomnik.ru",
    "name": "Администратор",
    "role": "admin"
  }
}
```

---

## 👥 Клиенты

### Получить всех клиентов
```http
GET /customers
Authorization: Bearer <token>
```

**Ответ:**
```json
[
  {
    "id": 1,
    "name": "Иванов Алексей Петрович",
    "phone": "+7 (999) 123-45-67",
    "email": "ivanov@mail.ru",
    "address": "г. Москва, ул. Садовая, д. 15",
    "type": "individual",
    "source": "Instagram",
    "notes": "Постоянный клиент",
    "created_at": "2024-03-15T10:00:00.000Z",
    "total_orders": 5,
    "total_spent": 85000.00
  }
]
```

### Получить клиента по ID
```http
GET /customers/1
Authorization: Bearer <token>
```

### Создать клиента
```http
POST /customers
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Петров Иван Иванович",
  "phone": "+7 (916) 555-33-22",
  "email": "petrov@gmail.com",
  "address": "г. Москва, ул. Ленина, д. 10",
  "type": "individual",
  "source": "Сайт",
  "notes": "Новый клиент"
}
```

**Ответ:**
```json
{
  "id": 2,
  "name": "Петров Иван Иванович",
  "phone": "+7 (916) 555-33-22",
  "email": "petrov@gmail.com",
  "address": "г. Москва, ул. Ленина, д. 10",
  "type": "individual",
  "source": "Сайт",
  "notes": "Новый клиент",
  "created_at": "2024-12-23T10:00:00.000Z",
  "total_orders": 0,
  "total_spent": 0.00
}
```

### Обновить клиента
```http
PUT /customers/1
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Иванов Алексей Петрович",
  "phone": "+7 (999) 123-45-67",
  "email": "ivanov.new@mail.ru",
  "address": "г. Москва, ул. Новая, д. 20",
  "type": "individual",
  "source": "Instagram",
  "notes": "Обновлённые данные"
}
```

### Удалить клиента
```http
DELETE /customers/1
Authorization: Bearer <token>
```

**Ответ:**
```json
{
  "message": "Клиент удалён"
}
```

---

## 🌿 Растения

### Получить все растения
```http
GET /plants
Authorization: Bearer <token>
```

**Ответ:**
```json
[
  {
    "id": 1,
    "name": "Туя западная Смарагд",
    "latin_name": "Thuja occidentalis Smaragd",
    "type": "thuja",
    "variety": "Smaragd",
    "health": "excellent",
    "status": "growing",
    "zone": "Зона В",
    "planted_date": "2020-09-05",
    "height": 180,
    "age": 7,
    "notes": "Отличная форма. Готова к продаже.",
    "last_watered": "2024-12-21",
    "last_fertilized": "2024-10-01",
    "image_url": "/uploads/plants/1.jpg",
    "created_at": "2024-01-01T10:00:00.000Z",
    "updated_at": "2024-12-21T10:00:00.000Z"
  }
]
```

### Фильтрация растений
```http
GET /plants?type=thuja&health=excellent&zone=Зона В
Authorization: Bearer <token>
```

### Создать растение
```http
POST /plants
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Ель голубая",
  "latin_name": "Picea pungens",
  "type": "spruce",
  "variety": "Hoopsii",
  "health": "good",
  "status": "growing",
  "zone": "Зона Б",
  "planted_date": "2021-05-20",
  "height": 145,
  "age": 6,
  "notes": "Активный рост",
  "last_watered": "2024-12-18",
  "last_fertilized": "2024-10-15"
}
```

### Обновить растение
```http
PUT /plants/1
Authorization: Bearer <token>
Content-Type: application/json

{
  "height": 185,
  "last_watered": "2024-12-22",
  "notes": "Обновлённые данные"
}
```

### Удалить растение
```http
DELETE /plants/1
Authorization: Bearer <token>
```

---

## 📦 Заказы

### Получить все заказы
```http
GET /orders
Authorization: Bearer <token>
```

**Ответ:**
```json
[
  {
    "id": 1,
    "customer_id": 1,
    "customer_name": "Иванов Алексей Петрович",
    "items": [
      {
        "id": 1,
        "plant_id": 1,
        "plant_name": "Туя западная Смарагд",
        "quantity": 10,
        "price": 800.00
      }
    ],
    "total_amount": 11000.00,
    "status": "delivered",
    "payment_status": "paid",
    "delivery_date": "2024-11-18",
    "notes": "Доставка до подъезда",
    "created_at": "2024-11-15T10:00:00.000Z",
    "updated_at": "2024-11-18T10:00:00.000Z"
  }
]
```

### Фильтрация заказов
```http
GET /orders?status=processing&payment_status=paid
Authorization: Bearer <token>
```

### Создать заказ
```http
POST /orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "customer_id": 1,
  "items": [
    {
      "plant_id": 1,
      "plant_name": "Туя западная Смарагд",
      "quantity": 10,
      "price": 800
    },
    {
      "plant_id": 3,
      "plant_name": "Можжевельник казацкий",
      "quantity": 5,
      "price": 600
    }
  ],
  "delivery_date": "2024-12-28",
  "notes": "Доставка до подъезда"
}
```

**Ответ:**
```json
{
  "id": 6,
  "customer_id": 1,
  "customer_name": "Иванов Алексей Петрович",
  "items": [
    {
      "id": 10,
      "order_id": 6,
      "plant_id": 1,
      "plant_name": "Туя западная Смарагд",
      "quantity": 10,
      "price": 800.00
    },
    {
      "id": 11,
      "order_id": 6,
      "plant_id": 3,
      "plant_name": "Можжевельник казацкий",
      "quantity": 5,
      "price": 600.00
    }
  ],
  "total_amount": 11000.00,
  "status": "new",
  "payment_status": "pending",
  "delivery_date": "2024-12-28",
  "notes": "Доставка до подъезда",
  "created_at": "2024-12-23T10:00:00.000Z",
  "updated_at": "2024-12-23T10:00:00.000Z"
}
```

### Обновить статус заказа
```http
PUT /orders/1/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "delivered",
  "payment_status": "paid"
}
```

---

## 💼 Сделки

### Получить все сделки
```http
GET /deals
Authorization: Bearer <token>
```

**Ответ:**
```json
[
  {
    "id": 1,
    "title": "Озеленение коттеджного посёлка",
    "customer_id": 1,
    "customer_name": "Иванов Алексей Петрович",
    "value": 250000.00,
    "stage": "proposal",
    "probability": 60,
    "expected_close_date": "2025-02-15",
    "notes": "Клиент заинтересован в комплексном озеленении",
    "created_at": "2024-12-10T10:00:00.000Z",
    "updated_at": "2024-12-10T10:00:00.000Z"
  }
]
```

### Фильтрация сделок
```http
GET /deals?stage=negotiation
Authorization: Bearer <token>
```

### Создать сделку
```http
POST /deals
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Новый проект озеленения",
  "customer_id": 2,
  "value": 150000,
  "stage": "lead",
  "probability": 20,
  "expected_close_date": "2025-03-01",
  "notes": "Первичный контакт"
}
```

### Обновить сделку
```http
PUT /deals/1
Authorization: Bearer <token>
Content-Type: application/json

{
  "stage": "negotiation",
  "probability": 80,
  "notes": "Переговоры идут успешно"
}
```

---

## 📊 Статистика

### Общая статистика
```http
GET /statistics/summary
Authorization: Bearer <token>
```

**Ответ:**
```json
{
  "total_customers": 5,
  "total_orders": 5,
  "total_revenue": 327900.00,
  "total_plants": 12,
  "active_deals": 3,
  "pipeline_value": 480000.00,
  "won_deals_value": 180000.00,
  "conversion_rate": 20
}
```

### Статистика по клиентам
```http
GET /statistics/customers
Authorization: Bearer <token>
```

**Ответ:**
```json
{
  "by_type": {
    "individual": 3,
    "business": 1,
    "designer": 1,
    "developer": 1
  },
  "by_source": {
    "Instagram": 1,
    "Сайт": 1,
    "Рекомендация": 1,
    "Авито": 1,
    "Тендер": 1
  },
  "top_customers": [
    {
      "id": 5,
      "name": "ЖК \"Сосновый бор\"",
      "total_spent": 1200000.00,
      "total_orders": 2
    }
  ]
}
```

### Статистика по растениям
```http
GET /statistics/plants
Authorization: Bearer <token>
```

**Ответ:**
```json
{
  "by_type": {
    "pine": 3,
    "spruce": 2,
    "fir": 1,
    "juniper": 2,
    "cypress": 1,
    "thuja": 1,
    "yew": 1,
    "larch": 1
  },
  "by_health": {
    "excellent": 4,
    "good": 6,
    "fair": 1,
    "poor": 1,
    "critical": 0
  },
  "by_zone": {
    "Зона А": 3,
    "Зона Б": 4,
    "Зона В": 2,
    "Зона Г": 2
  },
  "avg_height": 102,
  "avg_age": 4.8
}
```

---

## 📸 Загрузка файлов

### Загрузить изображение растения
```http
POST /upload/plant-image
Authorization: Bearer <token>
Content-Type: multipart/form-data

plant_id: 1
image: [файл]
```

**Ответ:**
```json
{
  "url": "/uploads/plants/1-1703329200000.jpg"
}
```

---

## 🔔 Уведомления (WebSocket)

### Подключение
```javascript
const ws = new WebSocket('ws://localhost:3001');

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Новое уведомление:', data);
};
```

### Типы уведомлений
```json
{
  "type": "new_order",
  "data": {
    "order_id": 6,
    "customer_name": "Петров Иван",
    "total_amount": 15000
  }
}
```

```json
{
  "type": "task_reminder",
  "data": {
    "task_id": 1,
    "plant_name": "Туя западная",
    "task_type": "watering",
    "due_date": "2024-12-24"
  }
}
```

---

## ❌ Коды ошибок

| Код | Описание |
|-----|----------|
| 400 | Неверный запрос |
| 401 | Не авторизован |
| 403 | Доступ запрещён |
| 404 | Ресурс не найден |
| 500 | Внутренняя ошибка сервера |

**Пример ошибки:**
```json
{
  "error": "Клиент не найден"
}
```

---

## 🧪 Тестирование с cURL

### Примеры запросов:

```bash
# Регистрация
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.ru","password":"123456","name":"Test"}'

# Вход
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.ru","password":"123456"}'

# Получить клиентов (с токеном)
curl -X GET http://localhost:3001/api/customers \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"

# Создать клиента
curl -X POST http://localhost:3001/api/customers \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Client","phone":"+79991234567","email":"test@mail.ru"}'
```

---

**Версия API:** 1.0  
**Последнее обновление:** Декабрь 2024
