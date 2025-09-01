# FIGMA INTEGRATION TODO

## Для следующей сессии после перезапуска WSL

### 1. Проверить работу Figma MCP
```bash
# В новой сессии Claude Code проверить доступность Figma MCP
# Должен быть доступен после перезапуска WSL
```

### 2. Извлечь из Figma дизайн-систему M&K

#### Цвета (уже есть базовые):
- Primary: #1c417a (синий из логотипа)
- Secondary: #e5202b (красный из логотипа)  
- Success: #38c448 (зеленый)
- Нужно найти дополнительные оттенки и градиенты

#### Типографика:
- Основной шрифт для заголовков
- Шрифт для основного текста
- Размеры и весá шрифтов
- Line heights и letter spacing

#### Компоненты UI:
- Стили кнопок (primary, secondary, outline)
- Радиусы скругления
- Тени (shadows)
- Градиенты для фонов
- Стили для карточек

#### Иконки:
- Набор иконок M&K
- Стиль и размеры иконок

### 3. Применить стили к лендингу

Обновить компоненты:
- Hero секция - применить градиенты и типографику
- Кнопки - использовать стили из Figma
- Карточки участников - применить тени и радиусы
- Footer - обновить под стиль M&K

### 4. Важные ссылки из Figma

Прототипы для референса (только для стилей!):
- https://www.figma.com/proto/S41cnQoS6gO95yVMGhKGaz/M-K?page-id=1%3A2&node-id=59-2&node-type=canvas&viewport=444%2C274%2C0.11&t=xWEY2AzF2Z823M1u-1&scaling=scale-down-width&content-scaling=fixed&starting-point-node-id=59%3A2
- https://www.figma.com/proto/S41cnQoS6gO95yVMGhKGaz/M-K?page-id=46%3A52&node-id=46-53&node-type=canvas&viewport=650%2C406%2C0.17&t=xWEY2AzF2Z823M1u-1&scaling=min-zoom&content-scaling=fixed

### 5. Команды для проверки

```bash
# Проверить список MCP серверов
claude mcp list

# Проверить работу Figma MCP
# Использовать Figma MCP tools для доступа к дизайну
```

### ПОМНИТЕ:
- Это НЕ полноценный сайт M&K
- Это простой лендинг для выставки "Частные школы за рубежом"
- Брать из Figma ТОЛЬКО стили, не структуру сайта