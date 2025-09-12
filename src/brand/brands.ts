// brand/brands.ts
export type BrandKey = "adgenai" | "northern";

export const BRANDS = {
  adgenai: {
    key: "adgenai",
    domainHint: "adgenai",               // matches host includes "adgenai"
    name: "AdGenAI",
    logo: "/logos/adgenai.svg",
    og: "/images/og-adgenai.jpg",
    colors: {
      bg: "#05070F",
      primary: "#0A0E17",
      accent: "#00F3FF",
      secondary: "#9D00FF",
      highlight: "#FF00C8",
      light: "#FFFFFF",
    },
    copy: {
      heroH1: "DOMINATE THE ADVERTISING GALAXY",
      heroH2: "AI-Powered Revenue Generation",
    },
    stripe: {
      pricePro: import.meta.env.VITE_STRIPE_PRICE_PRO__ADGENAI || "",
      priceTeam: import.meta.env.VITE_STRIPE_PRICE_TEAM__ADGENAI || "",
    },
  },
  northern: {
    key: "northern",
    domainHint: "northern",              // matches host includes "northern"
    name: "Northern Ventures",
    logo: "/logos/northern.svg",
    og: "/images/og-northern.jpg",
    colors: {
      bg: "#07121f",
      primary: "#0A2540",
      accent: "#8beeff",
      secondary: "#67e5a1",
      highlight: "#ffe478",
      light: "#f8f9fa",
    },
    copy: {
      heroH1: "Transform Advertising with AI",
      heroH2: "Of the North",
    },
    stripe: {
      pricePro: import.meta.env.VITE_STRIPE_PRICE_PRO__NORTHERN || "",
      priceTeam: import.meta.env.VITE_STRIPE_PRICE_TEAM__NORTHERN || "",
    },
  },
} as const;

export function detectBrandFromHost(host?: string): BrandKey {
  const h = (host || "").toLowerCase();
  if (h.includes(BRANDS.adgenai.domainHint)) return "adgenai";
  if (h.includes(BRANDS.northern.domainHint)) return "northern";
  return (import.meta.env.VITE_DEFAULT_BRAND as BrandKey) || "adgenai";
}