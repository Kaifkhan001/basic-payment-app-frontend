import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://basic-payment-app-01-1.onrender.com", // Backend URL
        changeOrigin: true, // Ensures the backend sees the correct origin
        rewrite: (path) => path.replace(/^\/api/, ""), // Strips '/api' from the path before sending to backend
      },
    },
  },
});
