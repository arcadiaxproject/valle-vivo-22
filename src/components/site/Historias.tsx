import { useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Pause, Play } from "lucide-react";
import { fetchHistorias, type Historia } from "@/lib/historias";
import { shuffle } from "@/lib/utils";
import { Reveal } from "./Reveal";

function HistoriaCard({
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
        aria-label={
          tieneAudio ? (playing ? `Pausar historia de ${h.persona}` : `Escuchar historia de ${h.persona}`) : undefined
        }
        aria-disabled={!tieneAudio}
        className={`group block w-full overflow-hidden rounded-2xl text-left ${
          tieneAudio ? "" : "cursor-default"
        }`}
      >
        <span className="relative block aspect-[3/4] overflow-hidden rounded-2xl">
          <img
            src={h.imagen ?? undefined}
            alt={`${h.persona}, ${h.negocio}`}
            width={720}
            height={1080}
            loading="lazy"
            className="size-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04]"
          />
          <span className="absolute inset-0 bg-[linear-gradient(to_top,oklch(0.19_0.012_120/0.85),transparent_60%)]" />
          <span
            className={`absolute left-5 top-5 flex size-12 items-center justify-center rounded-full backdrop-blur-sm transition-colors duration-200 ${
              tieneAudio
                ? "bg-background/18 group-hover:bg-accent"
                : "bg-background/10 opacity-60"
            }`}
          >
            {playing ? (
              <Pause className="size-5 fill-current" />
            ) : (
              <Play className="size-5 translate-x-[1px] fill-current" />
            )}
          </span>
          {!tieneAudio && (
            <span className="absolute left-5 top-20 rounded-md bg-background/70 px-2 py-1 text-xs font-semibold text-foreground backdrop-blur-sm">
              Audio próximamente
            </span>
          )}
          <span className="absolute inset-x-0 bottom-0 block p-6">
            <span className="block text-lg font-semibold leading-snug">“{h.titulo}”</span>
            <span className="mt-3 block text-sm text-primary-foreground/70">
              {h.persona} · {h.negocio}
            </span>
            <span className="block text-sm text-primary-foreground/50">{h.municipio}</span>
          </span>
        </span>
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
      className="flex min-h-screen flex-col justify-center bg-forest-deep py-24 text-primary-foreground sm:py-32"
    >
      <div className="container-page">
        <Reveal>
          <p className="eyebrow text-primary-foreground/60">Historias del Valle</p>
          <h2 className="mt-5 max-w-2xl text-4xl font-extrabold leading-[1.03] sm:text-5xl">
            Las historias detrás del Valle
          </h2>
          <p className="mt-5 max-w-xl text-lg text-primary-foreground/70">
            Conoce a las personas que están levantando de nuevo nuestra comarca.
          </p>
        </Reveal>

        {isError && (
          <p className="mt-12 text-sm text-primary-foreground/60">
            No se han podido cargar las historias. Inténtalo de nuevo más tarde.
          </p>
        )}

        {isPending && (
          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="aspect-[3/4] animate-pulse rounded-2xl bg-primary-foreground/10" />
            ))}
          </div>
        )}

        {!isPending && !isError && (
          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {destacadas.map((h, i) => (
              <HistoriaCard
                key={h.id}
                h={h}
                delay={i * 90}
                playing={playingId === h.id}
                onToggle={() => toggle(h)}
              />
            ))}
          </div>
        )}

        <audio ref={audioRef} onEnded={() => setPlayingId(null)} className="hidden" />
      </div>
    </section>
  );
}
