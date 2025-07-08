// @ts-check

import eslintJs from '@eslint/js';
import eslintReact from '@eslint-react/eslint-plugin';
import tseslint from 'typescript-eslint';
import prettierRecommended from 'eslint-plugin-prettier/recommended';

export default tseslint.config(
  {
    // Apply to all TypeScript and TypeScript JSX files
    files: ['**/*.ts', '**/*.tsx'],
    extends: [
      eslintJs.configs.recommended, // Basic ESLint recommended rules
      ...tseslint.configs.recommended, // TypeScript-specific recommended rules
      eslintReact.configs['recommended-typescript'], // Recommended rules for React with TypeScript
      prettierRecommended,
    ],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        // Essential for type-aware linting
        project: ['./tsconfig.json', './tsconfig.eslint.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      react: {
        version: 'detect', // Automatically detect the React version
      },
    },
    rules: {
      // Add or override specific rules here
      // For example, to loosen some common React/TypeScript rules:
      '@typescript-eslint/no-unused-vars': 'warn',
      'react/prop-types': 'off', // Often not needed with TypeScript
      'react/react-in-jsx-scope': 'off', // Not needed for React 17+ JSX transform
      '@eslint-react/no-missing-key': 'warn', // Example React-specific rule
      // Add more custom rules as needed
    },
  },
  {
    // Optionally, exclude certain files or directories from linting
    ignores: [
      'node_modules/',
      'dist/',
      'build/',
      // Add other files/directories to ignore
    ],
  },
);
