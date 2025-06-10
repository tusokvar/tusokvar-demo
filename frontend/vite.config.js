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
  server: {
    historyApiFallback: true, // ✅ זה מה שמאפשר ל-Vite להחזיר index.html בכל נתיב
  },
  // כולל את הקובץ _redirects בפלט build
  writeBundle() {
    const redirectsSrc = resolve(__dirname, 'public/_redirects');
    const redirectsDest = resolve(__dirname, 'dist/_redirects');

    if (fs.existsSync(redirectsSrc)) {
      fs.copyFileSync(redirectsSrc, redirectsDest);
    }
  },
});
