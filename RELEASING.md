# Releasing
This is an internal maintainer procedure for publishing `@anoesj/eslint-config-vue-ts`.

## Prerequisites
1. You have publish access to the package on npm.
2. You are authenticated in npm on your machine.
3. Your local `main` branch is clean and up to date.

## Release Steps
1. Build artifacts locally:
   ```bash
   pnpm build
   ```
2. Run the release script:
   ```bash
   pnpm release
   ```

## What `pnpm release` does
`pnpm release` runs:

```bash
bumpp && pnpm publish --access public
```

- `bumpp` bumps `package.json` version and (by default) creates release commit/tag/push.
- `pnpm publish --access public` publishes the local package contents to npm.

Only the `dist` directory is included in the published package (`files: ["dist"]`), so building before release is required.
