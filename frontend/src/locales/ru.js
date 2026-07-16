export default {
  translation: {
    app: {
      name: 'Hexlet Chat',
    },
    validate: {
      min3max20: 'От 3 до 20 символов',
      min6: 'Не менее 6 символов',
      required: 'Обязательное поле',
      oneOf: 'Пароли должны совпадать',
      notOneOf: 'Должно быть уникальным',
    },
    errors: {
      userExists: 'Такой пользователь уже существует',
    },
    buttons: {
      enter: 'Войти',
      signUp: 'Регистрация',
      register: 'Зарегистрироваться',
      exit: 'Выйти',
      cancel: 'Отменить',
      send: 'Отправить',
      delete: 'Удалить',
      sending: 'Отправка...',
      deleting: 'Удаление...',
      management: 'Управление каналом',
      addChannel: 'Добавить канал',
    },
    loginPage: {
      title: 'Войти',
      form: {
        username: 'Ваш ник',
        password: 'Пароль',
        feedback: 'Неверные имя пользователя или пароль',
      },
      footer: {
        sentence: 'Нет аккаунта?',
        link: 'Регистрация',
      },
    },
    signUpPage: {
      title: 'Регистрация',
      form: {
        username: 'Ваш ник',
        password: 'Пароль',
        confirmPassword: 'Подтверждение пароля',
      },
      footer: {
        sentence: 'Уже есть аккаунт?',
        link: 'Войти',
      },
    },
    notFoundPage: {
      title: 'Страница не найдена',
      link: 'На главную',
    },
    spinner: {
      title: 'Загрузка...',
    },
    modal: {
      addChannel: {
        title: 'Добавить канал',
        name: 'Имя канала',
      },
      removeChannel: {
        title: 'Удалить канал',
        confirm: 'Вы уверены, что хотите удалить канал # {{name}}?',
      },
      renameChannel: {
        title: 'Переименовать канал',
        name: 'Имя канала',
      },
    },
    chat: {
      connection: {
        offline: 'Нет соединения. Сообщения не будут отправляться, пока сеть не восстановится.',
      },
      headerChannel: {
        title: 'Каналы',
      },
      headerMessage: {
        messageCount: {
          message_zero: '{{count}} сообщений',
          message_one: '{{count}} сообщение',
          message_few: '{{count}} сообщения',
          message_many: '{{count}} сообщений',
        },
      },
      channelList: {
        delete: 'Удалить',
        rename: 'Переименовать',
      },
      input: {
        label: 'Новое сообщение',
        placeholder: 'Введите сообщение...',
        offlinePlaceholder: 'Нет соединения...',
        submitError: 'Не удалось отправить сообщение. Проверьте подключение к сети.',
      },
    },
    toast: {
      createChannel: 'Канал создан',
      renameChannel: 'Канал переименован',
      deleteChannel: 'Канал удалён',
      errorNetwork: 'Ошибка соединения',
    },
  },
};
