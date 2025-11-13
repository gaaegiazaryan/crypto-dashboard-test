# Crypto Dashboard (Vue 3 + TS)

Небольшое SPA на Vue 3 для просмотра актуальных курсов криптовалют и их динамики.

## Стек

- Vue 3 + Composition API + TypeScript
- Pinia
- Vue Router
- Vite
- Chart.js + vue-chartjs
- Архитектура в стиле FSD: `app / pages / widgets / features / entities / shared`
- Coincap v3 API c авторизацией по Bearer-токену

## Настройка окружения

1. Надо скопировать из примера в енв файл, я там оставил апи кей, чтобы у вас сработало `.env.example` в `.env.local`:

```bash
cp .env.example .env.local
```

2. В `.env.local` Я оставил реальные ключи


## Запуск

```bash
npm install
npm run dev
```

## Архитектура

- `app` — инициализация приложения, глобальные стили, роутер.
- `pages` — страницы `Dashboard` и `AssetDetails`.
- `widgets` — крупные блоки: таблица активов, график цены, шапка.
- `features` — небольшие юниты: поиск, сортировка, переключение темы, избранное.
- `entities` — доменная сущность `asset` (типы, стор, форматирование).
- `shared` — UI-компоненты, http-клиент, утилиты, хуки.

Данные взял из Coincap API v3 (`/assets`, `/assets/{slug}`, `/assets/{slug}/history`), все запросы идут с Bearer-токеном из `VITE_API_KEY`.
