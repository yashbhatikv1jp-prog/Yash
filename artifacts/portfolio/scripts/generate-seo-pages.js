import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const appDir = path.resolve(scriptDir, '..');

// Vite can output to either dist or dist/public, depending on build options.
const outputCandidates = [
  path.join(appDir, 'dist'),
  path.join(appDir, 'dist', 'public'),
];

let outputDir;
let template;

for (const candidate of outputCandidates) {
  try {
    template = await readFile(path.join(candidate, 'index.html'), 'utf8');
    outputDir = candidate;
    break;
  } catch {
    // Try the next possible Vite output directory.
  }
}

if (!outputDir) {
  throw new Error(
    'Could not find index.html in dist or dist/public. Run the Vite build first.',
  );
}

const siteOrigin = 'https://yashbhati.me';

const pages = [
  {
    route: 'about',
    title: 'About | Yash Bhati',
    h1: 'About - Yash Bhati',
    description:
      'Learn about Yash Bhati, a student and developer at PM Shri KV Phulera in Narnaul, Haryana.',
  },
  {
    route: 'skills',
    title: 'Skills | Yash Bhati',
    h1: 'Skills - Yash Bhati',
    description:
      'Explore the development and technical skills of Yash Bhati, a student and developer.',
  },
  {
    route: 'projects',
    title: 'Projects | Yash Bhati',
    h1: 'Projects - Yash Bhati',
    description:
      'Browse projects created by Yash Bhati, including web development and software projects.',
  },
  {
    route: 'achievements',
    title: 'Achievements | Yash Bhati',
    h1: 'Achievements - Yash Bhati',
    description:
      'Discover Yash Bhati’s achievements, competitions, and milestones as a student developer.',
  },
  {
    route: 'contact',
    title: 'Contact | Yash Bhati',
    h1: 'Contact - Yash Bhati',
    description:
      'Get in touch with Yash Bhati about projects, collaboration, or development.',
  },
];

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function replaceTagAttribute(html, tagPattern, attribute, value, label) {
  if (!tagPattern.test(html)) {
    throw new Error(`Could not find the ${label} tag in the built index.html.`);
  }

  const escapedValue = escapeHtml(value);

  return html.replace(tagPattern, (tag) => {
    const attributePattern = new RegExp(
      `\\b${attribute}\\s*=\\s*(["'])[^"']*\\1`,
      'i',
    );

    if (!attributePattern.test(tag)) {
      throw new Error(`The ${label} tag is missing its ${attribute} attribute.`);
    }

    return tag.replace(attributePattern, `${attribute}="${escapedValue}"`);
  });
}

for (const page of pages) {
  let html = template;

  html = html.replace(
    /<title\b[^>]*>[\s\S]*?<\/title>/i,
    `<title>${escapeHtml(page.title)}</title>`,
  );

  html = replaceTagAttribute(
    html,
    /<meta\b(?=[^>]*\bname=["']description["'])[^>]*>/i,
    'content',
    page.description,
    'meta description',
  );

  html = replaceTagAttribute(
    html,
    /<link\b(?=[^>]*\brel=["']canonical["'])[^>]*>/i,
    'href',
    `${siteOrigin}/${page.route}`,
    'canonical link',
  );

  if (!/<h1\b[^>]*>[\s\S]*?<\/h1>/i.test(html)) {
    throw new Error(`Could not find an <h1> in the built index.html for /${page.route}.`);
  }

  html = html.replace(
    /<h1\b[^>]*>[\s\S]*?<\/h1>/i,
    `<h1>${escapeHtml(page.h1)}</h1>`,
  );

  const pageDir = path.join(outputDir, page.route);
  await mkdir(pageDir, { recursive: true });
  await writeFile(path.join(pageDir, 'index.html'), html, 'utf8');

  console.log(`Generated ${page.route}/index.html`);
}
