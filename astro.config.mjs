import { defineConfig } from "astro/config"
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
export default defineConfig({
  site: "https://interbrasoficial.com/",
  i18n: {
    defaultLocale: "es",
    locales: ["es", "pt"],
    prefixDefaultLocale: true
  },
  integrations: [tailwind(), react()]
})