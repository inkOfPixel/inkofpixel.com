// Shrinks the images in static/assets and updates the references in content/.
//   npm run images            optimize what needs it (safe to run again: done files are skipped)
//   npm run images -- --dry   only print what would change
//
// What it does:
//   - animated GIFs become short silent MP4 videos (needs ffmpeg), plus a .jpg poster
//   - photos and screenshots wider than MAX_WIDTH are resized
//   - large opaque PNGs become WebP (or JPEG when used as a social preview image)
//   - JPEGs are recompressed when that saves at least 10%
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const ASSETS = path.join(ROOT, 'static/assets');
const CONTENT = path.join(ROOT, 'content');
const DRY = process.argv.includes('--dry');

const MAX_WIDTH = 1600; // enough for a full-width image on a 2x screen at our column widths
const VIDEO_WIDTH = 720; // GIFs only ever show in the article column
const PNG_TO_WEBP_OVER = 250_000; // bytes

const contentFiles = fs
  .readdirSync(CONTENT, { recursive: true })
  .map((file) => path.join(CONTENT, file))
  .filter((file) => fs.statSync(file).isFile() && /\.(md|json)$/.test(file));
const contentText = () => contentFiles.map((file) => fs.readFileSync(file, 'utf8')).join('\n');

// Images named by `featuredImage` or an `image` field are shown by social networks and
// chat apps, which do not all read WebP: those stay JPEG or PNG.
const social = new Set([...contentText().matchAll(/(?:featuredImage|"image")"?:\s*"?(\/assets\/[^"\n]+)/g)].map((m) => path.basename(m[1].trim())));

const renames = []; // [old file name, new file name]
let before = 0;
let after = 0;
const kb = (bytes) => `${Math.round(bytes / 1024)} KB`;

function report(name, oldSize, newSize, note) {
  before += oldSize;
  after += newSize;
  console.log(`  ${name.padEnd(52)} ${kb(oldSize).padStart(9)} -> ${kb(newSize).padStart(8)}  ${note}`);
}

function replaceFile(oldName, newName, buffer, note) {
  const oldPath = path.join(ASSETS, oldName);
  const oldSize = fs.statSync(oldPath).size;
  report(oldName, oldSize, buffer.length, note);
  if (DRY) return;
  fs.writeFileSync(path.join(ASSETS, newName), buffer);
  if (newName !== oldName) {
    fs.rmSync(oldPath);
    renames.push([oldName, newName]);
  }
}

async function gifToVideo(name) {
  const input = path.join(ASSETS, name);
  const base = name.replace(/\.gif$/i, '');
  const tmp = path.join(ASSETS, `${base}.tmp.mp4`);
  // H.264 needs even dimensions; no audio track; "faststart" lets it play while downloading.
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', input, '-movflags', '+faststart', '-an', '-pix_fmt', 'yuv420p',
    '-vf', `scale='trunc(min(${VIDEO_WIDTH},iw)/2)*2':-2:flags=lanczos`, '-c:v', 'libx264', '-preset', 'slow', '-crf', '27', tmp]);
  const video = fs.readFileSync(tmp);
  fs.rmSync(tmp);
  // Poster (name.poster.jpg): the first frame, shown before the video loads and used for its size in the page.
  const poster = await sharp(input, { pages: 1 }).resize({ width: VIDEO_WIDTH, withoutEnlargement: true }).jpeg({ quality: 78, mozjpeg: true }).toBuffer();
  if (!DRY) fs.writeFileSync(path.join(ASSETS, `${base}.poster.jpg`), poster);
  replaceFile(name, `${base}.mp4`, video, 'video');
  after += poster.length;
}

async function stillImage(name) {
  const input = path.join(ASSETS, name);
  const ext = path.extname(name).toLowerCase();
  const original = fs.readFileSync(input);
  const meta = await sharp(original).metadata();
  const tooWide = meta.width > MAX_WIDTH;
  const pipeline = () => sharp(original).rotate().resize({ width: MAX_WIDTH, withoutEnlargement: true });

  if (ext === '.png') {
    const opaque = (await sharp(original).stats()).isOpaque;
    if (opaque && original.length > PNG_TO_WEBP_OVER) {
      if (social.has(name)) {
        return replaceFile(name, name.replace(/\.png$/i, '.jpg'), await pipeline().jpeg({ quality: 82, mozjpeg: true }).toBuffer(), 'jpeg (social image)');
      }
      return replaceFile(name, name.replace(/\.png$/i, '.webp'), await pipeline().webp({ quality: 82 }).toBuffer(), 'webp');
    }
    // Small or transparent PNGs (logos, flat illustrations) are kept unless resizing really helps.
    if (tooWide) {
      const resized = await pipeline().png({ compressionLevel: 9, palette: meta.paletteBitDepth > 0 }).toBuffer();
      if (resized.length < original.length * 0.9) return replaceFile(name, name, resized, 'resized');
    }
    return null;
  }

  const output = await pipeline().jpeg({ quality: 80, mozjpeg: true }).toBuffer();
  if (tooWide || output.length < original.length * 0.9) return replaceFile(name, name, output, tooWide ? 'resized' : 'recompressed');
  return null;
}

console.log(DRY ? 'Dry run, nothing is written:' : 'Optimizing static/assets:');
for (const name of fs.readdirSync(ASSETS).sort()) {
  const ext = path.extname(name).toLowerCase();
  if (ext === '.gif') await gifToVideo(name);
  else if (['.png', '.jpg', '.jpeg'].includes(ext)) await stillImage(name);
}

// Point the content at the new file names (a path may be URL-encoded in Markdown).
if (!DRY && renames.length) {
  for (const file of contentFiles) {
    let text = fs.readFileSync(file, 'utf8');
    const start = text;
    for (const [oldName, newName] of renames) {
      for (const variant of new Set([oldName, encodeURI(oldName)])) {
        text = text.split(`/assets/${variant}`).join(`/assets/${newName}`);
      }
    }
    if (text !== start) fs.writeFileSync(file, text);
  }
  const left = renames.filter(([oldName]) => contentText().includes(`/assets/${oldName}`));
  if (left.length) console.warn(`  ! still referenced under the old name: ${left.map(([oldName]) => oldName).join(', ')}`);
}

console.log(before ? `Done: ${(before / 1e6).toFixed(1)} MB -> ${(after / 1e6).toFixed(1)} MB` : 'Nothing to do.');
