import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { ArrowLeft, Award, CalendarDays, LogOut, Store, UserRound } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { fetchMiNegocio } from "@/lib/negocios";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { MiNegocioDialog } from "@/components/site/MiNegocioDialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ROLE_LABEL: Record<"cliente" | "comercio", string> = {
  cliente: "Visitante",
  comercio: "Negocio",
};

export const Route = createFileRoute("/cuenta")({
  head: () => ({ meta: [{ title: "Mi cuenta — Sotillo está vivo" }] }),
  component: CuentaPage,
});

function CuentaPage() {
  const { user, profile, loading, signOut, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (profile) setNombre(profile.nombre);
  }, [profile]);

  useEffect(() => {
    if (!loading && !user) void navigate({ to: "/" });
  }, [loading, user, navigate]);

  const { data: miNegocio } = useQuery({
    queryKey: ["mi-negocio", user?.id],
    queryFn: () => fetchMiNegocio(user!.id),
    enabled: Boolean(user) && profile?.role === "comercio",
  });

  if (loading || !user) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-stone pb-24 pt-32 sm:pt-36" />
        <Footer />
      </>
    );
  }

  const miembroDesde = new Date(user.created_at).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await updateProfile({ nombre });
      toast.success("Datos actualizados");
    } catch {
      toast.error("No se han podido guardar los cambios");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-stone pb-24">
        {/* Cabecera */}
        <div className="bg-bark pb-20 pt-32 text-primary-foreground sm:pt-40">
          <div className="container-page">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary-foreground/70 transition-opacity hover:opacity-80"
            >
              <ArrowLeft className="size-4" />
              Volver al Valle
            </Link>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                {profile?.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt={profile.nombre}
                    width={88}
                    height={88}
                    className="size-20 rounded-full object-cover ring-4 ring-primary-foreground/15 sm:size-22"
                  />
                ) : (
                  <div className="flex size-20 items-center justify-center rounded-full bg-primary-foreground/10 ring-4 ring-primary-foreground/15 sm:size-22">
                    <UserRound className="size-8 text-primary-foreground/70" />
                  </div>
                )}
                <div className="min-w-0">
                  <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">
                    {profile?.nombre ?? user.email}
                  </h1>
                  <p className="mt-1 truncate text-sm text-primary-foreground/60">{user.email}</p>
                  <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-primary-foreground/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-foreground/85">
                    {profile?.role === "comercio" ? (
                      <Store className="size-3.5" />
                    ) : (
                      <UserRound className="size-3.5" />
                    )}
                    {profile?.role ? ROLE_LABEL[profile.role] : "Sin definir"}
                  </span>
                </div>
              </div>

              <button
                onClick={() => void signOut()}
                className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-primary-foreground/25 px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-primary-foreground/10"
              >
                <LogOut className="size-4" />
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>

        <div className="container-page -mt-10 max-w-3xl">
          {/* Stats */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
              <UserRound className="size-5 text-forest" />
              <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Tipo de cuenta
              </p>
              <p className="mt-1 text-lg font-bold">
                {profile?.role ? ROLE_LABEL[profile.role] : "Sin definir"}
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
              <Award className="size-5 text-terracotta" />
              <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Distintivo
              </p>
              <p className="mt-1 text-lg font-bold">
                {profile?.distintivo ? "Activo" : "Todavía no"}
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
              <CalendarDays className="size-5 text-wood" />
              <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Miembro desde
              </p>
              <p className="mt-1 text-lg font-bold">{miembroDesde}</p>
            </div>
          </div>

          {/* Mi negocio */}
          {profile?.role === "comercio" && (
            <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
              {miNegocio ? (
                <div className="flex flex-col sm:flex-row">
                  {miNegocio.imagen && (
                    <img
                      src={miNegocio.imagen}
                      alt={miNegocio.nombre}
                      width={320}
                      height={240}
                      className="h-48 w-full object-cover sm:h-auto sm:w-56"
                    />
                  )}
                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                        {miNegocio.categoria} · {miNegocio.municipio}
                      </p>
                      <h2 className="mt-2 text-xl font-bold">{miNegocio.nombre}</h2>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {miNegocio.descripcion}
                      </p>
                    </div>
                    <MiNegocioDialog>
                      <button className="mt-4 w-fit rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90">
                        Editar mi negocio
                      </button>
                    </MiNegocioDialog>
                  </div>
                </div>
              ) : (
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-secondary">
                      <Store className="size-5 text-forest" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold">Todavía no has dado de alta tu negocio</h2>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Añade tu ficha para aparecer en el listado de negocios y en el mapa del
                        Valle.
                      </p>
                    </div>
                  </div>
                  <MiNegocioDialog>
                    <button className="mt-4 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90">
                      Añadir mi negocio
                    </button>
                  </MiNegocioDialog>
                </div>
              )}
            </div>
          )}

          {/* Editar datos */}
          <div className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-soft">
            <h2 className="text-lg font-bold">Editar datos</h2>
            <form onSubmit={handleSubmit} className="mt-4 grid gap-4 sm:max-w-sm">
              <div className="grid gap-2">
                <Label htmlFor="nombre">Nombre</Label>
                <Input
                  id="nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={user.email ?? ""} disabled />
                <p className="text-xs text-muted-foreground">
                  El email viene de tu cuenta de Google y no se puede cambiar aquí.
                </p>
              </div>
              <button
                type="submit"
                disabled={saving}
                className="mt-1 w-fit rounded-lg bg-accent px-6 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90 disabled:opacity-60"
              >
                {saving ? "Guardando…" : "Guardar cambios"}
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
