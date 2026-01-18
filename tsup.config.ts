import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: true,
  outDir: 'dist',
  clean: true,
  splitting: false,
  sourcemap: false,
  treeshake: true,
  tsconfig: 'tsconfig.build.json',
})
