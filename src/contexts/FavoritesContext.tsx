'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

interface FavoritesContextType {
    favorites: string[];
    addFavorite: (id: string) => void;
    removeFavorite: (id: string) => void;
    toggleFavorite: (id: string) => void;
    isFavorite: (id: string) => boolean;
    clearFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
    const [favorites, setFavorites] = useState<string[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem('favorites');
        if (saved) {
            try {
                setFavorites(JSON.parse(saved));
            } catch {
                setFavorites([]);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const addFavorite = useCallback((id: string) => {
        setFavorites((prev) => (prev.includes(id) ? prev : [...prev, id]));
    }, []);

    const removeFavorite = useCallback((id: string) => {
        setFavorites((prev) => prev.filter((fav) => fav !== id));
    }, []);

    const toggleFavorite = useCallback((id: string) => {
        setFavorites((prev) =>
            prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
        );
    }, []);

    const isFavorite = useCallback(
        (id: string) => favorites.includes(id),
        [favorites]
    );

    const clearFavorites = useCallback(() => {
        setFavorites([]);
    }, []);

    return (
        <FavoritesContext.Provider
            value={{ favorites, addFavorite, removeFavorite, toggleFavorite, isFavorite, clearFavorites }}
        >
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    const context = useContext(FavoritesContext);
    if (!context) throw new Error('useFavorites must be used within FavoritesProvider');
    return context;
}
