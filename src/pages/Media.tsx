import { useEffect, useState } from 'react';
import PageHero from '../components/PageHero';
import SectionHeader from '../components/SectionHeader';
import NewsCard from '../components/NewsCard';
import CTABanner from '../components/CTABanner';

const categories = ["All Media", "News", "Press Releases", "Events"];

export default function Media() {
  const [activeCategory, setActiveCategory] = useState("All Media");
  const [newsArticles, setNewsArticles] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/v1/news')
      .then(res => res.json())
      .then(json => {
        if (json.success && json.data && json.data.length > 0) {
          const mapped = json.data.map((item: any) => ({
            slug: item.slug,
            title: item.title,
            summary: item.summary,
            category: item.category || 'News',
            date: item.publishDate 
              ? new Date(item.publishDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
              : new Date(item.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
            image: item.featuredImage || "https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=800&auto=format&fit=crop"
          }));
          setNewsArticles(mapped);
        } else {
          // Fallback static articles
          setNewsArticles([
            { slug: "strategic-partnership-2023", title: "Dipon Group Signs New Strategic Partnership for Infrastructure Development", summary: "DIPON Group has entered into a strategic collaboration agreement to expand its engineering capabilities and execute large-scale PPP projects.", category: "Press Release", date: "October 12, 2023", image: "https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=800&auto=format&fit=crop" },
            { slug: "hse-excellence-awards", title: "Dipon Group Celebrates Annual HSE Excellence Awards 2023", summary: "Celebrating safety milestones and honoring project teams that achieved zero incidents while complying with strict ISO standards.", category: "News", date: "October 11, 2023", image: "https://images.unsplash.com/photo-1504307651254-35680f356f12?q=80&w=800&auto=format&fit=crop" },
            { slug: "african-market-expansion", title: "Dipon Group Announces Expansion into Select African Infrastructure Markets", summary: "Leveraging our 55+ years of pipeline and power plant construction experience to support emerging infrastructure networks.", category: "Press Release", date: "October 10, 2023", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop" }
          ]);
        }
      })
      .catch(() => {
        // Fallback static articles
        setNewsArticles([
          { slug: "strategic-partnership-2023", title: "Dipon Group Signs New Strategic Partnership for Infrastructure Development", summary: "DIPON Group has entered into a strategic collaboration agreement to expand its engineering capabilities and execute large-scale PPP projects.", category: "Press Release", date: "October 12, 2023", image: "https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=800&auto=format&fit=crop" },
          { slug: "hse-excellence-awards", title: "Dipon Group Celebrates Annual HSE Excellence Awards 2023", summary: "Celebrating safety milestones and honoring project teams that achieved zero incidents while complying with strict ISO standards.", category: "News", date: "October 11, 2023", image: "https://images.unsplash.com/photo-1504307651254-35680f356f12?q=80&w=800&auto=format&fit=crop" },
          { slug: "african-market-expansion", title: "Dipon Group Announces Expansion into Select African Infrastructure Markets", summary: "Leveraging our 55+ years of pipeline and power plant construction experience to support emerging infrastructure networks.", category: "Press Release", date: "October 10, 2023", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop" }
        ]);
      });
  }, []);

  const filteredArticles = activeCategory === "All Media"
    ? newsArticles
    : newsArticles.filter(art => art.category.toLowerCase().includes(activeCategory.split(" ")[0].toLowerCase().slice(0, -1)));

  return (
    <div>
      <PageHero
        title="Media Centre"
        subtitle="Latest news, press releases, and corporate announcements from Dipon Group."
        backgroundImage="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2940&auto=format&fit=crop"
      />

      <section className="py-24 bg-white">
        <div className="container-max">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-3 mb-16 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold tracking-wide transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-[var(--color-primary-navy)] text-white shadow-md'
                    : 'bg-[var(--color-bg-muted)] text-[var(--color-primary-steel)] hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article, i) => (
              <NewsCard
                key={article.slug}
                title={article.title}
                summary={article.summary}
                category={article.category}
                date={article.date}
                image={article.image}
                slug={article.slug}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
