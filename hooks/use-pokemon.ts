import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useCallback, useRef, useState } from "react";

import {
    fetchPokemonDetail,
    fetchPokemonList,
    searchPokemon,
} from "@/services/pokeapi";

// ── List hook (infinite scroll) ────────────────────────────────

export function usePokemonList() {
    return useInfiniteQuery({
        queryKey: ["pokemon", "list"],
        queryFn: ({ pageParam = 0 }) => fetchPokemonList(pageParam),
        getNextPageParam: (lastPage) => lastPage.nextOffset,
        initialPageParam: 0,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
}

// ── Detail hook ────────────────────────────────────────────────

export function usePokemonDetail(id: number) {
    return useQuery({
        queryKey: ["pokemon", "detail", id],
        queryFn: () => fetchPokemonDetail(id),
        staleTime: 1000 * 60 * 10, // 10 minutes
        enabled: id > 0,
    });
}

// ── Search hook (debounced) ────────────────────────────────────

export function usePokemonSearch() {
    const [query, setQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const updateQuery = useCallback((text: string) => {
        setQuery(text);

        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
            setDebouncedQuery(text.trim());
        }, 400);
    }, []);

    const searchResult = useQuery({
        queryKey: ["pokemon", "search", debouncedQuery],
        queryFn: () => searchPokemon(debouncedQuery),
        enabled: debouncedQuery.length >= 2,
        staleTime: 1000 * 60 * 5,
        retry: false,
    });

    const triggerSearch = useCallback(() => {
        if (query.trim().length >= 2) {
            setDebouncedQuery(query.trim());
        }
    }, [query]);

    const clearSearch = useCallback(() => {
        setQuery("");
        setDebouncedQuery("");
    }, []);

    return {
        query,
        setQuery: updateQuery,
        triggerSearch,
        clearSearch,
        isSearching: debouncedQuery.length >= 2,
        ...searchResult,
    };
}
