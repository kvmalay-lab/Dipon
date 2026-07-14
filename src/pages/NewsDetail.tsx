import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';

export default function NewsDetail() {
  const { slug } = useParams();
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/v1/news?search=${slug}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data.length > 0) {
          const found = data.data.find((n: any) => n.slug === slug) || data.data[0];
          setArticle(found);
        }
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--color-primary-electric)]"></div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <h2 className="text-2xl font-bold mb-4">Article Not Found</h2>
        <Link to="/media" className="btn-primary flex items-center">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Media Centre
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <Link to="/media" className="inline-flex items-center text-gray-500 hover:text-gray-800 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Media Centre
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex flex-wrap gap-4 items-center text-sm text-gray-500 mb-4">
            <span className="flex items-center"><Calendar className="w-4 h-4 mr-1.5" /> {new Date(article.createdAt).toLocaleDateString()}</span>
            {article.author && <span className="flex items-center"><User className="w-4 h-4 mr-1.5" /> {article.author}</span>}
            {article.category && <span className="flex items-center"><Tag className="w-4 h-4 mr-1.5" /> {article.category}</span>}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">{article.title}</h1>

          {article.featuredImage && (
            <div className="rounded-[24px] overflow-hidden mb-10 shadow-sm">
              <img src={article.featuredImage} alt={article.title} className="w-full h-auto max-h-[500px] object-cover" />
            </div>
          )}

          <div className="prose max-w-none text-gray-700 text-lg leading-relaxed space-y-6">
            <p className="font-medium text-xl text-gray-900 mb-6">{article.summary}</p>
            <div className="whitespace-pre-line">{article.content || "No content available."}</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}