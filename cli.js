import { generateColorImage } from './colorGenerator.js';

const colorObjects = {
  primary: {
    main: '#ffffff',
    text: '#000000'
  },
  secondary: {
    neutral: '#cccccc'
  }
};

// Recursively process nested color objects
function processColors(obj, parentKey = '') {
  for (const [key, value] of Object.entries(obj)) {
    const currentKey = parentKey ? `${parentKey}_${key}` : key;
    
    if (typeof value === 'string') {
      // If value is a color string, generate the image
      const outputPath = `${currentKey}.png`;
      generateColorImage(value.replace('#', ''), 24, 24, outputPath);
    } else if (typeof value === 'object') {
      // If value is an object, recurse deeper
      processColors(value, currentKey);
    }
  }
}

// Process command line arguments or use default color objects
const args = process.argv.slice(2);
if (args.length > 0) {
  // Original CLI functionality
  const [hexColor, width = 24, height = 24, outputPath = 'output.png'] = args;
  generateColorImage(hexColor, parseInt(width), parseInt(height), outputPath);
} else {
  // Process color objects
  processColors(colorObjects);
} 