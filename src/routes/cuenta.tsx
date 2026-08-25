import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  ArrowLeft,
  Award,
  BadgeCheck,
  CalendarDays,
  Camera,
  ExternalLink,
  Images,
  LogOut,
  MapPin,
  Music,
  Pencil,
  PlusCircle,
  Store,
  Tag,
  UserRound,
  Video,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { fetchMiNegocio, subirArchivoNegocio, type Negocio } from "@/lib/negocios";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { MiNegocioDialog } from "@/components/site/MiNegocioDialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ROLE_LABEL: Record<"cliente" | "comercio", string> = {
  cliente: "Visitante",
  comercio: "Negocio",
};

// Mismo acento por categoría que en el listado del Valle.
const CATEGORIA_ACENTOS: Record<string, string> = {
  Pueblos: "#c1502e",
  Naturaleza: "#4c6a3f",
  Comer: "#c1502e",
  Dormir: "#b9902e",
  "Qué hacer": "#4c6a3f",
  "Comercio local": "#b9902e",
};

export const Route = createFileRoute("/cuenta")({
  head: () => ({ meta: [{ title: "Mi cuenta — Salvar el valle" }] }),
  component: CuentaPage,
});

type Tab = "negocio" | "cuenta";

function CuentaPage() {
  const { user, profile, loading, signOut, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState<Tab>("negocio");
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const avatarInputRef = useRef<HTMLInputElement>(null);

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

  const esComercio = profile?.role === "comercio";
  const activeTab: Tab = esComercio ? tab : "cuenta";

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

  async function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file || !user) return;
    setUploadingAvatar(true);
    try {
      const avatar_url = await subirArchivoNegocio(user.id, file);
      await updateProfile({ avatar_url });
      toast.success("Foto de perfil actualizada");
    } catch {
      toast.error("No se ha podido subir la foto");
    } finally {
      setUploadingAvatar(false);
    }
  }

  return (
    <>
      <Navbar />
      <main className="flex h-screen flex-col overflow-hidden bg-stone">
        <div className="shrink-0 border-b border-border bg-card pt-24 sm:pt-28">
          <div className="container-page flex items-center justify-between gap-4 pb-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-opacity hover:opacity-70"
            >
              <ArrowLeft className="size-4" />
              Volver al Valle
            </Link>
            <button
              onClick={() => void signOut()}
              className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-semibold transition-colors hover:bg-secondary"
            >
              <LogOut className="size-4" />
              Cerrar sesión
            </button>
          </div>
        </div>

        <div className="container-page grid min-h-0 flex-1 gap-6 py-5 lg:grid-cols-[260px_1fr]">
          {/* Sidebar de perfil, estilo GitHub */}
          <aside className="min-h-0 overflow-y-auto">
            <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
              <div className="group relative w-fit">
                {profile?.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt={profile.nombre}
                    width={80}
                    height={80}
                    className="size-20 rounded-full object-cover ring-4 ring-secondary"
                  />
                ) : (
                  <div className="flex size-20 items-center justify-center rounded-full bg-secondary ring-4 ring-secondary">
                    <UserRound className="size-8 text-muted-foreground" />
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => avatarInputRef.current?.click()}
                  disabled={uploadingAvatar}
                  aria-label="Cambiar foto de perfil"
                  className="absolute -bottom-1 -right-1 flex size-7 items-center justify-center rounded-full border-2 border-card bg-accent text-accent-foreground shadow-soft transition-transform hover:scale-105 disabled:opacity-60"
                >
                  <Camera className="size-3.5" />
                </button>
                <input
                  ref={avatarInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => void handleAvatarChange(e)}
                />
              </div>
              {uploadingAvatar && (
                <p className="mt-1.5 text-xs text-muted-foreground">Subiendo foto…</p>
              )}

              <h1 className="mt-3 text-xl font-bold leading-tight">
                {profile?.nombre ?? user.email}
              </h1>
              <p className="mt-0.5 truncate text-sm text-muted-foreground">{user.email}</p>

              <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-wide text-secondary-foreground">
                {esComercio ? <Store className="size-3.5" /> : <UserRound className="size-3.5" />}
                {profile?.role ? ROLE_LABEL[profile.role] : "Sin definir"}
              </span>

              <dl className="mt-4 space-y-2.5 border-t border-border pt-4 text-sm">
                <div className="flex items-center justify-between gap-3">
                  <dt className="flex items-center gap-2 text-muted-foreground">
                    <Award className="size-4 text-terracotta" />
                    Distintivo
                  </dt>
                  <dd className="font-semibold">{profile?.distintivo ? "Activo" : "Todavía no"}</dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="flex items-center gap-2 text-muted-foreground">
                    <CalendarDays className="size-4 text-wood" />
                    Miembro desde
                  </dt>
                  <dd className="font-semibold">{miembroDesde}</dd>
                </div>
              </dl>
            </div>
          </aside>

          {/* Contenido con pestañas */}
          <div className="flex min-h-0 flex-col">
            <div className="flex shrink-0 gap-6 border-b border-border">
              {esComercio && (
                <button
                  onClick={() => setTab("negocio")}
                  className={`flex items-center gap-2 border-b-2 pb-3 text-sm font-semibold transition-colors ${
                    activeTab === "negocio"
                      ? "border-forest text-foreground"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Store className="size-4" />
                  Mi negocio
                </button>
              )}
              <button
                onClick={() => setTab("cuenta")}
                className={`flex items-center gap-2 border-b-2 pb-3 text-sm font-semibold transition-colors ${
                  activeTab === "cuenta"
                    ? "border-forest text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <UserRound className="size-4" />
                Cuenta
              </button>
            </div>

            <div className="mt-4 min-h-0 flex-1">
              {activeTab === "negocio" && esComercio && (
                <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
                  {miNegocio ? (
                    <PerfilNegocioEmpresa
                      negocio={miNegocio}
                      verificado={Boolean(profile?.distintivo)}
                    />
                  ) : (
                    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-10 text-center">
                      <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-secondary">
                        <Store className="size-6 text-forest" />
                      </div>
                      <div className="max-w-sm">
                        <h2 className="text-lg font-bold">
                          Todavía no has dado de alta tu negocio
                        </h2>
                        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                          Crea tu ficha de empresa para aparecer en el listado de negocios y en el
                          mapa del Valle.
                        </p>
                      </div>
                      <MiNegocioDialog>
                        <button className="mt-1 inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90">
                          <PlusCircle className="size-4" />
                          Añadir mi negocio
                        </button>
                      </MiNegocioDialog>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "cuenta" && (
                <div className="h-full max-w-sm overflow-y-auto rounded-2xl border border-border bg-card p-6 shadow-soft">
                  <h2 className="text-lg font-bold">Editar datos</h2>
                  <form onSubmit={handleSubmit} className="mt-4 grid gap-4">
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
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function PerfilNegocioEmpresa({ negocio, verificado }: { negocio: Negocio; verificado: boolean }) {
  const galeria = [negocio.imagen, ...negocio.fotos].filter((u): u is string => Boolean(u));
  const hero = galeria.slice(0, 5);
  const extra = galeria.slice(5, 9);
  const restantes = galeria.length - hero.length - extra.length;
  const acento = CATEGORIA_ACENTOS[negocio.categoria] ?? "#c1502e";
  const creadoEl = new Date(negocio.created_at).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex h-full min-h-0 flex-col">
      {/* Cabecera de empresa */}
      <div className="flex shrink-0 flex-wrap items-start justify-between gap-4 border-b border-border bg-gradient-to-br from-secondary/50 to-transparent px-5 py-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-[0.7rem] font-bold uppercase tracking-widest"
              style={{ color: acento, borderColor: `${acento}55`, backgroundColor: `${acento}14` }}
            >
              {negocio.categoria}
            </span>
            {verificado && (
              <span className="inline-flex items-center gap-1 rounded-full bg-forest/10 px-2.5 py-0.5 text-[0.7rem] font-bold uppercase tracking-widest text-forest">
                <BadgeCheck className="size-3.5" />
                Verificado
              </span>
            )}
            {negocio.abierto !== null && (
              <span
                className={`inline-flex items-center gap-1.5 text-xs font-semibold ${negocio.abierto ? "text-forest" : "text-earth"}`}
              >
                <span
                  className={`size-1.5 rounded-full ${negocio.abierto ? "bg-forest" : "bg-earth"}`}
                  aria-hidden="true"
                />
                {negocio.abierto ? "Abierto ahora" : "Cerrado"}
              </span>
            )}
          </div>

          <h2 className="mt-2.5 truncate text-2xl font-bold leading-tight">{negocio.nombre}</h2>

          <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-3.5 shrink-0" />
              {negocio.direccion ? `${negocio.direccion}, ${negocio.municipio}` : negocio.municipio}
            </span>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2.5">
          <Link
            to="/negocio/$id"
            params={{ id: negocio.id }}
            className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-secondary"
          >
            <ExternalLink className="size-4" />
            Ver ficha pública
          </Link>
          <MiNegocioDialog>
            <button className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90">
              <Pencil className="size-4" />
              Editar
            </button>
          </MiNegocioDialog>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-5">
        {/* Galería estilo Airbnb: una foto grande + hasta 4 pequeñas */}
        {hero.length > 0 ? (
          <div
            className="grid grid-cols-4 grid-rows-2 gap-1.5 overflow-hidden rounded-xl"
            style={{ aspectRatio: "16 / 5" }}
          >
            <img src={hero[0]} alt="" className="col-span-2 row-span-2 size-full object-cover" />
            {hero.slice(1).map((url) => (
              <img key={url} src={url} alt="" className="size-full object-cover" />
            ))}
          </div>
        ) : (
          <div className="flex h-48 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-secondary/40 text-muted-foreground">
            <Store className="size-8" />
            <p className="text-sm">Todavía no has subido fotos</p>
          </div>
        )}

        {extra.length > 0 && (
          <div className="mt-2 grid grid-cols-4 gap-1.5 sm:grid-cols-6">
            {extra.map((url, i) => {
              const esUltima = i === extra.length - 1 && restantes > 0;
              return (
                <div key={url} className="relative aspect-square w-full overflow-hidden rounded-lg">
                  <img src={url} alt="" className="size-full object-cover" />
                  {esUltima && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/55 text-sm font-semibold text-white">
                      +{restantes}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-5 grid gap-6 border-t border-border pt-5 lg:grid-cols-[1fr_17rem]">
          <div className="min-w-0 space-y-4">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                Descripción
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {negocio.descripcion}
              </p>
            </div>

            {negocio.badges.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                  Distintivos
                </h3>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {negocio.badges.map((b) => (
                    <span
                      key={b}
                      className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground"
                    >
                      <Tag className="size-3.5 text-terracotta" />
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {negocio.video_url && (
              <div>
                <h3 className="flex items-center gap-1.5 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                  <Video className="size-3.5" />
                  Vídeo
                </h3>
                <video src={negocio.video_url} controls className="mt-2 w-full rounded-lg" />
              </div>
            )}

            {negocio.audio_url && (
              <div>
                <h3 className="flex items-center gap-1.5 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                  <Music className="size-3.5" />
                  Audio
                </h3>
                <audio src={negocio.audio_url} controls className="mt-2 w-full" />
              </div>
            )}
          </div>

          <aside className="h-fit space-y-4 rounded-xl border border-border p-4">
            <div>
              <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                <Images className="size-3.5" />
                Ficha de empresa
              </p>
              <dl className="mt-3 space-y-2.5 text-sm">
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">Categoría</dt>
                  <dd className="font-semibold">{negocio.categoria}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">Municipio</dt>
                  <dd className="font-semibold">{negocio.municipio}</dd>
                </div>
                {negocio.direccion && (
                  <div className="flex justify-between gap-3">
                    <dt className="text-muted-foreground">Dirección</dt>
                    <dd className="text-right font-semibold">{negocio.direccion}</dd>
                  </div>
                )}
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">Fotos</dt>
                  <dd className="font-semibold">{galeria.length}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">Publicado</dt>
                  <dd className="font-semibold">{creadoEl}</dd>
                </div>
              </dl>
            </div>
            <MiNegocioDialog>
              <button className="w-full rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90">
                Editar mi negocio
              </button>
            </MiNegocioDialog>
          </aside>
        </div>
      </div>
    </div>
  );
}
