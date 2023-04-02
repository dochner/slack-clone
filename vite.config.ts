import { resolve } from "path";
import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import UnoCSS from "unocss/vite";
import Eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "~/": `${resolve(__dirname, "src")}/`,
    },
  },
  plugins: [
    Vue(),
    Components({
      dts: "src/components.d.ts",
    }),
    AutoImport({
      imports: ["vue", "vue-router", "@vueuse/head", "@vueuse/core"],
      dirs: ["src/composables"],
      dts: "src/auto-imports.d.ts",
      vueTemplate: true,
    }),
    Eslint(),
    UnoCSS(),
  ],
});
