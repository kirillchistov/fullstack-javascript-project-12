# Backlog: развитие Hexlet Chat → Slack

Документ описывает предложения по развитию проекта после прохождения учебного ТЗ.  
Источник идей: [middle.messenger.praktikum.yandex](/Users/kirillchistov/Projects/FullStackDev/ReactJS/middle.messenger.praktikum.yandex) — более зрелый мессенджер на TypeScript с богатым UI и дополнительными сценариями.

---

## Текущее состояние Hexlet Chat

| Область | Реализовано |
|---------|-------------|
| Auth | Логин, регистрация, JWT в localStorage, PrivateRoute |
| Каналы | Список, переключение, создание / переименование / удаление (modals) |
| Сообщения | REST POST + Socket.IO `newMessage`, простой список `username: body` |
| UX | i18n (ru), toasts, баннер офлайна, фильтр нецензурных слов |
| Инфра | Vite, Redux Toolkit, RTK Query, Rollbar, Render deploy |

**Главный разрыв со Slack:** плоский UI, нет профилей, вложений, поиска, участников канала, богатой ленты сообщений и «рабочего пространства».

---

## Эталон для заимствования (YP Messenger)

| YP-файл / модуль | Что можно перенять |
|------------------|-------------------|
| `partials/chat-sidebar.hbs` | Поиск по списку, inline-создание чата, структура sidebar |
| `components/chat-list/chat-item.hbs` | Превью последнего сообщения, время, unread badge |
| `partials/chat-header.hbs` | Шапка канала с аватаром, подзаголовком, overflow-меню (⋮) |
| `components/message-list/message-item.hbs` | Пузыри сообщений, время, incoming/outgoing |
| `partials/chat-input.hbs` | Textarea с auto-grow, меню вложений (📎) |
| `api/files-api.ts`, `api/users-search-api.ts` | Загрузка файлов, поиск пользователей |
| `api/chat-socket.ts` | Ping/reconnect (адаптировать под Socket.IO) |
| `pages/profile/*` | Просмотр / редактирование профиля, аватар, смена пароля |
| `utils/formValidation.ts` | Единые правила валидации форм |
| `styles/chat.pcss`, `themes/*` | Design tokens, светлая/тёмная тема |

> **Важно:** YP-проект — vanilla TS + Handlebars, не React. Переносить нужно **UX-паттерны и бизнес-логику**, а не DOM-манипуляции из `ChatsPage.ts`. В Hexlet всё остаётся в React + Redux.

---

## Приоритеты

- **P1** — заметно приближает к Slack, реализуемо на текущем `@hexlet/chat-server`
- **P2** — сильный UX-эффект, может потребовать доработки API или форка сервера
- **P3** — «настоящий Slack», долгий горизонт

---

## P1 — UI и лента сообщений

### 1.1. Богатые сообщения (message bubbles)

**Slack:** сообщения с автором, временем, выравниванием «свои / чужие».

**Сейчас:** `MessageList.jsx` — одна строка `username: body`.

**Предложение:**
- Компонент `MessageItem` с аватаром (инициалы), именем, timestamp, bubble
- Классы `message--own` / `message--other` по сравнению `message.username` с текущим пользователем
- Группировка подряд идущих сообщений одного автора (как в Slack)

**Заимствовать из YP:** `components/message-list/message-item.hbs`, стили из `styles/chat.pcss`.

**Файлы Hexlet:** `MessageList.jsx` → `MessageItem.jsx`, `index.css`.

**Оценка:** S–M

---

### 1.2. Улучшенный sidebar каналов

**Slack:** слева — каналы с превью активности, поиск, явное создание.

**Сейчас:** `ChannelList.jsx` — только `# name`, `ChannelHeader` — кнопка `+`.

**Предложение:**
- Строка поиска над списком (client-side filter по имени канала)
- В элементе канала: превью последнего сообщения + время (данные из `messagesApi`, агрегация в selector или `uiSlice`)
- Badge непрочитанных (если сервер начнёт отдавать счётчик — иначе локальный счётчик «новых с момента последнего визита»)

