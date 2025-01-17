import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/estimation-app/', // Base path for deployment
  server: {
    host: true, // Allow access from network devices
    port: 5174, // Ensure the port matches the one used in your app
  },
});
