#!/usr/bin/env node
/**
 * SiteDrift Bypass Scaffold Tool
 * Usage: npm run new-bypass <domain>
 * Example: npm run new-bypass example.com
 */

import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';

const domain = process.argv[2];

if (!domain) {
  console.error('Usage: npm run new-bypass <domain>');
  console.error('Example: npm run new-bypass example.com');
  process.exit(1);
}

// Generate class name from domain
const className = domain
  .split('.')[0]
  .replace(/[^a-zA-Z0-9]/g, '')
  .replace(/^./, (c) => c.toUpperCase());

// Determine folder by first character
const firstChar = className.charAt(0).toLowerCase();
const folder = /[0-9]/.test(firstChar) ? '0-9' : firstChar;
const bypassDir = path.join(__dirname, '..', 'src', 'bypasses', folder);
const fileName = `${className.toLowerCase()}.ts`;
const filePath = path.join(bypassDir, fileName);

// Check if file already exists
if (fs.existsSync(filePath)) {
  console.error(`❌ Bypass already exists: ${filePath}`);
  process.exit(1);
}

// Ask if ensure_dom is needed
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Does this bypass need DOM to be loaded? (y/N): ', (answer) => {
  const ensureDom = answer.toLowerCase() === 'y';

  const template = `import BypassDefinition from '../BypassDefinition'

export default class ${className} extends BypassDefinition {
    constructor() {
        super()${ensureDom ? '\n        this.ensure_dom = true' : ''}
    }

    execute() {
        // TODO: Implement bypass logic
    }
}

export const matches = ['${domain}']
`;

  // Create directory if needed
  fs.mkdirSync(bypassDir, { recursive: true });
  fs.writeFileSync(filePath, template);

  console.log(`✅ Created bypass: ${filePath}`);
  console.log(`   Class: ${className}`);
  console.log(`   Domain: ${domain}`);
  console.log(`   ensure_dom: ${ensureDom}`);

  rl.close();
});
