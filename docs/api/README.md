# api

Описание и спецификации REST API оркестратора.

## Основные эндпоинты

### Аутентификация
- `POST /api/auth/register` – регистрация (email, password, имя)
- `POST /api/auth/login` – логин, возвращает JWT

### Пользователи
- `GET /api/users/me` – профиль текущего пользователя
- `PUT /api/users` – обновление профиля
- `GET /api/users` – список всех пользователей (admin)

### Каталог сервисов
- `GET /api/services` – публичный список сервисов
- `POST /api/services` – создать сервис (admin)
- `PUT /api/services/:id` – обновить сервис (admin)
- `DELETE /api/services/:id` – удалить сервис (admin)

### Тарифы
- `GET /api/services/:serviceId/plans` – список тарифов сервиса
- `POST /api/services/:serviceId/plans` – создать тариф (admin)
- `PUT /api/services/:serviceId/plans/:id` – обновить тариф (admin)
- `DELETE /api/services/:serviceId/plans/:id` – удалить тариф (admin)

### Подписки
- `GET /api/subscriptions` – подписки текущего пользователя
- `POST /api/subscriptions` – создать подписку
- `POST /api/subscriptions/:id/cancel` – отменить подписку
- `GET /api/subscriptions/all` – все подписки (admin)

### Тенанты
- `GET /api/tenants` – тенанты пользователя
- `GET /api/tenants/all` – все тенанты (admin)

### Платежи
- `GET /api/payments` – платежи пользователя
- `GET /api/payments/all` – все платежи (admin)

## Структура

Каталог может содержать OpenAPI/Swagger-спецификации, примеры запросов и
ответов.

## Назначение

Этот раздел служит для разработчиков и API-интеграторов, чтобы понять, как
взаимодействовать с оркестратором на уровне HTTP.
