export function Hero() {
  return (
    <section className="flex flex-col items-center gap-6 py-16 text-center">
      <img
        src="/emblem.svg"
        alt="Emblema del Governo di Mysterious"
        className="h-32 w-32 drop-shadow-gold"
      />
      <h1 className="text-4xl font-bold sm:text-5xl">Governo di Mysterious</h1>
      <p className="max-w-xl font-display text-xl italic text-gov-gold">
        Justitia Omnibus et Aequitas
      </p>
      <p className="max-w-2xl text-neutral-400">
        Portale istituzionale del Dipartimento di Giustizia. Regolamenti,
        codici, comunicati e servizi ufficiali del server di roleplay.
      </p>
    </section>
  );
}
