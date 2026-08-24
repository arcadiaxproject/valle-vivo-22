import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { fetchNegocios } from "@/lib/negocios";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { NegocioCard } from "@/components/site/NegocioCard";

export const Route = createFileRoute("/categoria/$categoria")({
  head: ({ params }) => ({
    meta: [{ title: `${params.categoria} — Sotillo está vivo` }],
  }),
  component: CategoriaPage,
});

function CategoriaPage() {
  const { categoria } = Route.useParams();

  const { data, isPending, isError } = useQuery({
    queryKey: ["negocios"],
    queryFn: fetchNegocios,
  });

  const negocios = (data ?? []).filter((n) => n.categoria === categoria);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pb-24 pt-32 sm:pt-36">
        <div className="container-page">
          <Link
            to="/"
            hash="descubre"
            className="inline-flex items-center gap-2 text-sm font-semibold text-forest transition-opacity hover:opacity-70"
          >
            <ArrowLeft className="size-4" />
            Volver a explorar el Valle
          </Link>

          <p className="eyebrow mt-8 text-terracotta">{categoria}</p>
          <h1 className="mt-3 text-4xl font-semibold leading-[1.03] sm:text-5xl">{categoria}</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {isPending
              ? "Cargando…"
              : `${negocios.length} ${negocios.length === 1 ? "negocio" : "negocios"} en esta categoría`}
          </p>

          {isError && (
            <p className="mt-12 text-sm text-muted-foreground">No se han podido cargar los negocios.</p>
          )}

          {isPending && (
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-96 animate-pulse rounded-2xl bg-secondary/60" />
              ))}
            </div>
          )}

          {!isPending && !isError && negocios.length === 0 && (
            <p className="mt-12 text-sm text-muted-foreground">
              Todavía no hay negocios registrados en "{categoria}". ¡Vuelve pronto!
            </p>
          )}

          {!isPending && !isError && negocios.length > 0 && (
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {negocios.map((n, i) => (
                <NegocioCard key={n.id} n={n} delay={i * 60} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
