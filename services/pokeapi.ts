import type {
    Pokemon,
    PokemonListItem,
    PokemonMove,
    PokemonPageResponse,
    PokemonStat,
    PokemonType,
} from "@/types/pokemon";
import type { RawPokemon, RawPokemonListResponse } from "@/types/api";

// ── Constants ──────────────────────────────────────────────────

const BASE_URL = "https://pokeapi.co/api/v2";
const PAGE_SIZE = 20;
const MOVES_LIMIT = 30;

/** Official artwork CDN — higher quality than default sprites */
const artworkUrl = (id: number): string =>
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

// ── Helpers ────────────────────────────────────────────────────

/** Extract the numeric ID from a PokeAPI resource URL */
const extractId = (url: string): number => {
    const segments = url.replace(/\/$/, "").split("/");
    return Number(segments[segments.length - 1]);
};

/** Map a raw PokeAPI pokemon response to our clean domain model */
const mapToPokemon = (data: RawPokemon): Pokemon => ({
    id: data.id,
    name: data.name,
    imageUrl: artworkUrl(data.id),
    types: data.types.map((t): PokemonType => ({ name: t.type.name })),
    stats: data.stats.map((s): PokemonStat => ({
        name: s.stat.name,
        baseStat: s.base_stat,
    })),
    height: data.height,
    weight: data.weight,
    moves: data.moves
        .slice(0, MOVES_LIMIT)
        .map((m): PokemonMove => ({ name: m.move.name })),
    abilities: data.abilities.map((a) => a.ability.name),
});

// ── Public API ─────────────────────────────────────────────────

/**
 * Fetch a paginated list of Pokémon, including types for each.
 * Individual details are fetched in parallel to obtain type data for cards.
 */
export const fetchPokemonList = async (
    offset = 0,
    limit = PAGE_SIZE
): Promise<{ items: PokemonListItem[]; nextOffset: number | null }> => {
    const res = await fetch(
        `${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`
    );
    if (!res.ok) throw new Error(`Failed to fetch list: ${res.status}`);

    const data: RawPokemonListResponse = await res.json();

    const items: PokemonListItem[] = await Promise.all(
        data.results.map(async (entry) => {
            const id = extractId(entry.url);
            const detailRes = await fetch(`${BASE_URL}/pokemon/${id}`);
            const detail: RawPokemon = await detailRes.json();
            return {
                id,
                name: entry.name,
                imageUrl: artworkUrl(id),
                types: detail.types.map((t): PokemonType => ({ name: t.type.name })),
            };
        })
    );

    return {
        items,
        nextOffset: data.next ? offset + limit : null,
    };
};

/**
 * Fetch full detail for a single Pokémon by ID.
 */
export const fetchPokemonDetail = async (id: number): Promise<Pokemon> => {
    const res = await fetch(`${BASE_URL}/pokemon/${id}`);
    if (!res.ok) throw new Error(`Failed to fetch Pokémon #${id}: ${res.status}`);

    const data: RawPokemon = await res.json();
    return mapToPokemon(data);
};

/**
 * Search for a Pokémon by name (exact match via PokeAPI).
 * Returns `null` if not found rather than throwing.
 */
export const searchPokemon = async (
    name: string
): Promise<Pokemon | null> => {
    try {
        const res = await fetch(
            `${BASE_URL}/pokemon/${name.toLowerCase().trim()}`
        );
        if (!res.ok) return null;
        const data: RawPokemon = await res.json();
        return mapToPokemon(data);
    } catch {
        return null;
    }
};
