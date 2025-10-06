import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { // <-- Add this server configuration block
    port: 3000,
    strictPort: true, // This will fail if port 3000 is in use
  },
})