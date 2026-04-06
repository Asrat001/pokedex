// ── Pokémon types ──────────────────────────────────────────────

/** Individual stat (e.g. HP, Attack) */
export interface PokemonStat {
    name: string;
    baseStat: number;
}

/** Pokémon type (e.g. "grass", "poison") */
export interface PokemonType {
    name: string;
}

/** Single move entry */
export interface PokemonMove {
    name: string;
}

/** Lightweight list item returned by the paginated endpoint */
export interface PokemonListItem {
    id: number;
    name: string;
    imageUrl: string;
    types: PokemonType[];
}

/** Full detail model for a single Pokémon */
export interface Pokemon {
    id: number;
    name: string;
    imageUrl: string;
    types: PokemonType[];
    stats: PokemonStat[];
    height: number; // decimetres
    weight: number; // hectograms
    moves: PokemonMove[];
    abilities: string[];
}

/** Shape of the paginated list response from PokeAPI */
export interface PokemonPageResponse {
    count: number;
    next: string | null;
    results: Array<{ name: string; url: string }>;
}
