# @achams/yaml2ts

🚀 Generate clean TypeScript interfaces from any YAML config or template.

[![npm version](https://img.shields.io/npm/v/@achams/yaml2ts)](https://www.npmjs.com/package/@achams/yaml2ts)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

---

## ✨ Features

- ✅ Supports deeply nested YAML structures  
- ✅ Converts kebab-case & snake_case to `camelCase` fields  
- ✅ Generates `PascalCase` interface names  
- ✅ Handles arrays of objects  
- ✅ Fixes invalid YAML scalar+mapping syntax  
- ✅ Automatically adds comments from scalar values  
- ✅ No build step — pure native Node.js  

---

## 📦 Installation

### Global (recommended)

```bash
npm install -g @achams/yaml2ts
```

### Or use it instantly via `npx`:

```bash
npx @achams/yaml2ts your-file.yaml
```

---

## 🚀 Usage

```bash
yaml2ts path/to/your/config.yaml
```

### Output

- Generates a TypeScript file in `out/your-file.ts`
- Top-level interface is named after the YAML filename

---

## 🧠 Example

### `app-config.yaml`

```yaml
service: web-app
  JELO:
    enabled: true

datadog-resources:
  enable-synthetics: false
  synthetic-block: false
```

### `out/app-config.ts`

```ts
// web-app
export interface Service {
  JELO: {
    enabled: boolean;
  };
}

export interface DatadogResources {
  enableSynthetics: boolean;
  syntheticBlock: boolean;
}
```

---

## 🛠 CLI Options (coming soon)

```bash
yaml2ts <path-to-yaml>
```

Coming soon:

- `--out <dir>` – Set custom output directory  
- `--top-level <name>` – Override root interface name  
- `--prettier` – Format with Prettier  
- `--jsdoc` – Include JSDoc from `description:` fields  

---

## 📁 Output Structure

```
out/
└── your-file.ts      ← Generated interfaces
```

---

## 🧪 Development

```bash
npm install
node bin/yaml2ts.js example.yaml
```

To test globally:

```bash
npm link
yaml2ts path/to/file.yaml
```

---

## 📄 License

MIT — built by [Alexander Chamwada](https://continentaloasis.com) with ❤️

---

## 🔽 Download

You can download the `.tgz` package here:

👉 [Download yaml2ts.tgz](./yaml2ts.tgz)

### 🚀 To Test It Locally

```bash
npm install -g ./yaml2ts.tgz
```

Then use it:

```bash
yaml2ts my-config.yaml
```

It'll generate:

```ts
out/my-config.ts
```

---