**Заимствовать из YP:** `partials/chat-sidebar.hbs`, `components/chat-list/chat-item.hbs`.

**Файлы Hexlet:** `ChannelHeader.jsx`, `ChannelList.jsx`, новый `ChannelListItem.jsx`, selector в `store/`.

**Оценка:** M

---

### 1.3. Шапка активного канала

**Slack:** название канала, описание, кнопка «Участники», меню действий.

**Сейчас:** `MessageHeader.jsx` — имя канала и счётчик сообщений.

**Предложение:**
- Расширить `MessageHeader`: иконка/аватар канала, подзаголовок (описание — статичное или из API)
- Overflow-меню `⋮`: «Добавить участника», «Покинуть канал», «Удалить канал» (для removable)
- Ссылка на профиль текущего пользователя в правой части шапки

**Заимствовать из YP:** `partials/chat-header.hbs`.

**Файлы Hexlet:** `MessageHeader.jsx`, новые modals.

**Оценка:** M

---

### 1.4. Поле ввода уровня Slack

**Slack:** многострочный ввод, Shift+Enter — новая строка, Enter — отправка, кнопка вложений.

**Сейчас:** `MessageInput.jsx` — однострочный `Form.Control`.

**Предложение:**
- Заменить на `<textarea>` с auto-resize
- Enter отправляет, Shift+Enter — перенос строки
- Кнопка 📎 с dropdown (пока disabled или «скоро» — подготовить UI)

**Заимствовать из YP:** `partials/chat-input.hbs`.

**Файлы Hexlet:** `MessageInput.jsx`.

**Оценка:** S

---

### 1.5. Design system и темы

**Slack:** единая палитра, тёмная тема, аккуратные отступы.

**Сейчас:** Bootstrap «из коробки».

**Предложение:**
- CSS-переменные (`--color-accent`, `--sidebar-bg`, `--message-own-bg`) в `index.css`
- Toggle светлая / тёмная тема в `Layout.jsx` (localStorage + `data-theme` на `<html>`)
- Убрать «bootstrap-look» у sidebar и message bubbles

**Заимствовать из YP:** `styles/variables.pcss`, `styles/themes/light.pcss`, `themes/dark.pcss`.

**Оценка:** M

---

## P1 — Пользователи и профиль

### 1.6. Страницы профиля

**Slack:** профиль пользователя, аватар, статус.

**Сейчас:** только username в navbar и «Выйти».

**Предложение:**
- `/profile` — просмотр (имя, email если есть в API)
- `/profile/edit` — редактирование display name
- `/profile/password` — смена пароля
- Клик по username в `Layout` → переход в профиль

**Заимствовать из YP:** `pages/profile/ProfileViewPage.ts`, `ProfileEditPage.ts`, `ProfilePasswordPage.ts`, `utils/formValidation.ts`.

**Зависимость:** нужны эндпоинты на сервере (`PATCH /users/me`, `PATCH /users/password`). Если `@hexlet/chat-server` не поддерживает — форк сервера или mock-слой.

**Оценка:** M–L

---

### 1.7. Аватары (инициалы → картинки)

**Slack:** аватар у пользователя и канала.

**Предложение:**
- Компонент `Avatar` — круг с инициалами или `<img>`
- Цвет фона по hash от username
- Позже: upload через `FormData` (как `ProfileAvatarPage` / `FilesAPI` в YP)

**Заимствовать из YP:** `pages/profile/ProfileAvatarPage.ts`, `api/files-api.ts`.

**Оценка:** S (инициалы) / L (upload)

---

## P2 — Каналы и участники

### 2.1. Управление участниками канала

**Slack:** добавить в канал, кикнуть, список участников.

**Сейчас:** каналы общие, без membership UI.

**Предложение:**
- Modal «Участники канала» — список + кнопка удалить
- Modal «Добавить участника» — поиск по username (`UsersSearchAPI` в YP)
- RTK Query: `usersApi` с `searchUsers`, `channelMembersApi`

**Заимствовать из YP:** `api/users-search-api.ts`, `ChatsPage` handlers `add-user` / `remove-user`, modals в `chat-header`.

