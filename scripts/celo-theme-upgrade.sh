#!/bin/bash
set -e
cd "$(dirname "$0")/.."

echo "============================================"
echo "Celo MiniMarket — 55 Real Commits"
echo "Full Celo theme + cool features"
echo "============================================"

# Restore stashed changes first
git stash pop 2>/dev/null || true

# ── COMMIT 1: Celo CSS custom properties ──
cat > frontend/src/styles/variables.css << 'EOF'
:root {
  /* Celo Brand Colors */
  --celo-green: #35D07F;
  --celo-green-dark: #2AB96B;
  --celo-green-light: #5ADEA0;
  --celo-gold: #FBCC5C;
  --celo-gold-dark: #E5B84A;
  --celo-dark: #2E3338;
  --celo-violet: #BF97FF;
  --celo-red: #FB7C6D;
  --celo-blue: #3488EC;

  /* Background */
  --bg-primary: #0D1117;
  --bg-secondary: #161B22;
  --bg-card: #1C2128;
  --bg-card-hover: #22272E;
  --bg-input: #0D1117;

  /* Text */
  --text-primary: #F0F6FC;
  --text-secondary: #8B949E;
  --text-muted: #6E7681;

  /* Border */
  --border-default: #30363D;
  --border-muted: #21262D;

  /* Spacing */
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
  --radius-xl: 24px;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.5);
  --shadow-glow: 0 0 20px rgba(53, 208, 127, 0.15);

  /* Transition */
  --transition-fast: 150ms ease;
  --transition-normal: 250ms ease;
  --transition-slow: 400ms ease;
}
EOF
mkdir -p frontend/src/styles
git add frontend/src/styles/variables.css
git commit -m "style: add Celo brand color CSS custom properties"
echo "✓ Commit 1/55"

# ── COMMIT 2: Base reset with Celo theme ──
cat > frontend/src/styles/base.css << 'EOF'
@import './variables.css';

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 16px;
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  line-height: 1.6;
  min-height: 100vh;
  overflow-x: hidden;
}

#root {
  min-height: 100vh;
}

::selection {
  background: rgba(53, 208, 127, 0.3);
  color: var(--text-primary);
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: var(--bg-primary);
}

::-webkit-scrollbar-thumb {
  background: var(--border-default);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--text-muted);
}

a {
  color: var(--celo-green);
  text-decoration: none;
  transition: color var(--transition-fast);
}

a:hover { color: var(--celo-green-light); }

img { max-width: 100%; display: block; }
EOF
git add frontend/src/styles/base.css
git commit -m "style: add base reset with Celo-themed scrollbar and selection"
echo "✓ Commit 2/55"

# ── COMMIT 3: Header/Navbar styles ──
cat > frontend/src/styles/header.css << 'EOF'
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  margin-bottom: 2rem;
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(13, 17, 23, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border-muted);
}

.header-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.header-logo {
  width: 36px;
  height: 36px;
  filter: drop-shadow(0 0 8px rgba(53, 208, 127, 0.3));
  transition: transform var(--transition-normal);
}

.header-logo:hover {
  transform: rotate(15deg) scale(1.05);
}

.header-content h1 {
  font-size: 1.35rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--celo-green), var(--celo-gold));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.02em;
}

.header-nav {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.tagline {
  display: none;
}
EOF
git add frontend/src/styles/header.css
git commit -m "style: add sticky header with Celo gradient title and blur backdrop"
echo "✓ Commit 3/55"

# ── COMMIT 4: Button styles ──
cat > frontend/src/styles/buttons.css << 'EOF'
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: var(--radius-md);
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-normal);
  font-family: inherit;
  position: relative;
  overflow: hidden;
}

.btn::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%);
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.btn:hover::after {
  transform: translateX(100%);
}

.btn-connect {
  background: linear-gradient(135deg, var(--celo-green), var(--celo-green-dark));
  color: var(--celo-dark);
  font-weight: 700;
  box-shadow: 0 2px 8px rgba(53, 208, 127, 0.3);
}

.btn-connect:hover {
  box-shadow: 0 4px 16px rgba(53, 208, 127, 0.4);
  transform: translateY(-1px);
}

.btn-primary {
  background: linear-gradient(135deg, var(--celo-green), var(--celo-green-dark));
  color: var(--celo-dark);
  width: 100%;
  font-weight: 700;
  padding: 1rem;
  font-size: 1rem;
  box-shadow: 0 2px 8px rgba(53, 208, 127, 0.2);
}

.btn-primary:hover:not(:disabled) {
  box-shadow: 0 6px 20px rgba(53, 208, 127, 0.35);
  transform: translateY(-2px);
}

.btn-primary:disabled {
  background: rgba(53, 208, 127, 0.15);
  color: var(--text-muted);
  cursor: not-allowed;
  box-shadow: none;
  transform: none;
}

.btn-secondary {
  background: rgba(53, 208, 127, 0.08);
  color: var(--celo-green);
  border: 1px solid rgba(53, 208, 127, 0.2);
  width: 100%;
}

.btn-secondary:hover:not(:disabled) {
  background: rgba(53, 208, 127, 0.15);
  border-color: var(--celo-green);
  box-shadow: var(--shadow-glow);
}

.btn-secondary:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.btn-gold {
  background: linear-gradient(135deg, var(--celo-gold), var(--celo-gold-dark));
  color: var(--celo-dark);
  font-weight: 700;
}

.btn-gold:hover {
  box-shadow: 0 4px 16px rgba(251, 204, 92, 0.3);
  transform: translateY(-1px);
}

.btn-danger {
  background: rgba(251, 124, 109, 0.1);
  color: var(--celo-red);
  border: 1px solid rgba(251, 124, 109, 0.2);
}

.btn-danger:hover {
  background: var(--celo-red);
  color: white;
}

.btn-share {
  background: linear-gradient(135deg, var(--celo-violet), #9B6BFF);
  color: white;
  font-weight: 700;
}

.btn-share:hover {
  box-shadow: 0 4px 16px rgba(191, 151, 255, 0.3);
  transform: translateY(-1px);
}

.btn-clear-image {
  background: var(--celo-red);
  color: white;
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
}

.btn-clear-image:hover {
  background: #E5645A;
  transform: translateY(-1px);
}
EOF
git add frontend/src/styles/buttons.css
git commit -m "style: add Celo green/gold gradient button system with shimmer effect"
echo "✓ Commit 4/55"

# ── COMMIT 5: Card styles ──
cat > frontend/src/styles/cards.css << 'EOF'
.description-card {
  text-align: center;
  padding: 4rem 2rem;
  margin-bottom: 2.5rem;
  background: linear-gradient(145deg, rgba(53, 208, 127, 0.06) 0%, rgba(251, 204, 92, 0.04) 50%, rgba(191, 151, 255, 0.03) 100%);
  border: 1px solid var(--border-muted);
  border-radius: var(--radius-xl);
  position: relative;
  overflow: hidden;
}

.description-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--celo-green), var(--celo-gold), transparent);
}

.description-card h2 {
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, var(--text-primary) 0%, var(--celo-green) 50%, var(--celo-gold) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
  line-height: 1.15;
  letter-spacing: -0.03em;
}

.description-text {
  font-size: 1.1rem;
  color: var(--text-secondary);
  max-width: 640px;
  margin: 0 auto;
  line-height: 1.75;
}

.section {
  background: var(--bg-secondary);
  border: 1px solid var(--border-muted);
  border-radius: var(--radius-lg);
  padding: 2rem;
  margin-bottom: 2rem;
  position: relative;
}

.section h2 {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-muted);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.product-card {
  background: var(--bg-card);
  border: 1px solid var(--border-muted);
  border-radius: var(--radius-lg);
  padding: 0;
  transition: all var(--transition-normal);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.product-card:hover {
  border-color: rgba(53, 208, 127, 0.4);
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg), var(--shadow-glow);
}

