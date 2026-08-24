import { ArrowUpRight } from "lucide-react";
import p1 from "@/assets/pueblo-1.jpg";
import p2 from "@/assets/pueblo-2.jpg";
import p3 from "@/assets/pueblo-3.jpg";
import { Reveal } from "./Reveal";

const pueblos = [
  { nombre: "Sotillo de la Adrada", img: p1, negocios: 48 },
  { nombre: "Piedralaves", img: p2, negocios: 31 },
  { nombre: "La Adrada", img: p3, negocios: 27 },
];

export function Pueblos() {
  return (
    <section id="pueblos" className="bg-secondary/45 py-24 sm:py-32">
      <div className="container-page">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow text-terracotta">Pueblos</p>
              <h2 className="mt-5 max-w-2xl text-4xl font-extrabold leading-[1.03] sm:text-5xl">
                Un valle, muchos pueblos
              </h2>
            </div>
            <a
              href="#mapa"
              className="text-sm font-semibold text-forest underline underline-offset-4 transition-opacity hover:opacity-70"
            >
              Ver todos los municipios
            </a>
          </div>
        </Reveal>

        <div className="mt-12 -mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0">
          {pueblos.map((p, i) => (
            <Reveal key={p.nombre} delay={i * 80} className="min-w-[78%] snap-start sm:min-w-0">
              <a href="#mapa" className="group block overflow-hidden rounded-2xl bg-card shadow-soft transition-shadow duration-300 hover:shadow-lift">
                <span className="block aspect-[4/5] overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.nombre}
                    width={1200}
                    height={1500}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04]"
                  />
                </span>
                <span className="flex items-center justify-between gap-4 p-6">
                  <span>
                    <span className="block text-xl font-bold">{p.nombre}</span>
                    <span className="mt-1 block text-sm text-muted-foreground">
                      {p.negocios} negocios · qué hacer, comer y dormir
                    </span>
                  </span>
                  <ArrowUpRight className="size-5 shrink-0 text-forest transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
