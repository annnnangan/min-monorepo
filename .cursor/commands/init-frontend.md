# Initialize Frontend

Initialize the frontend directory using Vite with React TypeScript. This command will:

1. Check if `frontend/` directory already exists (warns if it does)
2. Detect available package manager (prefers `bun`, falls back to `npm`)
3. Scaffold a new Vite + React + TypeScript project in the `frontend/` directory
4. Configure Vite to proxy `/api` requests to the backend during development

## Steps

1. **Check for existing frontend directory:**
   - If `frontend/` exists and is not empty, warn the user and ask for confirmation before proceeding
   - If empty or doesn't exist, proceed

2. **Detect package manager:**
   - Check if `bun` is available: `command -v bun`
   - If bun is available, use `bun` for all operations
   - Otherwise, fall back to `npm`
   - Store the detected package manager in a variable for consistent use

3. **Scaffold Vite project:**
   - Run: `bun create vite frontend --template react-ts` (if using bun)
   - Or: `npm create vite@latest frontend -- --template react-ts` (if using npm)
   - This creates the frontend directory with React TypeScript template

4. **Configure Vite proxy:**
   - After scaffolding, update `frontend/vite.config.ts` to add proxy configuration:
   ```typescript
   import { defineConfig } from 'vite'
   import react from '@vitejs/plugin-react'

   export default defineConfig({
     plugins: [react()],
     server: {
       proxy: {
         '/api': {
           target: 'http://localhost:8000',
           changeOrigin: true,
         },
       },
     },
   })
   ```

5. **Install dependencies:**
   - Navigate to `frontend/` directory
   - Run: `bun install` (if using bun) or `npm install` (if using npm)

6. **Update package.json scripts (if needed):**
   - Ensure scripts use the detected package manager consistently
   - If using bun, scripts can use `bun` directly

7. **Add API endpoint check to App.tsx:**
   - Update `frontend/src/App.tsx` to include an API check on component mount
   - Add a `useEffect` hook that calls `/api/hello` endpoint
   - Display the API message in the UI
   - Example implementation:
   ```typescript
   import { useState, useEffect } from 'react'
   import reactLogo from './assets/react.svg'
   import viteLogo from '/vite.svg'
   import './App.css'

   function App() {
     const [count, setCount] = useState(0)
     const [apiMessage, setApiMessage] = useState<string>('loading...')

     useEffect(() => {
       fetch('/api/hello')
         .then(res => res.json())
         .then(data => setApiMessage(data.message))
         .catch(err => setApiMessage('error: ' + err.message))
     }, [])

     return (
       <>
         {/* existing JSX */}
         <p>API: {apiMessage}</p>
       </>
     )
   }
   ```
   - The Vite proxy configuration already handles `/api` requests, so `/api/hello` will be proxied to `http://localhost:8000/api/hello`
   - The `/api/hello` endpoint returns `{ message: "Hello from FastAPI!" }`, so access `data.message` (not `data.status`)

## Notes

- The command should be run from the monorepo root directory
- This avoids maintaining static frontend files in the template
- Users get the latest Vite and React versions automatically
- Bun is preferred for faster installs, but npm is a reliable fallback
