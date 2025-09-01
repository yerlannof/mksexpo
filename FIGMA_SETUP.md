# Figma MCP Server Setup Guide

## Для доступа к Figma дизайну через Claude

### Вариант 1: Официальный Figma Developer MCP (Рекомендуется)

1. **Получите Figma API ключ:**
   - Войдите в Figma
   - Перейдите в Settings → Account → Personal access tokens
   - Создайте новый токен

2. **Установите MCP сервер через Claude CLI:**
   ```bash
   claude mcp add-json figma-dev '{"command": "npx", "args": ["figma-developer-mcp"], "env": {"FIGMA_API_KEY": "YOUR_FIGMA_API_KEY"}}'
   ```

3. **Использование:**
   - Поделитесь ссылкой на Figma файл
   - Claude сможет получить доступ к:
     - Стилям (цвета, шрифты, тени)
     - Размерам и отступам
     - Структуре компонентов
     - Экспортированным ассетам

### Вариант 2: Альтернативный MCP сервер

```bash
# GLips/Figma-Context-MCP
claude mcp add-json figma-context '{"command": "npx", "args": ["@glips/figma-context-mcp"], "env": {"FIGMA_ACCESS_TOKEN": "YOUR_TOKEN"}}'
```

### Вариант 3: Прямой доступ через Figma API

Для прямого доступа без MCP:
1. Используйте Figma REST API
2. Endpoint: `https://api.figma.com/v1/files/{file_key}`
3. Headers: `X-Figma-Token: YOUR_TOKEN`

## Текущий дизайн

Ссылка на макет: https://www.figma.com/design/S41cnQoS6gO95yVMGhKGaz/M-K?node-id=0-1&p=f&t=qES6O7UzVJYjdm0Q-0

### Ключевые элементы дизайна M&K:
- **Основной цвет**: #2563EB (синий)
- **Вторичный цвет**: #F59E0B (оранжевый)
- **Шрифты**: Inter (основной), Montserrat (заголовки)
- **Радиусы**: 12-16px для карточек
- **Тени**: Мягкие тени с blur 20-40px

## Примечание
Для полноценной интеграции необходим Figma API ключ от владельца дизайна.