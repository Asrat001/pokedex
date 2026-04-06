import { COLORS } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

interface SearchHeaderProps {
    query: string;
    onChangeQuery: (text: string) => void;
    onSearch: () => void;
    onClear: () => void;
}

/**
 * Blue header with Pokéball decoration, title, and search bar.
 */
export function SearchHeader({
    query,
    onChangeQuery,
    onSearch,
    onClear,
}: SearchHeaderProps) {
    return (
        <View style={styles.container}>
            {/* Pokéball decoration — top right */}
            <View style={styles.pokeball1} />
            <View style={styles.pokeball2} />

            {/* Title */}
            <Text style={styles.title}>
                Who are you{"\n"}looking for?
            </Text>

            {/* Search bar */}
            <View style={styles.searchContainer}>
                <Ionicons name="search" size={18} color="#9CA3AF" />
                <TextInput
                    style={styles.searchInput}
                    placeholder="e.g. Pikachu"
                    placeholderTextColor="#9CA3AF"
                    value={query}
                    onChangeText={onChangeQuery}
                    onSubmitEditing={onSearch}
                    returnKeyType="search"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                {query.length > 0 && (
                    <Pressable onPress={onClear} style={styles.clearBtn}>
                        <Ionicons name="close-circle" size={18} color="#9CA3AF" />
                    </Pressable>
                )}
                <Pressable onPress={onSearch} style={styles.goBtn}>
                    <Text style={styles.goBtnText}>GO</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.primary,
        paddingTop: 60,
        paddingBottom: 24,
        paddingHorizontal: 20,
        overflow: "hidden",
    },
    pokeball1: {
        position: "absolute",
        top: -40,
        right: -40,
        width: 160,
        height: 160,
        borderRadius: 80,
        borderWidth: 14,
        borderColor: "rgba(255,255,255,0.12)",
    },
    pokeball2: {
        position: "absolute",
        top: -16,
        right: -16,
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "rgba(255,255,255,0.06)",
    },
    title: {
        color: "#fff",
        fontSize: 26,
        fontWeight: "800",
        marginBottom: 20,
        lineHeight: 34,
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 30,
        paddingHorizontal: 16,
        paddingVertical: 4,
    },
    searchInput: {
        flex: 1,
        marginLeft: 8,
        fontSize: 14,
        color: "#1F2937",
        paddingVertical: 10,
    },
    clearBtn: {
        marginRight: 8,
    },
    goBtn: {
        backgroundColor: COLORS.primaryDark,
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 8,
    },
    goBtnText: {
        color: "#fff",
        fontWeight: "800",
        fontSize: 14,
    },
});
