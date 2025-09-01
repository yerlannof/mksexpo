const https = require('https');
const fs = require('fs');
const path = require('path');

const FIGMA_API_KEY = process.env.FIGMA_API_KEY || 'your-figma-api-key-here';
const FILE_KEY = 'S41cnQoS6gO95yVMGhKGaz';

// Список node-id из предоставленных ссылок
const NODE_IDS = [
  '1-2',
  '7-109',
  '141-10506',
  '141-13475',
  '141-4550',
  '46-96',
  '353-75866',
  '170-9862',
  '177-24686',
  '177-27643',
  '177-30600'
];

function fetchFigmaData(endpoint) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.figma.com',
      path: endpoint,
      method: 'GET',
      headers: {
        'X-Figma-Token': FIGMA_API_KEY
      }
    };

    https.get(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', reject);
  });
}

// Получить изображения для node
async function getNodeImages(nodeId) {
  try {
    const endpoint = `/v1/images/${FILE_KEY}?ids=${nodeId}&format=png&scale=2`;
    const data = await fetchFigmaData(endpoint);
    return data.images || {};
  } catch (error) {
    console.error(`Ошибка получения изображений для ${nodeId}:`, error.message);
    return {};
  }
}

// Найти node по ID
function findNodeById(node, targetId) {
  if (node.id === targetId) {
    return node;
  }
  
  if (node.children) {
    for (const child of node.children) {
      const found = findNodeById(child, targetId);
      if (found) return found;
    }
  }
  
  return null;
}

// Извлечь стили из node
function extractNodeStyles(node) {
  const styles = {
    name: node.name,
    type: node.type,
    width: node.absoluteBoundingBox?.width,
    height: node.absoluteBoundingBox?.height,
    backgroundColor: null,
    fills: [],
    strokes: [],
    effects: [],
    cornerRadius: node.cornerRadius || 0,
    opacity: node.opacity !== undefined ? node.opacity : 1
  };
  
  // Цвет фона
  if (node.backgroundColor) {
    const { r, g, b, a } = node.backgroundColor;
    styles.backgroundColor = `rgba(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)}, ${a})`;
  }
  
  // Заливки
  if (node.fills && Array.isArray(node.fills)) {
    styles.fills = node.fills.map(fill => {
      if (fill.type === 'SOLID' && fill.color) {
        const { r, g, b } = fill.color;
        return {
          type: 'SOLID',
          color: `#${Math.round(r * 255).toString(16).padStart(2, '0')}${Math.round(g * 255).toString(16).padStart(2, '0')}${Math.round(b * 255).toString(16).padStart(2, '0')}`,
          opacity: fill.opacity || 1
        };
      } else if (fill.type === 'GRADIENT_LINEAR') {
        return {
          type: 'GRADIENT_LINEAR',
          gradientStops: fill.gradientStops?.map(stop => ({
            color: `rgba(${Math.round(stop.color.r * 255)}, ${Math.round(stop.color.g * 255)}, ${Math.round(stop.color.b * 255)}, ${stop.color.a})`,
            position: stop.position
          }))
        };
      }
      return fill;
    });
  }
  
  // Обводки
  if (node.strokes && Array.isArray(node.strokes)) {
    styles.strokes = node.strokes.map(stroke => {
      if (stroke.type === 'SOLID' && stroke.color) {
        const { r, g, b } = stroke.color;
        return {
          type: 'SOLID',
          color: `#${Math.round(r * 255).toString(16).padStart(2, '0')}${Math.round(g * 255).toString(16).padStart(2, '0')}${Math.round(b * 255).toString(16).padStart(2, '0')}`,
          weight: node.strokeWeight || 1
        };
      }
      return stroke;
    });
  }
  
  // Эффекты (тени, размытие)
  if (node.effects && Array.isArray(node.effects)) {
    styles.effects = node.effects.map(effect => ({
      type: effect.type,
      radius: effect.radius,
      color: effect.color ? `rgba(${Math.round(effect.color.r * 255)}, ${Math.round(effect.color.g * 255)}, ${Math.round(effect.color.b * 255)}, ${effect.color.a})` : null,
      offset: effect.offset
    }));
  }
  
  return styles;
}

// Главная функция
async function extractFigmaPages() {
  try {
    console.log('Получаем данные из Figma...\n');
    
    // Получаем файл
    const fileData = await fetchFigmaData(`/v1/files/${FILE_KEY}`);
    
    if (fileData.err) {
      throw new Error(`Figma API error: ${fileData.err}`);
    }
    
    const pagesInfo = [];
    
    // Обрабатываем каждый node
    for (const nodeId of NODE_IDS) {
      console.log(`\nОбработка страницы ${nodeId}...`);
      
      const node = findNodeById(fileData.document, nodeId);
      
      if (node) {
        console.log(`✓ Найден: ${node.name}`);
        
        // Получаем изображение
        const images = await getNodeImages(nodeId);
        const imageUrl = images[nodeId];
        
        // Извлекаем стили
        const styles = extractNodeStyles(node);
        
        pagesInfo.push({
          nodeId,
          name: node.name,
          imageUrl,
          styles,
          children: node.children?.length || 0
        });
        
        // Скачиваем изображение если есть URL
        if (imageUrl) {
          console.log(`  Загружаем превью...`);
          // Здесь можно добавить код для скачивания изображения
        }
      } else {
        console.log(`✗ Не найден: ${nodeId}`);
      }
    }
    
    // Извлекаем общую цветовую палитру
    const allColors = new Set();
    
    function extractColors(node) {
      if (node.fills) {
        node.fills.forEach(fill => {
          if (fill.type === 'SOLID' && fill.color) {
            const { r, g, b } = fill.color;
            const hex = `#${Math.round(r * 255).toString(16).padStart(2, '0')}${Math.round(g * 255).toString(16).padStart(2, '0')}${Math.round(b * 255).toString(16).padStart(2, '0')}`;
            allColors.add(hex);
          }
        });
      }
      
      if (node.children) {
        node.children.forEach(child => extractColors(child));
      }
    }
    
    extractColors(fileData.document);
    
    // Сохраняем результаты
    const result = {
      fileName: fileData.name,
      lastModified: fileData.lastModified,
      pages: pagesInfo,
      colorPalette: Array.from(allColors).slice(0, 20),
      extractedAt: new Date().toISOString()
    };
    
    fs.writeFileSync(
      path.join(__dirname, '../figma-pages-analysis.json'),
      JSON.stringify(result, null, 2)
    );
    
    console.log('\n✅ Анализ завершен!');
    console.log(`\nЦветовая палитра (${allColors.size} цветов):`)
    Array.from(allColors).slice(0, 10).forEach(color => {
      console.log(`  ${color}`);
    });
    
    console.log('\nДанные сохранены в figma-pages-analysis.json');
    
  } catch (error) {
    console.error('Ошибка:', error.message);
  }
}

// Запуск
extractFigmaPages();