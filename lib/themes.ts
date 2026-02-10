// Built-in game themes (from web client/src/data/themes.ts)
// These are used as categories for the palavraSecreta mode

export interface ThemeData {
  slug: string;
  categoryId: string;
  name: string;
  wordCount: number;
  icon: string;
}

export const THEMES: ThemeData[] = [
  { slug: 'classico', categoryId: 'classico', name: 'Clássico', wordCount: 20, icon: '🎲' },
  { slug: 'natal', categoryId: 'natal', name: 'Natal', wordCount: 51, icon: '🎄' },
  { slug: 'clash-royale', categoryId: 'estrategia', name: 'Clash Royale', wordCount: 20, icon: '⚔️' },
  { slug: 'animes', categoryId: 'animes', name: 'Mundo dos Animes', wordCount: 20, icon: '🎌' },
  { slug: 'super-herois', categoryId: 'herois', name: 'Universo dos Super-Heróis', wordCount: 20, icon: '🦸' },
  { slug: 'stranger-things', categoryId: 'seriesMisterio', name: 'Stranger Things', wordCount: 30, icon: '👾' },
  { slug: 'futebol', categoryId: 'futebol', name: 'Futebol', wordCount: 20, icon: '⚽' },
  { slug: 'disney', categoryId: 'disney', name: 'Disney', wordCount: 30, icon: '🏰' },
  { slug: 'valorant', categoryId: 'valorant', name: 'Valorant', wordCount: 53, icon: '🎯' },
  { slug: 'roblox', categoryId: 'roblox', name: 'Roblox', wordCount: 34, icon: '🧱' },
  { slug: 'supernatural', categoryId: 'supernatural', name: 'Supernatural', wordCount: 36, icon: '😈' },
  { slug: 'dragon-ball', categoryId: 'dragonball', name: 'Dragon Ball', wordCount: 36, icon: '🐉' },
  { slug: 'naruto', categoryId: 'naruto', name: 'Naruto', wordCount: 35, icon: '🍥' },
  { slug: 'bandas-de-rock', categoryId: 'rock', name: 'Bandas de Rock', wordCount: 35, icon: '🎸' },
  { slug: 'minecraft', categoryId: 'minecraft', name: 'Minecraft', wordCount: 38, icon: '⛏️' },
  { slug: 'gta', categoryId: 'gta', name: 'Grand Theft Auto (GTA)', wordCount: 37, icon: '🚗' },
  { slug: 'fnaf', categoryId: 'fnaf', name: "Five Nights at Freddy's", wordCount: 30, icon: '🐻' },
];

// Word categories for palavraSecreta mode (from web WORD_CATEGORIES)
export interface WordCategory {
  id: string;
  name: string;
  emoji: string;
  difficulty: 'fácil' | 'médio' | 'difícil';
  wordCount: number;
}

export const WORD_CATEGORIES: WordCategory[] = [
  { id: 'animais', name: 'Animais', emoji: '🦁', difficulty: 'fácil', wordCount: 10 },
  { id: 'frutas', name: 'Frutas', emoji: '🍎', difficulty: 'fácil', wordCount: 10 },
  { id: 'objetos', name: 'Objetos', emoji: '🔧', difficulty: 'médio', wordCount: 10 },
  { id: 'profissoes', name: 'Profissões', emoji: '👨‍⚕️', difficulty: 'médio', wordCount: 10 },
  { id: 'tecnologia', name: 'Tecnologia', emoji: '💻', difficulty: 'médio', wordCount: 10 },
  { id: 'esportes', name: 'Esportes', emoji: '⚽', difficulty: 'fácil', wordCount: 10 },
  { id: 'comidas', name: 'Comidas', emoji: '🍕', difficulty: 'fácil', wordCount: 10 },
  { id: 'lugares', name: 'Lugares', emoji: '🏖️', difficulty: 'médio', wordCount: 10 },
  { id: 'veiculos', name: 'Veículos', emoji: '🚗', difficulty: 'fácil', wordCount: 10 },
  { id: 'instrumentos', name: 'Instrumentos', emoji: '🎸', difficulty: 'médio', wordCount: 10 },
];

// Community theme type (from API)
export interface PublicTheme {
  id: number;
  titulo: string;
  autor: string;
  palavrasCount: number;
  accessCode: string;
  createdAt: string;
}
