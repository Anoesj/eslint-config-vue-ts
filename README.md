# @anoesj/eslint-config-anoesj-vue-ts
This is an opiniated set of ESLint rules for Vue and Nuxt projects using TypeScript. It extends:
- `@eslint/js` [recommended rules](https://eslint.org/docs/latest/use/configure/configuration-files#using-predefined-configurations)
- `typescript-eslint` [recommended rules](https://typescript-eslint.io/users/configs/#recommended)
- `@stylistic/eslint-plugin` [recommended rules](https://eslint.style/guide/config-presets)
- `eslint-plugin-vue` [recommended rules](https://eslint.vuejs.org/rules/#priority-c-recommended-potentially-dangerous-patterns)
- and a bunch of opiniated rules on top of that

## Installation
Install using your Node.js package manager of choice:
```bash
pnpm i -D github:anoesj/eslint-config-anoesj-vue-ts
```

You need to have NPM package `eslint` installed in order to start using ESLint with this configuration. Assuming your IDE of choice is VSCode, it's recommended to install [VSCode plugin "ESLint" by Dirk Baeumer](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and set it up as follows in your VSCode workspace's `settings.json`:
```json
{
  "editor.codeActionsOnSave": {
    // "source.fixAll": "never", // optional
    "source.fixAll.eslint": "explicit"
  },
}
```

## Usage
### Without type checking
```js
import vueTsEslint from '@anoesj/eslint-config-anoesj-vue-ts';

export default [
  ...vueTsEslint,
];
```

### With type checking
```js
import vueTsEslint from '@anoesj/eslint-config-anoesj-vue-ts';
import { config } from 'typescript-eslint';

export default config(
  ...vueTsEslint,
);
```

## More
See https://eslint.org/docs/developer-guide/shareable-configs for more info on shareable ESLint configs.

Run `pnpx @eslint/config-inspector@latest` (or `npx`, `bunx` etc.) to inspect the rules in your project in order to debug your ESLint config.
