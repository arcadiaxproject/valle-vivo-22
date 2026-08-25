import { ArrowUpRight, MapPin } from "lucide-react";
import { Link } from "@tanstack/react-router";
import p1 from "@/assets/pueblo-1.jpg";
import p2 from "@/assets/pueblo-2.jpg";
import p3 from "@/assets/pueblo-3.jpg";
import { Reveal } from "./Reveal";

const pueblos = [
  { nombre: "Sotillo de la Adrada", tag: "El corazón del Valle", img: p1, negocios: 48 },
  { nombre: "La Adrada", tag: "Historia y castillo", img: p3, negocios: 27 },
];

export function Pueblos() {
  return (
    <section
      id="pueblos"
      className="relative flex flex-col justify-center overflow-hidden py-20 text-primary-foreground sm:h-screen sm:py-14"
    >
      <img src={p2} alt="" aria-hidden="true" className="absolute inset-0 size-full object-cover" />
      <div className="absolute inset-0 bg-[linear-gradient(to_top,oklch(0.14_0.02_60/0.9),oklch(0.14_0.02_60/0.55))]" />

      <div className="container-page relative">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow text-terracotta">Pueblos</p>
              <h2 className="mt-3 max-w-2xl text-3xl font-semibold leading-[1.05] sm:text-4xl">
                Un valle, muchos pueblos
              </h2>
            </div>
          </div>
        </Reveal>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {pueblos.map((p, i) => (
            <Reveal key={p.nombre} delay={i * 80}>
              <Link
                to="/pueblo/$pueblo"
                params={{ pueblo: p.nombre }}
                className="group relative block aspect-[16/10] overflow-hidden rounded-2xl border border-primary-foreground/10 shadow-lift transition-all duration-300 hover:-translate-y-0.5 hover:border-terracotta/50"
              >
                <img
                  src={p.img}
                  alt={p.nombre}
                  width={1200}
                  height={750}
                  loading="lazy"
                  className="absolute inset-0 size-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04]"
                />
                <span className="absolute inset-0 bg-[linear-gradient(to_top,oklch(0.14_0.02_60/0.95)_0%,oklch(0.14_0.02_60/0.15)_55%)]" />

                <span className="absolute left-6 top-5 inline-flex items-center gap-1.5 rounded-full border border-terracotta/50 bg-[oklch(0.14_0.02_60/0.55)] px-3.5 py-1.5 text-xs font-bold text-terracotta backdrop-blur-sm">
                  {p.negocios} negocios
                </span>

                <span className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-3">
                  <span>
                    <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-terracotta">
                      <MapPin className="size-3.5" />
                      {p.tag}
                    </span>
                    <span className="mt-2 block font-serif text-3xl font-semibold text-primary-foreground">
                      {p.nombre}
                    </span>
                  </span>
                  <ArrowUpRight className="size-6 shrink-0 text-primary-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
