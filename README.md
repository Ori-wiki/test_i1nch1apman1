# INCHAPIN

Лендинг жилого комплекса INCHAPIN на `Next.js` с `App Router`.

## Что внутри

- Первый экран с крупной типографикой, анимацией заголовка и hero-изображением
- Блок о проекте с описанием, изображением и видео в полноэкранной модалке
- Адаптивная шапка с бургер-меню, контактами и селектором квартир
- Модальное окно с формой обратной связи
- Отдельная страница `privacy-policy`
- Кастомный скролл на десктопе и нативный скролл на мобильных

## Технологии

- `Next.js 16`
- `React 19`
- `TypeScript`
- `SCSS Modules`
- `framer-motion`
- `react-hook-form`
- `zod`
- `react-select`
- `smooth-scrollbar`

## Запуск проекта

Установка зависимостей:

```bash
npm install
```

Запуск в dev-режиме:

```bash
npm run dev
```

Приложение будет доступно по адресу:

```text
http://localhost:3000
```

## Команды

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Структура

- `app/` — страницы, layout и все UI-компоненты
- `app/components/` — шапка, hero, блок проекта, модалки, форма
- `public/images/` — основные изображения
- `public/logos/` — логотипы и графические символы
- `public/fonts/` — локальные шрифты Proxima Nova
- `public/videos/` — видео для блока проекта
- `public/favicons/` — favicon и manifest