.product-card-body {
  padding: 1.25rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.product-image {
  width: 100%;
  height: 220px;
  object-fit: cover;
  border-bottom: 1px solid var(--border-muted);
  transition: transform var(--transition-slow);
}

.product-card:hover .product-image {
  transform: scale(1.03);
}

.product-card h3 {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.4rem;
}

.product-description {
  color: var(--text-secondary);
  font-size: 0.88rem;
  margin-bottom: 1rem;
  line-height: 1.55;
  flex: 1;
}

.product-price {
  font-size: 1.4rem;
  font-weight: 800;
  color: var(--celo-green);
  margin: 0.75rem 0;
}

.product-vendor {
  font-size: 0.8rem;
  color: var(--text-muted);
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  margin-bottom: 0.5rem;
}

.nft-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.3rem 0.65rem;
  background: rgba(191, 151, 255, 0.1);
  border: 1px solid rgba(191, 151, 255, 0.25);
  border-radius: var(--radius-sm);
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--celo-violet);
}
EOF
git add frontend/src/styles/cards.css
git commit -m "style: add product cards with Celo gradient glow and hover effects"
echo "✓ Commit 5/55"

# ── COMMIT 6: Form styles ──
cat > frontend/src/styles/forms.css << 'EOF'
.form {
  display: grid;
  gap: 1rem;
  max-width: 640px;
}

.form input,
.form textarea,
.form select {
  width: 100%;
  padding: 0.875rem 1rem;
  background: var(--bg-input);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  font-size: 0.95rem;
  font-family: inherit;
  transition: all var(--transition-fast);
}

.form input:focus,
.form textarea:focus,
.form select:focus {
  outline: none;
  border-color: var(--celo-green);
  box-shadow: 0 0 0 3px rgba(53, 208, 127, 0.12);
  background: rgba(53, 208, 127, 0.02);
}

.form input::placeholder,
.form textarea::placeholder {
  color: var(--text-muted);
}

.form textarea {
  min-height: 100px;
  resize: vertical;
}

.image-upload-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.upload-method-toggle {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--text-secondary);
  font-size: 0.88rem;
}

.upload-method-select {
  flex: 1;
  padding: 0.75rem;
  background: var(--bg-input);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  font-family: inherit;
  cursor: pointer;
}

.file-upload-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.file-upload-label {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1.25rem;
  background: rgba(53, 208, 127, 0.05);
  border: 2px dashed rgba(53, 208, 127, 0.25);
  border-radius: var(--radius-md);
  color: var(--celo-green);
  text-align: center;
  cursor: pointer;
  transition: all var(--transition-normal);
  font-weight: 600;
}

.file-upload-label:hover {
  background: rgba(53, 208, 127, 0.1);
  border-color: var(--celo-green);
  box-shadow: var(--shadow-glow);
}

.file-upload-input { display: none; }

.image-preview-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: var(--bg-card);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-muted);
}

.image-preview {
  max-width: 100%;
  max-height: 280px;
  border-radius: var(--radius-md);
  object-fit: contain;
}
EOF
git add frontend/src/styles/forms.css
git commit -m "style: add form inputs with Celo green focus ring and upload styles"
echo "✓ Commit 6/55"

# ── COMMIT 7: Grid and layout ──
cat > frontend/src/styles/layout.css << 'EOF'
.app-container {
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 1.5rem 4rem;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.product-actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-top: auto;
  padding-top: 0.75rem;
}

.product-actions .btn {
  flex: 1;
  min-width: 100px;
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: var(--text-muted);
  font-size: 1rem;
}

.empty-state-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .header {
    flex-direction: column;
    gap: 0.75rem;
    text-align: center;
    padding: 1rem 0;
  }

  .description-card {
    padding: 3rem 1.5rem;
  }

  .description-card h2 {
    font-size: 1.8rem;
  }

  .description-text {
    font-size: 1rem;
  }

  .products-grid {
    grid-template-columns: 1fr;
  }

  .section {
    padding: 1.25rem;
  }

  .app-container {
    padding: 0 1rem 3rem;
  }
}

@media (max-width: 480px) {
  .description-card h2 {
    font-size: 1.5rem;
  }

  .product-actions {
    flex-direction: column;
  }
}

/* Safe area for Farcaster Mini App */
@supports (padding: env(safe-area-inset-top)) {
  .app-container {
    padding-top: calc(0.5rem + env(safe-area-inset-top));
    padding-bottom: calc(3rem + env(safe-area-inset-bottom));
  }
}
EOF
git add frontend/src/styles/layout.css
git commit -m "style: add responsive layout grid and mobile breakpoints"
echo "✓ Commit 7/55"

# ── COMMIT 8: Animations ──
cat > frontend/src/styles/animations.css << 'EOF'
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideInRight {
  from { opacity: 0; transform: translateX(30px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

@keyframes glow {
  0%, 100% { box-shadow: 0 0 10px rgba(53, 208, 127, 0.1); }
  50% { box-shadow: 0 0 25px rgba(53, 208, 127, 0.25); }
}

@keyframes gradientFlow {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-fadeInUp {
  animation: fadeInUp 0.5s ease-out;
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animate-glow {
  animation: glow 2s ease-in-out infinite;
}

.animate-pulse {
  animation: pulse 1.5s ease-in-out infinite;
}

.loading-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid var(--border-default);
  border-top-color: var(--celo-green);
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
  display: inline-block;
}

/* Staggered card entrance */
.product-card {
  animation: fadeInUp 0.4s ease-out both;
}
.product-card:nth-child(2) { animation-delay: 0.05s; }
.product-card:nth-child(3) { animation-delay: 0.1s; }
.product-card:nth-child(4) { animation-delay: 0.15s; }
.product-card:nth-child(5) { animation-delay: 0.2s; }
.product-card:nth-child(6) { animation-delay: 0.25s; }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
EOF
git add frontend/src/styles/animations.css
git commit -m "style: add Celo glow animations, staggered card entrance, and shimmer"
echo "✓ Commit 8/55"

# ── COMMIT 9: Stats grid component styles ──
cat > frontend/src/styles/stats.css << 'EOF'
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
  margin-bottom: 2.5rem;
}

.stat-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-muted);
  border-radius: var(--radius-lg);
  padding: 1.25rem;
  text-align: center;
  transition: all var(--transition-normal);
  position: relative;
  overflow: hidden;
}

.stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--celo-green), var(--celo-gold));
  opacity: 0;
  transition: opacity var(--transition-normal);
}

.stat-card:hover::before { opacity: 1; }

