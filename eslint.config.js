// eslint.config.js
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const reactPlugin = require('eslint-plugin-react');
const simpleImportSort = require('eslint-plugin-simple-import-sort');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*'],
    plugins: {
      react: reactPlugin,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      // Unnecessary brackets in jsx props e.g {"test"}
      'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'ignore' }],
      // Jsx props sorting
      'react/jsx-sort-props': [
        'error',
        {
          callbacksLast: true,
          shorthandFirst: true,
          ignoreCase: true,
          noSortAlphabetically: false,
          reservedFirst: true,
        },
      ],

      // Import sorting — alias first, fully alphabetized, no blank lines
      'simple-import-sort/imports': [
        'error',
        {
          groups: [['^']], // <— match everything in a single group to avoid blank lines between import groups
        },
      ],
      // Export sorting
      'simple-import-sort/exports': 'error',
    },
    settings: {
      react: { version: 'detect' },
    },
  },
]);
