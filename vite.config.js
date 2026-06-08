import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import https from "https";

// Dev plugin: proxy /api/files requests and stream with browser-like headers
function imageProxyPlugin() {
  return {
    name: "dev-image-proxy",
    configureServer(server) {
      server.middlewares.use("/api/files", (req, res, next) => {
        try {
          const remoteHost = "https://api-web.sumbarprov.go.id/api/files";
          // req.url is the path after the mount point when using connect
          const remoteUrl = `${remoteHost}${req.url}`;

          const options = new URL(remoteUrl);
          const headers = {
            Referer: "https://sumbarprov.go.id/",
            Origin: "https://sumbarprov.go.id",
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
            Accept: "image/webp,image/apng,image/*,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.9",
            "Sec-Fetch-Site": "same-site",
          };

          const reqOptions = {
            hostname: options.hostname,
            path: options.pathname + (options.search || ""),
            method: "GET",
            headers,
          };

          const proxyReq = https.request(reqOptions, (proxyRes) => {
            // Forward status and headers (but avoid hop-by-hop headers)
            const filteredHeaders = { ...proxyRes.headers };
            delete filteredHeaders["transfer-encoding"];
            res.writeHead(proxyRes.statusCode || 200, filteredHeaders);
            proxyRes.pipe(res);
          });

          proxyReq.on("error", (err) => {
            res.statusCode = 502;
            res.end("Bad Gateway");
          });

          proxyReq.end();
        } catch (err) {
          next();
        }
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [imageProxyPlugin(), react()],
  base: "./",
  server: {
    proxy: {
      "/api/files": {
        target: "https://api-web.sumbarprov.go.id",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api\/files/, "/files"),
        // Ensure remote host receives a Referer header expected by the server
        configure: (proxy, options) => {
          proxy.on("proxyReq", (proxyReq, req, res) => {
            try {
              proxyReq.setHeader("Referer", "https://sumbarprov.go.id/");
              proxyReq.setHeader(
                "User-Agent",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
              );
              proxyReq.setHeader(
                "Accept",
                "image/webp,image/apng,image/*,*/*;q=0.8",
              );
              proxyReq.setHeader("Origin", "https://sumbarprov.go.id");
            } catch (e) {
              // ignore
            }
          });
        },
      },
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
