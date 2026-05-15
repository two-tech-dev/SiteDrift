#!/usr/bin/env node
/**
 * SiteDrift Bypass Health Monitor
 * Checks if domains in bypass modules are still alive.
 * Usage: npm run health-check
 */

import * as fs from 'fs';
import * as path from 'path';

const BYPASSES_DIR = path.join(__dirname, '..', 'src', 'bypasses');
const TIMEOUT_MS = 5000;

interface BypassInfo {
  file: string;
  domains: string[];
}

function extractDomains(filePath: string): string[] {
  const content = fs.readFileSync(filePath, 'utf-8');
  const matchLine = content.match(/export\s+const\s+matches\s*=\s*\[([\s\S]*?)\]/);
  if (!matchLine) return [];

  return matchLine[1]
    .split(',')
    .map((s) => s.trim().replace(/['"]/g, '').trim())
    .filter((s) => s && !s.startsWith('/') && !s.includes('*'));
}

function scanBypasses(dir: string): BypassInfo[] {
  const results: BypassInfo[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...scanBypasses(fullPath));
    } else if (entry.name.endsWith('.ts') && entry.name !== 'BypassDefinition.ts') {
      const domains = extractDomains(fullPath);
      if (domains.length > 0) {
        results.push({
          file: path.relative(path.join(__dirname, '..'), fullPath),
          domains,
        });
      }
    }
  }
  return results;
}

async function checkDomain(domain: string): Promise<{ alive: boolean; status: string }> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(`https://${domain}`, {
      method: 'HEAD',
      signal: controller.signal,
      redirect: 'follow',
    });
    clearTimeout(timer);
    return { alive: true, status: `${res.status}` };
  } catch (err: any) {
    clearTimeout(timer);
    if (err.name === 'AbortError') {
      return { alive: false, status: 'TIMEOUT' };
    }
    // Try HTTP fallback
    try {
      const res2 = await fetch(`http://${domain}`, {
        method: 'HEAD',
        signal: AbortSignal.timeout(TIMEOUT_MS),
        redirect: 'follow',
      });
      return { alive: true, status: `${res2.status} (http)` };
    } catch {
      return { alive: false, status: err.cause?.code || 'UNREACHABLE' };
    }
  }
}

async function main() {
  console.log('🔍 Scanning bypass modules...\n');
  const bypasses = scanBypasses(BYPASSES_DIR);
  console.log(`Found ${bypasses.length} bypass modules with ${bypasses.reduce((a, b) => a + b.domains.length, 0)} domains.\n`);

  const dead: { file: string; domain: string; status: string }[] = [];
  const alive: string[] = [];

  for (const bypass of bypasses) {
    for (const domain of bypass.domains) {
      process.stdout.write(`  Checking ${domain}... `);
      const result = await checkDomain(domain);
      if (result.alive) {
        console.log(`✅ ${result.status}`);
        alive.push(domain);
      } else {
        console.log(`❌ ${result.status}`);
        dead.push({ file: bypass.file, domain, status: result.status });
      }
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log(`\n📊 Results: ${alive.length} alive, ${dead.length} dead\n`);

  const autoDelete = process.argv.includes('--auto-delete');
  const deletedFiles: string[] = [];

  if (dead.length > 0) {
    console.log('❌ Dead domains:');
    for (const d of dead) {
      console.log(`  ${d.domain} (${d.status}) → ${d.file}`);
    }

    if (autoDelete) {
      console.log('\n🗑️ Auto-delete is enabled. Checking for files to remove...');
      
      // Group dead domains by file
      const deadByFile = dead.reduce((acc, curr) => {
        acc[curr.file] = acc[curr.file] || [];
        acc[curr.file].push(curr.domain);
        return acc;
      }, {} as Record<string, string[]>);

      // Group total domains by file
      const totalByFile = bypasses.reduce((acc, curr) => {
        acc[curr.file] = curr.domains;
        return acc;
      }, {} as Record<string, string[]>);

      // Delete file only if ALL its domains are dead
      for (const [file, deadDomains] of Object.entries(deadByFile)) {
        const totalDomains = totalByFile[file];
        if (deadDomains.length === totalDomains.length) {
          try {
            fs.unlinkSync(path.join(__dirname, '..', file));
            console.log(`  [DELETED] ${file} (all ${deadDomains.length} domains dead)`);
            deletedFiles.push(file);
          } catch (err: any) {
            console.error(`  [ERROR] Failed to delete ${file}: ${err.message}`);
          }
        } else {
          console.log(`  [SKIPPED] ${file} (only ${deadDomains.length}/${totalDomains.length} domains dead)`);
        }
      }
    }
  } else {
    console.log('🎉 All domains are alive!');
  }

  // If running in CI with auto-delete and files were deleted, we want to exit 0 so the workflow can create a PR
  // If we want it to fail CI on dead links when not auto-deleting, we could exit 1. But let's keep it 0 to avoid red X's unless requested.
}

main().catch(console.error);
