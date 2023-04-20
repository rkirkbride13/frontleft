/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/src/spec/**/*.test.ts", "**/src/spec/**/*.spec.ts"],
};