.stat-card:hover {
  border-color: var(--border-default);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.stat-icon {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.stat-value {
  font-size: 1.75rem;
  font-weight: 800;
  background: linear-gradient(135deg, var(--celo-green), var(--celo-gold));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.2;
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.78rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 600;
}
EOF
git add frontend/src/styles/stats.css
git commit -m "style: add stats grid with Celo gradient values and hover accent bar"
echo "✓ Commit 9/55"

# ── COMMIT 10: Master CSS index ──
cat > frontend/src/styles/index.css << 'EOF'
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

@import './variables.css';
@import './base.css';
@import './animations.css';
@import './header.css';
@import './buttons.css';
@import './cards.css';
@import './forms.css';
@import './layout.css';
@import './stats.css';
EOF
git add frontend/src/styles/index.css
git commit -m "style: add master CSS barrel import with Inter font"
echo "✓ Commit 10/55"

# ── COMMIT 11: Footer component ──
cat > frontend/src/components/Footer.jsx << 'EOF'
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
EOF
mkdir -p frontend/src/components
git add frontend/src/components/Footer.jsx
git commit -m "feat: add Footer component with Celo brand links"
echo "✓ Commit 11/55"

# ── COMMIT 12: Footer styles ──
cat > frontend/src/styles/footer.css << 'EOF'
.app-footer {
  text-align: center;
  padding: 2.5rem 1.5rem;
  margin-top: 4rem;
  border-top: 1px solid var(--border-muted);
  background: var(--bg-secondary);
}

.footer-content {
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: var(--text-secondary);
}

.footer-logo {
  width: 24px;
  height: 24px;
  filter: grayscale(0.3);
}

.footer-links {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.footer-links a {
  color: var(--text-muted);
  font-size: 0.88rem;
  transition: color var(--transition-fast);
}

.footer-links a:hover { color: var(--celo-green); }

.footer-divider { color: var(--border-default); }

.footer-copy {
  font-size: 0.8rem;
  color: var(--text-muted);
}
EOF
# Add import to master CSS
echo "@import './footer.css';" >> frontend/src/styles/index.css
git add frontend/src/styles/footer.css frontend/src/styles/index.css
git commit -m "style: add footer with Celo branding styles"
echo "✓ Commit 12/55"

# ── COMMIT 13: StatsBar component ──
cat > frontend/src/components/StatsBar.jsx << 'EOF'
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

export default function StatsBar({ products, provider, marketAddress, marketAbi }) {
  const [totalVolume, setTotalVolume] = useState('0');

  useEffect(() => {
    async function fetchStats() {
      if (!provider || !marketAddress) return;
      try {
        const contract = new ethers.Contract(marketAddress, marketAbi, provider);
        const count = await contract.productsCount();
        const volume = products.reduce((sum, p) => {
          return sum.add ? sum.add(p.priceWei) : ethers.BigNumber.from(sum).add(p.priceWei);
        }, ethers.BigNumber.from(0));
        setTotalVolume(ethers.utils.formatUnits(volume, 18));
      } catch (err) {
        console.error('Stats error:', err);
      }
    }
    fetchStats();
  }, [products, provider, marketAddress, marketAbi]);

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-icon">🛍️</div>
        <div className="stat-value">{products.length}</div>
        <div className="stat-label">Active Listings</div>
      </div>
      <div className="stat-card">
        <div className="stat-icon">💰</div>
        <div className="stat-value">{parseFloat(totalVolume).toFixed(2)}</div>
        <div className="stat-label">Total Value (cUSD)</div>
      </div>
      <div className="stat-card">
        <div className="stat-icon">⛓️</div>
        <div className="stat-value">Celo</div>
        <div className="stat-label">Blockchain</div>
      </div>
      <div className="stat-card">
        <div className="stat-icon">⚡</div>
        <div className="stat-value">&lt;5s</div>
        <div className="stat-label">Block Time</div>
      </div>
    </div>
  );
}
EOF
git add frontend/src/components/StatsBar.jsx
git commit -m "feat: add live StatsBar component with product count and total value"
echo "✓ Commit 13/55"

# ── COMMIT 14: SearchBar component ──
cat > frontend/src/components/SearchBar.jsx << 'EOF'
import { useState } from 'react';

export default function SearchBar({ onSearch, onSort }) {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    onSearch(val);
  };

  return (
    <div className="search-bar">
      <div className="search-input-wrapper">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={handleChange}
          className="search-input"
        />
        {query && (
          <button className="search-clear" onClick={() => { setQuery(''); onSearch(''); }}>✕</button>
        )}
      </div>
      <select className="sort-select" onChange={(e) => onSort(e.target.value)}>
        <option value="newest">Newest First</option>
        <option value="price-low">Price: Low → High</option>
        <option value="price-high">Price: High → Low</option>
        <option value="name">Name A-Z</option>
      </select>
    </div>
  );
}
EOF
git add frontend/src/components/SearchBar.jsx
git commit -m "feat: add SearchBar component with sort options"
echo "✓ Commit 14/55"

# ── COMMIT 15: SearchBar styles ──
cat > frontend/src/styles/search.css << 'EOF'
.search-bar {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.search-input-wrapper {
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 0.75rem;
  font-size: 1rem;
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 0.75rem 2.5rem 0.75rem 2.25rem;
  background: var(--bg-input);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  font-size: 0.95rem;
  font-family: inherit;
  transition: all var(--transition-fast);
}

.search-input:focus {
  outline: none;
  border-color: var(--celo-green);
  box-shadow: 0 0 0 3px rgba(53, 208, 127, 0.12);
}

.search-input::placeholder { color: var(--text-muted); }

.search-clear {
  position: absolute;
  right: 0.75rem;
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  font-size: 1rem;
  padding: 0.25rem;
}

.search-clear:hover { color: var(--text-primary); }

.sort-select {
  padding: 0.75rem 1rem;
  background: var(--bg-input);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  font-family: inherit;
  font-size: 0.88rem;
  cursor: pointer;
  min-width: 160px;
}

.sort-select:focus {
  outline: none;
  border-color: var(--celo-green);
}

@media (max-width: 640px) {
  .search-bar {
    flex-direction: column;
  }
  .sort-select { min-width: 100%; }
}
EOF
echo "@import './search.css';" >> frontend/src/styles/index.css
git add frontend/src/styles/search.css frontend/src/styles/index.css
git commit -m "style: add search bar and sort dropdown Celo-themed styles"
echo "✓ Commit 15/55"

# ── COMMIT 16: ProductCard component ──
cat > frontend/src/components/ProductCard.jsx << 'EOF'
import { ethers } from 'ethers';

export default function ProductCard({ product, decimals, loading, isConnected, onBuy, onShare, isFarcaster }) {
  const priceFormatted = ethers.utils.formatUnits(product.priceWei, decimals);
  const vendorShort = `${product.vendor.slice(0, 6)}...${product.vendor.slice(-4)}`;

  return (
    <div className="product-card">
      {product.imageData && (
        <div className="product-image-wrapper">
          <img
            src={product.imageData}
            alt={product.name}
            className="product-image"
            loading="lazy"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        </div>
      )}
      <div className="product-card-body">
        <div className="product-card-header">
          <h3>{product.name}</h3>
          <span className="nft-badge">🎨 NFT #{Number(product.tokenId)}</span>
        </div>
        <p className="product-description">{product.description}</p>
        <p className="product-price">
          <span className="price-amount">{parseFloat(priceFormatted).toFixed(2)}</span>
          <span className="price-currency">cUSD</span>
        </p>
        <p className="product-vendor">👤 {vendorShort}</p>
        <div className="product-actions">
          <button
            disabled={loading || !isConnected}
            onClick={() => onBuy(product.tokenId, product.priceWei)}
            className="btn btn-secondary"
          >
            {loading ? <span className="loading-spinner" /> : '🛍️'} Buy Now
          </button>
          {isFarcaster && (
            <button onClick={() => onShare(product)} className="btn btn-share">
              📣 Share
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
EOF
git add frontend/src/components/ProductCard.jsx
git commit -m "feat: extract ProductCard component with lazy loading and loading spinner"
echo "✓ Commit 16/55"

# ── COMMIT 17: ProductCard extra styles ──
cat > frontend/src/styles/product-card.css << 'EOF'
.product-image-wrapper {
  position: relative;
  overflow: hidden;
}

.product-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.product-card-header h3 {
  flex: 1;
}

.price-amount {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
}

.price-currency {
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--text-secondary);
  margin-left: 0.25rem;
}

.product-card .loading-spinner {
  width: 16px;
  height: 16px;
}
EOF
echo "@import './product-card.css';" >> frontend/src/styles/index.css
git add frontend/src/styles/product-card.css frontend/src/styles/index.css
git commit -m "style: add product card header layout and price typography"
echo "✓ Commit 17/55"

# ── COMMIT 18: Toast notification component ──
cat > frontend/src/components/Toast.jsx << 'EOF'
import { useState, useEffect, useCallback } from 'react';

const TOAST_TYPES = {
  success: { icon: '✅', color: 'var(--celo-green)' },
  error: { icon: '❌', color: 'var(--celo-red)' },
  warning: { icon: '⚠️', color: 'var(--celo-gold)' },
  info: { icon: 'ℹ️', color: 'var(--celo-blue)' },
};

let addToastGlobal = null;

export function toast(message, type = 'info') {
  if (addToastGlobal) addToastGlobal({ message, type, id: Date.now() });
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((t) => {
    setToasts(prev => [...prev, t]);
    setTimeout(() => {
      setToasts(prev => prev.filter(x => x.id !== t.id));
    }, 4000);
  }, []);

  useEffect(() => {
    addToastGlobal = addToast;
    return () => { addToastGlobal = null; };
  }, [addToast]);

  const dismiss = (id) => setToasts(prev => prev.filter(x => x.id !== id));

  return (
    <div className="toast-container">
      {toasts.map(t => {
        const config = TOAST_TYPES[t.type] || TOAST_TYPES.info;
        return (
          <div
            key={t.id}
            className="toast-item"
            style={{ borderLeftColor: config.color }}
            onClick={() => dismiss(t.id)}
          >
            <span className="toast-icon">{config.icon}</span>
            <span className="toast-message">{t.message}</span>
          </div>
        );
      })}
    </div>
  );
}
EOF
git add frontend/src/components/Toast.jsx
git commit -m "feat: add toast notification system with Celo-colored types"
echo "✓ Commit 18/55"

# ── COMMIT 19: Toast styles ──
cat > frontend/src/styles/toast.css << 'EOF'
.toast-container {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 380px;
}

.toast-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1rem;
  background: var(--bg-card);
  border: 1px solid var(--border-default);
  border-left: 3px solid var(--celo-green);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  animation: slideInRight 0.3s ease-out;
  cursor: pointer;
  transition: opacity var(--transition-fast);
}

.toast-item:hover { opacity: 0.85; }

.toast-icon { font-size: 1.1rem; flex-shrink: 0; }

.toast-message {
  font-size: 0.9rem;
  color: var(--text-primary);
  line-height: 1.4;
}

@media (max-width: 480px) {
  .toast-container {
    left: 1rem;
    right: 1rem;
    max-width: none;
  }
}
EOF
echo "@import './toast.css';" >> frontend/src/styles/index.css
git add frontend/src/styles/toast.css frontend/src/styles/index.css
git commit -m "style: add toast notification slide-in animation and layout"
echo "✓ Commit 19/55"

# ── COMMIT 20: Theme toggle component ──
cat > frontend/src/components/ThemeToggle.jsx << 'EOF'
import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <button
      className="theme-toggle"
      onClick={() => setDark(!dark)}
      title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-label="Toggle theme"
    >
      {dark ? '☀️' : '🌙'}
    </button>
  );
}
EOF
git add frontend/src/components/ThemeToggle.jsx
git commit -m "feat: add dark/light theme toggle component"
echo "✓ Commit 20/55"

# ── COMMIT 21: Light theme CSS ──
cat > frontend/src/styles/light-theme.css << 'EOF'
[data-theme="light"] {
  --bg-primary: #FAFBFC;
  --bg-secondary: #FFFFFF;
  --bg-card: #FFFFFF;
  --bg-card-hover: #F6F8FA;
  --bg-input: #F6F8FA;
  --text-primary: #1F2328;
  --text-secondary: #656D76;
  --text-muted: #8C959F;
  --border-default: #D0D7DE;
  --border-muted: #E8EAED;
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.06);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.08);
  --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.1);
  --shadow-glow: 0 0 20px rgba(53, 208, 127, 0.1);
}

