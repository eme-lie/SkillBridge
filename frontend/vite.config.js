import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Convert the URL to a file path for the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log("Resolved __dirname:", __dirname);
console.log('Resolved path for "@":', path.resolve(__dirname, "./src"));

export default defineConfig({
  build: {
    rollupOptions: {
      //external: ["date-fns"],
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": "http://localhost:4000", // replace with the port your Express server is running on
    },
  },
});
