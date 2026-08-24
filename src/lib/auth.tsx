import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { toast } from "sonner";
import { supabase } from "./supabase";
import type { Database } from "./database.types";

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];

const INTENT_KEY = "sotillo_auth_intent";

function isNewAccount(user: User) {
  if (!user.last_sign_in_at) return true;
  const created = new Date(user.created_at).getTime();
  const lastSignIn = new Date(user.last_sign_in_at).getTime();
  return Math.abs(lastSignIn - created) < 5000;
}

type AuthContextValue = {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signInWithGoogle: (intent: "login" | "register") => Promise<void>;
  signOut: () => Promise<void>;
  setRole: (role: "cliente" | "comercio") => Promise<void>;
  updateProfile: (updates: Partial<Pick<Profile, "nombre">>) => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const handledSignIn = useRef(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const { data: subscription } = supabase.auth.onAuthStateChange((event, newSession) => {
      setSession(newSession);

      if (event !== "SIGNED_IN" || !newSession?.user || handledSignIn.current) return;
      handledSignIn.current = true;

      const intent = localStorage.getItem(INTENT_KEY) as "login" | "register" | null;
      localStorage.removeItem(INTENT_KEY);

      if (intent === "login" && isNewAccount(newSession.user)) {
        supabase.auth.signOut().then(() => {
          toast.error("No tienes cuenta todavía", {
            description: "Regístrate primero para poder entrar.",
          });
          handledSignIn.current = false;
        });
      }
    });

    return () => subscription.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session?.user) {
      setProfile(null);
      return;
    }

    let cancelled = false;
    supabase
      .from("profiles")
      .select("*")
      .eq("id", session.user.id)
      .single()
      .then(({ data }) => {
        if (!cancelled) setProfile(data);
      });

    return () => {
      cancelled = true;
    };
  }, [session?.user]);

  async function signInWithGoogle(intent: "login" | "register") {
    localStorage.setItem(INTENT_KEY, intent);
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin },
    });
  }

  async function signOut() {
    await supabase.auth.signOut();
  }

  async function updateProfile(updates: Partial<Pick<Profile, "nombre">>) {
    if (!session?.user) return;
    const { data, error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", session.user.id)
      .select("*")
      .single();
    if (error) throw error;
    if (data) setProfile(data);
  }

  async function setRole(role: "cliente" | "comercio") {
    if (!session?.user) return;
    const { data } = await supabase
      .from("profiles")
      .update({ role })
      .eq("id", session.user.id)
      .select("*")
      .single();
    if (data) setProfile(data);
  }

  return (
    <AuthContext.Provider
      value={{
        session,
        user: session?.user ?? null,
        profile,
        loading,
        signInWithGoogle,
        signOut,
        setRole,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
