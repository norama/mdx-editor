import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import viteTsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteTsconfigPaths()],
  base: '/mdx-editor/',
  server: {
    port: 3000,
  },
  preview: {
    port: 5000,
  },
})
