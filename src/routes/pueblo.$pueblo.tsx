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
  "Sotillo de la Adrada":
    "El corazón del Valle: negocios, naturaleza y vida de pueblo todo el año.",
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
  const acento = "#c1502e";

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <div className="relative flex h-[46vh] items-center overflow-hidden sm:h-[52vh]">
          {bgImage && (
            <img
              src={bgImage}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 size-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-[linear-gradient(to_top,var(--background)_0%,oklch(0.14_0.02_60/0.15)_55%,oklch(0.14_0.02_60/0.55)_100%)]" />

          <div className="container-page relative z-10 pt-24 sm:pt-28">
            <Link
              to="/"
              hash="pueblos"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary-foreground/85 transition-opacity hover:opacity-70"
            >
              <ArrowLeft className="size-4" />
              Volver a los pueblos
            </Link>
          </div>
        </div>

        <div className="container-page pb-16 pt-6 sm:pb-20">
          <div className="max-w-md">
            <span
              className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.18em]"
              style={{ color: acento, borderColor: `${acento}55`, backgroundColor: `${acento}14` }}
            >
              Pueblo
            </span>
            <h1 className="mt-5 font-serif text-5xl italic leading-[1.05] sm:text-6xl">{pueblo}</h1>
            {descripcion && (
              <p className="mt-5 text-base leading-relaxed text-muted-foreground">{descripcion}</p>
            )}
            <p className="mt-6 text-sm text-muted-foreground">
              {isPending
                ? "Cargando…"
                : `${negocios.length} ${negocios.length === 1 ? "negocio" : "negocios"} en ${pueblo}`}
            </p>
          </div>

          <div className="mt-12 border-t border-border pt-12">
            {isError && (
              <p className="text-sm text-muted-foreground">No se han podido cargar los negocios.</p>
            )}

            {isPending && (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="h-96 animate-pulse rounded-2xl bg-secondary/60" />
                ))}
              </div>
            )}

            {!isPending && !isError && negocios.length === 0 && (
              <p className="text-sm text-muted-foreground">
                Todavía no hay negocios registrados en "{pueblo}". ¡Vuelve pronto!
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
        </div>
      </main>
      <Footer />
    </>
  );
}