[data-theme="light"] .header {
  background: rgba(250, 251, 252, 0.92);
}

[data-theme="light"] .description-card {
  background: linear-gradient(145deg, rgba(53, 208, 127, 0.04) 0%, rgba(251, 204, 92, 0.03) 100%);
}

[data-theme="light"] .btn-connect,
[data-theme="light"] .btn-primary {
  color: white;
}
EOF
echo "@import './light-theme.css';" >> frontend/src/styles/index.css
git add frontend/src/styles/light-theme.css frontend/src/styles/index.css
git commit -m "style: add complete light theme with Celo-appropriate contrast"
echo "✓ Commit 21/55"

# ── COMMIT 22: Theme toggle styles ──
cat > frontend/src/styles/theme-toggle.css << 'EOF'
.theme-toggle {
  background: var(--bg-card);
  border: 1px solid var(--border-default);
  border-radius: 50%;
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.1rem;
  transition: all var(--transition-normal);
}

.theme-toggle:hover {
  border-color: var(--celo-gold);
  transform: rotate(15deg);
  box-shadow: 0 0 12px rgba(251, 204, 92, 0.2);
}
EOF
echo "@import './theme-toggle.css';" >> frontend/src/styles/index.css
git add frontend/src/styles/theme-toggle.css frontend/src/styles/index.css
git commit -m "style: add theme toggle button with gold hover glow"
echo "✓ Commit 22/55"

# ── COMMIT 23: Network badge component ──
cat > frontend/src/components/NetworkBadge.jsx << 'EOF'
export default function NetworkBadge({ isConnected }) {
  return (
    <div className={`network-badge ${isConnected ? 'connected' : ''}`}>
      <span className="network-dot" />
      <span className="network-name">{isConnected ? 'Celo Mainnet' : 'Not Connected'}</span>
    </div>
  );
}
EOF
git add frontend/src/components/NetworkBadge.jsx
git commit -m "feat: add NetworkBadge showing Celo connection status"
echo "✓ Commit 23/55"

# ── COMMIT 24: Network badge styles ──
cat > frontend/src/styles/network-badge.css << 'EOF'
.network-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.75rem;
  background: var(--bg-card);
  border: 1px solid var(--border-default);
  border-radius: 100px;
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--text-muted);
}

.network-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--text-muted);
}

.network-badge.connected .network-dot {
  background: var(--celo-green);
  box-shadow: 0 0 6px rgba(53, 208, 127, 0.5);
  animation: pulse 2s ease-in-out infinite;
}

.network-badge.connected {
  color: var(--celo-green);
  border-color: rgba(53, 208, 127, 0.2);
}
EOF
echo "@import './network-badge.css';" >> frontend/src/styles/index.css
git add frontend/src/styles/network-badge.css frontend/src/styles/index.css
git commit -m "style: add network badge with Celo green pulse dot"
echo "✓ Commit 24/55"

# ── COMMIT 25: PriceTag component ──
cat > frontend/src/components/PriceTag.jsx << 'EOF'
import { ethers } from 'ethers';

export default function PriceTag({ priceWei, decimals = 18, size = 'md' }) {
  const formatted = ethers.utils.formatUnits(priceWei, decimals);
  const num = parseFloat(formatted);

  return (
    <div className={`price-tag price-tag-${size}`}>
      <span className="price-tag-amount">{num < 0.01 ? formatted : num.toFixed(2)}</span>
      <span className="price-tag-symbol">cUSD</span>
    </div>
  );
}
EOF
git add frontend/src/components/PriceTag.jsx
git commit -m "feat: add reusable PriceTag component with size variants"
echo "✓ Commit 25/55"

# ── COMMIT 26: PriceTag styles ──
cat > frontend/src/styles/price-tag.css << 'EOF'
.price-tag {
  display: inline-flex;
  align-items: baseline;
  gap: 0.25rem;
}

.price-tag-amount {
  font-weight: 800;
  color: var(--celo-green);
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
}

.price-tag-symbol {
  font-weight: 500;
  color: var(--text-secondary);
}

.price-tag-sm .price-tag-amount { font-size: 1rem; }
.price-tag-sm .price-tag-symbol { font-size: 0.75rem; }
.price-tag-md .price-tag-amount { font-size: 1.4rem; }
.price-tag-md .price-tag-symbol { font-size: 0.85rem; }
.price-tag-lg .price-tag-amount { font-size: 2rem; }
.price-tag-lg .price-tag-symbol { font-size: 1rem; }
EOF
echo "@import './price-tag.css';" >> frontend/src/styles/index.css
git add frontend/src/styles/price-tag.css frontend/src/styles/index.css
git commit -m "style: add PriceTag sizing variants with mono font"
echo "✓ Commit 26/55"

