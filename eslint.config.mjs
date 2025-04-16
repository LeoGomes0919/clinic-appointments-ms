import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import vitestPlugin from 'eslint-plugin-vitest'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: ['dist/', 'node_modules/', 'coverage/'],
  },
  { files: ['src/**/*.{js,ts}', 'test/**/*.{js,ts}'] },
  { files: ['**/*.{js,ts}'] },
  { languageOptions: { globals: globals.node } },
  {
    plugins: {
      vitest: vitestPlugin,
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      ...vitestPlugin.configs.recommended.rules,
      'vitest/max-nested-describe': ['error', { max: 3 }],
    },
  },
  {
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
    },
  },
  eslintPluginPrettierRecommended,
]
