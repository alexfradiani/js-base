module.exports = {
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/__tests__/callbacks.js'],
  testRegex: '/__tests__/.*.spec.js$',
  collectCoverageFrom: [
    '**/src/**',
    '!**/src/config/**',
    '!**/src/server.js',
    '!**/src/database/connection.js',
    '!**/src/database/seeds/**'
  ]
};
