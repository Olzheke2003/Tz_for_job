# Используем официальный образ Python
FROM python:3.9-slim

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файл зависимостей
COPY backend/requirements.txt .

# Устанавливаем зависимости
RUN pip install --no-cache-dir -r requirements.txt

# Копируем весь исходный код в контейнер
COPY backend/ .

# Открываем порт 8000 для Django
EXPOSE 8000

# Выполняем миграции и запускаем сервер
CMD ["python", "manage.py", "migrate"]
