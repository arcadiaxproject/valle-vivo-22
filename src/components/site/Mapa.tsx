import { lazy, Suspense, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ClientOnly } from "@tanstack/react-router";
import { fetchNegocios, CATEGORIAS_NEGOCIO } from "@/lib/negocios";
import { Reveal } from "./Reveal";

const MapaLeaflet = lazy(() => import("./MapaLeaflet"));

function MapaFallback() {
  return (
    <div className="flex h-[26rem] w-full items-center justify-center rounded-2xl bg-secondary/60 sm:h-[34rem]">
      <p className="text-sm text-muted-foreground">Cargando mapa…</p>
    </div>
  );
}

export function Mapa() {
  const { data, isPending, isError } = useQuery({
    queryKey: ["negocios"],
    queryFn: fetchNegocios,
  });

  const [cat, setCat] = useState<string>("Todo");
  const [mun, setMun] = useState<string>("Todos");

  const municipios = useMemo(
    () => Array.from(new Set((data ?? []).map((n) => n.municipio))).sort(),
    [data],
  );

  const visibles = useMemo(
    () =>
      (data ?? []).filter(
        (n) => (cat === "Todo" || n.categoria === cat) && (mun === "Todos" || n.municipio === mun),
      ),
    [data, cat, mun],
  );

  return (
    <section
      id="mapa"
      className="flex min-h-screen flex-col justify-center bg-background py-24 sm:py-32"
    >
      <div className="container-page">
        <Reveal>
          <p className="eyebrow text-terracotta">Mapa</p>
          <h2 className="mt-5 text-4xl font-extrabold leading-[1.03] sm:text-5xl">
            Descubre el Valle
          </h2>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-8 flex flex-wrap items-center gap-2">
            {["Todo", ...CATEGORIAS_NEGOCIO].map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors duration-200 ${
                  cat === c
                    ? "bg-forest-deep text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/70"
                }`}
              >
                {c}
              </button>
            ))}
            <select
              value={mun}
              onChange={(e) => setMun(e.target.value)}
              className="ml-auto rounded-lg border border-border bg-card px-3.5 py-2 text-sm font-semibold"
            >
              <option value="Todos">Todos los municipios</option>
              {municipios.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
        </Reveal>

        <Reveal delay={140}>
          <div className="mt-6 overflow-hidden rounded-2xl border border-border shadow-soft">
            {isError && (
              <div className="flex h-[26rem] w-full items-center justify-center bg-secondary/40 sm:h-[34rem]">
                <p className="text-sm text-muted-foreground">No se ha podido cargar el mapa.</p>
              </div>
            )}
            {!isError && (isPending ? (
              <MapaFallback />
            ) : (
              <ClientOnly fallback={<MapaFallback />}>
                <Suspense fallback={<MapaFallback />}>
                  <MapaLeaflet negocios={visibles} />
                </Suspense>
              </ClientOnly>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
