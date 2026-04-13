import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

// dev 模式 base="/", build/preview 模式 base="/blog"
const isDev = process.argv.includes("dev");

export default defineConfig({
  site: "https://chu123122.github.io",
  base: isDev ? "/" : "/blog",
  integrations: [mdx(), sitemap()],
  markdown: {
    shikiConfig: {
      theme: "one-dark-pro",
      wrap: true,
    },
  },
});
