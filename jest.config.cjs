module.exports = {
  transform: {
    "^.+\\.(j|t)s(x?)$": "@swc/jest",
  },

  moduleNameMapper: {
    "\\.css$": "identity-obj-proxy",
  },

  testEnvironment: "jsdom",

  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}", "!src/tests/**/*.ts"],
  coverageDirectory: "<rootDir>/coverage",
  coverageReporters: ["text-summary", "html"],
};
