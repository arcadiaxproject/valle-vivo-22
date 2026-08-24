import { Instagram } from "lucide-react";

const enlaces = [
  { label: "Proyecto", href: "#proyecto" },
  { label: "Descubre", href: "#descubre" },
  { label: "Historias", href: "#historias" },
  { label: "Pueblos", href: "#pueblos" },
  { label: "Ayudar", href: "#ayudar" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-8">
      <div className="container-page flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <p className="text-sm font-bold text-primary">Sotillo está vivo</p>
          <a
            href="https://instagram.com"
            aria-label="Instagram"
            className="inline-flex size-8 items-center justify-center rounded-lg border border-border text-foreground transition-colors duration-200 hover:bg-secondary"
          >
            <Instagram className="size-4" />
          </a>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2">
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

        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Valle del Tiétar, Ávila
        </p>
      </div>
    </footer>
  );
}
