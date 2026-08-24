import { Play } from "lucide-react";
import h1 from "@/assets/hist-1.jpg";
import h2 from "@/assets/hist-2.jpg";
import h3 from "@/assets/hist-3.jpg";
import { Reveal } from "./Reveal";

const historias = [
  {
    id: "1",
    persona: "Marta Jiménez",
    negocio: "Mesón La Adrada",
    municipio: "Sotillo de la Adrada",
    titulo: "“Volvimos a abrir con la mitad de la plantilla.”",
    img: h1,
  },
  {
    id: "2",
    persona: "Ángel Rubio",
    negocio: "Miel del Tiétar",
    municipio: "Piedralaves",
    titulo: "“El monte se recupera, y nosotros con él.”",
    img: h2,
  },
  {
    id: "3",
    persona: "Lucía y Dani",
    negocio: "Casa Rural El Pinar",
    municipio: "Casavieja",
    titulo: "“Cada reserva es una razón para seguir.”",
    img: h3,
  },
];

export function Historias() {
  return (
    <section id="historias" className="bg-forest-deep py-24 text-primary-foreground sm:py-32">
      <div className="container-page">
        <Reveal>
          <p className="eyebrow text-primary-foreground/60">Historias del Valle</p>
          <h2 className="mt-5 max-w-2xl text-4xl font-extrabold leading-[1.03] sm:text-5xl">
            Las historias detrás del Valle
          </h2>
          <p className="mt-5 max-w-xl text-lg text-primary-foreground/70">
            Conoce a las personas que están levantando de nuevo nuestra comarca.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {historias.map((h, i) => (
            <Reveal key={h.id} delay={i * 90}>
              <button className="group block w-full overflow-hidden rounded-2xl text-left">
                <span className="relative block aspect-[3/4] overflow-hidden rounded-2xl">
                  <img
                    src={h.img}
                    alt={`${h.persona}, ${h.negocio}`}
                    width={720}
                    height={1080}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04]"
                  />
                  <span className="absolute inset-0 bg-[linear-gradient(to_top,oklch(0.19_0.012_120/0.85),transparent_60%)]" />
                  <span className="absolute left-5 top-5 flex size-12 items-center justify-center rounded-full bg-background/18 backdrop-blur-sm transition-colors duration-200 group-hover:bg-accent">
                    <Play className="size-5 translate-x-[1px] fill-current" />
                  </span>
                  <span className="absolute inset-x-0 bottom-0 block p-6">
                    <span className="block text-lg font-semibold leading-snug">{h.titulo}</span>
                    <span className="mt-3 block text-sm text-primary-foreground/70">
                      {h.persona} · {h.negocio}
                    </span>
                    <span className="block text-sm text-primary-foreground/50">{h.municipio}</span>
                  </span>
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
