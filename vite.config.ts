import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      api: path.resolve(__dirname, 'src/api'), // 👈 define el alias "api"
      hooks: path.resolve(__dirname, 'src/hooks'),
    },
  },
});
