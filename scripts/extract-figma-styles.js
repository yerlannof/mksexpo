const https = require('https');
const fs = require('fs');

// Figma API configuration
const FIGMA_API_KEY = process.env.FIGMA_API_KEY || 'your-figma-api-key-here';
const FILE_KEY = 'S41cnQoS6gO95yVMGhKGaz'; // Extracted from the URL

// Function to make Figma API request
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

      res.on('data', (chunk) => {
        data += chunk;
      });

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

// Extract colors from the document
function extractColors(document) {
  const colors = new Map();
  
  function traverse(node) {
    // Extract fills
    if (node.fills) {
      node.fills.forEach(fill => {
        if (fill.type === 'SOLID' && fill.color) {
          const { r, g, b } = fill.color;
          const hex = `#${Math.round(r * 255).toString(16).padStart(2, '0')}${Math.round(g * 255).toString(16).padStart(2, '0')}${Math.round(b * 255).toString(16).padStart(2, '0')}`;
          colors.set(hex, (colors.get(hex) || 0) + 1);
        }
      });
    }
    
    // Extract strokes
    if (node.strokes) {
      node.strokes.forEach(stroke => {
        if (stroke.type === 'SOLID' && stroke.color) {
          const { r, g, b } = stroke.color;
          const hex = `#${Math.round(r * 255).toString(16).padStart(2, '0')}${Math.round(g * 255).toString(16).padStart(2, '0')}${Math.round(b * 255).toString(16).padStart(2, '0')}`;
          colors.set(hex, (colors.get(hex) || 0) + 1);
        }
      });
    }
    
    // Traverse children
    if (node.children) {
      node.children.forEach(child => traverse(child));
    }
  }
  
  traverse(document);
  
  // Sort by frequency
  return Array.from(colors.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([color, count]) => ({ color, count }));
}

// Extract typography styles
function extractTypography(document) {
  const typography = new Map();
  
  function traverse(node) {
    if (node.type === 'TEXT' && node.style) {
      const style = node.style;
      const key = `${style.fontFamily || 'Unknown'}_${style.fontSize || 0}_${style.fontWeight || 400}`;
      
      if (!typography.has(key)) {
        typography.set(key, {
          fontFamily: style.fontFamily || 'Unknown',
          fontSize: style.fontSize || 0,
          fontWeight: style.fontWeight || 400,
          lineHeight: style.lineHeightPx || 'normal',
          letterSpacing: style.letterSpacing || 0,
          count: 0
        });
      }
      
      typography.get(key).count++;
    }
    
    if (node.children) {
      node.children.forEach(child => traverse(child));
    }
  }
  
  traverse(document);
  
  return Array.from(typography.values()).sort((a, b) => b.count - a.count);
}

// Main function
async function extractFigmaStyles() {
  try {
    console.log('Fetching Figma file...');
    
    // Get file data
    const fileData = await fetchFigmaData(`/v1/files/${FILE_KEY}`);
    
    if (fileData.err) {
      throw new Error(`Figma API error: ${fileData.err}`);
    }
    
    console.log('Extracting design system...');
    
    // Extract colors
    const colors = extractColors(fileData.document);
    
    // Extract typography
    const typography = extractTypography(fileData.document);
    
    // Get file styles (if available)
    const stylesData = await fetchFigmaData(`/v1/files/${FILE_KEY}/styles`);
    
    const result = {
      fileName: fileData.name,
      lastModified: fileData.lastModified,
      colors: colors.slice(0, 20), // Top 20 colors
      typography: typography.slice(0, 10), // Top 10 typography styles
      styles: stylesData.meta || {},
      extractedAt: new Date().toISOString()
    };
    
    // Save to file
    fs.writeFileSync(
      '/home/yerla/mks/private-schools-expo/figma-styles.json',
      JSON.stringify(result, null, 2)
    );
    
    console.log('\nDesign system extracted successfully!');
    console.log(`\nTop Colors (${colors.length} total):`);
    result.colors.slice(0, 10).forEach(({ color, count }) => {
      console.log(`  ${color} - used ${count} times`);
    });
    
    console.log(`\nTop Typography Styles (${typography.length} total):`);
    result.typography.slice(0, 5).forEach(style => {
      console.log(`  ${style.fontFamily} ${style.fontSize}px (weight: ${style.fontWeight}) - used ${style.count} times`);
    });
    
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

// Run the extraction
extractFigmaStyles();