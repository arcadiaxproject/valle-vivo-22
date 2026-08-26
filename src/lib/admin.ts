import { supabase } from "./supabase";
import type { Database } from "./database.types";

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];

// Gracias a RLS, esto solo devuelve algo si quien pregunta es administrador.
export async function fetchUsuariosAdmin(): Promise<Profile[]> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}
