import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import sanitizeTypeName from './helpers/sanitizeTypeName.mjs';
import quoteKey from './helpers/quoteKey.mjs';

export const generateTypes = (inputPath, outputDir = 'out') => {
  const baseName = path.basename(inputPath, path.extname(inputPath));
  const rootTypeName = sanitizeTypeName(baseName);
  const outFile = path.join(outputDir, `${baseName}.ts`);
  fs.mkdirSync(outputDir, { recursive: true });

  const raw = fs.readFileSync(inputPath, 'utf8');
  const lines = raw.split('\n');
  const fixedLines = [];
  const commentsMap = new Map();

  // Fix scalar + nested block issues
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
  const interfaces = new Map();

  const resolveType = (name, value) => {
    if (typeof value === 'string') return 'string';
    if (typeof value === 'boolean') return 'boolean';
    if (typeof value === 'number') return 'number';

    if (Array.isArray(value)) {
      if (value.length === 0) return 'any[]';
      const subtype = resolveType(name.replace(/s$/, ''), value[0]);
      return `${subtype}[]`;
    }

    if (typeof value === 'object' && value !== null) {
      let typeName = name;
      if (/^\d+$/.test(name)) {
        typeName = `Response${name}`;
      } else if (name === 'default') {
        typeName = `DefaultResponse`;
      } else if (name.startsWith('/')) {
        typeName = `Endpoint_${name}`;
      }

      const safeTypeName = sanitizeTypeName(typeName);
      generateInterface(safeTypeName, value);
      return safeTypeName;
    }

    return 'any';
  };

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

  // Build the root type alias
  const rootLines = [`export type ${rootTypeName} = {`];

  for (const key in data) {
    const value = data[key];
    if (typeof value === 'string') {
      rootLines.push(`  ${quoteKey(key)}: string;`);
    } else if (typeof value === 'object' && value !== null) {
      const typeName = resolveType(key, value);
      rootLines.push(`  ${quoteKey(key)}?: ${typeName};`);
    } else {
      rootLines.push(`  ${quoteKey(key)}: any;`);
    }
  }

  rootLines.push('};');

  const allTypes = [rootLines.join('\n'), ...interfaces.values()].join('\n\n');
  fs.writeFileSync(outFile, allTypes);
  console.log(`✅ Types written to ${outFile}`);
  return outFile;
};
