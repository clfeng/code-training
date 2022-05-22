import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { viteMockServe } from 'vite-plugin-mock'
const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), viteMockServe({
    mockPath: "./mock",
  }),],
  test: {
    globals: true,
    environment: "jsdom",
    transformMode: {
      web: [/.[tj]sx$/],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  }
});
