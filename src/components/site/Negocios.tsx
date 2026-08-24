import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNegocios } from "@/lib/negocios";
import { shuffle } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { NegocioCard } from "./NegocioCard";

export function Negocios() {
  const { data, isPending, isError } = useQuery({
    queryKey: ["negocios"],
    queryFn: fetchNegocios,
  });

  const destacados = useMemo(() => shuffle(data ?? []).slice(0, 3), [data]);

  return (
    <section
      id="negocios"
      className="flex min-h-screen flex-col justify-center bg-background py-24 sm:py-32"
    >
      <div className="container-page">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow text-terracotta">Negocios destacados</p>
              <h2 className="mt-5 max-w-2xl text-4xl font-extrabold leading-[1.03] sm:text-5xl">
                Descubre quién mantiene vivo el Valle
              </h2>
            </div>
            <a
              href="#mapa"
              className="text-sm font-semibold text-forest underline underline-offset-4 transition-opacity hover:opacity-70"
            >
              Ver todos en el mapa
            </a>
          </div>
        </Reveal>

        {isError && (
          <p className="mt-12 text-sm text-muted-foreground">
            No se han podido cargar los negocios. Inténtalo de nuevo más tarde.
          </p>
        )}

        {isPending && (
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-96 animate-pulse rounded-2xl bg-secondary/60" />
            ))}
          </div>
        )}

        {!isPending && !isError && (
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {destacados.map((n, i) => (
              <NegocioCard key={n.id} n={n} delay={i * 80} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
