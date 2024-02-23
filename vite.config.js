import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import svgr from "vite-plugin-svgr"

export default defineConfig(() => {
  return {
    plugins: [react(), svgr()],
    resolve: {
      alias: {
        "@": new URL("src/", import.meta.url).pathname,
        context: "/src/context",
        components: "/src/components",
        pages: "/src/pages",
        constants: "/src/constants",
        icons: "/src/assets/icons",
        images: "/src/assets/images",
        styles: "/src/styles",
      },
    },
  }
})
