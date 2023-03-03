import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import autoPreprocess from "svelte-preprocess";
import pkg from "svelte-preprocess";
const { scss } = pkg;
import path from "node:path";
// const path = require("path");

export default defineConfig({
  plugins: [
    svelte({
      /* plugin options */
      preprocess: [scss({})],
    }),
  ],
  root: path.resolve(__dirname, "src"),
  build: {
    outDir: path.resolve(__dirname, "dist"),
  },
  resolve: {
    alias: {
      "~bootstrap": path.resolve(__dirname, "node_modules/bootstrap"),
    },
    extensions: [".mjs", ".js", ".ts", ".json", ".svelte", ".scss"],
  },
  server: {
    // port: 8080,
    hot: true,
  },
  css: {
    preprocessorOptions: {
      scss: {
        //  additionalData: `@import "@/scss/app.scss";`,
        //additionalData: `@import "src/scss/_variables.scss";`,
        quietDeps: true,
      },
    },
  },
});
