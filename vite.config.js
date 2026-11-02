import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { execFileSync } from "node:child_process";

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  base: "/",
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
      "#content-sanitizer": path.resolve(
        import.meta.dirname,
        isSsrBuild ? "src/utils/sanitize.js" : "src/utils/sanitize-browser.js",
      ),
    },
  },
  build: {
    outDir: "dist",
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return undefined;

          if (
            id.includes("sanitize-html") ||
            id.includes("htmlparser") ||
            id.includes("domhandler") ||
            id.includes("domutils") ||
            id.includes("entities")
          )
            return "vendor-sanitize";
          if (id.includes("react-icons")) return "vendor-icons";
          if (id.includes("framer-motion")) return "vendor-motion";
          if (id.includes("react-router")) return "vendor-router";
          if (id.includes("react") || id.includes("scheduler"))
            return "vendor-react";

          return "vendor";
        },
      },
    },
  },
  define: {
    global: "globalThis",
    __IS_PREVIEW__: JSON.stringify(
      !!process.env.CONTEXT && process.env.CONTEXT !== "production",
    ),
    __CONTENT_REVISION__: JSON.stringify(
      execFileSync("git", ["hash-object", "src/data/siteContent.js"], {
        encoding: "utf8",
      }).trim(),
    ),
  },
}));
