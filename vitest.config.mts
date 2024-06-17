import { resolve } from "path"
import swc from "unplugin-swc"
import { defineConfig, defaultExclude } from 'vitest/config'
const path = resolve(__dirname)

export default defineConfig({
  test: {
    exclude: [...defaultExclude, './test/**'],
    globals: false,
    alias: {
      '@': `${path}/src`,
      '@test': './test',
    },
    root: './',
  },
  plugins: [
    swc.vite()
  ],
})