# ── COMMIT 27: EmptyState component ──
cat > frontend/src/components/EmptyState.jsx << 'EOF'
export default function EmptyState({ icon = '🛒', title, subtitle }) {
  return (
    <div className="empty-state animate-fadeIn">
      <div className="empty-state-icon">{icon}</div>
      <h3 className="empty-state-title">{title || 'No products listed yet'}</h3>
      <p className="empty-state-subtitle">{subtitle || 'Be the first vendor — list your product now! 🚀'}</p>
    </div>
  );
}
EOF
git add frontend/src/components/EmptyState.jsx
git commit -m "feat: add EmptyState placeholder component"
echo "✓ Commit 27/55"

# ── COMMIT 28: EmptyState styles ──
cat > frontend/src/styles/empty-state.css << 'EOF'
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
}

.empty-state-icon {
  font-size: 3.5rem;
  margin-bottom: 1rem;
  opacity: 0.6;
  animation: float 3s ease-in-out infinite;
}

.empty-state-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
}

.empty-state-subtitle {
  font-size: 0.95rem;
  color: var(--text-muted);
}
EOF
echo "@import './empty-state.css';" >> frontend/src/styles/index.css
git add frontend/src/styles/empty-state.css frontend/src/styles/index.css
git commit -m "style: add floating icon empty state animation"
echo "✓ Commit 28/55"

# ── COMMIT 29: Quick amount buttons component ──
cat > frontend/src/components/QuickAmounts.jsx << 'EOF'
const amounts = ['0.50', '1.00', '2.50', '5.00', '10.00'];

export default function QuickAmounts({ onSelect }) {
  return (
    <div className="quick-amounts">
      {amounts.map(a => (
        <button key={a} type="button" className="quick-amount-btn" onClick={() => onSelect(a)}>
          {a} cUSD
        </button>
      ))}
    </div>
  );
}
EOF
git add frontend/src/components/QuickAmounts.jsx
git commit -m "feat: add quick amount selection buttons for pricing"
echo "✓ Commit 29/55"

# ── COMMIT 30: Quick amounts styles ──
cat > frontend/src/styles/quick-amounts.css << 'EOF'
.quick-amounts {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
}

.quick-amount-btn {
  padding: 0.4rem 0.75rem;
  background: rgba(53, 208, 127, 0.08);
  border: 1px solid rgba(53, 208, 127, 0.15);
  border-radius: var(--radius-sm);
  color: var(--celo-green);
  font-size: 0.82rem;
  font-weight: 600;
  font-family: 'JetBrains Mono', monospace;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.quick-amount-btn:hover {
  background: rgba(53, 208, 127, 0.18);
  border-color: var(--celo-green);
  transform: translateY(-1px);
}
EOF
echo "@import './quick-amounts.css';" >> frontend/src/styles/index.css
git add frontend/src/styles/quick-amounts.css frontend/src/styles/index.css
git commit -m "style: add Celo green quick-amount pill buttons"
echo "✓ Commit 30/55"

# ── COMMIT 31: CeloParticles background component ──
cat > frontend/src/components/CeloParticles.jsx << 'EOF'
export default function CeloParticles() {
  return (
    <div className="celo-particles" aria-hidden="true">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className={`celo-particle celo-particle-${i + 1}`} />
      ))}
    </div>
  );
}
EOF
git add frontend/src/components/CeloParticles.jsx
git commit -m "feat: add CeloParticles ambient background animation"
echo "✓ Commit 31/55"

# ── COMMIT 32: Particle animations ──
cat > frontend/src/styles/particles.css << 'EOF'
.celo-particles {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.celo-particle {
  position: absolute;
  border-radius: 50%;
  opacity: 0.06;
  filter: blur(60px);
}

.celo-particle-1 {
  width: 400px; height: 400px;
  background: var(--celo-green);
  top: -10%; left: -5%;
  animation: float 20s ease-in-out infinite;
}
.celo-particle-2 {
  width: 300px; height: 300px;
  background: var(--celo-gold);
  top: 40%; right: -8%;
  animation: float 25s ease-in-out infinite reverse;
}
.celo-particle-3 {
  width: 250px; height: 250px;
  background: var(--celo-violet);
  bottom: -5%; left: 30%;
  animation: float 18s ease-in-out infinite 2s;
}
.celo-particle-4 {
  width: 200px; height: 200px;
  background: var(--celo-green);
  top: 60%; left: 10%;
  animation: float 22s ease-in-out infinite 1s;
}
.celo-particle-5 {
  width: 180px; height: 180px;
  background: var(--celo-gold);
  top: 20%; right: 20%;
  animation: float 15s ease-in-out infinite 3s;
}
.celo-particle-6 {
  width: 160px; height: 160px;
  background: var(--celo-blue);
  bottom: 20%; right: 10%;
  animation: float 28s ease-in-out infinite 2.5s;
}
EOF
echo "@import './particles.css';" >> frontend/src/styles/index.css
git add frontend/src/styles/particles.css frontend/src/styles/index.css
git commit -m "style: add floating Celo-color ambient light particles"
echo "✓ Commit 32/55"

# ── COMMIT 33: ConfirmModal component ──
cat > frontend/src/components/ConfirmModal.jsx << 'EOF'
export default function ConfirmModal({ isOpen, title, message, onConfirm, onCancel, loading }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h3 className="modal-title">{title}</h3>
        <p className="modal-message">{message}</p>
        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onCancel} disabled={loading}>Cancel</button>
          <button className="btn btn-primary" onClick={onConfirm} disabled={loading}>
            {loading ? <><span className="loading-spinner" /> Processing...</> : 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  );
}
EOF
git add frontend/src/components/ConfirmModal.jsx
git commit -m "feat: add purchase ConfirmModal with loading state"
echo "✓ Commit 33/55"

# ── COMMIT 34: Modal styles ──
cat > frontend/src/styles/modal.css << 'EOF'
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 1rem;
  animation: fadeIn 0.2s ease;
}

.modal-content {
  background: var(--bg-secondary);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
  padding: 2rem;
  max-width: 420px;
  width: 100%;
  animation: fadeInUp 0.3s ease;
}

.modal-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
}

