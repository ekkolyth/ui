#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const version = process.argv[2];

if (!version) {
  console.error('Usage: bun run publish <version>');
  console.error('Example: bun run publish 0.0.1');
  process.exit(1);
}

const packageJsonPath = join(__dirname, '..', 'package.json');
const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));

// Update package.json
packageJson.version = version;
writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');

try {
  // Build
  console.log(`Building...`);
  execSync('bun run build', { stdio: 'inherit' });
  
  // Commit changes
  console.log(`Committing version ${version}...`);
  execSync(`git add package.json`, { stdio: 'inherit' });
  execSync(`git commit -m "chore: bump version to ${version}"`, { stdio: 'inherit' });
  
  // Create and push tag
  const tagName = `v${version}`;
  console.log(`Creating tag ${tagName}...`);
  execSync(`git tag ${tagName}`, { stdio: 'inherit' });
  
  // Push commit and tag
  console.log(`Pushing to origin...`);
  execSync(`git push origin HEAD`, { stdio: 'inherit' });
  execSync(`git push origin ${tagName}`, { stdio: 'inherit' });
  
  console.log(`\n✅ Published version ${version}`);
  console.log(`   Tag: ${tagName}`);
  console.log(`   GitHub Actions will publish to npm automatically`);
} catch (error) {
  console.error('Error during publish:', error.message);
  process.exit(1);
}
