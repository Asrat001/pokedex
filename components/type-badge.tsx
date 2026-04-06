import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { TYPE_COLORS } from "@/constants/theme";
import { capitalize } from "@/utils/formatters";

interface TypeBadgeProps {
    type: string;
    size?: "sm" | "md";
}

/**
 * Colored badge chip displaying a Pokémon type (e.g. "Grass", "Fire").
 */
export function TypeBadge({ type, size = "sm" }: TypeBadgeProps) {
    const bgColor = TYPE_COLORS[type] ?? "#999";
    const isSmall = size === "sm";

    return (
        <View
            style={[
                styles.badge,
                {
                    backgroundColor: bgColor,
                    paddingHorizontal: isSmall ? 10 : 14,
                    paddingVertical: isSmall ? 3 : 5,
                },
            ]}
            accessibilityLabel={`${capitalize(type)} type`}
        >
            <Text style={[styles.label, { fontSize: isSmall ? 10 : 12 }]}>
                {capitalize(type)}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    badge: {
        borderRadius: 20,
        alignSelf: "flex-start",
    },
    label: {
        color: "#fff",
        fontWeight: "700",
    },
});
