import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    next: 'src/next.tsx',
    tanstack: 'src/tanstack.tsx',
    'providers/next-theme-provider': 'src/components/theme/providers/next-theme-provider.tsx',
    'providers/tanstack-theme-provider': 'src/components/theme/providers/tanstack-theme-provider.tsx',
  },
  format: ['esm'],
  dts: true,
  outDir: 'dist',
  clean: true,
  splitting: false,
  sourcemap: false,
  treeshake: true,
  tsconfig: 'tsconfig.build.json',
})
