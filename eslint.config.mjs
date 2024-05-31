import globals from 'globals';
import tseslint from 'typescript-eslint';
import eslint from '@eslint/js';
export default [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      'no-unused-vars': 'error',
      'no-unused-expressions': 'error',
      'prefer-const': 'error',
      'no-console': 'warn',
      'no-undef': 'error',
    },
    ignores: ['**/node_modules/', '.dist/'],
    languageOptions: { globals: globals.browser },
  },
];
