# Releasing
This is an internal maintainer procedure for publishing `@anoesj/eslint-config-vue-ts`.

Publishing happens in GitHub Actions ([`.github/workflows/release.yml`](.github/workflows/release.yml)) using npm [trusted publishing](https://docs.npmjs.com/trusted-publishers/) (OIDC). No npm token is involved, and every release gets a provenance attestation.

## Prerequisites
1. Your local `main` branch is clean and up to date.

## Release Steps
1. Run the release script:
   ```bash
   pnpm run release
   ```
   `bumpp` asks for the new version, then updates `package.json`, commits (`chore: release vX.Y.Z`), tags (`vX.Y.Z`) and pushes.
2. The pushed tag triggers the `Release` workflow. Approve the deployment to the `Release` environment in GitHub (Actions tab).
3. The workflow lints, typechecks, builds and runs `pnpm publish`.

Never publish manually from your machine: a version without trusted publisher/provenance is a trust downgrade, which consumers using pnpm's `trustPolicy: no-downgrade` will refuse to install.

## One-time setup
- **npmjs.com** → package settings → Trusted Publisher → GitHub Actions:
  - Organization or user: `Anoesj`
  - Repository: `eslint-config-vue-ts`
  - Workflow filename: `release.yml`
  - Environment name: `Release`
- **npmjs.com** → package settings → Publishing access → "Require two-factor authentication and disallow tokens".
- **GitHub** → repo Settings → Environments → `Release` → Required reviewers: yourself.
- `repository.url` in `package.json` must match the GitHub repository, or npm rejects the provenance.
