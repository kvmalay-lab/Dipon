import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOData {
  path: string;
  title: string;
  description: string;
  keywords: string;
  ogImage?: string;
}

export default function SEO() {
  const { pathname } = useLocation();

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        // Query search against path to match the current URL exactly
        const res = await fetch(`/api/v1/seo?search=${pathname}`);
        const json = await res.json();
        
        let seo: SEOData | null = null;
        if (json.success && json.data && json.data.length > 0) {
          // Find the exact match in returned values
          seo = json.data.find((item: SEOData) => item.path === pathname) || null;
        }

        const title = seo?.title || 'Dipon Group | Excellence Delivered';
        const description = seo?.description || 'Dipon Group is a leading multinational conglomerate established in 1970, delivering excellence across Energy, Engineering, IT, and Infrastructure sectors.';
        const keywords = seo?.keywords || 'Dipon Group, Energy, Infrastructure, Engineering, IT';

        // Update document title
        document.title = title;

        // Update meta description
        let descMeta = document.querySelector('meta[name="description"]');
        if (!descMeta) {
          descMeta = document.createElement('meta');
          descMeta.setAttribute('name', 'description');
          document.head.appendChild(descMeta);
        }
        descMeta.setAttribute('content', description);

        // Update meta keywords
        let keywordsMeta = document.querySelector('meta[name="keywords"]');
        if (!keywordsMeta) {
          keywordsMeta = document.createElement('meta');
          keywordsMeta.setAttribute('name', 'keywords');
          document.head.appendChild(keywordsMeta);
        }
        keywordsMeta.setAttribute('content', keywords);

        // Update open graph title
        let ogTitleMeta = document.querySelector('meta[property="og:title"]');
        if (!ogTitleMeta) {
          ogTitleMeta = document.createElement('meta');
          ogTitleMeta.setAttribute('property', 'og:title');
          document.head.appendChild(ogTitleMeta);
        }
        ogTitleMeta.setAttribute('content', title);

        // Update open graph description
        let ogDescMeta = document.querySelector('meta[property="og:description"]');
        if (!ogDescMeta) {
          ogDescMeta = document.createElement('meta');
          ogDescMeta.setAttribute('property', 'og:description');
          document.head.appendChild(ogDescMeta);
        }
        ogDescMeta.setAttribute('content', description);

      } catch (err) {
        console.error('Failed to update SEO tags dynamically:', err);
      }
    };

    fetchMetadata();
  }, [pathname]);

  return null;
}
