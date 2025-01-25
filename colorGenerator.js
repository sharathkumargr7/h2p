import sharp from 'sharp';

export function generateColorImage(hexColor, width = 24, height = 24, outputPath = 'output.png') {
  // Remove '#' if present in hex color
  hexColor = hexColor.replace('#', '');
  
  // Create a buffer with the solid color
  const svg = `
    <svg width="${width}" height="${height}">
      <rect width="100%" height="100%" fill="#${hexColor}"/>
    </svg>
  `;

  // Convert SVG to PNG
  sharp(Buffer.from(svg))
    .png()
    .toFile(outputPath)
    .then(() => {
      console.log(`Image generated successfully at ${outputPath}`);
    })
    .catch(err => {
      console.error('Error generating image:', err);
    });
}

// Example usage
// generateColorImage('FF5733', 500, 500, 'redOrange.png'); 