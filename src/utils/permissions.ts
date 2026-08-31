import type { AuthenticatedUser, Permission } from '../types';

/**
 * Verifica se l'utente autenticato possiede un determinato permesso,
 * derivato dall'unione dei permessi di tutti i ruoli assegnati.
 */
export function hasPermission(
  user: AuthenticatedUser | null,
  permission: Permission,
): boolean {
  if (!user) return false;
  return user.permissions.has(permission);
}

/**
 * Verifica se l'utente possiede uno dei ruoli indicati.
 */
export function hasRole(
  user: AuthenticatedUser | null,
  ...roleNames: string[]
): boolean {
  if (!user) return false;
  return user.roles.some((role) => roleNames.includes(role.name));
}

/** Il "Cittadino" non ha accesso a badge, chat o pannello admin. */
export function isCitizenOnly(user: AuthenticatedUser | null): boolean {
  if (!user) return true;
  return (
    user.roles.length === 0 ||
    (user.roles.length === 1 && user.roles[0].name === 'cittadino')
  );
}
