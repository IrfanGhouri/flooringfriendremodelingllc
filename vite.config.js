import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        home2: resolve(__dirname, 'home2.html'),
        home3: resolve(__dirname, 'home3.html'),
        home4: resolve(__dirname, 'home4.html'),
        home5: resolve(__dirname, 'home5.html'),
      },
    },
  },
});
