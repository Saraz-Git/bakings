import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 4000,
    open: true,
    // Important for MERN Setup: Here we're establishing a relationship between our two development servers.
    // We are pointing our Vite client-side development server to proxy API requests to our server-side Node server at port 3001.
    // Without this line, API calls would attempt to fallback and query for data from the current domain: localhost:3000
    proxy: {
      '/graphql': {
        target: 'http://localhost:4001',
        changeOrigin: true,
        secure: false,
      },
    }
  }
})
