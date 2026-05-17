import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://api-web.sumbarprov.go.id",
        changeOrigin: true,
        secure: true,
      },
      "/ppid": {
        target: "https://ppid.sumbarprov.go.id",
        changeOrigin: true,
        secure: true,
        // Rewrite incoming /ppid/* to /api/* on the target host
        // so that a client request to /ppid/instansi -> https://ppid.sumbarprov.go.id/api/instansi
        rewrite: (path) => path.replace(/^\/ppid/, "/api"),
      },
    },
  },
});
