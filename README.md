```markdown
# Проект "Angular Firebase = Post"

Этот проект представляет собой простое веб-приложение, которое позволяет пользователям создавать посты с фотографиями и текстом.

## Описание

Приложение разработано на Angular и использует Firebase для хранения данных и хостинга. Пользователи могут создавать посты, загружая фотографии и добавляя к ним описание.

## Установка

1. Клонируйте репозиторий:

   ```bash
   git clone https://github.com/qozhyk/angular-firebase.git
   ```

2. Перейдите в папку проекта:

   ```bash
   cd angular-firebase
   ```

3. Установите зависимости:

   ```bash
   npm install
   ```

4. Настройте файл `environment.ts`:

   ```typescript
   export const environment = {
     production: false,
     firebase: {
       apiKey: 'YOUR_API_KEY',
       authDomain: 'YOUR_AUTH_DOMAIN',
       projectId: 'YOUR_PROJECT_ID',
       storageBucket: 'YOUR_STORAGE_BUCKET',
       messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
       appId: 'YOUR_APP_ID',
     },
   };
   ```

   Замените `YOUR_API_KEY`, `YOUR_AUTH_DOMAIN`, `YOUR_PROJECT_ID`, `YOUR_STORAGE_BUCKET`, `YOUR_MESSAGING_SENDER_ID`, `YOUR_APP_ID` на соответствующие значения из вашего проекта Firebase.

## Использование

1. Запустите приложение:

   ```bash
   ng serve
   ```

2. Откройте браузер и перейдите по адресу [http://localhost:4200/](http://localhost:4200/).

3. Зарегистрируйтесь или войдите в учетную запись.

4. Создайте новый пост, загрузив фотографию и добавив описание.

5. Наслаждайтесь использованием приложения!

## Лицензия

MIT

## Ссылки

- [Сайт проекта](https://kajikov.kz)
- [Электронная почта](mailto:qozhyk@gmail.com)
```

Замените `[ваш_аккаунт]`, `[название_репозитория]`, `YOUR_API_KEY`, `YOUR_AUTH_DOMAIN`, `YOUR_PROJECT_ID`, `YOUR_STORAGE_BUCKET`, `YOUR_MESSAGING_SENDER_ID`, `YOUR_APP_ID` на соответствующую информацию о вашем проекте и Firebase.
