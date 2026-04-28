export default {
  testEnvironment: "node",
  transform: {},
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  // MongoMemoryServer runs a separate mongod process; keep workers single to avoid spawn issues.
  maxWorkers: 1,
};
