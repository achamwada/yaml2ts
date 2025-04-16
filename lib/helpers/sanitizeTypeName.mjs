import toPascalCase from './toPascalCase.mjs';

const sanitizeTypeName = (str) => toPascalCase(str.replace(/^\/+/, '').replace(/[^\w]+/g, '_'));

export default sanitizeTypeName;
