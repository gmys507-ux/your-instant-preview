import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages — gmys507-ux/your-instant-preview repo 하위 경로
export default defineConfig({
  plugins: [react()],
  base: '/your-instant-preview/',
})
