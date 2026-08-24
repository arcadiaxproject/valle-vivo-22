import { Reveal } from "./Reveal";

export function CtaNegocios() {
  return (
    <section className="flex min-h-screen flex-col justify-center bg-background py-24 sm:py-32">
      <div className="container-page">
        <Reveal>
          <div className="rounded-3xl bg-bark px-8 py-16 text-primary-foreground sm:px-16 sm:py-24">
            <h2 className="max-w-2xl text-4xl font-extrabold leading-[1.03] sm:text-5xl">
              Tu negocio también forma parte de esta historia.
            </h2>
            <p className="mt-6 max-w-xl text-lg text-primary-foreground/70">
              Únete a Sotillo está vivo y ayuda a que más personas descubran tu negocio.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <button className="rounded-xl bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground transition-colors duration-200 hover:bg-accent/90">
                Añadir mi negocio
              </button>
              <button className="rounded-xl border border-primary-foreground/40 px-6 py-3.5 text-sm font-semibold transition-colors duration-200 hover:bg-primary-foreground/12">
                Cómo funciona
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
