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

const categoriaDescripciones: Record<string, string> = {
  Pueblos: "Cada pueblo del Valle guarda su propio carácter, su gente y su historia.",
  Naturaleza: "Bosques, miradores y rincones donde el Valle respira al ritmo de las estaciones.",
  Comer: "Cocina tradicional y de siempre, hecha por quienes conocen el Valle.",
  Dormir: "Casas y alojamientos rurales para descansar rodeado de naturaleza.",
  "Qué hacer": "Planes y actividades para vivir el Valle en cualquier época del año.",
  "Comercio local": "Tiendas y comercios que mantienen viva la vida cotidiana del Valle.",
};

export const Route = createFileRoute("/categoria/$categoria")({
  head: ({ params }) => ({
    meta: [{ title: `${params.categoria} — Salvar el valle` }],
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
  const descripcion = categoriaDescripciones[categoria];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bark text-primary-foreground">
        <div className="relative flex min-h-screen items-center overflow-hidden">
          {bgImage && (
            <img
              src={bgImage}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 size-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,oklch(0.19_0.012_120/0.92)_0%,oklch(0.19_0.012_120/0.75)_32%,oklch(0.19_0.012_120/0.15)_62%,transparent_85%)]" />

          <div className="container-page relative z-10 pt-24 sm:pt-28">
            <Link
              to="/"
              hash="descubre"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary-foreground/80 transition-opacity hover:opacity-70"
            >
              <ArrowLeft className="size-4" />
              Volver a explorar el Valle
            </Link>

            <div className="mt-10 max-w-md">
              <p className="eyebrow text-terracotta">{categoria}</p>
              <h1 className="mt-4 font-serif text-6xl italic leading-[1.05] sm:text-7xl">
                {categoria}
              </h1>
              {descripcion && (
                <p className="mt-5 text-base leading-relaxed text-primary-foreground/70">
                  {descripcion}
                </p>
              )}
              <p className="mt-5 text-sm font-semibold uppercase tracking-widest text-primary-foreground/50">
                {isPending
                  ? "Cargando…"
                  : `${negocios.length} ${negocios.length === 1 ? "negocio" : "negocios"} en esta categoría`}
              </p>
            </div>
          </div>
        </div>

        <div className="container-page py-16 sm:py-20">
          {isError && (
            <p className="text-sm text-primary-foreground/60">No se han podido cargar los negocios.</p>
          )}

          {isPending && (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-96 animate-pulse rounded-2xl bg-primary-foreground/5" />
              ))}
            </div>
          )}

          {!isPending && !isError && negocios.length === 0 && (
            <p className="text-sm text-primary-foreground/60">
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
