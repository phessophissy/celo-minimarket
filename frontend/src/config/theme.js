export const THEME_TOKENS = {
  colors: { primary:'#35D07F', primaryDark:'#27a566', secondary:'#FBCC5C', bg:'#0d1117', surface:'#161b22', border:'#30363d', text:'#e6edf3', textMuted:'#8b949e', error:'#f85149', success:'#35D07F', warning:'#FBCC5C', info:'#58a6ff' },
  spacing: { xs:'4px', sm:'8px', md:'16px', lg:'24px', xl:'32px' },
  radii: { sm:'4px', md:'8px', lg:'12px', full:'9999px' },
  shadows: { sm:'0 1px 2px rgba(0,0,0,.3)', md:'0 4px 8px rgba(0,0,0,.3)', glow:'0 0 20px rgba(53,208,127,.3)' },
};
export function getColor(n) { return THEME_TOKENS.colors[n]||n; }
