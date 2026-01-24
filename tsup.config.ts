import { defineConfig } from 'tsup';
import {
  copyFileSync,
  mkdirSync,
  existsSync,
  readFileSync,
  writeFileSync,
} from 'fs';
import { resolve } from 'path';
import postcss from 'postcss';
import postcssImport from 'postcss-import';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    next: 'src/next.tsx',
    tanstack: 'src/tanstack.tsx',
    'providers/next': 'src/components/themes/components/providers/next.tsx',
    'providers/tanstack':
      'src/components/themes/components/providers/tanstack.tsx',
    'themes/theme-toggle':
      'src/components/themes/components/theme-toggle/index.tsx',
    'themes/theme-select':
      'src/components/themes/components/theme-select/index.tsx',
  },
  format: ['esm'],
  dts: true,
  outDir: 'dist',
  clean: true,
  splitting: false,
  sourcemap: false,
  treeshake: true,
  tsconfig: 'tsconfig.build.json',
  onSuccess: async () => {
    // Copy catpuccin themes
    const catpuccinDir = 'dist/catpuccin';
    if (!existsSync(catpuccinDir)) {
      mkdirSync(catpuccinDir, { recursive: true });
    }
    copyFileSync(
      'src/components/themes/catpuccin/latte.css',
      'dist/catpuccin/latte.css',
    );
    copyFileSync(
      'src/components/themes/catpuccin/frappe.css',
      'dist/catpuccin/frappe.css',
    );
    copyFileSync(
      'src/components/themes/catpuccin/macchiato.css',
      'dist/catpuccin/macchiato.css',
    );
    copyFileSync(
      'src/components/themes/catpuccin/mocha.css',
      'dist/catpuccin/mocha.css',
    );

    // Copy individual theme files
    copyFileSync('src/components/themes/ekko-os/index.css', 'dist/ekko-os.css');
    copyFileSync(
      'src/components/themes/tokyo-night/index.css',
      'dist/tokyo-night.css',
    );
    copyFileSync(
      'src/components/themes/ekkolyth/index.css',
      'dist/ekkolyth.css',
    );
    copyFileSync(
      'src/components/themes/ekko-playlist/index.css',
      'dist/ekko-playlist.css',
    );

    // Process main theme index.css with PostCSS to bundle all imports
    const themeIndexCss = readFileSync(
      'src/components/themes/index.css',
      'utf-8',
    );

    const result = await postcss([
      postcssImport({
        path: ['src/components/themes', 'node_modules'],
        resolve: (id, basedir, importOptions) => {
          // Handle shadcn/tailwind.css special case
          if (id === 'shadcn/tailwind.css') {
            return resolve('node_modules/shadcn/dist/tailwind.css');
          }
          return id;
        },
      }),
    ]).process(themeIndexCss, {
      from: 'src/components/themes/index.css',
      to: 'dist/themes.css',
    });

    writeFileSync('dist/themes.css', result.css);
    console.log('✓ Bundled themes.css with all imports inlined');
  },
});
