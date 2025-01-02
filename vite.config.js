// vite.config.js
import { defineConfig } from "vite";

export default defineConfig({
  // root: "./src", // Make sure the root is set to the 'src' folder if index.html is inside 'src'
  build: {
    outDir: "dist",
  },
  server: {
    open: true, // Automatically open the browser when the server starts
  },
});
