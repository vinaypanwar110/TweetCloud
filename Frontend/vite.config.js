  import { defineConfig } from 'vite'
  import react from '@vitejs/plugin-react'

  import envCompatible from 'vite-plugin-env-compatible'
  export default defineConfig({
    plugins: [react(),envCompatible()],
    server:{
      port:3000
      ,
      proxy: {
        '/api': {
          target:  'http://localhost:5000',
          changeOrigin: true
        },
      },
    }
    ,
  })
