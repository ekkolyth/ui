#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const [tag = 'latest', version] = process.argv.slice(2);

if (!version) {
  console.error('Usage: node scripts/publish.js [dev|latest] <version>');
  console.error('Example: node scripts/publish.js dev 0.0.1');
  console.error('Example: node scripts/publish.js latest 0.1.0');
  process.exit(1);
}

const packageJsonPath = join(__dirname, '..', 'package.json');
const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));

// Determine the actual version string
let versionString = version;
if (tag === 'dev') {
  // For dev, append -dev if not already present
  if (!version.includes('-dev')) {
    versionString = `${version}-dev`;
  }
}

// Update package.json
packageJson.version = versionString;
writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');

try {
  // Build
  console.log(`Building...`);
  execSync('bun run build', { stdio: 'inherit' });
  
  // Commit changes
  console.log(`Committing version ${versionString}...`);
  execSync(`git add package.json`, { stdio: 'inherit' });
  execSync(`git commit -m "chore: bump version to ${versionString}"`, { stdio: 'inherit' });
  
  // Create and push tag
  const tagName = tag === 'dev' ? `dev-v${version}` : `v${version}`;
  console.log(`Creating tag ${tagName}...`);
  execSync(`git tag ${tagName}`, { stdio: 'inherit' });
  
  // Push commit and tag
  console.log(`Pushing to origin...`);
  execSync(`git push origin HEAD`, { stdio: 'inherit' });
  execSync(`git push origin ${tagName}`, { stdio: 'inherit' });
  
  console.log(`\n✅ Published ${versionString} to ${tag} tag`);
  console.log(`   Tag: ${tagName}`);
  console.log(`   GitHub Actions will publish to npm automatically`);
} catch (error) {
  console.error('Error during publish:', error.message);
  process.exit(1);
}
