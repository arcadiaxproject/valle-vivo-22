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

export function NegocioCard({ n, delay = 0 }: { n: Negocio; delay?: number }) {
  const tieneHistoria = Boolean(n.video_url);

  return (
    <Reveal delay={delay}>
      <Link
        to="/negocio/$id"
        params={{ id: n.id }}
        className="group block h-full overflow-hidden rounded-2xl border border-primary-foreground/10 bg-primary-foreground/[0.04] text-primary-foreground backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-terracotta/50 hover:bg-primary-foreground/[0.07]"
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
          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            {tieneHistoria && (
              <span className="flex items-center gap-1.5 rounded-md bg-bark/85 px-2.5 py-1 text-xs font-semibold text-primary-foreground backdrop-blur-sm">
                <span className="size-1.5 rounded-full bg-terracotta" aria-hidden="true" />
                Conoce su historia
              </span>
            )}
            {n.badges.map((b) => (
              <span
                key={b}
                className="rounded-md bg-bark/85 px-2.5 py-1 text-xs font-semibold text-leaf backdrop-blur-sm"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
        <div className="p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/45">
            {n.categoria} · {n.municipio}
          </p>
          <h3 className="mt-2 text-xl font-semibold">{n.nombre}</h3>
          <p className="mt-2 text-sm leading-relaxed text-primary-foreground/60">{n.descripcion}</p>
          <div className="mt-5 flex items-center justify-between">
            <Estado abierto={n.abierto} />
            <span className="text-sm font-semibold text-terracotta opacity-0 transition-opacity group-hover:opacity-100">
              Visitar →
            </span>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}
