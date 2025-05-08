'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function HtmlRenderer({ slug }: { slug: string[] }) {
  const [iframeSrc, setIframeSrc] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);


  const dataFromDB: Record<string,{ boxingCentreName: string; theme: string }
> = {
  '/kolkata-boxer-club': {boxingCentreName: 'Kolkata Boxing',theme: 'dark' },
  '/delhi-boxer-club': { boxingCentreName: 'Delhi Boxing', theme: 'light'},
};

const pathname = usePathname(); 

console.log(pathname);
const dataToSend =dataFromDB[pathname] || null;
console.log(dataToSend);

  useEffect(() => {
    const basePath = '/templates/' + slug.join('/');
    const indexPath = `${basePath}/index.html`;

    // Serialize query params safely
    const queryParams = new URLSearchParams(dataToSend).toString();
    const fullPath = `${indexPath}?${queryParams}`;

    // Optional: check if the file exists
    fetch(indexPath)
      .then((res) => {
        if (!res.ok) throw new Error('404');
        setIframeSrc(fullPath);
      })
      .catch((err) => {
        console.error('Error loading HTML:', err);
        setError('Page Not Found');
      });
  }, [slug]);

  if (error) return <p>{error}</p>;
  if (!iframeSrc) return <p>Loading...</p>;

  return (
    <iframe
      src={iframeSrc}
      width="100%"
      height="800px"
      style={{ border: 'none' }}
      title="Micro Frontend"
      sandbox="allow-scripts allow-same-origin allow-forms"
    />
  );
}
