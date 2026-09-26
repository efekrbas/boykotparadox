"use client";

import { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { isSoundEnabled, setSoundEnabled, initSoundPreference } from "@/lib/audio";

export function AudioStampToggle({ dark = false }: { dark?: boolean }) {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    setEnabled(initSoundPreference());
  }, []);

  const toggle = () => {
    const next = !enabled;
    setEnabled(next);
    setSoundEnabled(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      title={enabled ? "Ses efektini kapat" : "Ses efektini aç"}
      aria-label={enabled ? "Ses efektini kapat" : "Ses efektini aç"}
      className={`inline-flex items-center gap-1.5 border px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] transition-colors ${
        dark
          ? "border-paper/20 bg-paper/10 text-paper hover:bg-paper/20 hover:border-paper/40"
          : "border-ink/20 bg-paper/80 text-ink hover:border-ink hover:bg-paper"
      }`}
    >
      {enabled ? (
        <>
          <Volume2 className="size-3.5 text-seal" />
          <span className="hidden sm:inline">Ses: Açık</span>
        </>
      ) : (
        <>
          <VolumeX className={`size-3.5 ${dark ? "text-paper/50" : "text-mute"}`} />
          <span className="hidden sm:inline">Ses: Kapalı</span>
        </>
      )}
    </button>
  );
}
