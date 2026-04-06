import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
} from "react-native-reanimated";

// ── Shimmer block ──────────────────────────────────────────────

function ShimmerBlock({
    width,
    height,
    borderRadius = 8,
    style,
}: {
    width: number | string;
    height: number;
    borderRadius?: number;
    style?: object;
}) {
    const opacity = useSharedValue(0.3);

    useEffect(() => {
        opacity.value = withRepeat(
            withTiming(1, { duration: 800, easing: Easing.inOut(Easing.ease) }),
            -1,
            true
        );
    }, [opacity]);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));

    return (
        <Animated.View
            style={[
                {
                    width: width as number,
                    height,
                    borderRadius,
                    backgroundColor: "#E5E7EB",
                },
                animatedStyle,
                style,
            ]}
        />
    );
}

// ── Card skeleton ──────────────────────────────────────────────

export function PokemonCardSkeleton() {
    return (
        <View style={skeletonStyles.card}>
            <View style={skeletonStyles.cardHeader}>
                <ShimmerBlock width={80} height={14} />
                <ShimmerBlock width={30} height={14} />
            </View>
            <View style={skeletonStyles.cardImage}>
                <ShimmerBlock width={90} height={90} borderRadius={45} />
            </View>
            <View style={skeletonStyles.cardBadges}>
                <ShimmerBlock width={50} height={18} borderRadius={12} />
                <ShimmerBlock width={50} height={18} borderRadius={12} />
            </View>
        </View>
    );
}

export function PokemonListSkeleton({ count = 6 }: { count?: number }) {
    const rows = [];
    for (let i = 0; i < count; i += 2) {
        rows.push(
            <View key={i} style={skeletonStyles.row}>
                <PokemonCardSkeleton />
                {i + 1 < count && <PokemonCardSkeleton />}
            </View>
        );
    }
    return <View style={skeletonStyles.listContainer}>{rows}</View>;
}

// ── Detail skeleton ────────────────────────────────────────────

export function PokemonDetailSkeleton() {
    return (
        <View style={skeletonStyles.detailContainer}>
            <View style={skeletonStyles.detailHeader}>
                <ShimmerBlock width={40} height={14} />
                <ShimmerBlock width={50} height={22} borderRadius={12} />
                <ShimmerBlock width={50} height={22} borderRadius={12} />
            </View>
            <ShimmerBlock width={160} height={28} style={{ marginBottom: 16 }} />
            <View style={skeletonStyles.detailImage}>
                <ShimmerBlock width={200} height={200} borderRadius={100} />
            </View>
            {[1, 2, 3, 4].map((i) => (
                <View key={i} style={skeletonStyles.statRow}>
                    <ShimmerBlock width={60} height={12} style={{ marginRight: 8 }} />
                    <ShimmerBlock width={24} height={12} style={{ marginRight: 8 }} />
                    <View style={{ flex: 1 }}>
                        <ShimmerBlock width="100%" height={10} borderRadius={5} />
                    </View>
                </View>
            ))}
            <ShimmerBlock
                width={100}
                height={20}
                style={{ marginTop: 24, marginBottom: 12 }}
            />
            <View style={skeletonStyles.breedingRow}>
                <ShimmerBlock width={140} height={50} borderRadius={12} />
                <ShimmerBlock width={140} height={50} borderRadius={12} />
            </View>
        </View>
    );
}

const skeletonStyles = StyleSheet.create({
    card: {
        flex: 1,
        margin: 6,
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 14,
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8,
    },
    cardImage: {
        alignItems: "center",
        paddingVertical: 10,
    },
    cardBadges: {
        flexDirection: "row",
        gap: 6,
        marginTop: 4,
    },
    row: {
        flexDirection: "row",
    },
    listContainer: {
        paddingHorizontal: 8,
        paddingTop: 12,
    },
    detailContainer: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
    },
    detailHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: 8,
    },
    detailImage: {
        alignItems: "center",
        marginBottom: 24,
    },
    statRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 14,
    },
    breedingRow: {
        flexDirection: "row",
        gap: 16,
    },
});
