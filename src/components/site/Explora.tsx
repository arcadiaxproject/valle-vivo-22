import { ArrowUpRight } from "lucide-react";
import comer from "@/assets/cat-comer.jpg";
import dormir from "@/assets/cat-dormir.jpg";
import hacer from "@/assets/cat-hacer.jpg";
import comercio from "@/assets/cat-comercio.jpg";
import naturaleza from "@/assets/cat-naturaleza.jpg";
import pueblos from "@/assets/cat-pueblos.jpg";
import { Reveal } from "./Reveal";

const categorias = [
  { name: "Comer", img: comer, desc: "Bares, asadores y terrazas" },
  { name: "Dormir", img: dormir, desc: "Casas rurales y hoteles" },
  { name: "Qué hacer", img: hacer, desc: "Rutas, gargantas y planes" },
  { name: "Comercio local", img: comercio, desc: "Tiendas y artesanía" },
  { name: "Naturaleza", img: naturaleza, desc: "Pinares y piscinas naturales" },
  { name: "Pueblos", img: pueblos, desc: "Nueve municipios que visitar" },
];

export function Explora() {
  return (
    <section id="descubre" className="bg-secondary/45 py-24 sm:py-32">
      <div className="container-page">
        <Reveal>
          <p className="eyebrow text-terracotta">Explora el Valle</p>
          <h2 className="mt-5 max-w-2xl text-4xl font-extrabold leading-[1.03] sm:text-5xl">
            ¿Qué quieres descubrir?
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categorias.map((c, i) => (
            <Reveal key={c.name} delay={i * 70}>
              <a
                href="#negocios"
                className="group relative block h-[22rem] overflow-hidden rounded-2xl lg:h-[26rem]"
              >
                <img
                  src={c.img}
                  alt={c.name}
                  width={900}
                  height={1200}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-[linear-gradient(to_top,oklch(0.19_0.012_120/0.78),transparent_58%)] transition-opacity duration-300 group-hover:opacity-90" />
                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
                  <span>
                    <span className="block text-2xl font-bold text-primary-foreground">
                      {c.name}
                    </span>
                    <span className="mt-1 block text-sm text-primary-foreground/75">{c.desc}</span>
                  </span>
                  <ArrowUpRight className="size-6 shrink-0 translate-y-2 text-primary-foreground opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
