#!/bin/bash

# descriptions for specific directories
declare -A desc

desc["./docs/architecture"]="Архитектурная документация и диаграммы, объясняющие структуру системы."
desc["./docs/api"]="Описание и спецификации REST API оркестратора."
desc["./server/pkg"]="Публичные библиотеки/утилиты, используемые внутри сервера и другими модулями."
desc["./server/prisma"]="Файлы схемы и конфигурации для Prisma ORM."
desc["./server/scripts"]="Утилиты и вспомогательные скрипты для сервера (миграции, бэкапы и т.п.)."
desc["./server/migrations"]="SQL‑миграции для инициализации и обновления базы данных."
desc["./server/cmd"]="Точка входа(и) для разных приложений/сервисов сервера."
desc["./server/internal"]="Приватные пакеты сервера (auth, billing, tenant и т.д.)."
desc["./server/config"]="Конфигурация приложения и загрузка переменных окружения."
desc["./server/src"]="Исходный код TypeScript/JavaScript сервера."
desc["./client/tests"]="Тесты фронтенда (unit, интеграционные)."
desc["./client/public"]="Публичные статические ресурсы, сервируемые напрямую."
desc["./client/src"]="Исходный код клиентской части."
desc["./client/src/components"]="Повторно используемые UI‑компоненты."
desc["./client/src/styles"]="Глобальные и модульные стили."
desc["./client/src/store"]="Состояние приложения (Redux, Context и т.п.)."
desc["./client/src/hooks"]="Кастомные React‑хуки и утилиты."
desc["./client/src/services"]="Клиентские API‑обёртки и бизнес‑логика."
desc["./client/src/pages"]="Страницы пользовательского интерфейса."
desc["./tests/server"]="Автоматизированные тесты для серверной части."
desc["./tests/client"]="Тесты для клиентской части."
desc["./tests/services"]="Тесты для отдельных микросервисов или внешних сервисов."
desc["./infra/k8s"]="Конфигурации Kubernetes (манифесты, Helm и т.п.)."
desc["./infra/ci"]="CI/CD конфигурации (GitHub Actions, скрипты и т.д.)."
desc["./infra/ansible"]="playbooks и роли Ansible для деплоя."
desc["./infra/terraform"]="Terraform-конфигурации для инфраструктуры."
desc["./services/crm"]="Исходный код или образ CRM‑сервиса."
desc["./services/ai-tool"]="Плагин/модуль AI‑инструмента для маркетплейса."
desc["./services/kanban-board"]="Код примера сервиса - канбан‑доска."
desc["./shared/constants"]="Общие константы, используемые по всему проекту."
desc["./shared/models"]="Интерфейсы и типы данных, разделяемые клиентом и сервером."
desc["./shared/utils"]="Утилиты и вспомогательные функции общего назначения."

# iterate directories and create README if missing
find . -type d -not -path './.git*' -not -path '*/node_modules*' | while read d; do
  if [ ! -f "$d/README.md" ]; then
    description=${desc[$d]:-"Общий каталог проекта: $d. Добавьте сюда описание содержимого и назначение."}
    cat <<EOF > "$d/README.md"
# $(basename "$d")

$description

## Структура

*(перечислите основные файлы/подкаталоги и их назначение)*

## Назначение

*(краткая инструкция, зачем нужен этот каталог и как с ним работать)*
EOF
  fi
done
