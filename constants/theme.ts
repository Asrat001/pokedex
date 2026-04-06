/**
 * Pokémon type → background color mapping.
 * Used by TypeBadge and throughout the app.
 */
export const TYPE_COLORS: Record<string, string> = {
  normal: "#A8A878",
  fire: "#F08030",
  water: "#6890F0",
  electric: "#F8D030",
  grass: "#78C850",
  ice: "#98D8D8",
  fighting: "#C03028",
  poison: "#A040A0",
  ground: "#E0C068",
  flying: "#A890F0",
  psychic: "#F85888",
  bug: "#A8B820",
  rock: "#B8A038",
  ghost: "#705898",
  dragon: "#7038F8",
  dark: "#705848",
  steel: "#B8B8D0",
  fairy: "#EE99AC",
};

/** Stat name → bar color */
export const STAT_COLORS: Record<string, string> = {
  hp: "#4CAF50",
  attack: "#F44336",
  defense: "#2196F3",
  "special-attack": "#FF9800",
  "special-defense": "#9C27B0",
  speed: "#FFEB3B",
};

/** Short labels for stats */
export const STAT_LABELS: Record<string, string> = {
  hp: "HP",
  attack: "Attack",
  defense: "Defense",
  "special-attack": "Sp. Atk",
  "special-defense": "Sp. Def",
  speed: "Speed",
};

export const COLORS = {
  primary: "#3B4CCA",
  primaryDark: "#2A3AB2",
  background: "#F5F5F5",
  surface: "#FFFFFF",
  text: "#1A1A2E",
  textSecondary: "#6B7280",
  border: "#E5E7EB",
};
