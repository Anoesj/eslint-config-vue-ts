// @ts-check

import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';
import vueEslintParser from 'vue-eslint-parser';
import vueEslint from 'eslint-plugin-vue';

export default tseslint.config(
  {
    ignores: [
      // Ignore compiled Nuxt files
      '.nuxt/**',
      '.output/**',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  // @ts-ignore
  // vueEslint.configs['flat/recommended'],
  {
    languageOptions: {
      globals: {
        ...globals.es2021,
        ...globals.browser,
        ...globals.node,
      },
      parser: vueEslintParser,
      parserOptions: {
        parser: tseslint.parser,
        sourceType: 'module',
        ecmaVersion: 'latest',
        ecmaFeatures: {
          jsx: false,
        },
      },
    },
    files: ['*.ts', '*.vue'],
    rules: {
      // Basic JS rules
      'no-tabs': ['error', {
        allowIndentationTabs: false,
      }],
      'indent': ['error', 2, {
        VariableDeclarator: 'first',
        SwitchCase: 1,
      }],
      'max-len': ['warn', {
        code: 140,
      }],
      'comma-dangle': ['error', {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'only-multiline', // do not require in multiline function calls, but do allow
      }],
      'comma-spacing': ['error', {
        before: false,
        after: true,
      }],
      'comma-style': ['error', 'last'],
      'brace-style': ['error', 'stroustrup', {
        allowSingleLine: false,
      }],
      'arrow-spacing': ['error', {
        before: true,
        after: true,
      }],
      'no-debugger': 'warn',
      'no-case-declarations': 'warn',
      'array-callback-return': 'warn',
      'eqeqeq': ['error', 'always', {
        // Allow usage of != null
        null: 'ignore',
      }],
      'quote-props': ['error', 'consistent-as-needed'],
      'quotes': ['error', 'single', {
        allowTemplateLiterals: true,
      }],
      'no-multi-spaces': ['warn', {
        ignoreEOLComments: true,
        exceptions: {
          BinaryExpression: false,
          ImportDeclaration: true,
          Property: true,
          VariableDeclarator: true,
        },
      }],
      'block-spacing': ['error', 'always'],
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
      'computed-property-spacing': ['error', 'never', {
        enforceForClassMembers: true,
      }],
      'keyword-spacing': ['error', {
        before: true,
        after: true,
      }],
      'space-before-blocks': 'error',
      'space-before-function-paren': 'error',
      'space-in-parens': ['error', 'never'],
      'spaced-comment': ['warn', 'always', {
        exceptions: ['*', '/'], // handles dividers
        markers: ['/'], // handles `/// <reference />` comments
      }],
      'switch-colon-spacing': ['error', {
        after: true,
        before: false,
      }],
      'template-tag-spacing': ['error', 'never'],
      'wrap-regex': 'error',
      'semi-style': ['error', 'last'],
      'arrow-body-style': 'off',
      'curly': ['warn', 'all'],
      'no-var': 'error',
      'no-confusing-arrow': 'error',
      'prefer-const': 'error',
      'prefer-destructuring': ['error', {
        object: true,
        array: false,
      }],
      'prefer-template': 'error',
      'prefer-spread': 'error',
      'rest-spread-spacing': ['error', 'never'],
      'template-curly-spacing': ['error', 'never'],
      'no-fallthrough': ['error', {
        commentPattern: 'fallthrough',
      }],

      /***********************
      *   TypeScript rules   *
      ***********************/

      // TS already checks for this, typescript-eslint recommends to disable it.
      'no-undef': 'off',

      // Replaced by @typescript-eslint/no-unused-vars
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', {
        vars: 'all',
        args: 'after-used',
        varsIgnorePattern: '^_',
        argsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      }],

      // Turned off because this has false positives on TS function overloading.
      'no-redeclare': 'off',

      // Turns off regular 'semi' rule and turns on '@typescript-eslint/semi' rule
      // instead (this will make Automatic Semicolon Insertion work with TS declarations).
      'semi': 'off',
      '@typescript-eslint/semi': ['error', 'always', {
        omitLastInOneLineBlock: false,
      }],

      // Turn off default ESLint rule that disallows TS class method overloading:
      'no-dupe-class-members': 'off',
      '@typescript-eslint/no-dupe-class-members': 'error',

      // Allows non-null assertions (!.)
      '@typescript-eslint/no-non-null-assertion': 'off',

      // Allow typing variables where types can be auto-inferred.
      '@typescript-eslint/no-inferrable-types': 'off',

      '@typescript-eslint/ban-ts-comment': ['error', {
        'ts-ignore': 'allow-with-description',
      }],

      // NOTE: Seems unneeded since `verbatimModuleSyntax`,
      // See: https://typescript-eslint.io/rules/consistent-type-imports/#comparison-with-importsnotusedasvalues--verbatimmodulesyntax
      // '@typescript-eslint/consistent-type-imports': ['error', {
      //   prefer: 'type-imports',
      //   fixStyle: 'inline-type-imports',
      // }],

      // Requires semicolons in type declarations.
      // TODO: We may need to include ESLint Stylistic rules for this. See: https://eslint.style/
      '@typescript-eslint/member-delimiter-style': ['error', {
        multiline: {
          delimiter: 'semi',
          requireLast: true,
        },
        singleline: {
          delimiter: 'semi',
          requireLast: true,
        },
        multilineDetection: 'brackets',
      }],

      /************************
       *  Vue specific rules  *
       ***********************/

      'vue/attribute-hyphenation': ['warn', 'never', {}],
      'vue/no-v-html': 'off',
      'vue/html-self-closing': ['error', {
        html: {
          void: 'never',
          normal: 'never',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      }],
      'vue/html-closing-bracket-spacing': ['warn', {
        selfClosingTag: 'never',
      }],
      'vue/singleline-html-element-content-newline': ['off', {}],
      'vue/max-attributes-per-line': ['error', {
        singleline: 2,
        multiline: 1,
      }],
      'vue/first-attribute-linebreak': ['error', {
        singleline: 'ignore',
        multiline: 'below',
      }],
      'vue/html-closing-bracket-newline': ['error', {
        singleline: 'never',
        multiline: 'always',
      }],
      'vue/script-indent': ['warn', 2, {
        baseIndent: 1,
        switchCase: 1,
        ignores: [],
      }],
      'vue/order-in-components': ['off', {
        order: [
          'el',
          'name',
          'key',
          'parent',
          'functional',
          ['delimiters', 'comments'],
          ['components', 'directives', 'filters'],
          'extends',
          'mixins',
          ['provide', 'inject'],
          'ROUTER_GUARDS',
          'layout',
          'middleware',
          'validate',
          'scrollToTop',
          'transition',
          'loading',
          'inheritAttrs',
          'model',
          ['props', 'propsData'],
          'emits',
          'setup',
          'asyncData',
          'data',
          'fetch',
          'head',
          'computed',
          'watch',
          'watchQuery',
          'LIFECYCLE_HOOKS',
          'methods',
          ['template', 'render'],
          'renderError',
        ],
      }],
      'vue/v-on-event-hyphenation': 'off',
      'vue/multi-word-component-names': 'off',
    },
  },
  {
    files: ['**/*.vue'],
    rules: {
      indent: 'off',
    },
  },
);
