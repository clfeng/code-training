import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { viteMockServe } from 'vite-plugin-mock'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), viteMockServe({
    mockPath: "./mock",
  }),],
  resolve: {
    alias: {
      'src': './src',
      'components': './src/components'
    }
  },
  test: {
    globals: true,
    environment: "jsdom",
    transformMode: {
      web: [/.[tj]sx$/],
    },
  },
});
