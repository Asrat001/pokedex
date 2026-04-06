import { StatusBar } from "expo-status-bar";
import React, { useCallback, useMemo } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";

import { ErrorView } from "@/components/error-view";
import { PokemonCard } from "@/components/pokemon-card";
import { PokemonListSkeleton } from "@/components/pokemon-skeleton";
import { SearchHeader } from "@/components/search-header";
import { COLORS } from "@/constants/theme";
import { usePokemonList, usePokemonSearch } from "@/hooks/use-pokemon";
import type { PokemonListItem } from "@/types/pokemon";

/**
 * Pokémon List Screen (Home).
 * Features: blue header, search bar, 2-column grid, infinite scroll, skeleton loading.
 */
export default function PokemonListScreen() {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
        refetch,
    } = usePokemonList();

    const search = usePokemonSearch();

    const allPokemon = useMemo<PokemonListItem[]>(() => {
        if (!data?.pages) return [];
        return data.pages.flatMap(
            (page: { items: PokemonListItem[] }) => page.items
        );
    }, [data]);

    const displayData = useMemo<PokemonListItem[]>(() => {
        if (search.isSearching && search.data) {
            const p = search.data;
            return [
                { id: p.id, name: p.name, imageUrl: p.imageUrl, types: p.types },
            ];
        }
        return allPokemon;
    }, [search.isSearching, search.data, allPokemon]);

    const handleEndReached = useCallback(() => {
        if (hasNextPage && !isFetchingNextPage && !search.isSearching) {
            fetchNextPage();
        }
    }, [hasNextPage, isFetchingNextPage, fetchNextPage, search.isSearching]);

    const renderItem = useCallback(
        ({ item, index }: { item: PokemonListItem; index: number }) => (
            <PokemonCard pokemon={item} index={index} />
        ),
        []
    );

    const renderFooter = useCallback(() => {
        if (isFetchingNextPage) {
            return (
                <View style={styles.footer}>
                    <ActivityIndicator size="small" color={COLORS.primary} />
                </View>
            );
        }
        return null;
    }, [isFetchingNextPage]);

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <FlatList
                data={displayData}
                renderItem={renderItem}
                keyExtractor={(item) => String(item.id)}
                numColumns={2}
                contentContainerStyle={styles.listContent}
                columnWrapperStyle={styles.columnWrapper}
                ListHeaderComponent={
                    <>
                        <SearchHeader
                            query={search.query}
                            onChangeQuery={search.setQuery}
                            onSearch={search.triggerSearch}
                            onClear={search.clearSearch}
                        />
                        {(isLoading || (search.isSearching && search.isLoading)) && (
                            <PokemonListSkeleton />
                        )}
                        {isError && !isLoading && (
                            <ErrorView
                                message="Failed to load Pokémon. Check your connection."
                                onRetry={() => refetch()}
                            />
                        )}
                        {search.isSearching && !search.isLoading && !search.data && (
                            <ErrorView message="No Pokémon found. Try another name!" />
                        )}
                    </>
                }
                onEndReached={handleEndReached}
                onEndReachedThreshold={0.4}
                ListFooterComponent={renderFooter}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F3F4F6",
    },
    listContent: {
        paddingBottom: 24,
    },
    columnWrapper: {
        paddingHorizontal: 8,
    },
    footer: {
        paddingVertical: 24,
    },
});
