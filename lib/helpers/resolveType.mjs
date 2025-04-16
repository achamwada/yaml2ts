import sanitizeTypeName from './sanitizeTypeName.mjs';
import generateInterface from './quoteKey.mjs';

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
    const typeName = sanitizeTypeName(name.startsWith('/') ? `Endpoint_${name}` : name);
    generateInterface(typeName, value);
    return typeName;
  }
  return 'any';
};

export default resolveType;
