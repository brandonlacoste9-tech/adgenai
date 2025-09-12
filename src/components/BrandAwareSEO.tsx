import React, { useEffect } from 'react';
import { useBrand } from '../brand/BrandingProvider';

interface BrandAwareSEOProps {
  title?: string;
  description?: string;
}

export const BrandAwareSEO: React.FC<BrandAwareSEOProps> = ({ 
  title, 
  description = "AI-Powered Advertising Solutions" 
}) => {
  const { config } = useBrand();

  useEffect(() => {
    // Update document title
    document.title = title ? `${title} — ${config.name}` : `${config.name} — ${description}`;
    
    // Update meta tags
    const updateMeta = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`) || document.querySelector(`meta[property="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        if (name.startsWith('og:')) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Update basic meta tags
    updateMeta('description', description);
    
    // Update Open Graph tags
    updateMeta('og:title', document.title);
    updateMeta('og:description', description);
    updateMeta('og:image', config.og);
    updateMeta('og:site_name', config.name);
    
    // Update Twitter Card tags
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:title', document.title);
    updateMeta('twitter:description', description);
    updateMeta('twitter:image', config.og);

    // Update favicon
    let favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
    if (!favicon) {
      favicon = document.createElement('link');
      favicon.rel = 'icon';
      document.head.appendChild(favicon);
    }
    favicon.href = config.logo;

  }, [config, title, description]);

  return null;
};