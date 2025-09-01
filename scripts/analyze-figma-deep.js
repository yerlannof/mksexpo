const https = require('https');
const fs = require('fs');

const FIGMA_API_KEY = process.env.FIGMA_API_KEY || 'your-figma-api-key-here';
const FILE_KEY = 'S41cnQoS6gO95yVMGhKGaz';

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

// Анализ структуры компонентов
function analyzeComponents(node, depth = 0) {
  const indent = '  '.repeat(depth);
  const components = [];
  
  if (node.type === 'COMPONENT' || node.type === 'FRAME') {
    const info = {
      name: node.name,
      type: node.type,
      width: node.absoluteBoundingBox?.width,
      height: node.absoluteBoundingBox?.height,
      backgroundColor: null,
      hasGradient: false
    };
    
    // Проверяем фон
    if (node.backgroundColor) {
      const { r, g, b } = node.backgroundColor;
      info.backgroundColor = `#${Math.round(r * 255).toString(16).padStart(2, '0')}${Math.round(g * 255).toString(16).padStart(2, '0')}${Math.round(b * 255).toString(16).padStart(2, '0')}`;
    }
    
    // Проверяем градиенты
    if (node.fills) {
      node.fills.forEach(fill => {
        if (fill.type === 'GRADIENT_LINEAR' || fill.type === 'GRADIENT_RADIAL') {
          info.hasGradient = true;
        }
      });
    }
    
    components.push(info);
    console.log(`${indent}${node.type}: ${node.name} (${Math.round(node.absoluteBoundingBox?.width || 0)}x${Math.round(node.absoluteBoundingBox?.height || 0)})`);
  }
  
  if (node.children) {
    node.children.forEach(child => {
      components.push(...analyzeComponents(child, depth + 1));
    });
  }
  
  return components;
}

// Извлечение эффектов (тени, blur)
function extractEffects(node) {
  const effects = [];
  
  if (node.effects) {
    node.effects.forEach(effect => {
      if (effect.visible !== false) {
        effects.push({
          type: effect.type,
          radius: effect.radius,
          color: effect.color,
          offset: effect.offset,
          spread: effect.spread
        });
      }
    });
  }
  
  if (node.children) {
    node.children.forEach(child => {
      effects.push(...extractEffects(child));
    });
  }
  
  return effects;
}

// Поиск страниц и основных секций
function findMainSections(document) {
  const sections = [];
  
  document.children.forEach(page => {
    console.log(`\nСтраница: ${page.name}`);
    
    page.children.forEach(frame => {
      if (frame.type === 'FRAME' && frame.name.toLowerCase().includes('desktop')) {
        console.log(`  Десктоп версия найдена: ${frame.name}`);
        
        // Ищем основные секции
        frame.children.forEach(section => {
          if (section.type === 'FRAME' || section.type === 'GROUP') {
            sections.push({
              name: section.name,
              type: section.type,
              width: section.absoluteBoundingBox?.width,
              height: section.absoluteBoundingBox?.height
            });
          }
        });
      }
    });
  });
  
  return sections;
}

async function analyzeFigmaDesign() {
  try {
    console.log('Получаем детальную информацию из Figma...\n');
    
    const fileData = await fetchFigmaData(`/v1/files/${FILE_KEY}`);
    
    if (fileData.err) {
      throw new Error(`Figma API error: ${fileData.err}`);
    }
    
    // Анализируем структуру
    console.log('=== СТРУКТУРА ДОКУМЕНТА ===');
    const mainSections = findMainSections(fileData.document);
    
    console.log('\n=== ОСНОВНЫЕ СЕКЦИИ ===');
    mainSections.forEach(section => {
      console.log(`- ${section.name} (${Math.round(section.width)}x${Math.round(section.height)}px)`);
    });
    
    // Анализируем компоненты
    console.log('\n=== АНАЛИЗ КОМПОНЕНТОВ ===');
    const components = analyzeComponents(fileData.document);
    
    // Извлекаем эффекты
    console.log('\n=== ЭФФЕКТЫ (тени, blur) ===');
    const effects = extractEffects(fileData.document);
    const uniqueEffects = [...new Map(effects.map(e => [e.type, e])).values()];
    uniqueEffects.forEach(effect => {
      console.log(`- ${effect.type}: radius=${effect.radius || 0}`);
    });
    
    // Сохраняем детальный анализ
    const analysis = {
      documentName: fileData.name,
      lastModified: fileData.lastModified,
      mainSections: mainSections,
      totalComponents: components.length,
      componentsWithGradients: components.filter(c => c.hasGradient).length,
      effects: uniqueEffects,
      extractedAt: new Date().toISOString()
    };
    
    fs.writeFileSync(
      '/home/yerla/mks/private-schools-expo/figma-deep-analysis.json',
      JSON.stringify(analysis, null, 2)
    );
    
    console.log('\n✅ Анализ завершен и сохранен в figma-deep-analysis.json');
    
  } catch (error) {
    console.error('Ошибка:', error.message);
  }
}

analyzeFigmaDesign();