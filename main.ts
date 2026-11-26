// Entry program for make.fun's post-x-promote-make-your-own-bounty-01.
// The entry itself is the X post: one post quoting make.fun's
// make-your-own-bounty post, with a photo of its own attached.
// This program does the only job the repository's code has to do:
// it hands the post's address, stored in POST.json at the repo root,
// over to the grader by copying that file into the output directory.
//
// Run it the way the grader does:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
//
// Node 22, standard library only. No network, no clock, no files
// outside the repository. The same input always writes the same bytes.

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(OUTPUT_DIR, { recursive: true });
copyFileSync(join(BOT_DIR, 'POST.json'), join(OUTPUT_DIR, 'POST.json'));

// Check the copy we just wrote: it must be one JSON object carrying
// the post's address as a string, otherwise the gate cannot read it.
const copied = JSON.parse(readFileSync(join(OUTPUT_DIR, 'POST.json'), 'utf8'));
if (typeof copied !== 'object' || copied === null || typeof copied.url !== 'string') {
  console.error('POST.json must be a JSON object with a string "url" field.');
  process.exit(1);
}
