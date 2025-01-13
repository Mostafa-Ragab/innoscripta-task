import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "tailwindcss";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Bind to all network interfaces (localhost and LAN)
    port: 3000,      // Set the desired port (default is 5173)
    strictPort: true, // Ensures the server fails if the port is already in use
  },
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
})
