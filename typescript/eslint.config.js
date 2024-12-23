import { Linter } from 'eslint';
import typescriptParser from '@typescript-eslint/parser';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import importPlugin from 'eslint-plugin-import';

export default {
  files: [
    '**/*.ts',
  ],
  ignores: [
    'node_modules',
    'dist',
    'build'
  ],
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    parser: typescriptParser,
    parserOptions: {
      project: './tsconfig.json'
    }
  },
  plugins: {
    '@typescript-eslint': typescriptPlugin,
    import: importPlugin
  },
  rules: {
    '@typescript-eslint/no-unused-vars': ['error'],
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-floating-promises': 'error',
    'import/order': [
      'error',
      {
        groups: [
          ['builtin', 'external'],
          ['internal', 'parent', 'sibling', 'index']
        ],
        pathGroups: [
          {
            pattern: '@/src/**',
            group: 'internal',
            position: 'after'
          },
          {
            pattern: '@/test/**',
            group: 'internal',
            position: 'after'
          }
        ],
        alphabetize: { order: 'asc', caseInsensitive: true }
      }
    ],
    quotes: ['error', 'single', { avoidEscape: true }],
  }
}
