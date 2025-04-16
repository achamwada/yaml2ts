#!/usr/bin/env node
import { generateTypes } from '../lib/generate.mjs';

const inputFile = process.argv[2];
if (!inputFile) {
  console.error('❌ Usage: yaml2ts <yourfile.yaml>');
  process.exit(1);
}

const outputPath = generateTypes(inputFile);
console.log(`✅ Types saved to ${outputPath}`);
