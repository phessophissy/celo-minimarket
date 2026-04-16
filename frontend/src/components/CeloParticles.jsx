export default function CeloParticles() {
  return (
    <div className="celo-particles" aria-hidden="true">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className={`celo-particle celo-particle-${i + 1}`} />
      ))}
    </div>
  );
}
