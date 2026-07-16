### Hexlet tests and linter status:
[![Actions Status](https://github.com/kirillchistov/fullstack-javascript-project-12/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/kirillchistov/fullstack-javascript-project-12/actions)


## Чат (Slack)
- Приложение - упрощенный аналог Slack-чата
- Технологии: Web Sockets, REST API, React Hooks, Redux и RTK, клиентский роутинг, авторизация и аутентификация, сборка (Vite) и деплой.
- [Пример проекта](https://frontend-chat-ru.hexlet.app/)
- Скрины:
![Chat Main Screen](https://ru.hexlet.io/rails/active_storage/blobs/proxy/eyJfcmFpbHMiOnsiZGF0YSI6NDMyNjQsInB1ciI6ImJsb2JfaWQifX0=--c2bb5fb42217c9d90ecb529f61933e5eb2f57c32/chat.png)
![Add Chat Popup](https://ru.hexlet.io/rails/active_storage/blobs/proxy/eyJfcmFpbHMiOnsiZGF0YSI6NDMyNjUsInB1ciI6ImJsb2JfaWQifX0=--352ab4c7ae00b10cf8cb613421ee5909c008079b/channel.png)

## Демо

[Задеплоенное приложение](https://fullstack-javascript-project-12-r75g.onrender.com)

## Установка

```bash
make install
```

## Запуск

```bash
make build
make start
```

Приложение доступно на [http://localhost:5001](http://localhost:5001).

## Разработка

```bash
make develop
```

Фронтенд — [http://localhost:5002](http://localhost:5002), API проксируется на сервер (порт 5001).

## Запуск с логами

```bash
DEBUG=chat-server:* make start
```

Пример для тестов:
```bash
curl http://localhost:5001/api/v1/channels
```

## Шаги и задачи

### Шаг 13
- []
### Шаг 12
- []
### Шаг 11
- []
### Шаг 10
- []
### Шаг 9
- []
### Шаг 8
- []
### Шаг 7
- []
### Шаг 6
- []
### Шаг 5
- []
### Шаг 4
- []
### Шаг 3
- [] Настроить роутинг для двух путей: / и /login.
- [] Сделать страницу 404 (not found), на которую будут перенаправляться пользователи в случае, если указанного роута нет.
- [] На странице /login создать форму авторизации, состоящую из полей для ввода имени пользователя и пароля, а также кнопки отправки формы. Для создания формы использовть библиотеку [Formik](https://formik.org/). Отправку формы реализовывать на этом этапе не нужно.
### Шаг 2
- [x] Склонировать созданный репозиторий локально и инициализировать с именем @hexlet/code.
- [x] Создать реакт-приложение с помощью npm create vite@latest frontend -- --template react
- [x] Установить сервер в проект командой npm i @hexlet/chat-server. Сервер должен быть добавлен в зависимости проекта
- [x] Изучить документацию сервера, найти в ней команду запуска сервера и запустить. Проверить что сервер работает: curl http://localhost:5001/api/v1/channels
- [x] Настроить проксирование запросов фронтенд-приложения на сервер, указав proxy в vite.config.js (см [пример настроенного приложения](https://github.com/hexlet-components/js-react-hexlet-chat).
- [x] Проверить, что фронтенд-приложение собирается по команде npm run build, настроить запуск через команду make build. - [x] Настроить запуск сервера по команде make start. Передать в параметрах путь к директории собранного фронтенд-приложения. Пример команды для запуска: npx start-server -s ./frontend/dist
- [x] Зарегистрировать аккаунт на Render. Задеплоить проект. Ориентир - [пример настроенного приложения](https://github.com/hexlet-components/js-react-hexlet-chat)
- [x] Добавить в README.md проекта [ссылку на задеплоенное приложение](https://fullstack-javascript-project-12-r75g.onrender.com)

### Шаг 1
- [x] Подключиться к GitHub и [создать репозиторий](https://github.com/kirillchistov/fullstack-javascript-project-12)
- [x] Посмотреть описание и [пример проекта](https://frontend-chat-ru.hexlet.app/)
- [x] Подготовить рабочее окружение к разработке
