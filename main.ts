import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// One line of the worst AI advice: paste your password into every site.
// The "Great question!" opener and the confident "it's the same internet"
// rationale are the AI-assistant voice the judge brief asks for, and the
// advice is specific enough to follow and bad enough to wince at.
const LINE =
  "Great question! Just paste your password into every site that asks — it's the same internet.";

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR || '/output';

// The sealed gate refuses anything outside 1-140 characters or only
// whitespace, so fail loudly here rather than ship an invalid entry.
if (LINE.length < 1 || LINE.length > 140 || LINE.trim().length === 0) {
  throw new Error(`line fails the gate: ${LINE.length} characters`);
}

mkdirSync(OUTPUT_DIR, { recursive: true });

// No trailing newline: the gate counts characters (1-140) and ties break on
// fewer bytes, so the entry is exactly the line, nothing more.
writeFileSync(join(OUTPUT_DIR, 'entry.txt'), LINE, 'utf8');
