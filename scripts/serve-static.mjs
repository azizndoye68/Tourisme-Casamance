import { createReadStream } from 'node:fs';
import { access, stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputRoot = path.join(projectRoot, 'frontend', 'out');
const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp',
  '.xml': 'application/xml; charset=utf-8',
};

async function resolveFile(urlPath) {
  let pathname;
  try {
    pathname = decodeURIComponent(urlPath.split('?')[0]);
  } catch {
    return null;
  }

  const safePath = path.resolve(outputRoot, `.${pathname}`);
  if (safePath !== outputRoot && !safePath.startsWith(`${outputRoot}${path.sep}`)) return null;

  const candidates = [safePath];
  if (!path.extname(safePath)) {
    candidates.push(`${safePath}.html`, path.join(safePath, 'index.html'));
  }

  for (const candidate of candidates) {
    try {
      await access(candidate);
      if ((await stat(candidate)).isFile()) return candidate;
    } catch {
      // Try the next static export path.
    }
  }
  return null;
}

const server = createServer(async (request, response) => {
  const filePath = await resolveFile(request.url || '/');
  if (!filePath) {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Page introuvable');
    return;
  }

  response.writeHead(200, {
    'Content-Type': mimeTypes[path.extname(filePath).toLowerCase()] || 'application/octet-stream',
    'Cache-Control': filePath.includes(`${path.sep}_next${path.sep}`)
      ? 'public, max-age=31536000, immutable'
      : 'public, max-age=300',
    'X-Content-Type-Options': 'nosniff',
  });
  if (request.method === 'HEAD') {
    response.end();
    return;
  }
  createReadStream(filePath).pipe(response);
});

const port = Number(process.env.PORT || 3000);
try {
  await access(outputRoot);
} catch {
  console.error('Export introuvable. Lance d’abord « npm run build ».');
  process.exit(1);
}

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Le port ${port} est déjà utilisé. Arrête l’ancien serveur avec Ctrl+C, ou définis PORT.`);
    process.exit(1);
  }
  throw error;
});

server.listen(port, '127.0.0.1', () => {
  console.log(`Site statique prêt : http://127.0.0.1:${port}`);
  console.log(`Fichiers servis depuis ${outputRoot}`);
});
