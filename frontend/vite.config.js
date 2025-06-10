import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import fs from 'fs';

export default defineConfig({
  plugins: [react()],
  root: './',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
  // שלב חשוב: כולל את הקובץ _redirects בפלט
  writeBundle() {
    const redirectsSrc = resolve(__dirname, 'public/_redirects');
    const redirectsDest = resolve(__dirname, 'dist/_redirects');

    if (fs.existsSync(redirectsSrc)) {
      fs.copyFileSync(redirectsSrc, redirectsDest);
    }
  },
});
