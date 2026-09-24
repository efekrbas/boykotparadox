import { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { isSoundEnabled, setSoundEnabled, initSoundPreference } from "@/lib/audio";

export function AudioStampToggle() {
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
      className="inline-flex items-center gap-1.5 border border-ink/20 bg-paper/80 px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-ink transition-colors hover:border-ink hover:bg-paper"
    >
      {enabled ? (
        <>
          <Volume2 className="size-3.5 text-seal" />
          <span className="hidden sm:inline">Ses: Açık</span>
        </>
      ) : (
        <>
          <VolumeX className="size-3.5 text-mute" />
          <span className="hidden sm:inline">Ses: Kapalı</span>
        </>
      )}
    </button>
  );
}
