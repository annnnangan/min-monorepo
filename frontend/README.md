# React + TypeScript + Vite + shadcn/ui

This frontend application features a minimal login page built with shadcn/ui components.

## Features

- **Login Page**: A clean, modern login form with email and password fields
- **shadcn/ui**: Pre-configured with Button, Input, Card, and Label components
- **Tailwind CSS v4**: Modern styling with custom theme variables
- **TypeScript**: Full type safety
- **Dummy UI**: No backend integration - for UI demonstration purposes only

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   # or
   bun install
   ```

2. **Run development server**:
   ```bash
   npm run dev
   # or
   bun run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   # or
   bun run build
   ```

## Project Structure

```
src/
├── components/
│   └── ui/           # shadcn/ui components
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       └── label.tsx
├── lib/
│   └── utils.ts      # Utility functions (cn helper)
├── App.tsx           # Main login page component
├── main.tsx          # Application entry point
└── index.css         # Global styles with Tailwind
```

## Login Page

The login page (`App.tsx`) includes:
- Email and password input fields
- "Forgot password?" link
- "Sign up" link
- Responsive design with gradient background
- Form validation (required fields)
- Console logging on form submission (dummy behavior)

## Tech Stack

- React 19
- TypeScript 5
- Vite 7
- Tailwind CSS v4
- shadcn/ui components
- Radix UI primitives

---

# Original Vite Template Info

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
