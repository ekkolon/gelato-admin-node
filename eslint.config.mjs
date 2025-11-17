// eslint.config.mjs
import js from '@eslint/js';
import ts from 'typescript-eslint';
import node from 'eslint-plugin-n';
import prettier from 'eslint-plugin-prettier';

export default [
  {
    ignores: ['lib/**', 'node_modules/**'],
  },
  {
    files: ['**/*.js'],
    plugins: {
      n: node,
      prettier: prettier,
    },

    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },

    rules: {
      ...js.configs.recommended.rules,
      ...node.configs['flat/recommended'].rules,

      'prettier/prettier': ['error', { endOfLine: 'auto' }],
      'block-scoped-var': 'error',
      eqeqeq: 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'eol-last': 'error',
      'prefer-arrow-callback': 'error',
      'no-trailing-spaces': 'error',
      quotes: ['warn', 'single', { avoidEscape: true }],
      'no-restricted-properties': [
        'error',
        { object: 'describe', property: 'only' },
        { object: 'it', property: 'only' },
      ],
    },
  },

  // -----------------------
  // TypeScript overrides
  // -----------------------
  ...ts.configs.recommended.map((config) => ({
    ...config,
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      '@typescript-eslint': ts.plugin,
      n: node,
      prettier: prettier,
    },

    languageOptions: {
      parser: ts.parser,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },

    rules: {
      ...config.rules,

      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-use-before-define': 'off',
      '@typescript-eslint/no-warning-comments': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/camelcase': 'off',

      'n/no-missing-import': 'off',
      'n/no-empty-function': 'off',
      'n/no-unsupported-features/es-syntax': 'off',
      'n/no-missing-require': 'off',
      'n/shebang': 'off',
      'no-dupe-class-members': 'off',
      'require-atomic-updates': 'off',
    },
  })),
];
