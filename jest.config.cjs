module.exports = {
  transform: {
    "^.+\\.js(x?)$": "@swc/jest",
  },

  moduleNameMapper: {
    "\\.css$": "identity-obj-proxy",
  },

  testEnvironment: "jsdom",

  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{js,jsx}", "!src/tests/**/*.js"],
  coverageDirectory: "<rootDir>/coverage",
  coverageReporters: ["text-summary", "html"],
};