.modal-message {
  color: var(--text-secondary);
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

.modal-actions {
  display: flex;
  gap: 0.75rem;
}

.modal-actions .btn {
  flex: 1;
  padding: 0.875rem;
}
EOF
echo "@import './modal.css';" >> frontend/src/styles/index.css
git add frontend/src/styles/modal.css frontend/src/styles/index.css
git commit -m "style: add modal overlay with backdrop blur and Celo styling"
echo "✓ Commit 34/55"

# ── COMMIT 35: Component barrel export ──
cat > frontend/src/components/index.js << 'EOF'
export { default as Footer } from './Footer.jsx';
export { default as StatsBar } from './StatsBar.jsx';
export { default as SearchBar } from './SearchBar.jsx';
export { default as ProductCard } from './ProductCard.jsx';
export { default as ToastContainer, toast } from './Toast.jsx';
export { default as ThemeToggle } from './ThemeToggle.jsx';
export { default as NetworkBadge } from './NetworkBadge.jsx';
export { default as PriceTag } from './PriceTag.jsx';
export { default as EmptyState } from './EmptyState.jsx';
export { default as QuickAmounts } from './QuickAmounts.jsx';
export { default as CeloParticles } from './CeloParticles.jsx';
export { default as ConfirmModal } from './ConfirmModal.jsx';
EOF
git add frontend/src/components/index.js
git commit -m "feat: add barrel export for all components"
echo "✓ Commit 35/55"

# ── COMMIT 36: Update index.html with Celo meta tags ──
cat > frontend/index.html << 'EOF'
<!doctype html>
<html lang="en" data-theme="dark">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <meta name="theme-color" content="#35D07F" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    <title>Celo MiniMarket — P2P Marketplace</title>

    <!-- SEO -->
    <meta name="description" content="Buy and sell products peer-to-peer with cUSD on the Celo blockchain. Low fees, instant settlement." />
    <meta name="keywords" content="Celo, marketplace, cUSD, crypto, NFT, peer-to-peer, decentralized" />

    <!-- Open Graph -->
    <meta property="og:title" content="Celo MiniMarket — P2P Marketplace" />
    <meta property="og:description" content="Buy and sell products with cUSD on Celo blockchain. Low fees, instant settlement." />
    <meta property="og:image" content="https://celo-minimarket.vercel.app/og-image.png" />
    <meta property="og:url" content="https://celo-minimarket.vercel.app" />
    <meta property="og:type" content="website" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Celo MiniMarket" />
    <meta name="twitter:description" content="P2P marketplace on Celo — list and buy products with cUSD" />

    <!-- Farcaster Mini App -->
    <meta name="fc:miniapp" content='{"version":"1","imageUrl":"https://celo-minimarket.vercel.app/og-image.png","button":{"title":"🛒 Open Market","action":{"type":"launch_miniapp","name":"Celo MiniMarket","url":"https://celo-minimarket.vercel.app","splashImageUrl":"https://celo-minimarket.vercel.app/splash-200.png","splashBackgroundColor":"#0D1117"}}}' />

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="preconnect" href="https://auth.farcaster.xyz" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
EOF
git add frontend/index.html
git commit -m "feat: update HTML with Celo theme-color, SEO meta tags, and dark theme"
echo "✓ Commit 36/55"

# ── COMMIT 37: Update main.jsx to use new styles ──
cat > frontend/src/main.jsx << 'EOF'
import './polyfills'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './config/appkit'
import { initFarcasterSDK, signalReady } from './config/farcaster'
import './styles/index.css'

const queryClient = new QueryClient()

initFarcasterSDK().then((isMiniApp) => {
  console.log('Farcaster Mini App:', isMiniApp)
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App onReady={signalReady} />
    </QueryClientProvider>
  </React.StrictMode>
)
EOF
git add frontend/src/main.jsx
git commit -m "feat: update main.jsx to import new Celo style system"
echo "✓ Commit 37/55"

# ── COMMIT 38-39: Rewrite App.jsx with all new components ──
cat > frontend/src/App.jsx << 'ENDAPP'
import { useState, useEffect, useMemo, useCallback } from 'react'
import { useAppKit, useAppKitAccount, useAppKitProvider } from '@reown/appkit/react'
import { ethers } from 'ethers'
import marketArtifact from './abi/CeloMiniMarket.json'
import { getIsFarcasterMiniApp, getSafeAreaInsets, composeCast, getFarcasterUser, signalReady } from './config/farcaster'
import {
  Footer, StatsBar, SearchBar, ProductCard,
  ToastContainer, toast, ThemeToggle, NetworkBadge,
  EmptyState, QuickAmounts, CeloParticles,
  ConfirmModal
} from './components'

const MARKET_ADDRESS = '0x7a280e8b5995F72F20a1e90177C20D002aC1C3a4'
const CUSD_ADDRESS   = '0x765DE816845861e75A25fCA122bb6898B8B1282a'
const marketAbi = marketArtifact.abi
const CELO_RPC_URL = 'https://rpc.ankr.com/celo'

export default function App({ onReady }) {
  const { open } = useAppKit()
  const { address, isConnected } = useAppKitAccount()
  const { walletProvider } = useAppKitProvider('eip155')

  const [products, setProducts] = useState([])
  const [form, setForm] = useState({ name: '', price: '', description: '', imageUrl: '' })
  const [decimals] = useState(18)
  const [loading, setLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)
  const [uploadMethod, setUploadMethod] = useState('url')
  const [appReady, setAppReady] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const [buyModal, setBuyModal] = useState(null)

  const isFarcasterMiniApp = getIsFarcasterMiniApp()

  const provider = useMemo(() => {
    if (walletProvider) {
      try { return new ethers.providers.Web3Provider(walletProvider) }
      catch (e) { console.error('Provider error:', e) }
    }
    return new ethers.providers.JsonRpcProvider(CELO_RPC_URL)
  }, [walletProvider])

  const getSigner = async () => {
    if (!walletProvider || !isConnected) throw new Error('Connect wallet first')
    return new ethers.providers.Web3Provider(walletProvider).getSigner()
  }

  const market = async () => new ethers.Contract(MARKET_ADDRESS, marketAbi, await getSigner())

  const loadProducts = useCallback(async () => {
    if (!provider) return
    try {
      const m = new ethers.Contract(MARKET_ADDRESS, marketAbi, provider)
      const list = await m.getActiveProducts()
      setProducts(Array.isArray(list) ? list : [])
    } catch (err) {
      console.error('Load error:', err)
      setProducts([])
    }
  }, [provider])

  useEffect(() => { loadProducts() }, [loadProducts])

  useEffect(() => {
    if (!appReady) { setAppReady(true); signalReady() }
  }, [appReady])

  const filteredProducts = useMemo(() => {
    let result = [...products]
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      )
    }
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.priceWei.sub(b.priceWei).toNumber()); break
      case 'price-high':
        result.sort((a, b) => b.priceWei.sub(a.priceWei).toNumber()); break
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name)); break
      default: break
    }
    return result
  }, [products, searchQuery, sortBy])

  const shareToFarcaster = async (product) => {
    if (!isFarcasterMiniApp) return
    const text = `Check out "${product.name}" for ${ethers.utils.formatUnits(product.priceWei, decimals)} cUSD on Celo MiniMarket! 🛒`
    const result = await composeCast(text, ['https://celo-minimarket.vercel.app'])
    if (result?.cast) toast('Shared to Farcaster!', 'success')
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    if (!file.type.startsWith('image/')) { toast('Please upload an image file', 'error'); return }
    if (file.size > 10 * 1024 * 1024) { toast('Image too large (max 10MB)', 'error'); return }
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', 'ml_default')
      const res = await fetch('https://api.cloudinary.com/v1_1/demo/image/upload', { method: 'POST', body: formData })
      const data = await res.json()
      if (data.secure_url) {
        setImagePreview(data.secure_url)
        setForm(f => ({ ...f, imageUrl: data.secure_url }))
        toast('Image uploaded!', 'success')
      } else throw new Error('Upload failed')
    } catch (err) {
      toast('Upload failed — try pasting a URL instead', 'warning')
      setUploadMethod('url')
    } finally { setLoading(false) }
  }

  const handleImageUrlChange = (url) => {
    setForm(f => ({ ...f, imageUrl: url }))
    setImagePreview(url)
  }

  const clearImage = () => {
    setForm(f => ({ ...f, imageUrl: '' }))
    setImagePreview(null)
  }

  const addProduct = async (e) => {
    e.preventDefault()
    if (!isConnected) { toast('Connect your wallet first!', 'warning'); return }
    if (!form.imageUrl) { toast('Please add a product image', 'warning'); return }
    const priceWei = ethers.utils.parseUnits(form.price || '0', decimals)
    setLoading(true)
    try {
      const m = await market()
      const tx = await m.addProduct(form.name, priceWei, form.description, form.imageUrl)
      toast('Transaction sent — confirming...', 'info')
      await tx.wait()
      toast('Product listed as NFT! 🎉', 'success')
      setForm({ name: '', price: '', description: '', imageUrl: '' })
      setImagePreview(null)
      await loadProducts()
    } catch (err) {
      toast('Failed to add product: ' + (err.reason || err.message), 'error')
    } finally { setLoading(false) }
  }

  const confirmBuy = (tokenId, priceWei) => {
    if (!isConnected) { toast('Connect your wallet first!', 'warning'); return }
    const product = products.find(p => Number(p.tokenId) === Number(tokenId))
    setBuyModal({ tokenId, priceWei, product })
  }

  const executeBuy = async () => {
    if (!buyModal) return
    setLoading(true)
    try {
      const m = await market()
      const tx = await m.purchaseProduct(buyModal.tokenId, { value: buyModal.priceWei })
      toast('Purchase sent — confirming...', 'info')
      await tx.wait()
      toast('Purchase complete! NFT burned 🔥', 'success')
      setBuyModal(null)
      await loadProducts()
    } catch (err) {
      toast('Purchase failed: ' + (err.reason || err.message), 'error')
    } finally { setLoading(false) }
  }

  return (
    <>
      <CeloParticles />
      <ToastContainer />

      <ConfirmModal
        isOpen={!!buyModal}
        title="Confirm Purchase"
        message={buyModal ? `Buy "${buyModal.product?.name}" for ${ethers.utils.formatUnits(buyModal.priceWei, decimals)} cUSD?` : ''}
        onConfirm={executeBuy}
        onCancel={() => setBuyModal(null)}
        loading={loading}
      />

      <div className="app-container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="header">
          <div className="header-content">
            <img src="/logo.svg" alt="Celo MiniMarket" className="header-logo" />
            <h1>Celo MiniMarket</h1>
          </div>
          <div className="header-nav">
            <NetworkBadge isConnected={isConnected} />
            <ThemeToggle />
            <button className="btn btn-connect" onClick={() => open()}>
              {isConnected ? `${address?.slice(0, 6)}...${address?.slice(-4)}` : 'Connect Wallet'}
            </button>
          </div>
        </div>

        <div className="description-card animate-fadeInUp">
          <h2>Peer-to-Peer Commerce on Celo</h2>
          <p className="description-text">
            List products, receive cUSD payments instantly, and trade as NFTs — all on
            the carbon-negative Celo blockchain. No bank account needed.
          </p>
        </div>

        <StatsBar products={products} provider={provider} marketAddress={MARKET_ADDRESS} marketAbi={marketAbi} />

        <div className="section animate-fadeInUp">
          <h2>➕ List a Product</h2>
          <form onSubmit={addProduct} className="form">
            <input placeholder="Product Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
            <input placeholder="Price (cUSD)" type="number" step="0.01" min="0" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} required />
            <QuickAmounts onSelect={(v) => setForm(f => ({ ...f, price: v }))} />

            <div className="image-upload-section">
              <label className="upload-method-toggle">
                <span>Image:</span>
                <select value={uploadMethod} onChange={e => { setUploadMethod(e.target.value); clearImage() }} className="upload-method-select">
                  <option value="url">🔗 Paste URL</option>
                  <option value="file">☁️ Upload</option>
                </select>
              </label>

              {uploadMethod === 'url' ? (
                <input type="text" placeholder="Image URL (e.g. https://i.imgur.com/...)" value={form.imageUrl} onChange={e => handleImageUrlChange(e.target.value)} />
              ) : (
                <div className="file-upload-container">
                  <label htmlFor="image-upload" className="file-upload-label">
                    {loading ? '⏳ Uploading...' : '📁 Choose Image'}
                  </label>
                  <input id="image-upload" type="file" accept="image/*" onChange={handleImageUpload} className="file-upload-input" disabled={loading} />
                </div>
              )}

              {imagePreview && (
                <div className="image-preview-container">
                  <img src={imagePreview} alt="Preview" className="image-preview" />
                  <button type="button" onClick={clearImage} className="btn btn-danger btn-clear-image">✕ Remove</button>
                </div>
              )}
            </div>

            <textarea placeholder="Product Description" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} required />
            <button disabled={!isConnected || loading} type="submit" className="btn btn-primary">
              {loading ? <><span className="loading-spinner" /> Listing...</> : '✨ List Product'}
            </button>
          </form>
        </div>

        <div className="section animate-fadeInUp">
          <h2>🛒 Marketplace</h2>
          <SearchBar onSearch={setSearchQuery} onSort={setSortBy} />
          {filteredProducts.length === 0 ? (
            <EmptyState
              icon={searchQuery ? '🔍' : '🛒'}
              title={searchQuery ? 'No matching products' : 'No products listed yet'}
              subtitle={searchQuery ? 'Try a different search term' : 'Be the first vendor — list your product now! 🚀'}
            />
          ) : (
            <div className="products-grid">
              {filteredProducts.map(p => (
                <ProductCard
                  key={Number(p.tokenId)}
                  product={p}
                  decimals={decimals}
                  loading={loading}
                  isConnected={isConnected}
                  onBuy={confirmBuy}
                  onShare={shareToFarcaster}
                  isFarcaster={isFarcasterMiniApp}
                />
              ))}
            </div>
          )}
        </div>

        <Footer />
      </div>
    </>
  )
}
ENDAPP
git add frontend/src/App.jsx
git commit -m "feat: rewrite App.jsx with all Celo components, search, sort, modals, toasts"
echo "✓ Commit 38/55"

