import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
export default [
  { ignores: ['dist/**', '.prerender/**', 'node_modules/**', 'audits/**', 'playwright-report/**', 'test-results/**', '.netlify/**'] },
  js.configs.recommended,
  { files: ['**/*.{js,jsx,mjs,ts,tsx}'], languageOptions: { globals: { ...globals.browser, ...globals.node, __CONTENT_REVISION__: 'readonly' }, parserOptions: { ecmaFeatures: { jsx: true } } }, plugins: { 'react-hooks': reactHooks }, rules: { 'no-unused-vars': 'off', 'react-hooks/rules-of-hooks': 'error', 'no-case-declarations': 'off' } },
  { files: ['**/*.{ts,tsx}'], languageOptions: { parser: tseslint.parser }, rules: { 'no-undef': 'off' } }
];
