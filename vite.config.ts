import { defineConfig } from 'vite'
import path from "path"
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),vanillaExtractPlugin(),svgr()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  }
})
