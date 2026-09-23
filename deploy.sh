#!/bin/bash

# Скрипт автоматического деплоя ПитомникПро
# Использование: ./deploy.sh

set -e  # Остановить при ошибке

echo "🚀 Начинаем деплой ПитомникПро..."

# Цвета для вывода
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Проверка наличия необходимых инструментов
check_requirements() {
    echo -e "${YELLOW}📋 Проверка требований...${NC}"
    
    if ! command -v node &> /dev/null; then
        echo -e "${RED}❌ Node.js не установлен${NC}"
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        echo -e "${RED}❌ npm не установлен${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}✅ Все требования выполнены${NC}"
}

# Сборка фронтенда
build_frontend() {
    echo -e "${YELLOW}🔨 Сборка фронтенда...${NC}"
    
    npm install
    npm run build
    
    echo -e "${GREEN}✅ Фронтенд собран${NC}"
}

# Деплой на Vercel
deploy_vercel() {
    echo -e "${YELLOW}🌐 Деплой на Vercel...${NC}"
    
    if ! command -v vercel &> /dev/null; then
        echo -e "${YELLOW}📦 Устанавливаем Vercel CLI...${NC}"
        npm install -g vercel
    fi
    
    vercel --prod
    
    echo -e "${GREEN}✅ Деплой на Vercel завершён${NC}"
}

# Деплой на Netlify
deploy_netlify() {
    echo -e "${YELLOW}🌐 Деплой на Netlify...${NC}"
    
    if ! command -v netlify &> /dev/null; then
        echo -e "${YELLOW}📦 Устанавливаем Netlify CLI...${NC}"
        npm install -g netlify-cli
    fi
    
    netlify deploy --prod --dir=dist
    
    echo -e "${GREEN}✅ Деплой на Netlify завершён${NC}"
}

# Деплой на собственный сервер
deploy_vps() {
    echo -e "${YELLOW}🖥️ Деплой на VPS...${NC}"
    
    if [ -z "$VPS_HOST" ] || [ -z "$VPS_USER" ]; then
        echo -e "${RED}❌ Установите переменные VPS_HOST и VPS_USER${NC}"
        echo "Пример: export VPS_HOST=your-server.com"
        echo "        export VPS_USER=root"
        exit 1
    fi
    
    echo "📤 Копирование файлов на сервер..."
    rsync -avz --delete dist/ ${VPS_USER}@${VPS_HOST}:/var/www/pitomnik-pro/dist/
    
    echo "🔄 Перезагрузка Nginx..."
    ssh ${VPS_USER}@${VPS_HOST} "sudo systemctl reload nginx"
    
    echo -e "${GREEN}✅ Деплой на VPS завершён${NC}"
}

# Главное меню
main() {
    check_requirements
    build_frontend
    
    echo ""
    echo "Выберите платформу для деплоя:"
    echo "1) Vercel (рекомендуется)"
    echo "2) Netlify"
    echo "3) Собственный VPS"
    echo "4) Выход"
    echo ""
    
    read -p "Введите номер (1-4): " choice
    
    case $choice in
        1)
            deploy_vercel
            ;;
        2)
            deploy_netlify
            ;;
        3)
            deploy_vps
            ;;
        4)
            echo "Выход..."
            exit 0
            ;;
        *)
            echo -e "${RED}❌ Неверный выбор${NC}"
            exit 1
            ;;
    esac
    
    echo ""
    echo -e "${GREEN}🎉 Деплой успешно завершён!${NC}"
    echo -e "${GREEN}📱 Ваше приложение доступно онлайн${NC}"
}

# Запуск
main
