import { defineConfig } from 'tsup';
import {
  copyFileSync,
  mkdirSync,
  existsSync,
  readFileSync,
  writeFileSync,
} from 'fs';

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
      'src/components/themes/convergence/index.css',
      'dist/convergence.css',
    );

    // Copy and process main theme index.css - rewrite import paths for dist structure
    let themeIndexCss = readFileSync(
      'src/components/themes/index.css',
      'utf-8',
    );
    themeIndexCss = themeIndexCss
      .replace(
        /@import "\.\/catpuccin\/(.+)\.css";/g,
        '@import "./catpuccin/$1.css";',
      )
      .replace(
        /@import "\.\/ekko-os\/index\.css";/g,
        '@import "./ekko-os.css";',
      )
      .replace(
        /@import "\.\/tokyo-night\/index\.css";/g,
        '@import "./tokyo-night.css";',
      )
      .replace(
        /@import "\.\/convergence\/index\.css";/g,
        '@import "./convergence.css";',
      );
    writeFileSync('dist/themes.css', themeIndexCss);
  },
});
