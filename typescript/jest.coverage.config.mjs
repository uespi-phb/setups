import baseConfig from './jest.config.mjs'

/** @type {import('ts-jest').JestConfigWithTsJest} */
const coverageConfig = {
  ...baseConfig,
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: ['lcov', 'text'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!<rootDir>/types/**/*.d.ts'],
  coveragePathIgnorePatterns: ['/src/.*index\\.ts', '/src/main\\.ts'],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
}

export default coverageConfig
