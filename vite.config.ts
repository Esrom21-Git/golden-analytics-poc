import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './client/src'),
      '@shared': path.resolve(__dirname, './shared'),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
  },
  server: {
    port: 5173,
    middlewareMode: false,
    watch: {
      // Ignore backend build artifacts and other large folders that may lock files on Windows
      ignored: [
        "**/VehicleManagement.Api/**",
        "**/VehicleManagement.Api/**/obj/**",
        "**/VehicleManagement.Api/**/bin/**",
        "**/node_modules/**"
      ]
    }
  },
})
