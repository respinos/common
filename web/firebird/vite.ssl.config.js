import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import autoPreprocess from "svelte-preprocess";
import pkg from "svelte-preprocess";
const { scss } = pkg;
import path from "node:path";
import glob from 'fast-glob';

import basicSsl from '@vitejs/plugin-basic-ssl';

// Find all HTML files and build an object of names and paths to work from
const files = glob.sync(path.resolve(__dirname, 'src') + '/**/*.html').reduce((acc, cur) => {
  // we want to keep the path
  let name = cur.replace(path.join(__dirname) + '/src/', '').replace('.html', '').replace('/', '-');

  // let name = path.basename(cur, '.html');
  console.log(name, "->", cur);

  acc[name] = cur;
  return acc;
}, {});

export default defineConfig({
  plugins: [
    svelte({
      /* plugin options */
      preprocess: [scss({})],
    }),
    {
        name: 'configure-response-headers',
        configureServer: server => {
            server.middlewares.use((_req, res, next) => {
                res.setHeader('Access-Control-Request-Private-Network', 'true');
                res.setHeader('Access-Control-Allow-Private-Network', 'true');
                next();
            });
        }
    },
    basicSsl(),
  ],
  root: path.resolve(__dirname, "src"),
  build: {
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
    rollupOptions: {
      input: files
    }
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
    proxy: {
      '^/cgi/ping': {
        target: 'https://babel.hathitrust.org',
        changeOrigin: true
      },    
    },
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
