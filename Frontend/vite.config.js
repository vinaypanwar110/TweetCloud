  import { defineConfig } from 'vite'
  import react from '@vitejs/plugin-react'

  import envCompatible from 'vite-plugin-env-compatible'
  // export const URL = import.meta.env.VITE_REACT_API_URL;

  // https://vitejs.dev/config/
  export default defineConfig({
    // plugins: [react()],
    plugins: [react(),envCompatible()],
    server:{
      port:3000
      ,
      proxy: {
        '/api': {
          target:  process.env.VITE_REACT_API_URL,
          changeOrigin: true,
          // rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    }
    ,

  })
