# @anoesj/eslint-config-anoesj-nuxt
This is an opiniated set of ESLint rules for Nuxt projects using TypeScript. It extends:
- `@eslint/js` [recommended rules](https://eslint.org/docs/latest/use/configure/configuration-files#using-predefined-configurations)
- `typescript-eslint` [recommended rules](https://typescript-eslint.io/users/configs/#recommended)
- `eslint-plugin-vue` [recommended rules](https://eslint.vuejs.org/rules/#priority-c-recommended-potentially-dangerous-patterns)
- and a bunch of opiniated rules on top of that

## Installation
Install using your Node.js package manager of choice:
```bash
pnpm i -D github:anoesj/eslint-config-anoesj-nuxt
```

You need to have NPM package `eslint` installed in order to start using ESLint with this configuration. Assuming your IDE of choice is VSCode, it's recommended to install [VSCode plugin "ESLint" by Dirk Baeumer](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and set it up as follows in your VSCode workspace's `settings.json`:
```json
{
  "editor.codeActionsOnSave": {
    // "source.fixAll": "never", // optional
    "source.fixAll.eslint": "explicit"
  },
  "eslint.packageManager": "pnpm",
  "eslint.validate": [
    "javascript",
  ],
}
```

Usage:
```js
import nuxtEslint from '@anoesj/eslint-config-anoesj-nuxt';

export default [
  {
    ...nuxtEslint,
  },
];
```

See https://eslint.org/docs/developer-guide/shareable-configs for more info on shareable ESLint configs.
