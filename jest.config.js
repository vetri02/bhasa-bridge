require('dotenv').config({ path: '.env.local' });
module.exports = {
    testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
    setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
    transform: {
        '^.+\\.(t|j)sx?$': ['@swc/jest'],
    },
  };
  