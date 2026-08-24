import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Descubre", href: "#descubre" },
  { label: "Comer", href: "#negocios" },
  { label: "Dormir", href: "#negocios" },
  { label: "Qué hacer", href: "#descubre" },
  { label: "Comercios", href: "#negocios" },
  { label: "Historias", href: "#historias" },
  { label: "Mapa", href: "#mapa" },
];

export function Navbar() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid
          ? "border-b border-border/70 bg-background/90 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav className="container-page flex h-18 items-center justify-between gap-6 py-4">
        <a
          href="#top"
          className={`text-[1.0625rem] font-extrabold tracking-tight transition-colors ${
            solid ? "text-primary" : "text-primary-foreground"
          }`}
        >
          Sotillo está vivo
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className={`text-sm font-medium transition-opacity hover:opacity-70 ${
                  solid ? "text-foreground" : "text-primary-foreground"
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            className={`text-sm font-semibold transition-opacity hover:opacity-70 ${
              solid ? "text-foreground" : "text-primary-foreground"
            }`}
          >
            Iniciar sesión
          </button>
          <button
            className={`rounded-lg border px-4 py-2 text-sm font-semibold transition-colors ${
              solid
                ? "border-border text-foreground hover:bg-secondary"
                : "border-primary-foreground/45 text-primary-foreground hover:bg-primary-foreground/12"
            }`}
          >
            Soy un negocio
          </button>
          <button className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90">
            Soy un visitante
          </button>
        </div>

        <button
          aria-label="Abrir menú"
          onClick={() => setOpen((v) => !v)}
          className={`lg:hidden ${solid ? "text-foreground" : "text-primary-foreground"}`}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border bg-background px-6 pb-6 pt-2 lg:hidden">
          <ul className="grid gap-1">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-2 py-3 text-base font-medium text-foreground hover:bg-secondary"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 grid gap-2">
            <button className="rounded-lg border border-border px-4 py-3 text-sm font-semibold">
              Soy un negocio
            </button>
            <button className="rounded-lg bg-accent px-4 py-3 text-sm font-semibold text-accent-foreground">
              Soy un visitante
            </button>
            <button className="py-2 text-sm font-semibold text-muted-foreground">
              Iniciar sesión
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
