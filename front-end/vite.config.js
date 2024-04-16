import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3100,
    proxy: {
      "/api": {
        target: "http://localhost:3120",
        secure: false
      }
    }

  },
  plugins: [react()],
})
