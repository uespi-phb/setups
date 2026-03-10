import { readFileSync } from 'node:fs'
import { pathsToModuleNameMapper } from 'ts-jest'

const tsconfig = JSON.parse(readFileSync(new URL('./tsconfig.test.json', import.meta.url), 'utf8'))

/** @type {import('ts-jest').JestConfigWithTsJest} */
const config = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  verbose: true,
  clearMocks: true,
  restoreMocks: true,
  extensionsToTreatAsEsm: ['.ts'],
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: './tsconfig.test.json',
      },
    ],
  },
  moduleNameMapper: {
    ...pathsToModuleNameMapper(tsconfig.compilerOptions?.paths ?? {}, {
      prefix: '<rootDir>/',
    }),
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  moduleFileExtensions: ['ts', 'js', 'json'],
  testMatch: ['<rootDir>/test/**/*.spec.ts', '<rootDir>/test/**/*.test.ts'],
}

export default config
