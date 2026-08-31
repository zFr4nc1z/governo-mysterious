import type { Session } from '@supabase/supabase-js';
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { supabase } from '../lib/supabaseClient';
import type { AuthenticatedUser, Permission, Profile, Role } from '../types';

interface AuthContextValue {
  session: Session | null;
  user: AuthenticatedUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (params: {
    email: string;
    password: string;
    discordId: string;
    fullName: string;
  }) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

async function loadAuthenticatedUser(
  userId: string,
): Promise<AuthenticatedUser | null> {
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .maybeSingle<Profile>();

  if (profileError || !profile) return null;

  const { data: userRoles } = await supabase
    .from('user_roles')
    .select('role:roles(*)')
    .eq('user_id', userId);

  const roles: Role[] = (userRoles ?? [])
    .map((entry) => (entry as unknown as { role: Role }).role)
    .filter(Boolean);

  const permissions = new Set<Permission>(
    roles.flatMap((role) => role.permissions ?? []),
  );

  return { profile, roles, permissions };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<AuthenticatedUser | null>(null);
  const [loading, setLoading] = useState(true);

  const hydrate = async (userId: string | undefined) => {
    if (!userId) {
      setUser(null);
      return;
    }
    const authedUser = await loadAuthenticatedUser(userId);
    setUser(authedUser);
  };

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setSession(data.session);
      hydrate(data.session?.user.id).finally(() => setLoading(false));
    });

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession);
        hydrate(newSession?.user.id);
      },
    );

    return () => {
      mounted = false;
      subscription.subscription.unsubscribe();
    };
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      user,
      loading,
      signIn: async (email, password) => {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        return { error: error?.message ?? null };
      },
      signUp: async ({ email, password, discordId, fullName }) => {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { discord_id: discordId, full_name: fullName } },
        });
        if (error) return { error: error.message };

        if (data.user) {
          const { error: profileError } = await supabase.from('profiles').insert({
            id: data.user.id,
            email,
            discord_id: discordId,
            full_name: fullName,
          });
          if (profileError) return { error: profileError.message };
        }

        return { error: null };
      },
      signOut: async () => {
        await supabase.auth.signOut();
      },
      refreshProfile: async () => {
        if (session?.user.id) await hydrate(session.user.id);
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [session, user, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth deve essere usato dentro <AuthProvider>');
  return ctx;
}
