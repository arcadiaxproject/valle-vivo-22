import { useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Pause, Play } from "lucide-react";
import { fetchHistorias, type Historia } from "@/lib/historias";
import { shuffle } from "@/lib/utils";
import { Reveal } from "./Reveal";

function PlayButton({
  size,
  playing,
  tieneAudio,
}: {
  size: "lg" | "sm";
  playing: boolean;
  tieneAudio: boolean;
}) {
  const dim = size === "lg" ? "size-14" : "size-10";
  const icon = size === "lg" ? "size-6" : "size-4";
  return (
    <span
      className={`flex ${dim} items-center justify-center rounded-full backdrop-blur-sm transition-colors duration-200 ${
        tieneAudio ? "bg-primary-foreground/15 group-hover:bg-accent" : "bg-primary-foreground/10 opacity-60"
      }`}
    >
      {playing ? (
        <Pause className={`${icon} fill-current`} />
      ) : (
        <Play className={`${icon} translate-x-[1px] fill-current`} />
      )}
    </span>
  );
}

function HistoriaFeatured({
  h,
  playing,
  onToggle,
}: {
  h: Historia;
  playing: boolean;
  onToggle: () => void;
}) {
  const tieneAudio = Boolean(h.audio_url);
  return (
    <Reveal delay={80}>
      <button
        onClick={tieneAudio ? onToggle : undefined}
        aria-disabled={!tieneAudio}
        className={`group grid w-full overflow-hidden rounded-2xl text-left sm:grid-cols-[1.3fr_1fr] ${
          tieneAudio ? "" : "cursor-default"
        }`}
      >
        <span className="relative block h-40 overflow-hidden sm:h-56">
          <img
            src={h.imagen ?? undefined}
            alt={`${h.persona}, ${h.negocio}`}
            width={960}
            height={720}
            loading="lazy"
            className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
          <span className="absolute inset-0 bg-black/15" />
          <span className="absolute inset-0 flex items-center justify-center">
            <PlayButton size="lg" playing={playing} tieneAudio={tieneAudio} />
          </span>
          {!tieneAudio && (
            <span className="absolute left-5 top-5 rounded-md bg-primary-foreground/10 px-2 py-1 text-xs font-semibold text-primary-foreground backdrop-blur-sm">
              Audio próximamente
            </span>
          )}
        </span>
        <span className="flex h-40 flex-col justify-center gap-2 bg-forest-deep p-5 sm:h-56 sm:p-7">
          <span className="block font-serif text-lg italic leading-snug text-primary-foreground sm:text-2xl">
            “{h.titulo}”
          </span>
          <span className="block text-sm text-primary-foreground/60">
            <span className="font-semibold text-primary-foreground/85">{h.persona}</span> —{" "}
            {h.negocio}, {h.municipio}
          </span>
        </span>
      </button>
    </Reveal>
  );
}

function HistoriaSecundaria({
  h,
  delay,
  playing,
  onToggle,
}: {
  h: Historia;
  delay: number;
  playing: boolean;
  onToggle: () => void;
}) {
  const tieneAudio = Boolean(h.audio_url);
  return (
    <Reveal delay={delay}>
      <button
        onClick={tieneAudio ? onToggle : undefined}
        aria-disabled={!tieneAudio}
        className={`group flex w-full items-center gap-4 rounded-xl p-3 text-left transition-colors hover:bg-primary-foreground/5 ${
          tieneAudio ? "" : "cursor-default"
        }`}
      >
        <span className="relative block size-20 shrink-0 overflow-hidden rounded-lg">
          <img
            src={h.imagen ?? undefined}
            alt={`${h.persona}, ${h.negocio}`}
            width={160}
            height={160}
            loading="lazy"
            className="size-full object-cover"
          />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-semibold italic text-primary-foreground/90">
            “{h.titulo}”
          </span>
          <span className="mt-1 block text-xs text-primary-foreground/50">
            {h.persona} · {h.negocio}
          </span>
        </span>
        <PlayButton size="sm" playing={playing} tieneAudio={tieneAudio} />
      </button>
    </Reveal>
  );
}

export function Historias() {
  const { data, isPending, isError } = useQuery({
    queryKey: ["historias"],
    queryFn: fetchHistorias,
  });

  const destacadas = useMemo(() => shuffle(data ?? []).slice(0, 3), [data]);
  const [featured, ...secundarias] = destacadas;

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);

  function toggle(h: Historia) {
    const audio = audioRef.current;
    if (!audio || !h.audio_url) return;

    if (playingId === h.id) {
      audio.pause();
      setPlayingId(null);
      return;
    }

    audio.src = h.audio_url;
    audio.play();
    setPlayingId(h.id);
  }

  return (
    <section
      id="historias"
      className="flex h-screen flex-col justify-center overflow-hidden bg-bark py-10 sm:py-14"
    >
      <div className="container-page">
        <Reveal>
          <p className="eyebrow text-terracotta">Historias del Valle</p>
          <h2 className="mt-3 max-w-xl text-3xl font-semibold leading-[1.05] text-primary-foreground sm:text-4xl">
            Las personas detrás de cada negocio
          </h2>
          <p className="mt-3 max-w-lg text-base text-primary-foreground/60">
            Cómo vivieron el incendio, y cómo están volviendo a levantarlo, contado por ellos
            mismos.
          </p>
        </Reveal>

        {isError && (
          <p className="mt-8 text-sm text-primary-foreground/60">
            No se han podido cargar las historias. Inténtalo de nuevo más tarde.
          </p>
        )}

        {isPending && (
          <div className="mt-8 aspect-[16/9] animate-pulse rounded-2xl bg-primary-foreground/10" />
        )}

        {!isPending && !isError && featured && (
          <div className="mt-6">
            <HistoriaFeatured
              h={featured}
              playing={playingId === featured.id}
              onToggle={() => toggle(featured)}
            />
            {secundarias.length > 0 && (
              <div className="mt-3 grid gap-1 border-t border-primary-foreground/10 pt-3 sm:grid-cols-2">
                {secundarias.map((h, i) => (
                  <HistoriaSecundaria
                    key={h.id}
                    h={h}
                    delay={i * 90}
                    playing={playingId === h.id}
                    onToggle={() => toggle(h)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        <audio ref={audioRef} onEnded={() => setPlayingId(null)} className="hidden" />
      </div>
    </section>
  );
}