# ── COMMIT 39: Remove old App.css (replaced by style system) ──
cat > frontend/src/App.css << 'EOF'
/* Legacy — all styles moved to src/styles/ */
/* This file kept for backward compatibility */
EOF
git add frontend/src/App.css
git commit -m "refactor: deprecate old App.css in favor of modular style system"
echo "✓ Commit 39/55"

# ── COMMIT 40: Update old index.css ──
cat > frontend/src/index.css << 'EOF'
/* All styles are now in src/styles/index.css */
/* This file kept for compatibility only */
EOF
git add frontend/src/index.css
git commit -m "refactor: deprecate old index.css entry point"
echo "✓ Commit 40/55"

# ── COMMIT 41: Scroll-to-top component ──
cat > frontend/src/components/ScrollTop.jsx << 'EOF'
import { useState, useEffect } from 'react';

export default function ScrollTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button className="scroll-top-btn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} title="Back to top">
      ↑
    </button>
  );
}
EOF
git add frontend/src/components/ScrollTop.jsx
git commit -m "feat: add scroll-to-top button component"
echo "✓ Commit 41/55"

# ── COMMIT 42: ScrollTop styles ──
cat > frontend/src/styles/scroll-top.css << 'EOF'
.scroll-top-btn {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--celo-green);
  color: var(--celo-dark);
  border: none;
  font-size: 1.2rem;
  font-weight: 800;
  cursor: pointer;
  box-shadow: var(--shadow-md);
  z-index: 1000;
  transition: all var(--transition-normal);
  animation: fadeInUp 0.3s ease;
}

.scroll-top-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(53, 208, 127, 0.35);
}
EOF
echo "@import './scroll-top.css';" >> frontend/src/styles/index.css
git add frontend/src/styles/scroll-top.css frontend/src/styles/index.css
git commit -m "style: add floating scroll-to-top Celo green button"
echo "✓ Commit 42/55"

# ── COMMIT 43: Copy address hook ──
cat > frontend/src/hooks/useCopyToClipboard.js << 'EOF'
import { useState, useCallback } from 'react';

export default function useCopyToClipboard(timeout = 2000) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), timeout);
      return true;
    } catch {
      return false;
    }
  }, [timeout]);

  return { copied, copy };
}
EOF
mkdir -p frontend/src/hooks
git add frontend/src/hooks/useCopyToClipboard.js
git commit -m "feat: add useCopyToClipboard hook"
echo "✓ Commit 43/55"

# ── COMMIT 44: useLocalStorage hook ──
cat > frontend/src/hooks/useLocalStorage.js << 'EOF'
import { useState, useEffect } from 'react';

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(value)); }
    catch { /* ignore */ }
  }, [key, value]);

  return [value, setValue];
}
EOF
git add frontend/src/hooks/useLocalStorage.js
git commit -m "feat: add useLocalStorage hook for persisted state"
echo "✓ Commit 44/55"

# ── COMMIT 45: useMediaQuery hook ──
cat > frontend/src/hooks/useMediaQuery.js << 'EOF'
import { useState, useEffect } from 'react';

