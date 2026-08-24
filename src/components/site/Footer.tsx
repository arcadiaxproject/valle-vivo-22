import { Instagram } from "lucide-react";

const enlaces = [
  { label: "Proyecto", href: "#proyecto" },
  { label: "Negocios", href: "#negocios" },
  { label: "Pueblos", href: "#pueblos" },
  { label: "Historias", href: "#historias" },
  { label: "Contacto", href: "#top" },
  { label: "Privacidad", href: "#top" },
  { label: "Términos", href: "#top" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-16">
      <div className="container-page flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-sm">
          <p className="text-lg font-extrabold text-primary">Sotillo está vivo</p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Un proyecto para mantener vivo el Valle del Tiétar.
          </p>
          <a
            href="https://instagram.com"
            aria-label="Instagram"
            className="mt-6 inline-flex size-10 items-center justify-center rounded-lg border border-border text-foreground transition-colors duration-200 hover:bg-secondary"
          >
            <Instagram className="size-4.5" />
          </a>
        </div>

        <nav className="grid grid-cols-2 gap-x-14 gap-y-3 sm:grid-cols-2">
          {enlaces.map((e) => (
            <a
              key={e.label}
              href={e.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {e.label}
            </a>
          ))}
        </nav>
      </div>
      <div className="container-page mt-12 border-t border-border pt-6">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Sotillo está vivo · Valle del Tiétar, Ávila
        </p>
      </div>
    </footer>
  );
}
