import { Link } from "@tanstack/react-router";
import type { Negocio } from "@/lib/negocios";
import { Reveal } from "./Reveal";

function Estado({ abierto }: { abierto: boolean | null }) {
  if (abierto === null) return null;
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-foreground/55">
      <span
        className={`size-1.5 rounded-full ${abierto ? "bg-leaf" : "bg-earth"}`}
        aria-hidden="true"
      />
      {abierto ? "Abierto ahora" : "Cerrado"}
    </span>
  );
}

export function NegocioCard({
  n,
  delay = 0,
  accent = "#c1502e",
}: {
  n: Negocio;
  delay?: number;
  accent?: string;
}) {
  const tieneHistoria = Boolean(n.video_url);

  return (
    <Reveal delay={delay}>
      <Link
        to="/negocio/$id"
        params={{ id: n.id }}
        style={{ "--card-accent": accent } as React.CSSProperties}
        className="group block h-full overflow-hidden rounded-2xl border border-primary-foreground/10 bg-[#1a1712] text-primary-foreground shadow-[0_1px_2px_rgb(0_0_0_/_0.2),0_16px_36px_-20px_rgb(0_0_0_/_0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[color:var(--card-accent)]/60"
      >
        <div className="relative overflow-hidden">
          <img
            src={n.imagen ?? undefined}
            alt={n.nombre}
            width={1200}
            height={900}
            loading="lazy"
            className="h-56 w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04]"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-[linear-gradient(to_top,#1a1712,transparent)]" />

          {(tieneHistoria || n.badges.length > 0) && (
            <div className="absolute left-4 top-4 flex flex-wrap gap-2">
              {tieneHistoria && (
                <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-black/55 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-wide text-primary-foreground backdrop-blur-md">
                  <span className="size-1.5 rounded-full bg-terracotta" aria-hidden="true" />
                  Conoce su historia
                </span>
              )}
              {n.badges.map((b) => (
                <span
                  key={b}
                  className="rounded-full border border-white/10 bg-black/55 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-wide text-primary-foreground backdrop-blur-md"
                >
                  {b}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/45">
            {n.categoria} · {n.municipio}
          </p>
          <h3 className="mt-2 text-xl font-semibold">{n.nombre}</h3>
          <p className="mt-2 text-sm leading-relaxed text-primary-foreground/60">{n.descripcion}</p>
          <div className="mt-5 flex items-center justify-between border-t border-primary-foreground/10 pt-4">
            <Estado abierto={n.abierto} />
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-[color:var(--card-accent)] opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100">
              Visitar →
            </span>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}
