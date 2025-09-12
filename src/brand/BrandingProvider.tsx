// brand/BrandingProvider.tsx
import React, { createContext, useContext, useMemo, useEffect, useState } from "react";
import { BRANDS, detectBrandFromHost, type BrandKey } from "./brands";

type BrandCtx = { key: BrandKey; config: typeof BRANDS[BrandKey] };
const Ctx = createContext<BrandCtx>({ key: "adgenai", config: BRANDS.adgenai });

export function BrandingProvider({ children }: { children: React.ReactNode }) {
  const [host, setHost] = useState<string>("");

  // Detect host on client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      setHost(window.location.hostname);
    }
  }, []);

  const key = detectBrandFromHost(host);
  const config = BRANDS[key];

  const styleVars: React.CSSProperties = {
    // expose as CSS vars for Tailwind/CSS consumption
    // @ts-ignore
    ["--brand-bg" as any]: config.colors.bg,
    ["--brand-primary" as any]: config.colors.primary,
    ["--brand-accent" as any]: config.colors.accent,
    ["--brand-secondary" as any]: config.colors.secondary,
    ["--brand-highlight" as any]: config.colors.highlight,
    ["--brand-light" as any]: config.colors.light,
  };

  const value = useMemo(() => ({ key, config }), [key, config]);

  return (
    <Ctx.Provider value={value}>
      <div style={styleVars}>{children}</div>
    </Ctx.Provider>
  );
}

export const useBrand = () => useContext(Ctx);