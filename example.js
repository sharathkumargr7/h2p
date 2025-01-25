const generateColorImage = require('../colorGenerator');

// Generate a red image
generateColorImage('FF0000');

// Generate a blue image with custom dimensions and name
generateColorImage('0000FF', 800, 600, 'blue.png'); 