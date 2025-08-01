import globals from 'globals';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import type { TSESLint } from '@typescript-eslint/utils';
import stylistic from '@stylistic/eslint-plugin';
import vueEslintParser from 'vue-eslint-parser';
import vueEslint from 'eslint-plugin-vue';

export const defaultIgnores = [
  // Ignore compiled Vue files
  'dist/**',
  // Ignore compiled Nuxt files
  '.nuxt/**',
  '.output/**',
];

export const defaultFiles = [
  '**/*.js',
  '**/*.mjs',
  '**/*.cjs',
  '**/*.ts',
  '**/*.mts',
  '**/*.cts',
  '**/*.vue',
];

const maxLenOptions = {
  code: 140,
  tabWidth: 2,
  comments: 140,
  ignorePattern: '',
  ignoreComments: true,
  ignoreTrailingComments: false,
  ignoreUrls: true,
  ignoreStrings: false,
  ignoreTemplateLiterals: false,
  ignoreRegExpLiterals: false,
};

export default function (options?: {
  ignores?: TSESLint.FlatConfig.Config['ignores'];
  files?: TSESLint.FlatConfig.Config['files'];
  rules?: TSESLint.FlatConfig.Config['rules'];
}) {
  return tseslint.config(
    {
      name: '@anoesj/vue-ts/ignores',
      ignores: options?.ignores ?? defaultIgnores,
    },
    js.configs.recommended as TSESLint.FlatConfig.Config,
    ...tseslint.configs.recommended,
    stylistic.configs.recommended,
    ...vueEslint.configs['flat/recommended'] as TSESLint.FlatConfig.ConfigArray,
    {
      name: '@anoesj/vue-ts/base',
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
      files: options?.files ?? defaultFiles,
      rules: {
        /***********************
        *     Basic rules      *
        ***********************/

        'no-debugger': 'warn',
        'no-case-declarations': 'warn',
        'array-callback-return': 'warn',
        'eqeqeq': ['error', 'always', {
          // Allow usage of != null
          null: 'ignore',
        }],
        'arrow-body-style': 'off',
        'curly': ['warn', 'all'],
        'no-var': 'error',
        'prefer-const': 'error',
        'prefer-destructuring': ['error', {
          object: true,
          array: false,
        }],
        'prefer-template': 'error',
        'prefer-spread': 'error',
        'no-fallthrough': ['error', {
          commentPattern: 'fallthrough',
        }],

        /***********************
        *   Stylistic rules    *
        ***********************/

        '@stylistic/indent': ['error', 2, {
          VariableDeclarator: 'first',
          SwitchCase: 1,
        }],
        // See my question at: https://github.com/eslint-stylistic/eslint-stylistic/issues/545#issuecomment-2376586842
        '@stylistic/indent-binary-ops': 'off',
        '@stylistic/max-len': ['warn', {
          ...maxLenOptions,
        }],
        '@stylistic/comma-dangle': ['error', {
          arrays: 'always-multiline',
          objects: 'always-multiline',
          imports: 'always-multiline',
          exports: 'always-multiline',
          functions: 'only-multiline', // do not require in multiline function calls, but do allow
          enums: 'always-multiline',
          generics: 'always-multiline',
          tuples: 'always-multiline',
        }],
        '@stylistic/comma-style': ['error', 'last'],
        '@stylistic/brace-style': ['error', 'stroustrup', {
          allowSingleLine: false,
        }],
        '@stylistic/quote-props': ['error', 'consistent-as-needed'],
        '@stylistic/quotes': ['error', 'single', {
          allowTemplateLiterals: 'always',
        }],
        '@stylistic/no-confusing-arrow': 'error',
        '@stylistic/no-multi-spaces': ['warn', {
          ignoreEOLComments: true,
          exceptions: {
            BinaryExpression: false,
            ImportDeclaration: true,
            Property: true,
            VariableDeclarator: true,
          },
        }],
        '@stylistic/no-tabs': ['error', {
          allowIndentationTabs: false,
        }],
        '@stylistic/array-bracket-spacing': ['error', 'never'],
        '@stylistic/arrow-spacing': ['error', {
          before: true,
          after: true,
        }],
        '@stylistic/block-spacing': ['error', 'always'],
        '@stylistic/comma-spacing': ['error', {
          before: false,
          after: true,
        }],
        '@stylistic/computed-property-spacing': ['error', 'never', {
          enforceForClassMembers: true,
        }],
        '@stylistic/keyword-spacing': ['error', {
          before: true,
          after: true,
        }],
        '@stylistic/object-curly-spacing': ['error', 'always'],
        '@stylistic/rest-spread-spacing': ['error', 'never'],
        '@stylistic/switch-colon-spacing': ['error', {
          after: true,
          before: false,
        }],
        '@stylistic/template-tag-spacing': ['error', 'never'],
        '@stylistic/template-curly-spacing': ['error', 'never'],
        '@stylistic/generator-star-spacing': ['error', 'after'],
        '@stylistic/yield-star-spacing': ['error', 'after'],
        '@stylistic/space-before-blocks': 'error',
        '@stylistic/space-before-function-paren': ['error', 'always'],
        '@stylistic/space-in-parens': ['error', 'never'],
        '@stylistic/arrow-parens': ['error', 'always'],
        '@stylistic/spaced-comment': ['warn', 'always', {
          // handles dividers
          exceptions: ['*', '/'],
          // handles `/// <reference />` comments
          markers: ['/'],
        }],
        '@stylistic/wrap-regex': 'error',
        '@stylistic/semi-style': ['error', 'last'],
        '@stylistic/semi': ['error', 'always', {
          omitLastInOneLineBlock: false,
        }],
        // There are so many ways to write a ternary, it's not worth enforcing a single style.
        '@stylistic/multiline-ternary': 'off',
        '@stylistic/operator-linebreak': ['error', 'before', {
          overrides: {
            '=': 'ignore',
            '+=': 'ignore',
            '-=': 'ignore',
            '*=': 'ignore',
            '/=': 'ignore',
          },
        }],
        // Leave to taste.
        '@stylistic/padded-blocks': 'off',
        '@stylistic/no-multiple-empty-lines': ['warn', {
          max: 2,
          maxBOF: 0,
          maxEOF: 1,
        }],
        // Not quite to taste, see discussion at: https://github.com/eslint-stylistic/eslint-stylistic/issues/244
        '@stylistic/type-generic-spacing': 'error',
        // Requires semicolons in type declarations.
        '@stylistic/member-delimiter-style': ['error', {
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
        ...(options?.rules ?? {}),
      },
    },
    {
      name: '@anoesj/vue-ts/vue-exceptions',
      files: ['**/*.vue'],
      rules: {
        '@stylistic/indent': 'off',
        '@stylistic/indent-binary-ops': 'off',
        '@stylistic/max-len': 'off',
        'vue/max-len': ['warn', {
          ...maxLenOptions,
          ignoreHTMLAttributeValues: false,
          ignoreHTMLTextContents: true,
          template: 140,
        }],
      },
    },
  );
}
