import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();

export async function GET(request, { params }) {
  const { filename } = params;
  const decodedFilename = decodeURIComponent(filename);

  if (decodedFilename.includes('logo')) {
    return Response.redirect(new URL('/logo.jpeg', request.url), 307);
  }

  if (decodedFilename.includes('hero') || decodedFilename.includes('bg')) {
    return Response.redirect(new URL('/hero-bg.jpg', request.url), 307);
  }

  // Check if static gallery image exists
  const galleryPath = path.join(rootDir, 'public', 'gallery', decodedFilename);
  if (fs.existsSync(galleryPath)) {
    return Response.redirect(
      new URL(`/gallery/${encodeURIComponent(decodedFilename)}`, request.url),
      307
    );
  }

  // Direct read fallback if not in public/gallery directly
  const candidateDirs = [
    path.join(rootDir, 'public'),
    path.join(rootDir, 'src', 'assets', 'images'),
  ];

  for (const dir of candidateDirs) {
    const checkPath = path.join(dir, decodedFilename);
    if (fs.existsSync(checkPath)) {
      const buffer = fs.readFileSync(checkPath);
      const ext = path.extname(checkPath).toLowerCase();
      let contentType = 'image/jpeg';
      if (ext === '.png') contentType = 'image/png';
      else if (ext === '.webp') contentType = 'image/webp';
      else if (ext === '.svg') contentType = 'image/svg+xml';

      return new Response(buffer, {
        headers: {
          'Content-Type': contentType,
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      });
    }
  }

  return new Response('Not Found', { status: 404 });
}
