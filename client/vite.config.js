import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
build: {
    outDir: 'dist', // Ensure this matches the expected output directory
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://farhan-blog.vercel.app/',
        secure: false,
      },
    },
  },
  plugins: [react()],
});
