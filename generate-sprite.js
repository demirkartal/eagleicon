/**
 * generate-sprite.js
 *
 * This script reads all SVG files from a specified directory,
 * extracts their shapes and attributes, and generates a single SVG sprite file
 * containing <symbol> elements for each icon.
 *
 * Usage:
 *   node generate-sprite.js --src <input-directory> --output <output-file>
 */
import { readdirSync, readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, parse } from 'path';
import pkg from 'js-beautify';
import process from 'node:process';
const { html: beautify } = pkg;

// Parse command-line arguments
const args = process.argv.slice(2);

/**
 * Get the value of a command-line argument by name.
 *
 * @param {string} name - Argument name (without '--')
 * @returns {string|undefined}
 */
function getArg(name) {
  const idx = args.indexOf(`--${name}`);
  const value = args[idx + 1];
  return idx !== -1 && value && !value.startsWith('--') ? value : undefined;
}

const iconsDir = getArg('src');
const outputFile = getArg('output');
const minified = args.includes('--minified');

// Verify input and output
if (!iconsDir || !existsSync(iconsDir)) {
  console.error('Error: Input directory (--src) is missing or does not exist.');
  process.exit(1);
}
if (!outputFile) {
  console.error('Error: Output file (--output) is missing.');
  process.exit(1);
}

// Ensure output directory exists
const outputDir = parse(outputFile).dir;
if (outputDir && !existsSync(outputDir)) {
  try {
    mkdirSync(outputDir, { recursive: true });
  }
  catch (err) {
    console.error(`Error: Could not create output directory "${outputDir}".`, err);
    process.exit(1);
  }
}

let symbols = '';

// Read SVG files and build <symbol> elements
for (const dirent of readdirSync(iconsDir, { withFileTypes: true })) {
  if (dirent.isFile() && dirent.name.endsWith('.svg')) {
    const file = dirent.name;
    const svgContent = readFileSync(join(iconsDir, file), 'utf8');
    // Extract <svg> tag and inner shape
    const svgTagMatch = svgContent.match(/<svg[^>]*>/);
    const viewBoxMatch = svgContent.match(/viewBox="([^"]+)"/);
    const shapeMatch = svgContent.match(/<svg[^>]*>([\s\S]*?)<\/svg>/);
    const id = parse(file).name;
    if (svgTagMatch && viewBoxMatch && shapeMatch) {
      // Trim and normalize whitespace in the shape content for minified output
      const trimmedShape = shapeMatch[1].replace(/\s+/g, ' ').trim();
      // Extract stroke-width and fill from <svg> tag
      const strokeWidthMatch = svgTagMatch[0].match(/stroke-width="([\d.]+)"/);
      const fillMatch = svgTagMatch[0].match(/fill="([^"]+)"/);
      let symbolAttrs = `id="${id}" viewBox="${viewBoxMatch[1]}"`;
      if (fillMatch) {
        symbolAttrs += ` fill="var(--icon-fill, ${fillMatch[1]})"`;
      }
      if (strokeWidthMatch) {
        symbolAttrs += ` stroke-width="var(--icon-stroke-width, ${strokeWidthMatch[1]})"`;
      }
      symbols += `<symbol ${symbolAttrs}>${trimmedShape}</symbol>`;
    }
  }
}

// Build the SVG sprite
const sprite = `<svg xmlns="http://www.w3.org/2000/svg" style="display:none;">${symbols}</svg>`;

if (minified) {
  writeFileSync(outputFile, sprite);
}
else {
  // Beautify the output SVG for readability
  const beautified = beautify(sprite, {
    indent_size: 2,
    wrap_line_length: 0,
    max_preserve_newlines: 0,
    indent_inner_html: true,
  });

  // Remove space before '/' in self-closing tags for cleaner output
  const cleaned = beautified.replace(/(\s)\/>/g, '/>');

  // Write the final sprite to the output file
  writeFileSync(outputFile, cleaned);
}
