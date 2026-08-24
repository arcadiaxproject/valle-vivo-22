import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { MiNegocioDialog } from "./MiNegocioDialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

const ROLE_LABEL: Record<"cliente" | "comercio", string> = {
  cliente: "Visitante",
  comercio: "Negocio",
};

export function AccountDialog({ children }: { children: React.ReactNode }) {
  const { user, profile, signOut } = useAuth();
  const [open, setOpen] = useState(false);

  if (!user) return null;

  const miembroDesde = new Date(user.created_at).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Mi cuenta</DialogTitle>
          <DialogDescription>Información de tu perfil en Sotillo está vivo.</DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-4">
          {profile?.avatar_url && (
            <img
              src={profile.avatar_url}
              alt={profile.nombre}
              width={56}
              height={56}
              className="size-14 rounded-full object-cover"
            />
          )}
          <div className="min-w-0">
            <p className="truncate text-lg font-bold">{profile?.nombre ?? user.email}</p>
            <p className="truncate text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>

        <dl className="grid gap-3 border-t border-border pt-4 text-sm">
          <div className="flex items-center justify-between">
            <dt className="text-muted-foreground">Tipo de cuenta</dt>
            <dd className="font-semibold">
              {profile?.role ? ROLE_LABEL[profile.role] : "Sin definir"}
            </dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-muted-foreground">Distintivo</dt>
            <dd className="font-semibold">{profile?.distintivo ? "Sí, activo" : "Todavía no"}</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-muted-foreground">Miembro desde</dt>
            <dd className="font-semibold">{miembroDesde}</dd>
          </div>
        </dl>

        {profile?.role === "comercio" && (
          <MiNegocioDialog>
            <button className="w-full rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90">
              Mi negocio
            </button>
          </MiNegocioDialog>
        )}

        <button
          onClick={() => {
            setOpen(false);
            void signOut();
          }}
          className="rounded-lg border border-border px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
        >
          Cerrar sesión
        </button>
      </DialogContent>
    </Dialog>
  );
}
