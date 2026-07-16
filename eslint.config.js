import eslintPluginAstro from 'eslint-plugin-astro';
import tsParser from '@typescript-eslint/parser';

export default [
  {
    ignores: ['dist/', '.astro/', 'node_modules/'],
  },
  // Recommended Astro rules plus the plugin's jsx-a11y config, which applies
  // accessibility linting to Astro templates.
  ...eslintPluginAstro.configs['flat/recommended'],
  ...eslintPluginAstro.configs['flat/jsx-a11y-recommended'],
  {
    files: ['**/*.astro'],
    languageOptions: {
      parserOptions: {
        // Component frontmatter and <script> blocks are TypeScript.
        parser: tsParser,
        extraFileExtensions: ['.astro'],
      },
    },
  },
  {
    // Inline <script> blocks are extracted by the plugin as virtual TS files.
    files: ['**/*.astro/*.ts', '**/*.astro/*.js'],
    languageOptions: {
      parser: tsParser,
    },
  },
];
