import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { fetchNegocios } from "@/lib/negocios";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { NegocioCard } from "@/components/site/NegocioCard";
import comer from "@/assets/cat-comer.jpg";
import dormir from "@/assets/cat-dormir.jpg";
import hacer from "@/assets/cat-hacer.jpg";
import comercio from "@/assets/cat-comercio.jpg";
import naturaleza from "@/assets/cat-naturaleza.jpg";
import pueblos from "@/assets/cat-pueblos.jpg";

const categoriaImages: Record<string, string> = {
  Pueblos: pueblos,
  Naturaleza: naturaleza,
  Comer: comer,
  Dormir: dormir,
  "Qué hacer": hacer,
  "Comercio local": comercio,
};

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
  const bgImage = categoriaImages[categoria];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bark pb-24 text-primary-foreground">
        <div className="relative flex min-h-[30rem] items-end overflow-hidden pt-32 sm:min-h-[34rem] sm:pt-36">
          {bgImage && (
            <div
              className="absolute inset-0 bg-fixed bg-cover bg-center"
              style={{
                backgroundImage: `url(${bgImage})`,
                WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 82%, transparent 100%)",
                maskImage: "linear-gradient(to bottom, black 0%, black 82%, transparent 100%)",
              }}
            />
          )}

          <div className="container-page relative z-10 pb-14 sm:pb-16">
            <Link
              to="/"
              hash="descubre"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary-foreground transition-opacity [text-shadow:0_1px_10px_rgb(0_0_0_/_0.7)] hover:opacity-70"
            >
              <ArrowLeft className="size-4" />
              Volver a explorar el Valle
            </Link>

            <p className="eyebrow mt-8 text-terracotta [text-shadow:0_1px_10px_rgb(0_0_0_/_0.7)]">
              {categoria}
            </p>
            <h1 className="mt-3 text-4xl font-semibold leading-[1.03] text-primary-foreground [text-shadow:0_2px_20px_rgb(0_0_0_/_0.75)] sm:text-6xl">
              {categoria}
            </h1>
            <p className="mt-4 text-lg text-primary-foreground [text-shadow:0_1px_10px_rgb(0_0_0_/_0.7)]">
              {isPending
                ? "Cargando…"
                : `${negocios.length} ${negocios.length === 1 ? "negocio" : "negocios"} en esta categoría`}
            </p>
          </div>
        </div>

        <div className="container-page -mt-6 sm:-mt-10">
          {isError && (
            <p className="text-sm text-primary-foreground/70">No se han podido cargar los negocios.</p>
          )}

          {isPending && (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-96 animate-pulse rounded-2xl bg-primary-foreground/10" />
              ))}
            </div>
          )}

          {!isPending && !isError && negocios.length === 0 && (
            <p className="text-sm text-primary-foreground/70">
              Todavía no hay negocios registrados en "{categoria}". ¡Vuelve pronto!
            </p>
          )}

          {!isPending && !isError && negocios.length > 0 && (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
