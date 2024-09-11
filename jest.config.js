module.exports = {
  transformIgnorePatterns: [
    "/node_modules/(?!(axios)/)", // Allow Jest to transform axios
  ],
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",
  },
  testEnvironment: "jsdom",
};
