import { STAT_COLORS, STAT_LABELS } from "@/constants/theme";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";

interface StatBarProps {
    name: string;
    value: number;
    maxValue?: number;
}

/**
 * Animated stat bar with label and numeric value.
 */
export function StatBar({ name, value, maxValue = 255 }: StatBarProps) {
    const progress = useSharedValue(0);
    const percentage = Math.min((value / maxValue) * 100, 100);
    const barColor = STAT_COLORS[name] ?? "#4CAF50";
    const label = STAT_LABELS[name] ?? name;

    useEffect(() => {
        progress.value = withTiming(percentage, {
            duration: 800,
            easing: Easing.out(Easing.cubic),
        });
    }, [percentage, progress]);

    const animatedStyle = useAnimatedStyle(() => ({
        width: `${progress.value}%`,
    }));

    return (
        <View style={styles.row}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>{value}</Text>
            <View style={styles.track}>
                <Animated.View
                    style={[styles.fill, { backgroundColor: barColor }, animatedStyle]}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 14,
    },
    label: {
        width: 64,
        fontSize: 12,
        color: "#6B7280",
        fontWeight: "600",
    },
    value: {
        width: 32,
        fontSize: 12,
        fontWeight: "700",
        color: "#374151",
        textAlign: "right",
        marginRight: 10,
    },
    track: {
        flex: 1,
        height: 10,
        backgroundColor: "#E5E7EB",
        borderRadius: 5,
        overflow: "hidden",
    },
    fill: {
        height: "100%",
        borderRadius: 5,
    },
});
