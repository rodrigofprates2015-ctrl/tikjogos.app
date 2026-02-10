// Server URL - production points to tikjogos.com.br
// In dev, 10.0.2.2 maps to host machine from Android emulator
export const API_BASE_URL = __DEV__
  ? 'http://10.0.2.2:5000'
  : 'https://tikjogos.com.br';

export const WS_BASE_URL = __DEV__
  ? 'ws://10.0.2.2:5000'
  : 'wss://tikjogos.com.br';

// Colors from the web design system (theme-tikjogos.css + ImpostorGame.tsx)
export const Colors = {
  // Backgrounds
  bgMain: '#1a1b2e',        // --bg-main
  bgPanel: '#242642',       // --bg-panel / card bg
  bgPanelDark: '#1e2036',   // --bg-panel-dark
  bgSlate900: '#0f172a',    // --slate-900
  bgSlate800: '#1e293b',    // --slate-800 (cards, buttons)
  bgSlate700: '#334155',    // --slate-700

  // Panel border
  panelBorder: '#2f3252',   // border-[#2f3252]

  // Brand colors
  purple: '#8b5cf6',
  purpleDark: '#6d28d9',
  blue: '#3b82f6',
  green: '#22c55e',
  emerald: '#10b981',
  yellow: '#facc15',
  rose: '#f43f5e',
  orange: '#f97316',
  pink: '#ec4899',

  // Text
  white: '#ffffff',
  slate400: '#94a3b8',      // --slate-400 (secondary text)
  slate500: '#64748b',      // muted text
  slate300: '#cbd5e1',

  // Semantic
  impostor: '#ef4444',
  crew: '#22c55e',
  gold: '#fbbf24',

  // Button borders (3D effect)
  orangeBorder: '#9a3412',  // border-orange-800
  greenBorder: '#065f46',   // border-green-800
  purpleBorder: '#581c87',  // border-purple-800
  roseBorder: '#9f1239',    // border-rose-800
  slateBorder: '#0f172a',   // border-slate-900
};
