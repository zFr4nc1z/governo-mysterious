/**
 * Ruoli disponibili nel Governo di Mysterious.
 * L'ordine non implica gerarchia rigida: i permessi effettivi sono
 * determinati dalla tabella `roles.permissions` in Supabase.
 */
export type RoleName =
  | 'governatore'
  | 'giudice'
  | 'procuratore'
  | 'avvocato'
  | 'servizi_segreti'
  | 'direttore'
  | 'funzionario'
  | 'staff'
  | 'cittadino';

/**
 * Permessi granulari assegnabili ai ruoli.
 */
export type Permission =
  | 'edit_regulations'
  | 'edit_codes'
  | 'edit_news'
  | 'edit_bandi'
  | 'manage_users'
  | 'manage_roles'
  | 'assign_code_name'
  | 'view_all_badges'
  | 'view_secret_badges'
  | 'view_lawyer_badges'
  | 'view_prosecutor_badges'
  | 'badge_bonus'
  | 'view_all_chats'
  | 'manage_chat_categories'
  | 'manage_settings';

export interface Role {
  id: string;
  name: RoleName;
  label: string;
  discord_role_id: string | null;
  permissions: Permission[];
}

export interface Profile {
  id: string;
  email: string;
  discord_id: string;
  full_name: string | null;
  code_name: string | null;
  phone: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserRole {
  user_id: string;
  role_id: string;
}

export interface AuthenticatedUser {
  profile: Profile;
  roles: Role[];
  permissions: Set<Permission>;
}

export interface RegulationArticle {
  id: string;
  title: string;
  content: string;
  order_index: number;
  updated_at: string;
}

export interface CodeArticle {
  id: string;
  title: string;
  content: string;
  order_index: number;
  updated_at: string;
}

export interface NewsPost {
  id: string;
  title: string;
  content: string;
  author_id: string | null;
  source: 'sito' | 'discord_bot';
  tagged_role_id: string | null;
  created_at: string;
}

export type BandoStatus = 'aperto' | 'chiuso';
export type ApplicationStatus = 'in_attesa' | 'accettata' | 'rifiutata';

export interface Bando {
  id: string;
  title: string;
  description: string;
  status: BandoStatus;
  created_at: string;
}

export interface BandoApplication {
  id: string;
  bando_id: string;
  user_id: string;
  discord_id: string;
  motivation: string;
  status: ApplicationStatus;
  created_at: string;
}

export interface Lawyer {
  id: string;
  full_name: string;
  email: string;
  phone: string;
}

export interface Official {
  id: string;
  full_name: string;
  role_label: string;
  email: string | null;
}

export interface BadgeEntry {
  id: string;
  user_id: string;
  clock_in: string;
  clock_out: string | null;
  source: 'sito' | 'discord_bot';
}

export interface WeeklyBonus {
  week_start: string;
  week_end: string;
  hours: number;
  amount: number;
}

export interface ChatCategory {
  id: string;
  name: string;
  allowed_role_ids: string[];
  auto_archive_days: number;
}

export interface ChatMessage {
  id: string;
  category_id: string;
  author_id: string;
  content: string;
  attachment_url: string | null;
  created_at: string;
}
