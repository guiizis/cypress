import { defineConfig } from "cypress";

export default defineConfig({
  video: false,
  e2e: {
    baseUrl: "http://localhost:5173",

    setupNodeEvents(on, config) {
      on('task', {
        seedDatabase(isJustATestFileName) {
          console.log('Seeding database...' + isJustATestFileName);
          return null; // Return null or any value you want
        }
      });
    },
  },
});
