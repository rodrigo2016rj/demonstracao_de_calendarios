import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [
    vue()
  ],
  build: {
    rollupOptions: {
      input: "./seletor_de_data.html",
      output: {
        dir: "./dist"
      }
    }
  },
  server: {
    host: "127.0.0.1"
  }
});
