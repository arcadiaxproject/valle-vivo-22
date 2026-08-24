import heroPoster from "@/assets/hero-valle.jpg";
import heroVideo from "@/assets/hero-valle.mp4.asset.json";

export function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen items-end overflow-hidden">
      <video
        className="absolute inset-0 size-full object-cover"
        src={heroVideo.url}
        poster={heroPoster}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_top,oklch(0.19_0.012_120/0.82),oklch(0.19_0.012_120/0.35)_55%,oklch(0.19_0.012_120/0.45))]" />

      <div className="container-page relative z-10 pb-24 pt-32 sm:pb-28">
        <p className="eyebrow text-primary-foreground/80">Salvar el Valle del Tiétar</p>
        <h1 className="mt-5 max-w-4xl text-5xl font-extrabold leading-[0.95] text-primary-foreground sm:text-7xl lg:text-8xl">
          Sotillo está vivo.
        </h1>
        <p className="mt-6 max-w-xl text-xl font-semibold text-primary-foreground/95 sm:text-2xl">
          Descubre. Visita. Consume local.
        </p>
        <p className="mt-4 max-w-lg text-base leading-relaxed text-primary-foreground/75">
          Descubre los negocios, lugares y experiencias que mantienen vivo el Valle del Tiétar.
        </p>

        <div className="mt-9 flex flex-wrap gap-3">
          <a
            href="#descubre"
            className="rounded-xl bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground transition-colors duration-200 hover:bg-accent/90"
          >
            Explorar el Valle
          </a>
          <a
            href="#proyecto"
            className="rounded-xl border border-primary-foreground/45 px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-colors duration-200 hover:bg-primary-foreground/12"
          >
            Conoce el proyecto
          </a>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-6 z-10 flex justify-center">
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-primary-foreground/45 p-1">
          <span className="h-2 w-0.5 animate-bounce rounded-full bg-primary-foreground/80" />
        </span>
      </div>
    </section>
  );
}
