import fs from 'fs/promises';
import path from 'path';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  // Optional: For SSG, list known templates
  return [
    { template: 'boxer-club' },
    { template: 'template2' }
  ];
}

export default async function TemplatePage({ params }: { params: { template: string } }) {
  const filePath = path.join(process.cwd(), 'templates', params.template, 'index.html');

  try {
    const html = await fs.readFile(filePath, 'utf8');
    return (
      <html>
        <head><title>{params.template}</title></head>
        <body dangerouslySetInnerHTML={{ __html: html }} />
      </html>
    );
  } catch (err) {
    notFound();
  }
}
