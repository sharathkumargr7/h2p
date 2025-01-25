import fs from 'fs/promises';
import path from 'path';
import { generateColorImage } from './colorGenerator.js';

const colors = {
  lightGreen: {
    50: '#f1f8e9',
    100: '#dcedc8',
    200: '#c5e1a5',
    300: '#aed581',
    400: '#9ccc65',
    500: '#8bc34a',
    600: '#7cb342',
    700: '#689f38',
    800: '#558b2f',
    900: '#33691e',
    A100: '#ccff90',
    A200: '#b2ff59',
    A400: '#76ff03',
    A700: '#64dd17',
  }
};

async function generateTypeDefinition(colorName, colorObj) {
  // Generate the preview images first
  const imagePromises = Object.entries(colorObj).map(async ([shade, hex]) => {
    const fileName = `${colorName}-${shade}-24x24.png`;
    await generateColorImage(hex.replace('#', ''), 24, 24, fileName);
  });

  await Promise.all(imagePromises);

  // Generate the header preview string
  const headerPreviews = Object.keys(colorObj)
    .map(shade => `![${colorName} ${shade}](https://mui.com/static/colors-preview/${colorName}-${shade}-24x24.png)`)
    .join(' ');

  // Generate the type definition
  const typeContent = `/**
 * ${headerPreviews}
 */
declare const ${colorName}: {
${Object.entries(colorObj)
    .map(([shade, hex]) => `  /**
   * Preview: ![${colorName} ${shade}](https://mui.com/static/colors-preview/${colorName}-${shade}-24x24.png)
   */
  ${shade}: '${hex}';`)
    .join('\n')}
};

export default ${colorName};
`;

  // Write the .d.ts file
  await fs.writeFile(`${colorName}.d.ts`, typeContent, 'utf8');
  console.log(`Generated ${colorName}.d.ts`);
}

async function generateAllTypes() {
  try {
    for (const [colorName, colorObj] of Object.entries(colors)) {
      await generateTypeDefinition(colorName, colorObj);
    }
    console.log('All type definitions generated successfully!');
  } catch (error) {
    console.error('Error generating type definitions:', error);
  }
}

// Remove the package.json modification since we've already added the script
generateAllTypes(); // Actually execute the function 