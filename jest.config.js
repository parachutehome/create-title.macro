/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

module.exports = {
  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: "v8",

  // The root directory that Jest should scan for tests and modules within
  rootDir: "dist/__tests__/",

  // The test environment that will be used for testing
  testEnvironment: "node",

  // The glob patterns Jest uses to detect test files
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],
};
