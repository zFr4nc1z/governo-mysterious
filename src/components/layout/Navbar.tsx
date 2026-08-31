import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/regolamento', label: 'Regolamento' },
  { to: '/codici', label: 'Codici' },
  { to: '/news', label: 'News/Comunicati' },
  { to: '/bandi', label: 'Bandi' },
  { to: '/listino-prezzi', label: 'Listino Prezzi' },
  { to: '/attivita', label: 'Attività' },
  { to: '/albo-avvocati', label: 'Albo Avvocati' },
  { to: '/contatti', label: 'Contatti' },
];

export function Navbar() {
  const { user, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b border-gov-gold-dark/40 bg-gov-black/95 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 overflow-x-auto px-4">
        <NavLink
          to="/"
          className="shrink-0 font-display text-lg font-bold text-gov-gold-light"
        >
          Governo di Mysterious
        </NavLink>
        <ul className="flex shrink-0 items-center gap-1 whitespace-nowrap text-sm">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `rounded-md px-3 py-2 font-semibold transition-colors ${
                    isActive
                      ? 'bg-gov-surface2 text-gov-gold-light'
                      : 'text-neutral-300 hover:text-gov-gold-light'
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
          <li>
            {user ? (
              <button type="button" onClick={signOut} className="gov-btn ml-2">
                Esci ({user.profile.full_name ?? user.profile.email})
              </button>
            ) : (
              <NavLink to="/login" className="gov-btn-primary ml-2">
                Login
              </NavLink>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
