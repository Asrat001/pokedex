import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { COLORS } from "@/constants/theme";

interface Props {
    children: React.ReactNode;
    /** Optional fallback UI override */
    fallback?: React.ReactNode;
}

interface State {
    hasError: boolean;
    message: string;
}

/**
 * Class-based error boundary that catches render-time exceptions from any
 * child component tree and displays a recoverable error screen.
 *
 * Usage:
 * ```tsx
 * <ErrorBoundary>
 *   <SomeScreen />
 * </ErrorBoundary>
 * ```
 */
export class ErrorBoundary extends React.Component<Props, State> {
    state: State = { hasError: false, message: "" };

    static getDerivedStateFromError(error: unknown): State {
        const message =
            error instanceof Error ? error.message : "An unexpected error occurred.";
        return { hasError: true, message };
    }

    componentDidCatch(error: unknown, info: React.ErrorInfo): void {
        // In production you would forward this to a monitoring service
        console.error("[ErrorBoundary]", error, info.componentStack);
    }

    private handleReset = (): void => {
        this.setState({ hasError: false, message: "" });
    };

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) return this.props.fallback;

            return (
                <View style={styles.container}>
                    <Text style={styles.title}>Something went wrong</Text>
                    <Text style={styles.message}>{this.state.message}</Text>
                    <Pressable onPress={this.handleReset} style={styles.retryBtn}>
                        <Text style={styles.retryText}>Try Again</Text>
                    </Pressable>
                </View>
            );
        }

        return this.props.children;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 32,
        backgroundColor: "#F5F5F5",
    },
    title: {
        fontSize: 20,
        fontWeight: "800",
        color: "#111827",
        marginBottom: 8,
    },
    message: {
        fontSize: 14,
        color: "#6B7280",
        textAlign: "center",
        lineHeight: 20,
        marginBottom: 24,
    },
    retryBtn: {
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
