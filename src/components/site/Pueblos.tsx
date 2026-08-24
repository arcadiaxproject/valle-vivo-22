import { ArrowUpRight } from "lucide-react";
import p1 from "@/assets/pueblo-1.jpg";
import p2 from "@/assets/pueblo-2.jpg";
import p3 from "@/assets/pueblo-3.jpg";
import { Reveal } from "./Reveal";

const pueblos = [
  { nombre: "Sotillo de la Adrada", img: p1, negocios: 48 },
  { nombre: "La Adrada", img: p3, negocios: 27 },
];

export function Pueblos() {
  return (
    <section
      id="pueblos"
      className="relative flex flex-col justify-center overflow-hidden py-20 text-primary-foreground sm:h-screen sm:py-14"
    >
      <img
        src={p2}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 size-full object-cover"
      />
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
              <a
                href="#descubre"
                className="group block overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-terracotta/40 hover:shadow-lift"
              >
                <span className="block h-56 overflow-hidden sm:h-64">
                  <img
                    src={p.img}
                    alt={p.nombre}
                    width={1200}
                    height={1500}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04]"
                  />
                </span>
                <span className="flex items-center justify-between gap-4 p-4">
                  <span>
                    <span className="block text-lg font-bold">{p.nombre}</span>
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
