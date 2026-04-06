/**
 * Pure string-formatting helpers used throughout the UI.
 * All functions are stateless and side-effect free.
 */

/** Capitalise the first character of a string */
export const capitalize = (str: string): string =>
    str.charAt(0).toUpperCase() + str.slice(1);

/**
 * Format a hyphenated PokeAPI move name for display.
 * @example formatMoveName("vine-whip") → "Vine Whip"
 */
export const formatMoveName = (moveName: string): string =>
    moveName
        .split("-")
        .map(capitalize)
        .join(" ");

/**
 * Zero-pad a Pokémon ID to 3 digits.
 * @example padId(5) → "005"
 */
export const padId = (id: number): string =>
    String(id).padStart(3, "0");
