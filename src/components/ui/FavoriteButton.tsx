'use client';

import React from 'react';
import { useFavorites } from '@/contexts/FavoritesContext';
import { Heart } from 'lucide-react';

interface FavoriteButtonProps {
    destinationId: string;
    size?: number;
}

export function FavoriteButton({ destinationId, size = 18 }: FavoriteButtonProps) {
    const { isFavorite, toggleFavorite } = useFavorites();
    const active = isFavorite(destinationId);

    return (
        <button
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleFavorite(destinationId);
            }}
            className={`relative z-20 p-2 rounded-full transition-all backdrop-blur-sm ${active
                    ? 'bg-red-500/90 text-white'
                    : 'bg-white/80 dark:bg-black/50 text-[var(--color-muted)] hover:text-red-500'
                } hover:scale-110`}
            aria-label={active ? 'Remove from favorites' : 'Add to favorites'}
        >
            <Heart
                size={size}
                fill={active ? 'currentColor' : 'none'}
                className={active ? 'animate-pulse-heart' : ''}
            />
        </button>
    );
}
