"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { X, Sliders } from "lucide-react";
import type { AppSettings } from "@/lib/types";
import { MODELS } from "@/lib/types";

interface SettingsDialogProps {
  open: boolean;
  onClose: () => void;
  settings: AppSettings;
  onSettingsChange: (settings: AppSettings) => void;
}

export function SettingsDialog({ open, onClose, settings, onSettingsChange }: SettingsDialogProps) {
  const [local, setLocal] = useState(settings);

  useEffect(() => { setLocal(settings); }, [settings, open]);

  useEffect(() => {
    if (!open) return;
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-40" onClick={onClose} />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md bg-card border border-border rounded-xl shadow-2xl animate-fadeIn">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-muted-foreground" />
            <h2 className="text-base font-semibold text-foreground">Settings</h2>
          </div>
          <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Model</label>
            <div className="space-y-1.5 max-h-60 overflow-y-auto">
              {MODELS.map((m) => (
                <button
                  key={m.value}
                  onClick={() => setLocal({ ...local, model: m.value })}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2.5 rounded-lg border transition-colors text-left",
                    local.model === m.value ? "border-foreground bg-accent" : "border-border hover:bg-accent"
                  )}
                >
                  <div>
                    <div className="text-sm font-medium text-foreground">{m.label}</div>
                    <div className="text-xs text-muted-foreground">{m.description}</div>
                  </div>
                  {local.model === m.value && <div className="w-2 h-2 rounded-full bg-foreground" />}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">Temperature</label>
              <span className="text-xs text-muted-foreground font-mono">{local.temperature.toFixed(1)}</span>
            </div>
            <input
              type="range" min="0" max="1" step="0.1"
              value={local.temperature}
              onChange={(e) => setLocal({ ...local, temperature: parseFloat(e.target.value) })}
              className="w-full h-1.5 bg-border rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-foreground [&::-webkit-slider-thumb]:cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-muted-foreground">
              <span>Precise</span><span>Creative</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 px-5 py-4 border-t border-border">
          <button onClick={onClose} className="px-4 py-2 text-sm rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">Cancel</button>
          <button onClick={() => { onSettingsChange(local); onClose(); }} className="px-4 py-2 text-sm rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity font-medium">Save changes</button>
        </div>
      </div>
    </>
  );
}
