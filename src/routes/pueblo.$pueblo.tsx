import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { fetchNegocios } from "@/lib/negocios";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { NegocioCard } from "@/components/site/NegocioCard";
import p1 from "@/assets/pueblo-1.jpg";
import p3 from "@/assets/pueblo-3.jpg";

const puebloImages: Record<string, string> = {
  "Sotillo de la Adrada": p1,
  "La Adrada": p3,
};

const puebloDescripciones: Record<string, string> = {
  "Sotillo de la Adrada": "El corazón del Valle: negocios, naturaleza y vida de pueblo todo el año.",
  "La Adrada": "Historia, castillo y comercio local al pie de la sierra.",
};

export const Route = createFileRoute("/pueblo/$pueblo")({
  head: ({ params }) => ({
    meta: [{ title: `${params.pueblo} — Salvar el valle` }],
  }),
  component: PuebloPage,
});

function PuebloPage() {
  const { pueblo } = Route.useParams();

  const { data, isPending, isError } = useQuery({
    queryKey: ["negocios"],
    queryFn: fetchNegocios,
  });

  const negocios = (data ?? []).filter((n) => n.municipio === pueblo);
  const bgImage = puebloImages[pueblo];
  const descripcion = puebloDescripciones[pueblo];

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
              hash="pueblos"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary-foreground/80 transition-opacity hover:opacity-70"
            >
              <ArrowLeft className="size-4" />
              Volver a los pueblos
            </Link>

            <div className="mt-10 max-w-md">
              <p className="eyebrow text-terracotta">Pueblo</p>
              <h1 className="mt-4 font-serif text-6xl italic leading-[1.05] sm:text-7xl">
                {pueblo}
              </h1>
              {descripcion && (
                <p className="mt-5 text-base leading-relaxed text-primary-foreground/70">
                  {descripcion}
                </p>
              )}
              <p className="mt-5 text-sm font-semibold uppercase tracking-widest text-primary-foreground/50">
                {isPending
                  ? "Cargando…"
                  : `${negocios.length} ${negocios.length === 1 ? "negocio" : "negocios"} en ${pueblo}`}
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
              Todavía no hay negocios registrados en "{pueblo}". ¡Vuelve pronto!
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
