import editorial from "@/assets/editorial-negocio.jpg";
import { Reveal } from "./Reveal";

export function Proyecto() {
  return (
    <section id="proyecto" className="bg-background py-24 sm:py-32">
      <div className="container-page grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
        <Reveal>
          <div className="overflow-hidden rounded-2xl">
            <img
              src={editorial}
              alt="Comerciante local en la puerta de su tienda en el Valle del Tiétar"
              width={1200}
              height={1504}
              loading="lazy"
              className="h-[30rem] w-full object-cover transition-transform duration-300 hover:scale-[1.02] lg:h-[38rem]"
            />
          </div>
        </Reveal>

        <Reveal delay={120}>
          <p className="eyebrow text-terracotta">Por qué existe este proyecto</p>
          <h2 className="mt-5 text-4xl font-extrabold leading-[1.03] sm:text-5xl">
            El Valle necesita que vuelvas.
          </h2>
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-muted-foreground">
            <p>
              Después de los incendios, lo que más necesita la comarca no son titulares: necesita
              gente que vuelva a sentarse en sus terrazas, a dormir en sus casas rurales y a comprar
              en sus tiendas.
            </p>
            <p>
              Sotillo está vivo nació para eso. Para reunir en un solo sitio los negocios, pueblos y
              experiencias del Valle del Tiétar, y para que planear una escapada aquí sea tan fácil
              como querer venir.
            </p>
          </div>
          <dl className="mt-10 grid grid-cols-2 gap-8 border-t border-border pt-8 sm:grid-cols-3">
            {[
              ["+120", "negocios locales"],
              ["9", "pueblos del Valle"],
              ["100%", "de lo que gastas se queda aquí"],
            ].map(([n, t]) => (
              <div key={t}>
                <dt className="text-3xl font-extrabold text-forest">{n}</dt>
                <dd className="mt-1 text-sm text-muted-foreground">{t}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
