import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import sanitizeTypeName from './helpers/sanitizeTypeName.mjs';
import resolveType from './helpers/resolveType.mjs';
import quoteKey from './helpers/quoteKey.mjs';

export const generateTypes = (inputPath, outputDir = 'out') => {
  const interfaces = new Map();
  const baseName = path.basename(inputPath, path.extname(inputPath));
  const interfaceName = baseName
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .replace(/\s+/g, '');
  const outFile = path.join(outputDir, `${baseName}.ts`);
  fs.mkdirSync(outputDir, { recursive: true });

  const raw = fs.readFileSync(inputPath, 'utf8');
  const lines = raw.split('\n');
  const fixedLines = [];
  const commentsMap = new Map();

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const scalarMatch = line.match(/^([^:\s][^:]+):\s+(.+)$/);
    const nextLine = lines[i + 1] || '';
    if (scalarMatch && nextLine.startsWith('  ')) {
      const key = scalarMatch[1];
      const val = scalarMatch[2].trim();
      commentsMap.set(key, val);
      fixedLines.push(`${key}:`);
      continue;
    }
    fixedLines.push(line);
  }

  const fixedRaw = fixedLines.join('\n');
  const data = yaml.load(fixedRaw);

  const generateInterface = (name, obj) => {
    const typeName = sanitizeTypeName(name);
    if (interfaces.has(typeName)) return typeName;
    const lines = [];
    if (commentsMap.has(name)) {
      lines.push(`// ${commentsMap.get(name)}`);
    }
    lines.push(`export interface ${typeName} {`);
    for (const key in obj) {
      const field = quoteKey(key);
      const value = obj[key];
      const type = resolveType(key, value);
      lines.push(`  ${field}: ${type};`);
    }
    lines.push(`}`);
    interfaces.set(typeName, lines.join('\n'));
    return typeName;
  };

  generateInterface(interfaceName, data);
  fs.writeFileSync(outFile, [...interfaces.values()].join('\n\n'));
  return outFile;
};
