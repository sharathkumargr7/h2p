import fs from 'fs/promises';

const Colors = {
  primary: {
    100: '#ffffff',
    200: '#f5f5f5',
    300: '#e0e0e0',
    400: '#bdbdbd'
  },
  secondary: {
    100: '#cfd8dc',
    200: '#b0bec5',
    300: '#90a4ae',
    400: '#78909c'
  }
};

async function generateTypeDefinition(colors) {
  // Generate the header preview string for each category
  const headerPreviews = Object.entries(colors)
    .map(([category, shades]) => 
      Object.entries(shades)
        .map(([shade, hex]) => 
          `![${category} ${shade}](https://mui.com/static/colors-preview/${category}-${shade}-24x24.png)`
        )
        .join(' ')
    )
    .join(' ');

  const typeContent = `/**
 * ${headerPreviews}
 */
declare const Colors: {
${Object.entries(colors)
    .map(([category, shades]) => `  ${category}: {
${Object.entries(shades)
      .map(([shade, hex]) => `    /**
     * Preview: ![${category} ${shade}](https://mui.com/static/colors-preview/${category}-${shade}-24x24.png)
     */
    ${shade}: '${hex}';`)
      .join('\n')}
  };`)
    .join('\n')}
};

export default Colors;
`;

  await fs.writeFile('Colors.d.ts', typeContent, 'utf8');
  console.log('Generated Colors.d.ts');
}

generateTypeDefinition(Colors); 