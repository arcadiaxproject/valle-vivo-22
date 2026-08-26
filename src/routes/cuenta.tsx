import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { ArrowLeft, LogOut, Pencil } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import heroValle from "@/assets/hero-valle.jpg";

export const Route = createFileRoute("/cuenta")({
  head: () => ({ meta: [{ title: "Mi cuenta — Salvar el valle" }] }),
  component: CuentaPage,
});

function CuentaPage() {
  const { user, profile, loading, signOut, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [editingNombre, setEditingNombre] = useState(false);
  const [savingNombre, setSavingNombre] = useState(false);
  const nombreInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (profile) setNombre(profile.nombre);
  }, [profile]);

  useEffect(() => {
    if (!loading && !user) void navigate({ to: "/" });
  }, [loading, user, navigate]);

  if (loading || !user) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-background pb-24 pt-32 sm:pt-36" />
        <Footer />
      </>
    );
  }

  async function guardarNombre() {
    const limpio = nombre.trim();
    if (!profile || !limpio || limpio === profile.nombre) {
      setNombre(profile?.nombre ?? "");
      setEditingNombre(false);
      return;
    }
    setSavingNombre(true);
    try {
      await updateProfile({ nombre: limpio });
    } catch {
      toast.error("No se ha podido guardar el nombre");
      setNombre(profile.nombre);
    } finally {
      setSavingNombre(false);
      setEditingNombre(false);
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <div className="relative h-48 w-full overflow-hidden sm:h-64">
          <img src={heroValle} alt="" className="absolute inset-0 size-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.14_0.02_60/0.65)] via-[oklch(0.14_0.02_60/0.2)] to-[var(--background)]" />

          <div className="container-page relative flex max-w-2xl items-center justify-between gap-4 pt-24 sm:pt-28">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary-foreground/90 transition-colors hover:text-primary-foreground"
            >
              <ArrowLeft className="size-4" />
              Volver al Valle
            </Link>
            <button
              onClick={() => void signOut()}
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary-foreground/90 transition-colors hover:text-primary-foreground"
            >
              <LogOut className="size-4" />
              Cerrar sesión
            </button>
          </div>
        </div>

        <div className="container-page max-w-2xl pb-24">
          <div className="mx-auto -mt-6 flex max-w-sm animate-in fade-in slide-in-from-bottom-3 flex-col items-center text-center duration-700 sm:-mt-8">
            {editingNombre ? (
              <input
                ref={nombreInputRef}
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                onBlur={() => void guardarNombre()}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    nombreInputRef.current?.blur();
                  }
                  if (e.key === "Escape") {
                    setNombre(profile?.nombre ?? "");
                    setEditingNombre(false);
                  }
                }}
                autoFocus
                disabled={savingNombre}
                className="min-w-0 max-w-full border-b-2 border-forest bg-transparent px-1 text-center font-serif text-2xl font-semibold leading-tight text-foreground outline-none disabled:opacity-60 sm:text-3xl"
                style={{ width: `${Math.max(nombre.length, 3)}ch` }}
              />
            ) : (
              <h1
                onClick={() => setEditingNombre(true)}
                className="group/name inline-flex max-w-full cursor-pointer items-center gap-2 rounded-lg px-1 text-center font-serif text-2xl font-semibold leading-tight text-foreground transition-opacity hover:opacity-80 sm:text-3xl"
              >
                <span className="truncate">{profile?.nombre ?? user.email}</span>
                <Pencil className="size-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover/name:opacity-100" />
              </h1>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
