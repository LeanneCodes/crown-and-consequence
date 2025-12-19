module.exports = {
  projects: [
    {
      displayName: "backend",
      testEnvironment: "node",
      testMatch: ["<rootDir>/server/__tests__/**/*.spec.js"]
    },
    {
      displayName: "frontend",
      testEnvironment: "jsdom",
      testMatch: ["<rootDir>/public/__tests__/**/*.spec.js"],
      setupFilesAfterEnv: ["<rootDir>/public/__tests__/setup.js"],
      testPathIgnorePatterns: ["<rootDir>/public/__tests__/helpers.js"],
    },
  ],
};
