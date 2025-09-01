const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function checkSite() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    
    // Установим размер экрана
    await page.setViewport({ width: 1920, height: 1080 });
    
    console.log('Открываем сайт...');
    await page.goto('http://localhost:3001', { 
      waitUntil: 'networkidle2',
      timeout: 30000 
    });
    
    // Ждем загрузки контента
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Делаем скриншот всей страницы
    const screenshotsDir = path.join(__dirname, '../screenshots');
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }
    
    await page.screenshot({ 
      path: path.join(screenshotsDir, 'full-page.png'), 
      fullPage: true 
    });
    console.log('Сделан скриншот всей страницы: screenshots/full-page.png');
    
    // Скриншот верхней части (Hero секция)
    await page.screenshot({ 
      path: path.join(screenshotsDir, 'hero-section.png'),
      clip: { x: 0, y: 0, width: 1920, height: 800 }
    });
    console.log('Сделан скриншот Hero секции');
    
    // Проверяем видимость основных элементов
    console.log('\nПроверка видимости элементов:');
    
    const checkElements = [
      { selector: 'header', name: 'Header' },
      { selector: '#hero', name: 'Hero секция' },
      { selector: '#statistics', name: 'Статистика' },
      { selector: '#why-visit', name: 'Почему стоит посетить' },
      { selector: '#timeline', name: 'Timeline' },
      { selector: '#participants', name: 'Участники' },
      { selector: '#testimonials', name: 'Отзывы' },
      { selector: '#registration', name: 'Регистрация' },
      { selector: '#faq', name: 'FAQ' },
      { selector: 'footer', name: 'Footer' }
    ];
    
    for (const element of checkElements) {
      try {
        const isVisible = await page.$(element.selector) !== null;
        console.log(`- ${element.name}: ${isVisible ? '✅ Найден' : '❌ НЕ НАЙДЕН'}`);
        
        if (isVisible) {
          // Проверяем, есть ли текст в элементе
          const hasText = await page.$eval(element.selector, el => el.textContent.trim().length > 0);
          console.log(`  Содержит текст: ${hasText ? 'Да' : 'Нет'}`);
        }
      } catch (error) {
        console.log(`- ${element.name}: ❌ Ошибка при проверке`);
      }
    }
    
    // Проверяем заголовки
    console.log('\nПроверка заголовков:');
    const h1Elements = await page.$$eval('h1', elements => 
      elements.map(el => ({
        text: el.textContent.trim(),
        visible: el.offsetParent !== null
      }))
    );
    
    if (h1Elements.length === 0) {
      console.log('❌ H1 заголовки не найдены!');
    } else {
      h1Elements.forEach((h1, index) => {
        console.log(`H1 #${index + 1}: "${h1.text}" - ${h1.visible ? 'Видим' : 'Скрыт'}`);
      });
    }
    
    // Проверяем консольные ошибки
    const consoleMessages = [];
    page.on('console', msg => consoleMessages.push({ type: msg.type(), text: msg.text() }));
    
    // Перезагрузим страницу для сбора консольных сообщений
    await page.reload({ waitUntil: 'networkidle2' });
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('\nКонсольные сообщения:');
    const errors = consoleMessages.filter(msg => msg.type === 'error');
    if (errors.length > 0) {
      console.log('❌ Найдены ошибки:');
      errors.forEach(err => console.log(`  - ${err.text}`));
    } else {
      console.log('✅ Ошибок в консоли нет');
    }
    
  } catch (error) {
    console.error('Ошибка при проверке сайта:', error.message);
  } finally {
    await browser.close();
  }
}

checkSite();