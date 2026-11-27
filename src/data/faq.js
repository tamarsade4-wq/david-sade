// סכמת FAQ אוטומטית מסעיף "שאלות נפוצות": כל <h3> שאלה, וה-<p> שאחריו תשובה.
const strip = (s) => s.replace(/<[^>]+>/g, '').replace(/&quot;/g, '"').replace(/&amp;/g, '&').trim();
export function faqSchema(body = '') {
  const part = body.split('<h2>שאלות נפוצות</h2>')[1] || '';
  const items = [...part.split(/<h2[\s>]/)[0].matchAll(/<h3>(.*?)<\/h3>\s*<p>(.*?)<\/p>/gs)]
    .map(([, q, a]) => ({ '@type': 'Question', name: strip(q), acceptedAnswer: { '@type': 'Answer', text: strip(a) } }));
  return items.length ? [{ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: items }] : [];
}
