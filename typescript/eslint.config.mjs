import js from '@eslint/js'
import { defineConfig } from 'eslint/config'
import globals from 'globals'
import importPlugin from 'eslint-plugin-import'
import jestPlugin from 'eslint-plugin-jest'
import nPlugin from 'eslint-plugin-n'
import promisePlugin from 'eslint-plugin-promise'
import eslintConfigPrettier from 'eslint-config-prettier'
import tseslint from 'typescript-eslint'

const sharedTypeScriptRules = {
  '@typescript-eslint/no-unused-vars': [
    'warn',
    {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
      caughtErrorsIgnorePattern: '^_',
    },
  ],
  '@typescript-eslint/consistent-type-imports': [
    'error',
    {
      prefer: 'type-imports',
      fixStyle: 'inline-type-imports',
    },
  ],
  '@typescript-eslint/no-floating-promises': 'error',
  '@typescript-eslint/no-misused-promises': 'error',
  '@typescript-eslint/await-thenable': 'error',
  'import/no-unresolved': 'error',
  'import/order': [
    'error',
    {
      groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
      pathGroups: [
        {
          pattern: '@features/**',
          group: 'internal',
          position: 'after',
        },
        {
          pattern: '@shared/**',
          group: 'internal',
          position: 'after',
        },
      ],
      pathGroupsExcludedImportTypes: ['builtin'],
      alphabetize: {
        order: 'asc',
        caseInsensitive: true,
      },
      'newlines-between': 'always',
    },
  ],
  'promise/catch-or-return': 'error',
  'promise/no-return-wrap': 'error',
  'n/no-missing-import': 'off',
}

export default defineConfig([
  {
    ignores: ['build/**', 'coverage/**', 'node_modules/**'],
  },

  js.configs.recommended,

  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      import: importPlugin,
      promise: promisePlugin,
      n: nPlugin,
    },
    rules: {
      'no-debugger': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'promise/catch-or-return': 'error',
      'promise/no-return-wrap': 'error',
      'n/no-missing-import': 'off',
    },
  },

  {
    files: ['src/**/*.ts', 'types/**/*.d.ts'],
    extends: [...tseslint.configs.recommendedTypeChecked],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      import: importPlugin,
      promise: promisePlugin,
      n: nPlugin,
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
      },
    },
    rules: {
      'no-debugger': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      '@typescript-eslint/no-explicit-any': 'error',
      ...sharedTypeScriptRules,
    },
  },

  {
    files: ['test/**/*.ts'],
    extends: [...tseslint.configs.recommendedTypeChecked],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.test.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      import: importPlugin,
      jest: jestPlugin,
      promise: promisePlugin,
      n: nPlugin,
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.test.json',
        },
      },
    },
    rules: {
      'no-debugger': 'error',
      'no-console': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      ...sharedTypeScriptRules,
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/valid-expect': 'error',
      'jest/prefer-to-have-length': 'warn',
    },
  },

  eslintConfigPrettier,
])
