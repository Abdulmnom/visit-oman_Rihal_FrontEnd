'use client';

import React from 'react';
import Link from 'next/link';
import { Destination } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { formatDuration, formatPrice } from '@/lib/utils';
import { CATEGORIES, CROWD_LEVELS } from '@/lib/constants';
import { Clock, MapPin, Ticket } from 'lucide-react';
import { FavoriteButton } from '@/components/ui/FavoriteButton';
import { CategoryBadge } from '@/components/ui/CategoryBadge';
import { CrowdIndicator } from '@/components/ui/CrowdIndicator';

interface DestinationCardProps {
    destination: Destination;
    index?: number;
}

export function DestinationCard({ destination, index = 0 }: DestinationCardProps) {
    const { language, t } = useLanguage();
    const name = language === 'ar' ? destination.name.ar : destination.name.en;
    const region = language === 'ar' ? destination.region.ar : destination.region.en;

    const categoryInfo = CATEGORIES.find((c) => c.value === destination.categories[0]);
    const bgGradient = getCategoryGradient(destination.categories[0]);

    return (
        <div
            className="group relative rounded-2xl overflow-hidden bg-[var(--color-surface)] border border-[var(--color-border)] card-hover"
            style={{ animationDelay: `${index * 60}ms` }}
        >
            {/* Card Image Area */}
            <div className={`relative h-48 ${bgGradient} overflow-hidden`}>
                {/* Pattern overlay */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.2) 1px, transparent 1px)`,
                        backgroundSize: '20px 20px'
                    }} />
                </div>

                {/* Category icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl opacity-40 group-hover:opacity-60 group-hover:scale-110 transition-all duration-500">
                        {categoryInfo?.icon || '📍'}
                    </span>
                </div>

                {/* Favorite button */}
                <div className="absolute top-3 right-3 z-10">
                    <FavoriteButton destinationId={destination.id} />
                </div>

                {/* Price tag */}
                <div className="absolute top-3 left-3 z-10">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${destination.ticket_cost_omr === 0
                            ? 'bg-green-500/90 text-white'
                            : 'bg-white/90 dark:bg-black/60 text-[var(--color-foreground)]'
                        } backdrop-blur-sm`}>
                        {formatPrice(destination.ticket_cost_omr)}
                    </span>
                </div>

                {/* Bottom gradient */}
                <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-black/50 to-transparent" />

                {/* Region */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white/90">
                    <MapPin size={13} />
                    <span className="text-xs font-medium">{region}</span>
                </div>
            </div>

            {/* Card Body */}
            <div className="p-4">
                <Link href={`/destination/${destination.id}`}>
                    <h3 className="text-base font-bold text-[var(--color-foreground)] group-hover:text-[var(--color-primary)] transition-colors line-clamp-1 font-[family-name:var(--font-heading)]">
                        {name}
                    </h3>
                </Link>

                {/* Categories */}
                <div className="flex flex-wrap gap-1.5 mt-2">
                    {destination.categories.map((cat) => (
                        <CategoryBadge key={cat} category={cat} size="sm" />
                    ))}
                </div>

                {/* Meta info */}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-[var(--color-border)]">
                    <div className="flex items-center gap-1 text-xs text-[var(--color-muted)]">
                        <Clock size={13} />
                        <span>{formatDuration(destination.avg_visit_duration_minutes)}</span>
                    </div>
                    <CrowdIndicator level={destination.crowd_level} compact />
                </div>
            </div>

            {/* Full card link overlay */}
            <Link href={`/destination/${destination.id}`} className="absolute inset-0 z-0" aria-label={name} />
        </div>
    );
}

function getCategoryGradient(category: string): string {
    const gradients: Record<string, string> = {
        beach: 'bg-gradient-to-br from-cyan-400 to-blue-500',
        culture: 'bg-gradient-to-br from-purple-400 to-violet-600',
        desert: 'bg-gradient-to-br from-amber-400 to-orange-500',
        food: 'bg-gradient-to-br from-red-400 to-rose-500',
        mountain: 'bg-gradient-to-br from-indigo-400 to-blue-600',
        nature: 'bg-gradient-to-br from-emerald-400 to-green-600',
    };
    return gradients[category] || 'bg-gradient-to-br from-gray-400 to-gray-600';
}
