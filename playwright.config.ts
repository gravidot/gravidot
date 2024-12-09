import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./src/__test__/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },

    {
      name: "iPad Safari",
      use: {
        ...devices["iPad (gen 7)"],
        ...devices["iPad (gen 7) landscape"],
        ...devices["iPad Mini"],
        ...devices["iPad Mini landscape"],
      },
    },

    {
      name: "Android Tablet Chrome",
      use: {
        ...devices["Pixel Slate"],
        isMobile: false,
        viewport: { width: 1280, height: 800 },
      },
    },

    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 5"] },
    },

    {
      name: "Mobile Safari",
      use: { ...devices["iPhone 13 Mini"] },
    },

    {
      name: "Google Chrome",
      use: { ...devices["Desktop Chrome"], channel: "chrome" },
    },
  ],
});
