import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";
import path from "node:path";

export default defineConfig({
  output: "static",
  adapter: vercel(),
  integrations: [react()],
  publicDir: "./static",
  vite: {
    resolve: {
      alias: {
        components: path.resolve("./src/components"),
        themes: path.resolve("./src/themes"),
        types: path.resolve("./src/types"),
        utils: path.resolve("./src/utils"),
        icons: path.resolve("./src/icons"),
        images: path.resolve("./src/images"),
        translations: path.resolve("./src/translations")
      }
    },
    ssr: {
      noExternal: ["styled-components"]
    },
    optimizeDeps: {
      include: ["styled-components"]
    }
  }
});
