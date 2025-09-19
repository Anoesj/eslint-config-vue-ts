# @anoesj/eslint-config-vue-ts
This is an opiniated set of ESLint rules for Vue and Nuxt projects using TypeScript. It extends:
- `@eslint/js` [recommended rules](https://eslint.org/docs/latest/use/configure/configuration-files#using-predefined-configurations)
- `typescript-eslint` [recommended rules](https://typescript-eslint.io/users/configs/#recommended)
- `@stylistic/eslint-plugin` [recommended rules](https://eslint.style/guide/config-presets)
- `eslint-plugin-vue` [recommended rules](https://eslint.vuejs.org/rules/#priority-c-recommended-potentially-dangerous-patterns)
- and a bunch of opiniated rules on top of that

## Installation
Install using your Node.js package manager of choice:
```bash
pnpm i -D @anoesj/eslint-config-vue-ts
```

You need to have NPM package `eslint` installed in order to start using ESLint with this configuration. Assuming your IDE of choice is VSCode, it's recommended to install [VSCode plugin "ESLint" by Dirk Baeumer](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and set it up as follows in your VSCode workspace's `settings.json`:
```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll": "never", // optional
    "source.fixAll.eslint": "explicit"
  },
  "eslint.format.enable": true,
}
```

## Usage
In your `eslint.config.js` file, write the following for a simple, default setup:
```js
// @ts-check
import vueTsEslint from '@anoesj/eslint-config-vue-ts';

export default vueTsEslint();
```

When you want to add more rules of your own and you want a type checking on your config file, use `defineConfig` from `eslint/config`:
```js
// @ts-check
import vueTsEslint from '@anoesj/eslint-config-vue-ts';
import { defineConfig } from 'eslint/config';

export default defineConfig(
  ...vueTsEslint(),
  {
    files: ['src/components/**/*Icon*.vue'],
    rules: {
      // Disable max-len for icon components, as they usually contain long SVG paths
      '@stylistic/max-len': 'off',
    },
  },
);
```

If this causes any type errors, what may be happening is that another package is installing `@types/eslint`, which is a package that can be removed entirely. Using `pnpm` `overrides` in your `pnpm-workspace.yaml` or `package.json`, you can prevent the installation of the package:

#### pnpm-workspace.yaml
```yaml
overrides:
  '@types/eslint': '-'
```

#### package.json
```json
{
  "pnpm": {
    "overrides": {
      "@types/eslint": "-"
    }
  }
}
```

### Configuration
You can pass an object to configure some options:
- `ignores`: override the default list of files to ignore
- `files`: override the default list of files to lint
- `rules`: add or override the default rules

**Example:**
```js
// @ts-check
import vueTsEslint, {
  defaultIgnores,
  defaultFiles,
} from '@anoesj/eslint-config-vue-ts';

export default vueTsEslint({
  ignores: [
    ...defaultIgnores,
    'cypress/**',
    '.nuxt-e2e-build/**',
  ],
  files: defaultFiles.filter((file) => !file.includes('js')),
  rules: {
    '@stylistic/max-len': 'off',
  },
});
```

## Development
### Maintenance
This is a project I mainly use for my own projects, but feel free to use it if you like it. I may not always be able to keep up with the latest changes in the ESLint ecosystem. Also, know that I may introduce breaking changes without notice, but I'll try to keep this `README.md` up-to-date.

If you have any suggestions or improvements, feel free to open an issue or a pull request. I may not respond immediately, but I'll try to get back to you as soon as possible.

### Other
- This is written in TypeScript and converted to `.js` & `.d.ts` files using `tsdown`.
- I lint this project using itself, using experimental `eslint.config.ts` file loading (requires `jiti` + ESLint `unstable_ts_config` flag).

## More
See https://eslint.org/docs/developer-guide/shareable-configs for more info on shareable ESLint configs.

Run `pnpx @eslint/config-inspector@latest` (or `npx`, `bunx` etc.) to inspect the rules in your project in order to debug your ESLint config.
