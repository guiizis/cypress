import { defineConfig } from "cypress";

export default defineConfig({
  video: false,
  e2e: {
    baseUrl: "http://localhost:5173",
    c(on, config) {
      // implement node event listeners here
    },
  },
});
