import { Reveal } from "./Reveal";

export function CtaNegocios() {
  return (
    <section className="flex min-h-screen flex-col justify-center bg-forest-deep py-24 text-primary-foreground sm:py-32">
      <div className="container-page text-center">
        <Reveal>
          <p className="eyebrow text-terracotta">Sotillo está vivo</p>
          <h2 className="mx-auto mt-6 max-w-2xl text-5xl font-semibold leading-[1.02] sm:text-6xl">
            Este fin de semana, el Valle te está esperando.
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-lg text-primary-foreground/65">
            Y si tienes un negocio aquí, tu ficha también forma parte de esta historia.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#descubre"
              className="rounded-lg bg-accent px-7 py-3.5 text-sm font-bold text-accent-foreground transition-colors duration-200 hover:bg-accent/90"
            >
              Explorar el Valle
            </a>
            <a
              href="#top"
              className="text-sm font-semibold text-primary-foreground/85 underline decoration-primary-foreground/40 underline-offset-4 transition-colors hover:decoration-primary-foreground"
            >
              Da de alta tu negocio
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
