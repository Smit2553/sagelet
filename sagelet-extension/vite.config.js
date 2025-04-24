import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      external: ["webextension-polyfill"],
      input: {
        background: resolve(__dirname, "src/background.js"),
        content: resolve(__dirname, "src/content.js"),
        popup: resolve(__dirname, "src/popup/index.html"),
        options: resolve(__dirname, "src/options/index.html"),
      },
      output: {
        entryFileNames: "[name].js",
        chunkFileNames: "assets/[name].[hash].js",
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split(".");
          const extType = info[info.length - 1];

          if (/\.(png|jpe?g|gif|svg|webp|ico)$/.test(assetInfo.name)) {
            return "assets/icons/[name][extname]";
          }

          if (/\.css$/.test(assetInfo.name)) {
            return "[name][extname]";
          }

          return "assets/[name][extname]";
        },
      },
    },
  },
  // Copy the manifest and other static assets to the dist folder
  publicDir: "public",
});
