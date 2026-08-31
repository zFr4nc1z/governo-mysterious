export function Footer() {
  return (
    <footer className="mt-16 border-t border-gov-gold-dark/40 bg-gov-surface/60">
      <div className="mx-auto max-w-7xl px-4 py-8 text-center text-sm text-neutral-400">
        <p className="font-display text-gov-gold-light">
          Governo di Mysterious — Dipartimento di Giustizia
        </p>
        <p className="mt-2 italic">Justitia Omnibus et Aequitas</p>
        <p className="mt-4 text-xs text-neutral-500">
          © {new Date().getFullYear()} Governo di Mysterious. Tutti i diritti
          riservati. Server GTA Roleplay.
        </p>
      </div>
    </footer>
  );
}
