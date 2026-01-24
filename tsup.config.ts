import { defineConfig } from "tsup";
import {
  copyFileSync,
  mkdirSync,
  existsSync,
  readFileSync,
  writeFileSync,
} from "fs";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    next: "src/next.tsx",
    tanstack: "src/tanstack.tsx",
    "providers/next": "src/components/themes/components/providers/next.tsx",
    "providers/tanstack":
      "src/components/themes/components/providers/tanstack.tsx",
    "themes/theme-toggle":
      "src/components/themes/components/theme-toggle/index.tsx",
    "themes/theme-select":
      "src/components/themes/components/theme-select/index.tsx",
  },
  format: ["esm"],
  dts: true,
  outDir: "dist",
  clean: true,
  splitting: false,
  sourcemap: false,
  treeshake: true,
  tsconfig: "tsconfig.build.json",
  onSuccess: async () => {
    // Create directories for theme files
    const themeDir = "dist/themes";
    if (!existsSync(themeDir)) {
      mkdirSync(themeDir, { recursive: true });
    }
    const catpuccinDir = "dist/catpuccin";
    if (!existsSync(catpuccinDir)) {
      mkdirSync(catpuccinDir, { recursive: true });
    }
    const themesCatpuccinDir = "dist/themes/catpuccin";
    if (!existsSync(themesCatpuccinDir)) {
      mkdirSync(themesCatpuccinDir, { recursive: true });
    }

    // Copy catpuccin theme files to both locations:
    // - dist/catpuccin/ for package.json exports (./catpuccin/*)
    // - dist/themes/catpuccin/ for internal imports from themes.css
    copyFileSync(
      "src/components/themes/catpuccin/latte.css",
      "dist/catpuccin/latte.css",
    );
    copyFileSync(
      "src/components/themes/catpuccin/latte.css",
      "dist/themes/catpuccin/latte.css",
    );
    copyFileSync(
      "src/components/themes/catpuccin/frappe.css",
      "dist/catpuccin/frappe.css",
    );
    copyFileSync(
      "src/components/themes/catpuccin/frappe.css",
      "dist/themes/catpuccin/frappe.css",
    );
    copyFileSync(
      "src/components/themes/catpuccin/macchiato.css",
      "dist/catpuccin/macchiato.css",
    );
    copyFileSync(
      "src/components/themes/catpuccin/macchiato.css",
      "dist/themes/catpuccin/macchiato.css",
    );
    copyFileSync(
      "src/components/themes/catpuccin/mocha.css",
      "dist/catpuccin/mocha.css",
    );
    copyFileSync(
      "src/components/themes/catpuccin/mocha.css",
      "dist/themes/catpuccin/mocha.css",
    );

    // Copy other theme files to both locations:
    // - dist/ for package.json exports (./ekko-os, ./tokyo-night, etc.)
    // - dist/themes/ for internal imports from themes.css
    copyFileSync(
      "src/components/themes/ekko-os/index.css",
      "dist/ekko-os.css",
    );
    copyFileSync(
      "src/components/themes/ekko-os/index.css",
      "dist/themes/ekko-os.css",
    );

    copyFileSync(
      "src/components/themes/tokyo-night/index.css",
      "dist/tokyo-night.css",
    );
    copyFileSync(
      "src/components/themes/tokyo-night/index.css",
      "dist/themes/tokyo-night.css",
    );
    copyFileSync(
      "src/components/themes/ekkolyth/index.css",
      "dist/ekkolyth.css",
    );
    copyFileSync(
      "src/components/themes/ekkolyth/index.css",
      "dist/themes/ekkolyth.css",
    );
    copyFileSync(
      "src/components/themes/ekko-playlist/index.css",
      "dist/ekko-playlist.css",
    );
    copyFileSync(
      "src/components/themes/ekko-playlist/index.css",
      "dist/themes/ekko-playlist.css",
    );

    // Copy and process main theme index.css - rewrite import paths for dist structure
    let themeIndexCss = readFileSync(
      "src/components/themes/index.css",
      "utf-8",
    );
    themeIndexCss = themeIndexCss
      .replace(
        /@import "\.\/catpuccin\/(.+)\.css";/g,
        '@import "./themes/catpuccin/$1.css";',
      )
      .replace(
        /@import "\.\/ekko-os\/index\.css";/g,
        '@import "./themes/ekko-os.css";',
      )
      .replace(
        /@import "\.\/tokyo-night\/index\.css";/g,
        '@import "./themes/tokyo-night.css";',
      )
      .replace(
        /@import "\.\/ekkolyth\/index\.css";/g,
        '@import "./themes/ekkolyth.css";',
      )
      .replace(
        /@import "\.\/ekko-playlist\/index\.css";/g,
        '@import "./themes/ekko-playlist.css";',
      );
    writeFileSync("dist/themes/index.css", themeIndexCss);

    // Also write themes.css at dist root for package.json exports compatibility
    // This version uses paths relative to dist/ root
    let themesRootCss = readFileSync(
      "src/components/themes/index.css",
      "utf-8",
    );
    themesRootCss = themesRootCss
      .replace(
        /@import "\.\/catpuccin\/(.+)\.css";/g,
        '@import "./themes/catpuccin/$1.css";',
      )
      .replace(
        /@import "\.\/ekko-os\/index\.css";/g,
        '@import "./themes/ekko-os.css";',
      )
      .replace(
        /@import "\.\/tokyo-night\/index\.css";/g,
        '@import "./themes/tokyo-night.css";',
      )
      .replace(
        /@import "\.\/ekkolyth\/index\.css";/g,
        '@import "./themes/ekkolyth.css";',
      )
      .replace(
        /@import "\.\/ekko-playlist\/index\.css";/g,
        '@import "./themes/ekko-playlist.css";',
      );
    writeFileSync("dist/themes.css", themesRootCss);
  },
});
