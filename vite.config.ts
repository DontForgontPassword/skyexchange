import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    base: "/skyexchange/",
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    build: {
        sourcemap: true,
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@use "@/app/styles/mixins" as *;@use "@/app/styles/variables" as *;`,
            },
        },
    },
});
