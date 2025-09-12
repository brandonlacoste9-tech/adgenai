# Multi-Brand System Documentation

This system enables a single codebase to serve multiple branded experiences with different themes, pricing, and content.

## Architecture

### Brand Detection
The system detects the brand based on the hostname:
- Hostnames containing "adgenai" → AdGenAI brand
- Hostnames containing "northern" → Northern Ventures brand  
- Default fallback → AdGenAI brand

### Brand Configuration
Located in `src/brand/brands.ts`:
```typescript
export const BRANDS = {
  adgenai: {
    key: "adgenai",
    domainHint: "adgenai",
    name: "AdGenAI", 
    logo: "/logos/adgenai.svg",
    og: "/images/og-adgenai.jpg",
    colors: { /* theme colors */ },
    copy: { /* brand copy */ },
    stripe: { /* stripe price IDs */ }
  },
  northern: { /* northern configuration */ }
}
```

### Brand Context Provider
`src/brand/BrandingProvider.tsx` provides React context that:
- Detects current hostname
- Provides brand configuration to all components
- Sets CSS custom properties for styling

### Brand-Aware Components
- `BrandAwareHero.tsx` - Hero section with brand-specific content
- `BrandAwarePricing.tsx` - Pricing with brand-specific Stripe prices
- `BrandAwareSEO.tsx` - Dynamic meta tags and title

## Environment Variables

```bash
# Brand-specific Stripe prices
VITE_STRIPE_PRICE_PRO__ADGENAI=price_xxx
VITE_STRIPE_PRICE_TEAM__ADGENAI=price_yyy
VITE_STRIPE_PRICE_PRO__NORTHERN=price_zzz
VITE_STRIPE_PRICE_TEAM__NORTHERN=price_www

# Default brand fallback
VITE_DEFAULT_BRAND=adgenai

# Supabase (for checkout)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

## Deployment

### Vercel Setup
1. Add both domains to the same Vercel project
2. Set environment variables for production
3. Deploy - both domains will automatically serve the correct brand

### Testing Locally
- `localhost:3000` → AdGenAI brand (default)
- Modify `/etc/hosts` to test different domains locally

## File Structure
```
src/
├── brand/
│   ├── brands.ts              # Brand configurations
│   └── BrandingProvider.tsx   # React context provider
├── components/
│   ├── BrandAwareHero.tsx     # Brand-aware hero
│   ├── BrandAwarePricing.tsx  # Brand-aware pricing
│   └── BrandAwareSEO.tsx      # Dynamic SEO
├── utils/
│   ├── startCheckout.ts       # Brand-aware Stripe checkout
│   └── seoUtils.ts           # SEO generation utilities
└── main.tsx                   # App entry with BrandingProvider
```

## Adding a New Brand

1. **Add brand configuration** in `src/brand/brands.ts`
2. **Add domain hint** for detection
3. **Create brand assets** (logo, OG images) 
4. **Set environment variables** for Stripe prices
5. **Test domain routing**

## CSS Theming

The BrandingProvider sets CSS custom properties:
```css
:root {
  --brand-bg: #05070F;
  --brand-primary: #0A0E17; 
  --brand-accent: #00F3FF;
  --brand-secondary: #9D00FF;
  --brand-highlight: #FF00C8;
  --brand-light: #FFFFFF;
}
```

Components can use these in styling:
```tsx
<div style={{ backgroundColor: "var(--brand-accent)" }}>
```

## Security

- Security headers configured in `vite.config.ts`
- Stripe checkout uses domain-aware success/cancel URLs
- Environment variables separate sensitive data by brand