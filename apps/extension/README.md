# Rogan – Chrome Extension Monorepo

## 🚀 Overview

This project is a **production-ready monorepo setup** for building a Chrome Extension using:

* **Turborepo** → manages multiple apps/packages efficiently
* **pnpm workspaces** → fast installs + dependency sharing
* **Vite** → fast frontend build tool for extension UI

The goal is to keep the codebase **scalable, maintainable, and fast to develop**.

---

## 🧱 Project Structure

```
Rogan/
├── apps/
│   └── extension/        # Chrome extension app
│       ├── src/
│       │   ├── popup/
│       │   ├── content/
│       │   ├── background/
│       │   └── shared/
│       ├── public/
│       │   └── manifest.json
│       ├── index.html
│       ├── vite.config.ts
│       └── package.json
│
├── packages/
│   └── ui/               # shared components (future use)
│
├── turbo.json
├── package.json
└── pnpm-workspace.yaml
```

---

## ⚙️ Tech Stack

* React + TypeScript
* Vite (for fast dev + build)
* Turborepo (monorepo orchestration)
* pnpm (workspace + fast installs)

---

## 🛠️ Setup (How this project was created)

### 1. Create monorepo

```bash
pnpm dlx create-turbo@latest Rogan
cd Rogan
```

---

### 2. Clean default apps

```bash
rm -rf apps/*
rm -rf packages/*
```

---

### 3. Create extension app structure

```bash
mkdir -p apps/extension/src/popup
mkdir -p apps/extension/src/content
mkdir -p apps/extension/src/background
mkdir -p apps/extension/public
mkdir -p packages/ui/src
```

---

### 4. Initialize extension app

```bash
cd apps/extension
pnpm init
```

---

### 5. Install dependencies

```bash
pnpm add react react-dom
pnpm add -D vite @vitejs/plugin-react typescript
```

---

### 6. Add Vite config

`apps/extension/vite.config.ts`

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist'
  }
})
```

---

### 7. Add entry HTML

`apps/extension/index.html`

```html
<!DOCTYPE html>
<html>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/popup/main.tsx"></script>
  </body>
</html>
```

---

### 8. Add popup React entry

`src/popup/main.tsx`

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'

function App() {
  return <h1>Rogan Extension 🚀</h1>
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
```

---

### 9. Add manifest

`public/manifest.json`

```json
{
  "manifest_version": 3,
  "name": "Rogan Extension",
  "version": "1.0.0",
  "action": {
    "default_popup": "index.html"
  }
}
```

---

### 10. Install all dependencies

```bash
cd ../../
pnpm install
```

---

## ▶️ Running the Project

### Start dev server (for UI)

```bash
pnpm --filter extension dev
```

Then open:

```
http://localhost:5173
```

---

### Build the extension

```bash
pnpm --filter extension build
pnpm --filter @rogan/extension add -D vite
```

Output will be generated in:

```
apps/extension/dist/
```

---

## 🌐 Load Extension in Chrome

1. Open: `chrome://extensions`
2. Enable **Developer Mode**
3. Click **Load unpacked**
4. Select:

```
apps/extension/dist
```

---

## 🧪 Common Issues

### ❌ 404 on localhost

* Make sure `index.html` exists in `apps/extension`

---

### ❌ Extension not loading

* Ensure `manifest.json` is inside `public/`
* Rebuild project before loading

---

### ❌ Changes not reflecting

* Reload extension manually from Chrome extensions page

---

## 📦 Why this setup?

* **Monorepo** → easy to add dashboard/backend later
* **Shared packages** → reuse UI/components
* **Vite** → instant dev server + fast builds
* **pnpm** → faster installs, less disk usage

---

## 🔮 Future Improvements

* Add content scripts + background worker
* Multi-entry Vite config
* Shared UI package usage
* CI/CD pipeline
* Extension packaging & release automation

---

## 🤝 How to Contribute

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd Rogan
```

---

### 2. Install dependencies

We use **pnpm**, so make sure it’s installed:

```bash
npm install -g pnpm
```

Then install all workspace dependencies:

```bash
pnpm install
```

---

### 3. Run the extension (dev mode)

```bash
pnpm --filter extension dev
```

Open in browser:

```
http://localhost:5173
```

---

### 4. Build the extension

```bash
pnpm --filter extension build
```

---

### 5. Load extension in Chrome

* Go to `chrome://extensions`
* Enable **Developer Mode**
* Click **Load unpacked**
* Select:

```
apps/extension/dist
```

---

### 6. Create a feature branch

```bash
git checkout -b feature/your-feature-name
```

---

### 7. Make changes & commit

```bash
git add .
git commit -m "feat: add your feature"
```

---

### 8. Push and create PR

```bash
git push origin feature/your-feature-name
```

Then open a Pull Request on GitHub 🚀

---

## 💡 Note

* Follow existing code structure
* Run lint/typecheck before pushing
* Keep commits clean and meaningful

---

## 💡 TL;DR

This project uses a **modern monorepo architecture** to build a Chrome extension with **fast development, clean structure, and scalability in mind**.
