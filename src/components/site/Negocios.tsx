import neg1 from "@/assets/neg-1.jpg";
import neg2 from "@/assets/neg-2.jpg";
import neg3 from "@/assets/neg-3.jpg";
import { Reveal } from "./Reveal";

export type Negocio = {
  id: string;
  nombre: string;
  municipio: string;
  categoria: string;
  descripcion: string;
  abierto: boolean | null;
  badges: string[];
  imagen: string;
};

// Datos de ejemplo. La forma coincide con la respuesta prevista de la API.
const negocios: Negocio[] = [
  {
    id: "1",
    nombre: "Mesón La Adrada",
    municipio: "Sotillo de la Adrada",
    categoria: "Restaurante",
    descripcion: "Cocina castellana de siempre, con brasa de encina y verdura de la huerta.",
    abierto: true,
    badges: ["Historia del Valle", "Recomendado"],
    imagen: neg1,
  },
  {
    id: "2",
    nombre: "Casa Rural El Pinar",
    municipio: "Piedralaves",
    categoria: "Alojamiento",
    descripcion: "Seis habitaciones de piedra con vistas a la sierra y desayuno de productores.",
    abierto: false,
    badges: ["Cómo ayudar"],
    imagen: neg2,
  },
  {
    id: "3",
    nombre: "Horno de la Plaza",
    municipio: "La Adrada",
    categoria: "Comercio local",
    descripcion: "Pan de masa madre y dulces de la comarca, horneados cada mañana.",
    abierto: true,
    badges: ["Recomendado"],
    imagen: neg3,
  },
];

function Estado({ abierto }: { abierto: boolean | null }) {
  if (abierto === null) return null;
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
      <span
        className={`size-1.5 rounded-full ${abierto ? "bg-leaf" : "bg-earth"}`}
        aria-hidden="true"
      />
      {abierto ? "Abierto ahora" : "Cerrado"}
    </span>
  );
}

export function Negocios() {
  return (
    <section id="negocios" className="bg-background py-24 sm:py-32">
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

        <div className="mt-12 -mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-3">
          {negocios.map((n, i) => (
            <Reveal key={n.id} delay={i * 80} className="min-w-[80%] snap-start sm:min-w-0">
              <article className="group h-full overflow-hidden rounded-2xl bg-card shadow-soft transition-shadow duration-300 hover:shadow-lift">
                <div className="relative overflow-hidden">
                  <img
                    src={n.imagen}
                    alt={n.nombre}
                    width={1200}
                    height={900}
                    loading="lazy"
                    className="h-56 w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04]"
                  />
                  {n.badges.length > 0 && (
                    <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                      {n.badges.map((b) => (
                        <span
                          key={b}
                          className="rounded-md bg-background/92 px-2.5 py-1 text-xs font-semibold text-forest backdrop-blur-sm"
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    {n.categoria} · {n.municipio}
                  </p>
                  <h3 className="mt-2 text-xl font-bold">{n.nombre}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {n.descripcion}
                  </p>
                  <div className="mt-5">
                    <Estado abierto={n.abierto} />
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
