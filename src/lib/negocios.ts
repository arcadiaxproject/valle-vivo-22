import { supabase } from "./supabase";
import type { Database } from "./database.types";

export type Negocio = Database["public"]["Tables"]["negocios"]["Row"];
export type NegocioInput = Database["public"]["Tables"]["negocios"]["Insert"];

export const CATEGORIAS_NEGOCIO = [
  "Comer",
  "Dormir",
  "Qué hacer",
  "Comercio local",
  "Naturaleza",
  "Pueblos",
] as const;

export async function fetchNegocios(): Promise<Negocio[]> {
  const { data, error } = await supabase.from("negocios").select("*");
  if (error) throw error;
  return data;
}

export async function fetchNegocioPorId(id: string): Promise<Negocio | null> {
  const { data, error } = await supabase.from("negocios").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data;
}

export async function fetchMiNegocio(ownerId: string): Promise<Negocio | null> {
  const { data, error } = await supabase
    .from("negocios")
    .select("*")
    .eq("owner_id", ownerId)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function guardarMiNegocio(input: NegocioInput): Promise<Negocio> {
  const { data, error } = await supabase
    .from("negocios")
    .upsert(input, { onConflict: "id" })
    .select("*")
    .single();
  if (error) throw error;
  return data;
}

export async function subirFotoNegocio(ownerId: string, file: File): Promise<string> {
  const ext = file.name.split(".").pop();
  const path = `${ownerId}/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from("negocios").upload(path, file, {
    upsert: true,
  });
  if (error) throw error;
  return supabase.storage.from("negocios").getPublicUrl(path).data.publicUrl;
}
