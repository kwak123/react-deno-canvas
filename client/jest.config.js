module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFiles: ["jest-canvas-mock"],
  setupFilesAfterEnv: ["./setupTest.ts"],
}
