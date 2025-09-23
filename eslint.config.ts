import { defineConfig } from 'eslint/config';
import vueTs from './src/index.ts';

export default defineConfig(
  ...vueTs(),

  /* “Playground” for testing typed rules: */
  // {
  //   rules: {
  //     'no-console': 'warn',
  //   },
  // }
);
