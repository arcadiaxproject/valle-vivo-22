import { useEffect, useRef, useState, type ReactNode } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { MapPin } from "lucide-react";
import { useAuth } from "@/lib/auth";
import {
  CATEGORIAS_NEGOCIO,
  fetchMiNegocio,
  guardarMiNegocio,
  subirFotoNegocio,
} from "@/lib/negocios";
import { loadGoogleMaps } from "@/lib/google-maps";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Ubicacion = { direccion: string; lat: number; lng: number };

export function MiNegocioDialog({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const { data: negocio } = useQuery({
    queryKey: ["mi-negocio", user?.id],
    queryFn: () => fetchMiNegocio(user!.id),
    enabled: Boolean(user) && open,
  });

  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState<string>("");
  const [municipio, setMunicipio] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [abierto, setAbierto] = useState(true);
  const [imagen, setImagen] = useState<string | null>(null);
  const [ubicacion, setUbicacion] = useState<Ubicacion | null>(null);

  const direccionInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!negocio) return;
    setNombre(negocio.nombre);
    setCategoria(negocio.categoria);
    setMunicipio(negocio.municipio);
    setDescripcion(negocio.descripcion);
    setAbierto(negocio.abierto ?? true);
    setImagen(negocio.imagen);
    if (negocio.lat != null && negocio.lng != null) {
      const u = { direccion: negocio.direccion ?? "", lat: negocio.lat, lng: negocio.lng };
      setUbicacion(u);
      if (direccionInputRef.current) direccionInputRef.current.value = u.direccion;
    }
  }, [negocio]);

  // Autocompletado de Google Places sobre el input de dirección.
  useEffect(() => {
    if (!open) return;
    let cancelled = false;

    loadGoogleMaps()
      .then(() => {
        if (cancelled || !direccionInputRef.current) return;

        const autocomplete = new google.maps.places.Autocomplete(direccionInputRef.current, {
          fields: ["formatted_address", "geometry", "address_components"],
          componentRestrictions: { country: "es" },
        });

        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          const loc = place.geometry?.location;
          if (!loc) {
            toast.error("Elige una dirección de la lista de sugerencias");
            return;
          }
          setUbicacion({
            direccion: place.formatted_address ?? "",
            lat: loc.lat(),
            lng: loc.lng(),
          });

          const municipioComponent = place.address_components?.find(
            (c) => c.types.includes("locality") || c.types.includes("administrative_area_level_3"),
          );
          if (municipioComponent) setMunicipio(municipioComponent.long_name);
        });
      })
      .catch(() => {
        // Sin VITE_GOOGLE_MAPS_API_KEY configurada, el campo de dirección
        // sigue funcionando como texto libre, solo sin autocompletado.
      });

    return () => {
      cancelled = true;
    };
  }, [open]);

  async function handleFile(file: File) {
    if (!user) return;
    setUploading(true);
    try {
      const url = await subirFotoNegocio(user.id, file);
      setImagen(url);
    } catch {
      toast.error("No se ha podido subir la foto");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user || !categoria) return;
    setSaving(true);
    try {
      await guardarMiNegocio({
        id: negocio?.id,
        owner_id: user.id,
        nombre,
        categoria: categoria as (typeof CATEGORIAS_NEGOCIO)[number],
        municipio,
        descripcion,
        imagen,
        abierto,
        direccion: ubicacion?.direccion ?? direccionInputRef.current?.value ?? null,
        lat: ubicacion?.lat ?? null,
        lng: ubicacion?.lng ?? null,
      });
      await queryClient.invalidateQueries({ queryKey: ["mi-negocio", user.id] });
      await queryClient.invalidateQueries({ queryKey: ["negocios"] });
      toast.success("Ficha del negocio guardada");
      setOpen(false);
    } catch {
      toast.error("No se ha podido guardar el negocio");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Mi negocio</DialogTitle>
          <DialogDescription>
            Esta información aparecerá en el listado de negocios y en el mapa del Valle.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="foto">Foto del negocio</Label>
            {imagen && (
              <img
                src={imagen}
                alt="Foto del negocio"
                className="h-40 w-full rounded-lg object-cover"
              />
            )}
            <Input
              id="foto"
              type="file"
              accept="image/*"
              disabled={uploading}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) void handleFile(file);
              }}
            />
            {uploading && <p className="text-xs text-muted-foreground">Subiendo foto…</p>}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="nombre">Nombre del local</Label>
            <Input id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
          </div>

          <div className="grid gap-2">
            <Label>Categoría</Label>
            <Select value={categoria} onValueChange={setCategoria} required>
              <SelectTrigger>
                <SelectValue placeholder="Elige una categoría" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIAS_NEGOCIO.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="direccion">Dirección</Label>
            <Input
              id="direccion"
              ref={direccionInputRef}
              placeholder="Empieza a escribir la calle…"
              defaultValue={ubicacion?.direccion}
            />
            {ubicacion && (
              <p className="flex items-start gap-2 rounded-lg bg-secondary/60 p-2 text-xs text-muted-foreground">
                <MapPin className="mt-0.5 size-3.5 shrink-0 text-forest" />
                {ubicacion.direccion}
              </p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="municipio">Municipio</Label>
            <Input
              id="municipio"
              value={municipio}
              onChange={(e) => setMunicipio(e.target.value)}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="descripcion">Descripción</Label>
            <Textarea
              id="descripcion"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              rows={3}
              required
            />
          </div>

          <div className="flex items-center justify-between rounded-lg border border-border p-3">
            <Label htmlFor="abierto" className="cursor-pointer">
              Abierto ahora
            </Label>
            <Switch id="abierto" checked={abierto} onCheckedChange={setAbierto} />
          </div>

          <button
            type="submit"
            disabled={saving || uploading}
            className="mt-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90 disabled:opacity-60"
          >
            {saving ? "Guardando…" : "Guardar negocio"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
