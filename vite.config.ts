import { defineConfig } from 'vite'
import electron from 'vite-plugin-electron'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import path from 'path'

export default defineConfig({
  build: {
    outDir: 'build'
  },
  resolve: {
    alias: [
      {
        find: '~@fontsource',
        replacement: path.resolve(__dirname, 'node_modules/@fontsource')
      },
      { find: '@@', replacement: path.resolve(__dirname, './src') }
    ]
  },
  plugins: [
    react(),
    electron({
      main: {
        entry: 'src/backend/main.ts',
        vite: {
          resolve: {
            alias: [
              {
                find: '~@fontsource',
                replacement: path.resolve(__dirname, 'node_modules/@fontsource')
              },
              { find: '@@', replacement: path.resolve(__dirname, './src') }
            ]
          }
        }
      },
      preload: {
        input: {
          preload: path.resolve(__dirname + '/src/backend/preload.ts')
        }
      }
    }),
    svgr()
  ]
})
