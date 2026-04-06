import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Dimensions,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";

import { ErrorView } from "@/components/error-view";
import { PokemonDetailSkeleton } from "@/components/pokemon-skeleton";
import { StatBar } from "@/components/stat-bar";
import { TypeBadge } from "@/components/type-badge";
import { COLORS } from "@/constants/theme";
import { usePokemonDetail } from "@/hooks/use-pokemon";
import { toHeightFt, toHeightM, toWeightKg, toWeightLbs } from "@/utils/conversions";
import { capitalize, formatMoveName, padId } from "@/utils/formatters";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

/** Stats shown in the side-by-side layout — matches the design mockup */
const MAIN_STAT_NAMES = ["hp", "attack", "defense", "speed"] as const;

/** Number of moves shown before "See all" is tapped */
const MOVES_PREVIEW_COUNT = 6;

/**
 * Pokémon Detail Screen — matches the provided mockup:
 * - Blue header with back arrow + Pokéball decoration
 * - ID, name, type badges
 * - 4 main stats (left) + artwork (right) side by side
 * - Breeding card (height & weight in dual units)
 * - Moves grid with collapsible "See all"
 */
export default function PokemonDetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const pokemonId = Number(id);
    const router = useRouter();

    const { data: pokemon, isLoading, isError, refetch } = usePokemonDetail(pokemonId);
    const [showAllMoves, setShowAllMoves] = useState(false);

    if (isLoading) return <PokemonDetailSkeleton />;
    if (isError || !pokemon) {
        return (
            <ErrorView
                message="Failed to load Pokémon details"
                onRetry={() => refetch()}
            />
        );
    }

    const mainStats = pokemon.stats.filter((s) =>
        (MAIN_STAT_NAMES as readonly string[]).includes(s.name)
    );
    const displayedMoves = showAllMoves
        ? pokemon.moves
        : pokemon.moves.slice(0, MOVES_PREVIEW_COUNT);

    return (
        <View style={styles.screen}>
            {/* ── Blue Header ─────────────────────────────────────── */}
            <View style={styles.blueHeader}>
                <Pressable
                    onPress={() => router.back()}
                    style={styles.backBtn}
                    accessibilityRole="button"
                    accessibilityLabel="Go back"
                >
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </Pressable>
                {/* Decorative Pokéball rings */}
                <View style={styles.pokeballOuter} />
                <View style={styles.pokeballInner} />
                <Image
                    source={{
                        uri: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png",
                    }}
                    style={styles.pokeballImage}
                    contentFit="contain"
                    accessibilityLabel="Pokéball decoration"
                />
            </View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* ── ID + Name + Type badges ──────────────────────── */}
                <Animated.View entering={FadeIn.duration(300)}>
                    <Text style={styles.pokemonId}>#{padId(pokemon.id)}</Text>
                    <View style={styles.nameBadgeRow}>
                        <Text style={styles.pokemonName}>
                            {capitalize(pokemon.name)}
                        </Text>
                        <View style={styles.badgesRow}>
                            {pokemon.types.map((t) => (
                                <TypeBadge key={t.name} type={t.name} size="md" />
                            ))}
                        </View>
                    </View>
                </Animated.View>

                {/* ── Stats + Image (side by side) ──────────────────── */}
                <Animated.View
                    entering={FadeInDown.delay(150).duration(400)}
                    style={styles.statsImageRow}
                >
                    <View style={styles.statsColumn}>
                        {mainStats.map((stat) => (
                            <StatBar key={stat.name} name={stat.name} value={stat.baseStat} />
                        ))}
                    </View>
                    <View style={styles.imageColumn}>
                        <Image
                            source={{ uri: pokemon.imageUrl }}
                            style={styles.pokemonImage}
                            contentFit="contain"
                            transition={300}
                            accessibilityLabel={`${capitalize(pokemon.name)} official artwork`}
                        />
                    </View>
                </Animated.View>

                <View style={styles.divider} />

                {/* ── Breeding ──────────────────────────────────────── */}
                <Animated.View
                    entering={FadeInDown.delay(300).duration(400)}
                    style={styles.section}
                >
                    <Text style={styles.sectionTitle}>Breeding</Text>
                    <View style={styles.breedingRow}>
                        <View style={styles.breedingCard}>
                            <Text style={styles.breedingLabel}>Height</Text>
                            <View style={styles.breedingValues}>
                                <View style={styles.measureBox}>
                                    <Text style={styles.measureValue}>{toHeightFt(pokemon.height)}"</Text>
                                </View>
                                <View style={styles.measureBox}>
                                    <Text style={styles.measureValue}>{toHeightM(pokemon.height)} m</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.breedingCard}>
                            <Text style={styles.breedingLabel}>Weight</Text>
                            <View style={styles.breedingValues}>
                                <View style={styles.measureBox}>
                                    <Text style={styles.measureValue}>{toWeightLbs(pokemon.weight)} lbs</Text>
                                </View>
                                <View style={styles.measureBox}>
                                    <Text style={styles.measureValue}>{toWeightKg(pokemon.weight)} kg</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </Animated.View>

                <View style={styles.divider} />

                {/* ── Moves ─────────────────────────────────────────── */}
                <Animated.View
                    entering={FadeInDown.delay(400).duration(400)}
                    style={styles.section}
                >
                    <View style={styles.movesTitleRow}>
                        <Text style={styles.sectionTitle}>Moves</Text>
                        {pokemon.moves.length > MOVES_PREVIEW_COUNT && (
                            <Pressable
                                onPress={() => setShowAllMoves(!showAllMoves)}
                                style={styles.seeAllBtn}
                                accessibilityRole="button"
                                accessibilityLabel={showAllMoves ? "Show fewer moves" : "See all moves"}
                            >
                                <Text style={styles.seeAllText}>
                                    {showAllMoves ? "Show less" : "See all"}
                                </Text>
                            </Pressable>
                        )}
                    </View>
                    <View style={styles.movesGrid}>
                        {displayedMoves.map((move) => (
                            <View key={move.name} style={styles.moveChip}>
                                <Text style={styles.moveText}>
                                    {formatMoveName(move.name)}
                                </Text>
                            </View>
                        ))}
                    </View>
                </Animated.View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#F5F5F5",
    },

    // ── Blue Header ──────────────────────────────────────────
    blueHeader: {
        backgroundColor: COLORS.primary,
        paddingTop: 50,
        paddingBottom: 20,
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        overflow: "hidden",
    },
    backBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2,
    },
    pokeballOuter: {
        position: "absolute",
        top: -20,
        right: -20,
        width: 140,
        height: 140,
        borderRadius: 70,
        borderWidth: 12,
        borderColor: "rgba(255,255,255,0.1)",
    },
    pokeballInner: {
        position: "absolute",
        top: 5,
        right: 5,
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: "rgba(255,255,255,0.05)",
    },
    pokeballImage: {
        position: "absolute",
        top: 20,
        right: 20,
        width: 50,
        height: 50,
    },

    // ── ScrollView ───────────────────────────────────────────
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 40,
    },

    // ── Name / ID / Badges ───────────────────────────────────
    pokemonId: {
        fontSize: 13,
        color: "#9CA3AF",
        fontWeight: "600",
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    nameBadgeRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        marginTop: 2,
        marginBottom: 12,
    },
    pokemonName: {
        fontSize: 28,
        fontWeight: "800",
        color: "#111827",
    },
    badgesRow: {
        flexDirection: "row",
        gap: 8,
    },

    // ── Stats + Image row ────────────────────────────────────
    statsImageRow: {
        flexDirection: "row",
        paddingHorizontal: 20,
        alignItems: "center",
        minHeight: 180,
    },
    statsColumn: {
        flex: 1,
        paddingRight: 8,
    },
    imageColumn: {
        width: SCREEN_WIDTH * 0.4,
        alignItems: "center",
        justifyContent: "center",
    },
    pokemonImage: {
        width: SCREEN_WIDTH * 0.38,
        height: SCREEN_WIDTH * 0.38,
    },

    // ── Sections ─────────────────────────────────────────────
    divider: {
        height: 1,
        backgroundColor: "#E5E7EB",
        marginHorizontal: 20,
        marginVertical: 16,
    },
    section: {
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "800",
        color: "#111827",
        marginBottom: 14,
    },

    // ── Breeding ─────────────────────────────────────────────
    breedingRow: {
        flexDirection: "row",
        gap: 12,
    },
    breedingCard: {
        flex: 1,
    },
    breedingLabel: {
        fontSize: 12,
        color: "#9CA3AF",
        fontWeight: "600",
        marginBottom: 8,
    },
    breedingValues: {
        flexDirection: "row",
        gap: 8,
    },
    measureBox: {
        backgroundColor: "#F3F4F6",
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    measureValue: {
        fontSize: 13,
        fontWeight: "700",
        color: "#374151",
    },

    // ── Moves ────────────────────────────────────────────────
    movesTitleRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },
    seeAllBtn: {
        borderWidth: 1.5,
        borderColor: "#D1D5DB",
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 6,
    },
    seeAllText: {
        fontSize: 12,
        fontWeight: "700",
        color: "#374151",
    },
    movesGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
    },
    moveChip: {
        backgroundColor: "#F3F4F6",
        borderRadius: 20,
        paddingHorizontal: 14,
        paddingVertical: 7,
    },
    moveText: {
        fontSize: 12,
        color: "#374151",
        fontWeight: "500",
    },
});
