import { lazy, Suspense } from "react";
import { createFileRoute, Link, ClientOnly } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, MapPin } from "lucide-react";
import { fetchNegocioPorId } from "@/lib/negocios";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";

const MapaLeaflet = lazy(() => import("@/components/site/MapaLeaflet"));

export const Route = createFileRoute("/negocio/$id")({
  component: NegocioPage,
});

function NegocioPage() {
  const { id } = Route.useParams();

  const { data: negocio, isPending, isError } = useQuery({
    queryKey: ["negocio", id],
    queryFn: () => fetchNegocioPorId(id),
  });

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pb-24 pt-32 sm:pt-36">
        <div className="container-page max-w-3xl">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-forest transition-opacity hover:opacity-70"
          >
            <ArrowLeft className="size-4" />
            Volver
          </Link>

          {isPending && (
            <div className="mt-8 animate-pulse">
              <div className="h-72 w-full rounded-2xl bg-secondary/60" />
              <div className="mt-6 h-8 w-1/2 rounded bg-secondary/60" />
            </div>
          )}

          {isError && (
            <p className="mt-12 text-sm text-muted-foreground">
              No se ha podido cargar este negocio.
            </p>
          )}

          {!isPending && !isError && !negocio && (
            <p className="mt-12 text-sm text-muted-foreground">
              No hemos encontrado este negocio. Puede que ya no esté disponible.
            </p>
          )}

          {negocio && (
            <>
              {negocio.imagen && (
                <img
                  src={negocio.imagen}
                  alt={negocio.nombre}
                  width={1200}
                  height={800}
                  className="mt-8 h-72 w-full rounded-2xl object-cover sm:h-96"
                />
              )}

              <p className="eyebrow mt-8 text-terracotta">
                {negocio.categoria} · {negocio.municipio}
              </p>
              <h1 className="mt-3 text-4xl font-semibold leading-[1.03] sm:text-5xl">
                {negocio.nombre}
              </h1>

              {negocio.badges.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {negocio.badges.map((b) => (
                    <span
                      key={b}
                      className="rounded-md bg-secondary px-2.5 py-1 text-xs font-semibold text-forest"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              )}

              {negocio.abierto !== null && (
                <p className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground">
                  <span
                    className={`size-1.5 rounded-full ${negocio.abierto ? "bg-leaf" : "bg-earth"}`}
                    aria-hidden="true"
                  />
                  {negocio.abierto ? "Abierto ahora" : "Cerrado"}
                </p>
              )}

              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                {negocio.descripcion}
              </p>

              {negocio.direccion && (
                <p className="mt-6 flex items-start gap-2 text-sm text-muted-foreground">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-forest" />
                  {negocio.direccion}
                </p>
              )}

              {negocio.lat != null && negocio.lng != null && (
                <div className="mt-4 overflow-hidden rounded-2xl border border-border">
                  <ClientOnly
                    fallback={
                      <div className="flex h-72 items-center justify-center bg-secondary/60">
                        <p className="text-sm text-muted-foreground">Cargando mapa…</p>
                      </div>
                    }
                  >
                    <Suspense
                      fallback={
                        <div className="flex h-72 items-center justify-center bg-secondary/60">
                          <p className="text-sm text-muted-foreground">Cargando mapa…</p>
                        </div>
                      }
                    >
                      <MapaLeaflet negocios={[negocio]} />
                    </Suspense>
                  </ClientOnly>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
