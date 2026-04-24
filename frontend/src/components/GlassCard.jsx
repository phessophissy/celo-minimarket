
/* add GlassCard base component */
export const GlassCard = ({ children }) => (
  <div style={{ background: 'var(--glass-bg)', backdropFilter: 'blur(10px)', borderRadius: '20px', padding: '20px', border: '1px solid rgba(255,255,255,0.2)' }}>{children}</div>
);