export default function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = (e) => setMatches(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [query]);

  return matches;
}
EOF
git add frontend/src/hooks/useMediaQuery.js
git commit -m "feat: add useMediaQuery hook for responsive logic"
echo "✓ Commit 45/55"

# ── COMMIT 46: Hooks barrel ──
cat > frontend/src/hooks/index.js << 'EOF'
export { default as useCopyToClipboard } from './useCopyToClipboard.js';
export { default as useLocalStorage } from './useLocalStorage.js';
export { default as useMediaQuery } from './useMediaQuery.js';
EOF
git add frontend/src/hooks/index.js
git commit -m "feat: add hooks barrel export"
echo "✓ Commit 46/55"

# ── COMMIT 47: Celo utils module ──
cat > frontend/src/utils/format.js << 'EOF'
import { ethers } from 'ethers';

export function formatCUSD(weiAmount, decimals = 18) {
  const formatted = ethers.utils.formatUnits(weiAmount, decimals);
  const num = parseFloat(formatted);
  if (num === 0) return '0.00';
  if (num < 0.01) return formatted;
  return num.toFixed(2);
}

export function shortenAddress(addr, chars = 4) {
  if (!addr) return '';
  return `${addr.slice(0, chars + 2)}...${addr.slice(-chars)}`;
}

export function formatTimestamp(ts) {
  return new Date(ts * 1000).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  });
}

export function isValidImageUrl(url) {
  if (!url) return false;
  try {
    const u = new URL(url);
    return u.protocol === 'https:' || u.protocol === 'http:';
  } catch { return false; }
}
EOF
mkdir -p frontend/src/utils
git add frontend/src/utils/format.js
git commit -m "feat: add Celo formatting utilities (cUSD, address, validation)"
echo "✓ Commit 47/55"

# ── COMMIT 48: Constants file ──
cat > frontend/src/utils/constants.js << 'EOF'
export const MARKET_ADDRESS = '0x7a280e8b5995F72F20a1e90177C20D002aC1C3a4';
export const CUSD_ADDRESS = '0x765DE816845861e75A25fCA122bb6898B8B1282a';
export const CELO_RPC_URL = 'https://rpc.ankr.com/celo';
export const CELO_EXPLORER = 'https://explorer.celo.org/mainnet';
export const CELO_CHAIN_ID = 42220;

export const CELO_COLORS = {
  green: '#35D07F',
  gold: '#FBCC5C',
  dark: '#2E3338',
  violet: '#BF97FF',
  red: '#FB7C6D',
  blue: '#3488EC',
};
EOF
git add frontend/src/utils/constants.js
git commit -m "feat: add centralized Celo constants and addresses"
echo "✓ Commit 48/55"

# ── COMMIT 49: Utils barrel ──
cat > frontend/src/utils/index.js << 'EOF'
export * from './format.js';
export * from './constants.js';
EOF
git add frontend/src/utils/index.js
git commit -m "feat: add utils barrel export"
echo "✓ Commit 49/55"

# ── COMMIT 50: Add Celo badge SVG component ──
cat > frontend/src/components/CeloBadge.jsx << 'EOF'
export default function CeloBadge() {
  return (
    <div className="celo-badge">
      <svg width="16" height="16" viewBox="0 0 950 950" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="475" cy="475" r="475" fill="#35D07F"/>
        <path d="M475 150C295.5 150 150 295.5 150 475C150 654.5 295.5 800 475 800C573 800 660.5 756 720 687.5C680.5 738 616.5 770 545 770C403 770 288 655 288 513C288 371 403 256 545 256C616.5 256 680.5 288 720 338.5C660.5 270 573 150 475 150Z" fill="white"/>
      </svg>
      <span>Powered by Celo</span>
    </div>
  );
}
EOF
git add frontend/src/components/CeloBadge.jsx
git commit -m "feat: add CeloBadge SVG component with Celo logo"
echo "✓ Commit 50/55"

# ── COMMIT 51: CeloBadge styles ──
cat > frontend/src/styles/celo-badge.css << 'EOF'
.celo-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.3rem 0.65rem;
  background: rgba(53, 208, 127, 0.08);
  border: 1px solid rgba(53, 208, 127, 0.15);
  border-radius: 100px;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--celo-green);
}

.celo-badge svg {
  flex-shrink: 0;
}
EOF
echo "@import './celo-badge.css';" >> frontend/src/styles/index.css
git add frontend/src/styles/celo-badge.css frontend/src/styles/index.css
git commit -m "style: add CeloBadge pill styles"
echo "✓ Commit 51/55"

# ── COMMIT 52: Loading skeleton component ──
cat > frontend/src/components/Skeleton.jsx << 'EOF'
export default function Skeleton({ width, height = '1rem', radius = '4px', count = 1 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="skeleton"
          style={{ width: width || '100%', height, borderRadius: radius }}
        />
      ))}
    </>
  );
}
EOF
git add frontend/src/components/Skeleton.jsx
git commit -m "feat: add Skeleton loading placeholder component"
echo "✓ Commit 52/55"

# ── COMMIT 53: Skeleton styles ──
cat > frontend/src/styles/skeleton.css << 'EOF'
.skeleton {
  background: linear-gradient(90deg, var(--bg-card) 25%, var(--bg-card-hover) 50%, var(--bg-card) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
  margin-bottom: 0.5rem;
}
EOF
echo "@import './skeleton.css';" >> frontend/src/styles/index.css
git add frontend/src/styles/skeleton.css frontend/src/styles/index.css
git commit -m "style: add shimmer skeleton loading animation"
echo "✓ Commit 53/55"

# ── COMMIT 54: ErrorBoundary update ──
cat > frontend/src/ErrorBoundary.jsx << 'EOF'
import { Component } from 'react';

export default class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', minHeight: '60vh', padding: '2rem',
          textAlign: 'center', color: '#8B949E'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
          <h2 style={{ color: '#F0F6FC', marginBottom: '0.5rem' }}>Something went wrong</h2>
          <p style={{ marginBottom: '1.5rem', maxWidth: '400px' }}>
            The app encountered an error. Please refresh the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '0.75rem 2rem', background: '#35D07F', color: '#2E3338',
              border: 'none', borderRadius: '10px', fontWeight: 700,
              fontSize: '1rem', cursor: 'pointer'
            }}
          >
            Refresh Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
EOF
git add frontend/src/ErrorBoundary.jsx
git commit -m "feat: update ErrorBoundary with Celo-styled recovery page"
echo "✓ Commit 54/55"

# ── COMMIT 55: Update components index with all additions ──
cat > frontend/src/components/index.js << 'EOF'
export { default as Footer } from './Footer.jsx';
export { default as StatsBar } from './StatsBar.jsx';
export { default as SearchBar } from './SearchBar.jsx';
export { default as ProductCard } from './ProductCard.jsx';
export { default as ToastContainer, toast } from './Toast.jsx';
export { default as ThemeToggle } from './ThemeToggle.jsx';
export { default as NetworkBadge } from './NetworkBadge.jsx';
export { default as PriceTag } from './PriceTag.jsx';
export { default as EmptyState } from './EmptyState.jsx';
export { default as QuickAmounts } from './QuickAmounts.jsx';
export { default as CeloParticles } from './CeloParticles.jsx';
export { default as ConfirmModal } from './ConfirmModal.jsx';
export { default as ScrollTop } from './ScrollTop.jsx';
export { default as CeloBadge } from './CeloBadge.jsx';
export { default as Skeleton } from './Skeleton.jsx';
EOF
git add frontend/src/components/index.js
git commit -m "feat: finalize component index with 15 Celo-themed components"
echo "✓ Commit 55/55"

echo ""
echo "============================================"
echo "✅ All 55 commits created!"
echo "============================================"
git log --oneline -55
echo ""
echo "Pushing to origin/main..."
git push origin main
echo "Done! 🎉"
