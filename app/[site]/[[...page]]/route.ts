import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET(
  request: Request,
  { params }: { params: { site: string; page?: string[] } }
) {
  const site = params.site;
  const pageParts = params.page || [];
  const page = pageParts.length === 0 ? 'index' : pageParts.join('/');

  const htmlPath = path.join(process.cwd(), 'templates', site, `${page}.html`);

  try {
    let html = await fs.readFile(htmlPath, 'utf8');

    // Fetch data for the specific site/page
    // const apiUrl = `https://yourapi.com/data/${site}/${page}`;
    // const response = await fetch(apiUrl);
    // const data = await response.json();

    // // Replace placeholders in HTML
    // html = html.replace('{{title}}', data.title || '');
    // html = html.replace('{{description}}', data.description || '');
    // html = html.replace('{{content}}', data.content || '');

    return new NextResponse(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
      },
    });
  } catch (error) {
    return new NextResponse('Page not found', { status: 404 });
  }
}
