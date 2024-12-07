module.exports = {
  transform: {
    "^.+\\.js$": "@swc/jest",
  },

  moduleNameMapper: {
    "\\.css$": "identity-obj-proxy",
  },

  testEnvironment: "jsdom",

  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.js", "!src/tests/**/*.js"],
  coverageDirectory: "<rootDir>/coverage",
  coverageReporters: ["text-summary", "html"],
};
