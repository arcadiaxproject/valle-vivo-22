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

// Un acento distinto por categoría, siempre dentro de la paleta del sitio.
const categoriaAcentos: Record<string, string> = {
  Pueblos: "#c1502e", // terracotta
  Naturaleza: "#4c6a3f", // leaf
  Comer: "#c1502e", // terracotta
  Dormir: "#b9902e", // wood
  "Qué hacer": "#4c6a3f", // leaf
  "Comercio local": "#b9902e", // wood
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
  const acento = categoriaAcentos[categoria] ?? "#c1502e";

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bark text-primary-foreground">
        <div className="relative flex min-h-[60vh] items-center overflow-hidden sm:min-h-[70vh]">
          {bgImage && (
            <img
              src={bgImage}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 size-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,oklch(0.19_0.012_120/0.94)_0%,oklch(0.19_0.012_120/0.8)_34%,oklch(0.19_0.012_120/0.2)_64%,transparent_88%)]" />

          <div className="container-page relative z-10 pt-24 sm:pt-28">
            <Link
              to="/"
              hash="descubre"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary-foreground/70 transition-opacity hover:opacity-70"
            >
              <ArrowLeft className="size-4" />
              Volver a explorar el Valle
            </Link>

            <div className="mt-10 max-w-md">
              <span
                className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.18em]"
                style={{
                  color: acento,
                  borderColor: `${acento}66`,
                  backgroundColor: `${acento}1a`,
                }}
              >
                {categoria}
              </span>
              <h1 className="mt-5 font-serif text-6xl italic leading-[1.05] sm:text-7xl">
                {categoria}
              </h1>
              {descripcion && (
                <p className="mt-5 text-base leading-relaxed text-primary-foreground/70">
                  {descripcion}
                </p>
              )}
              {!isPending && (
                <div className="mt-7 flex items-center gap-6 border-t border-primary-foreground/15 pt-5">
                  <span className="flex items-baseline gap-1.5">
                    <span className="font-serif text-xl font-semibold">{negocios.length}</span>
                    <span className="text-xs text-primary-foreground/55">
                      {negocios.length === 1 ? "negocio" : "negocios"}
                    </span>
                  </span>
                  {negocios.length > 0 && (
                    <span className="flex items-center gap-1.5 text-xs text-primary-foreground/65">
                      <span className="size-1.5 rounded-full bg-leaf" aria-hidden="true" />
                      {negocios.filter((n) => n.abierto).length} abiertos ahora
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="container-page border-t border-primary-foreground/10 py-16 sm:py-20">
          {isError && (
            <p className="text-sm text-primary-foreground/60">
              No se han podido cargar los negocios.
            </p>
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
                <NegocioCard key={n.id} n={n} delay={i * 60} accent={acento} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