**Зависимость:** API membership в `@hexlet/chat-server` (скорее всего отсутствует — основной блокер).

**Оценка:** L

---

### 2.2. Типы каналов: public / private

**Slack:** `#general` (открытый) vs приватные каналы с замком.

**Предложение:**
- При создании канала — checkbox «Приватный»
- Иконка 🔒 в списке
- Разделение списка: «Каналы» / «Личные сообщения»

**Оценка:** L (нужен backend)

---

### 2.3. Direct Messages (1:1)

**Slack:** личные сообщения между двумя пользователями.

**Предложение:**
- Sidebar-секция «Личные сообщения»
- Создание DM через поиск пользователя
- Канал-DM = special type в store

**Заимствовать из YP:** логика group chat как база, но UI секции DM.

**Оценка:** L

---

### 2.4. Inline-создание канала (без modal)

**Slack:** быстрое создание через sidebar, не отдельное тяжёлое окно.

**Сейчас:** modal `AddChannel.jsx`.

**Предложение:**
- Раскрывающаяся панель под кнопкой «+» (как `#create-chat-panel` в YP)
- Modal оставить для rename/remove

**Заимствовать из YP:** `partials/chat-sidebar.hbs` (create panel).

**Оценка:** S

---

## P2 — Сообщения и real-time

### 2.5. Вложения (файлы и изображения)

**Slack:** картинки inline, файлы со ссылкой на скачивание.

