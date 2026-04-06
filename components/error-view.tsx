import { COLORS } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface ErrorViewProps {
    message?: string;
    onRetry?: () => void;
}

/**
 * Reusable error state with icon, message, and retry button.
 */
export function ErrorView({
    message = "Something went wrong",
    onRetry,
}: ErrorViewProps) {
    return (
        <View style={styles.container}>
            <Ionicons name="alert-circle-outline" size={56} color="#EF4444" />
            <Text style={styles.message}>{message}</Text>
            {onRetry && (
                <Pressable onPress={onRetry} style={styles.retryBtn}>
                    <Text style={styles.retryText}>Try Again</Text>
                </Pressable>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 32,
        minHeight: 300,
    },
    message: {
        color: "#4B5563",
        fontSize: 15,
        marginTop: 16,
        textAlign: "center",
        lineHeight: 22,
    },
    retryBtn: {
        marginTop: 20,
        backgroundColor: COLORS.primary,
        paddingHorizontal: 28,
        paddingVertical: 12,
        borderRadius: 24,
    },
    retryText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 14,
    },
});
