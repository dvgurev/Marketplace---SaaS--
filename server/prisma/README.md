# prisma

Каталог содержит схему и настройки Prisma ORM, используемые для доступа к базе данных.

## Структура

- `schema.prisma` — основная схема данных (Models, datasource, generator).
- `migrations/` — SQL‑миграции, поддерживаемые вручную (есть `001_initial.sql`).

## Назначение

При разработке/деплое запускайте команды:

```bash
npx prisma generate        # сгенерировать клиент
npx prisma migrate dev     # применить миграции к dev-базе
npx prisma migrate deploy  # применить на боевой БД
```

Схема хранит все ранее описанные модели (User, Service, Subscription и т.д.).
