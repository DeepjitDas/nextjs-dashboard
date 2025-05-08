import HtmlRenderer from '@/components/HtmlRenderer'; 
import React from 'react';

export default async function Page({ params }: { params: { slug: string[] } }) {
  const slug = (await params).slug || []; 

  const routeMap: Record<string, string> = {
    'kolkata-boxer-club': 'boxer-club',
    'delhi-boxer-club': 'boxer-club'
  };

var userRoute = slug[0];
var targetRoute = [routeMap[userRoute]];

return <HtmlRenderer slug={targetRoute} />;
}