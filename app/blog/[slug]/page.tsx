import { Metadata } from 'next';
import Link from 'next/link';
import { blogArticles } from '../articulos';

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return blogArticles.map(a => ({ slug: a.id }));
}

export function generateMetadata({ params }: Props): Metadata {
  const article = blogArticles.find(a => a.id === params.slug);
  const base = 'https://60secondstrip-app.netlify.app';
  if (!article) return { title: 'Artículo no encontrado' };
  return {
    title: `${article.title} | 60secondstrip`,
    description: article.excerpt,
    alternates: { canonical: `${base}/blog/${article.id}` },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [{ url: article.image }],
      type: 'article'
    }
  };
}

export default function BlogArticlePage({ params }: Props) {
  const article = blogArticles.find(a => a.id === params.slug);
  if (!article) {
    return (
      <div className="min-h-screen bg-gradient-aurora">
        <div className="container mx-auto px-6 py-12 max-w-3xl">
          <div className="glass rounded-3xl p-8">
            <h1 className="text-3xl font-bold text-white mb-4">Artículo no encontrado</h1>
            <Link className="text-ios-blue" href="/blog">Volver al blog</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-aurora">
      <div className="container mx-auto px-6 py-12 max-w-3xl">
        <article className="glass rounded-3xl p-8">
          <div className="mb-6">
            <Link className="text-ios-blue" href="/blog">← Volver</Link>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">{article.title}</h1>
          <p className="text-white/70 mb-6">{article.date} · {article.readTime}</p>
          <div className="rounded-2xl overflow-hidden mb-6">
            <img src={article.image} alt={article.title} className="w-full h-auto object-cover" />
          </div>
          <p className="text-white/90 leading-relaxed whitespace-pre-line">{article.content}</p>
        </article>
      </div>
    </div>
  );
}



