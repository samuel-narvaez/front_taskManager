import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/jsx-no-undef': 'error',
      'react/no-unused-prop-types': 'warn',
      'react/no-unknown-property': 'error',
      'react/style-prop-object': 'error',
      "@typescript-eslint/ban-types": "off",
      'react/jsx-filename-extension': [1, { extensions: ['.jsx', '.tsx'] }],
      'import/extensions': 'on',
      'import/no-unresolved': 'off',
      'import/no-extraneous-dependencies': 'off',
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index']
        }
      ],
      "react/prop-types": "off",
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
)
