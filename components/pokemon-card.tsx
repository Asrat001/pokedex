import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";

import { TypeBadge } from "@/components/type-badge";
import { capitalize, padId } from "@/utils/formatters";
import type { PokemonListItem } from "@/types/pokemon";

interface PokemonCardProps {
    pokemon: PokemonListItem;
    /** List index — used to stagger the entrance animation */
    index: number;
}

/**
 * Grid card for the list screen.
 * Entrance animation is staggered by `index` so cards cascade in on load.
 */
export function PokemonCard({ pokemon, index }: PokemonCardProps) {
    const router = useRouter();

    return (
        <Animated.View
            entering={FadeInUp.delay((index % 6) * 80)
                .duration(400)
                .springify()}
            style={styles.wrapper}
        >
            <Pressable
                onPress={() =>
                    router.push({
                        pathname: "/pokemon/[id]",
                        params: { id: pokemon.id },
                    })
                }
                style={styles.card}
                accessibilityRole="button"
                accessibilityLabel={`View details for ${capitalize(pokemon.name)}`}
            >
                {/* Name + Number */}
                <View style={styles.header}>
                    <Text style={styles.name} numberOfLines={1}>
                        {capitalize(pokemon.name)}
                    </Text>
                    <Text style={styles.number}>#{padId(pokemon.id)}</Text>
                </View>

                {/* Artwork */}
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: pokemon.imageUrl }}
                        style={styles.image}
                        contentFit="contain"
                        transition={200}
                        accessibilityLabel={`${capitalize(pokemon.name)} artwork`}
                    />
                </View>

                {/* Type badges */}
                <View style={styles.badges}>
                    {pokemon.types.map((t) => (
                        <TypeBadge key={t.name} type={t.name} />
                    ))}
                </View>
            </Pressable>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        margin: 6,
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 14,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 4,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 4,
    },
    name: {
        fontSize: 14,
        fontWeight: "700",
        color: "#1F2937",
        flex: 1,
    },
    number: {
        fontSize: 12,
        color: "#9CA3AF",
        fontWeight: "600",
        marginLeft: 4,
    },
    imageContainer: {
        alignItems: "center",
        paddingVertical: 10,
    },
    image: {
        width: 96,
        height: 96,
    },
    badges: {
        flexDirection: "row",
        gap: 6,
        marginTop: 6,
    },
});
