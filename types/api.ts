/**
 * Raw response shapes from the PokeAPI REST API.
 * These are intentionally separate from our domain models in pokemon.ts —
 * the API contract can change independently of what our app exposes.
 */

// ── Shared ─────────────────────────────────────────────────────

/** A named, URL-linked resource returned throughout PokeAPI responses */
export interface NamedResource {
    name: string;
    url: string;
}

// ── /pokemon (list) ────────────────────────────────────────────

export interface RawPokemonListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: NamedResource[];
}

// ── /pokemon/:id (detail) ──────────────────────────────────────

export interface RawPokemonType {
    slot: number;
    type: NamedResource;
}

export interface RawPokemonStat {
    base_stat: number;
    effort: number;
    stat: NamedResource;
}

export interface RawPokemonMove {
    move: NamedResource;
}

export interface RawPokemonAbility {
    ability: NamedResource;
    is_hidden: boolean;
    slot: number;
}

/** Full detail response from GET /pokemon/:id */
export interface RawPokemon {
    id: number;
    name: string;
    height: number;
    weight: number;
    types: RawPokemonType[];
    stats: RawPokemonStat[];
    moves: RawPokemonMove[];
    abilities: RawPokemonAbility[];
}
