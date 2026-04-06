/**
 * Unit conversion helpers for Pokémon physical measurements.
 *
 * PokeAPI stores:
 *   height in decimetres  (1 dm = 0.1 m)
 *   weight in hectograms  (1 hg = 0.1 kg)
 */

/** Decimetres → metres, 1 decimal place */
export const toHeightM = (decimetres: number): string =>
    (decimetres / 10).toFixed(1);

/** Decimetres → feet, 1 decimal place */
export const toHeightFt = (decimetres: number): string =>
    (decimetres * 0.328084).toFixed(1);

/** Hectograms → kilograms, 1 decimal place */
export const toWeightKg = (hectograms: number): string =>
    (hectograms / 10).toFixed(1);

/** Hectograms → pounds, 1 decimal place */
export const toWeightLbs = (hectograms: number): string =>
    (hectograms * 0.220462).toFixed(1);
