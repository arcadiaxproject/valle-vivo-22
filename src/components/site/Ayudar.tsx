import editorial from "@/assets/editorial-negocio.jpg";
import { Reveal } from "./Reveal";

const acciones = [
  { n: "01", t: "Ven", d: "Visita el Valle." },
  { n: "02", t: "Descubre", d: "Conoce lugares nuevos." },
  { n: "03", t: "Consume local", d: "Compra, come y duerme en negocios de la zona." },
  {
    n: "04",
    t: "Comparte",
    d: "Ayuda a que otras personas descubran que el Valle sigue vivo.",
  },
];

export function Ayudar() {
  return (
    <section
      id="ayudar"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden py-24 text-primary-foreground sm:py-32"
    >
      <img
        src={editorial}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_top,oklch(0.14_0.02_60/0.92),oklch(0.14_0.02_60/0.7))]" />

      <div className="container-page relative">
        <Reveal>
          <p className="eyebrow text-terracotta">Cómo puedes ayudar</p>
          <h2 className="mt-5 max-w-2xl text-4xl font-semibold leading-[1.03] sm:text-5xl">
            Ayudar es más fácil de lo que parece.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {acciones.map((a, i) => (
            <Reveal key={a.t} delay={i * 70}>
              <div className="border-t border-primary-foreground/20 pt-6">
                <span className="text-sm font-bold text-terracotta">{a.n}</span>
                <h3 className="mt-4 text-2xl font-semibold">{a.t}</h3>
                <p className="mt-2 text-base leading-relaxed text-primary-foreground/70">{a.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
