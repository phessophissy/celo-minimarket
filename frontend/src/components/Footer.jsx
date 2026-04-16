export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-brand">
          <img src="/logo.svg" alt="Celo" className="footer-logo" />
          <span>Built on Celo</span>
        </div>
        <div className="footer-links">
          <a href="https://celo.org" target="_blank" rel="noopener noreferrer">Celo.org</a>
          <span className="footer-divider">·</span>
          <a href="https://docs.celo.org" target="_blank" rel="noopener noreferrer">Docs</a>
          <span className="footer-divider">·</span>
          <a href="https://explorer.celo.org" target="_blank" rel="noopener noreferrer">Explorer</a>
        </div>
        <p className="footer-copy">© 2026 Celo MiniMarket — Peer-to-peer commerce for everyone</p>
      </div>
    </footer>
  );
}