**Предложение:**
- `filesApi.upload(file)` → URL
- Отправка сообщения с `type: 'file'` / `attachmentUrl`
- Рендер: `<img>` для image/*, ссылка для остального

**Заимствовать из YP:** `api/files-api.ts`, attach menu в `chat-input.hbs`, рендер file-сообщений в `ChatsPage.ts`.

**Зависимость:** storage + API на сервере.

**Оценка:** L

---

### 2.6. История сообщений и пагинация

**Slack:** scroll up → подгрузка старых сообщений.

**Сейчас:** все сообщения загружаются одним запросом.

**Предложение:**
- `getMessages` с cursor / offset
- Infinite scroll в `MessageList` (`IntersectionObserver` на верх списка)
- Индикатор «Загрузка истории…»

**Заимствовать из YP:** WebSocket `{ type: 'get old' }` — аналог на REST.

**Оценка:** M

---

### 2.7. Надёжность соединения

**Slack:** reconnect, индикатор «Connecting…».

**Сейчас:** `ConnectionBanner` + toast при disconnect.

**Предложение:**
- Socket.IO reconnect events → статусы `connecting` | `online` | `offline`
- Баннер с тремя состояниями
- Очередь неотправленных сообщений при offline (retry on reconnect)

**Заимствовать из YP:** ping + auto-reconnect в `api/chat-socket.ts` (адаптировать под socket.io-client).

**Оценка:** M

---

### 2.8. Редактирование и удаление сообщений

**Slack:** hover → «⋯» → Edit / Delete.

**Предложение:**
- Контекстное меню на своих сообщениях
- `PATCH /messages/:id`, `DELETE /messages/:id`
- Socket events `updateMessage`, `removeMessage` в `init.jsx`

**Оценка:** M–L

---

## P3 — «Настоящий Slack»

### 3.1. Threads (треды)

Ответы в отдельной панели справа. Требует модели `parentMessageId` и UI split-view.

**Оценка:** XL

---

### 3.2. Reactions (emoji)

`message.reactions: { '👍': ['user1', 'user2'] }`, picker при hover.

**Оценка:** L

---

### 3.3. Typing indicators

Socket event `userTyping` → «ivan печатает…» под шапкой канала.

**Оценка:** M

---

### 3.4. Mentions (@user)

Autocomplete при вводе `@`, подсветка в тексте, уведомление адресату.

**Оценка:** L

---

### 3.5. Поиск по сообщениям

Глобальный поиск `Ctrl+K` / строка в header. Индекс на клиенте или server-side search.

**Оценка:** L

---

### 3.6. Presence (online / away)

Зелёная точка у username, статус «В сети» / «Отошёл».

**Оценка:** L

---

### 3.7. Workspace / multi-team

Переключатель workspace, разные наборы каналов. Далеко от текущей архитектуры.

**Оценка:** XL

---

## P2 — Технический долг и качество

### 4.1. Миграция на TypeScript

YP-проект полностью на TS с typed API и DTO. Постепенный переход:

1. `tsconfig.json` + переименование `utils/` → `.ts`
2. Типы для `Channel`, `Message`, `User` (из YP `types/response-data.ts`)
3. RTK Query endpoints с generics
4. Компоненты `.tsx`

**Оценка:** L (incremental)

---

### 4.2. Тесты

| Уровень | Что добавить |
|---------|-------------|
| Unit | `signupValidation`, `channelValidation`, selectors |
| Component | React Testing Library для Login, AddChannel |
| E2E | Playwright локально (те же сценарии, что Hexlet CI) |

**Заимствовать из YP:** подход Vitest + Sinon для utils/API-слоя.

**Оценка:** M

---

### 4.3. Структура папок (feature-based)

```
frontend/src/
├── features/
│   ├── auth/
│   ├── channels/
│   ├── messages/
│   └── profile/
├── shared/
│   ├── ui/          # Avatar, Button, Modal
│   └── api/         # baseQuery, types
└── app/             # init, routes, store
```

**Оценка:** M (рефакторинг без смены поведения)

---

### 4.4. Удалить dev-only код

- `TestRollbar.jsx` — убрать из production-сборки или удалить после проверки Rollbar
- `TestRollbar` import в `HomePage.jsx` (если ещё есть)

**Оценка:** XS

---

## Рекомендуемый порядок (roadmap)

```
Q1  UI foundation
    ├── 1.1 Message bubbles
    ├── 1.4 Textarea input
    ├── 1.5 CSS variables + dark theme
    └── 4.4 Cleanup TestRollbar

Q2  Sidebar & header
    ├── 1.2 Rich channel list + search
    ├── 1.3 Channel header + overflow menu
    └── 2.4 Inline channel creation

Q3  Users
    ├── 1.7 Avatar (initials)
    └── 1.6 Profile pages (если есть API)

Q4  Real-time & content
    ├── 2.7 Connection resilience
    ├── 2.6 Message pagination
    └── 2.5 File attachments (если есть API)

Q5  Slack-grade (optional)
    ├── 2.1 Channel members
    ├── 3.3 Typing indicators
    ├── 3.2 Reactions
    └── 4.1 TypeScript migration
```

---

## Быстрые победы (можно сделать за 1–2 вечера)

1. **Message bubbles** — самый заметный визуальный апгрейд
2. **Textarea + Shift+Enter** — сразу ощущается «как Slack»
3. **Поиск по каналам** — client-side filter, 30 строк кода
4. **Avatar с инициалами** — переиспользуемый компонент
5. **CSS variables + dark theme** — переключатель в navbar

---

## Ограничения `@hexlet/chat-server`

Перед реализацией P2/P3 стоит сверить [документацию сервера](https://github.com/hexlet-components/chat-server) с wishlist:

| Фича | Вероятная поддержка |
|------|---------------------|
| CRUD каналов / сообщений | ✅ есть |
| WebSocket events | ✅ есть |
| Профиль пользователя | ❓ проверить |
| Upload файлов | ❓ скорее нет |
| Membership каналов | ❓ скорее нет |
| Unread counts | ❓ скорее нет |
| Edit/delete messages | ❓ проверить |

Если API не хватает — либо **форк `@hexlet/chat-server`**, либо **отдельный backend-сервис** (как `/server` в YP-проекте на Express + SQLite).

---

## Связанные проекты

- **Hexlet Chat (текущий):** React + Redux + Socket.IO + Bootstrap
- **YP Messenger:** TypeScript + Handlebars + native WebSocket + богатый UI
- **Hexlet demo:** [frontend-chat-ru.hexlet.app](https://frontend-chat-ru.hexlet.app/) — ориентир по UX для учебного проекта
