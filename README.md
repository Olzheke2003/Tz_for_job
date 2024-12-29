# React + Django Full Stack Application

## Описание проекта

Этот проект представляет собой полностековое веб-приложение, построенное на **React** (Frontend) и **Django** (Backend). Оно предназначено для обработки данных, взаимодействия с пользователем и предоставления удобного интерфейса, а также мощного серверного функционала.

## 🚀 Запуск проекта с Docker

Для того чтобы запустить проект с использованием Docker, выполните следующую команду:
```bash
docker-compose up --build
```

---

## 🛠 Технологии и инструменты

### **Frontend (React)**

- **React.js**: Библиотека для создания пользовательских интерфейсов.
- **Axios**: Для выполнения HTTP-запросов.
- **React Router**: Для маршрутизации в приложении.
- **JS-Cookie**: Для работы с токенами и авторизацией.
- **CSS/SCSS**: Для стилизации компонентов.

### **Backend (Django)**

- **Django**: Веб-фреймворк для создания серверной части приложения.
- **Django REST Framework (DRF)**: Для создания RESTful API.
- **SQLite**: База данных по умолчанию (можно заменить на PostgreSQL/MySQL).
- **JWT**: Для аутентификации и авторизации.
- **Django ORM**: Для работы с базой данных.

---

## 📋 Функционал

### **Frontend**

- Авторизация и регистрация пользователей.
- Отправка запросов на сервер через REST API.
- Маршрутизация страниц (например, страницы тестов, результатов и авторизации).
- Интерактивный пользовательский интерфейс.

### **Backend**

- Аутентификация пользователей с использованием JWT.
- Обработка данных тестов (вопросы, ответы, подсчёт результатов).
- REST API для обмена данными с клиентом.
- Работа с базой данных для хранения информации о тестах и результатах.

---

## 🚀 Как запустить проект

### **Frontend:**

1. Установка зависимостей:
    ```
    cd frontend
    npm install
    ```

2. Запуск разработки:
    ```
    npm start
    ```

3. Сборка для продакшена:
    ```
    npm run build
    ```

### **Backend:**

1. Установка зависимостей:
    ```
    cd backend
    pip install -r requirements.txt
    ```

2. Применение миграций:
    ```
    python manage.py migrate
    ```

3. Создание суперпользователя:
    ```
    python manage.py createsuperuser
    ```

4. Запуск разработки:
    ```bash
    python manage.py runserver
    ```

---

## 🛠 Настройка окружения

### **Backend (.env)**

Создайте файл `.env` в папке **backend** с параметрами:
