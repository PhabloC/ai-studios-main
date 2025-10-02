import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log("Supabase URL:", supabaseUrl ? "✓ Definida" : "✗ Não encontrada");
console.log(
  "Supabase Anon Key:",
  supabaseAnonKey ? "✓ Definida" : "✗ Não encontrada"
);

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "Variáveis de ambiente disponíveis:",
    Object.keys(import.meta.env)
  );
  throw new Error(`Variáveis de ambiente do Supabase não encontradas:
    - VITE_SUPABASE_URL: ${supabaseUrl ? "OK" : "FALTANDO"}
    - VITE_SUPABASE_ANON_KEY: ${supabaseAnonKey ? "OK" : "FALTANDO"}
    
    Configure essas variáveis na Vercel em Settings > Environment Variables`);
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

// Tipos para o usuário do Supabase
export interface SupabaseUser {
  id: string;
  email?: string;
  user_metadata: {
    avatar_url?: string;
    full_name?: string;
    name?: string;
  };
}
