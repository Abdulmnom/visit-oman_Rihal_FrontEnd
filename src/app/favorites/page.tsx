'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { getDestinationById } from '@/lib/data';
import { DestinationCard } from '@/components/destination/DestinationCard';
import { EmptyState } from '@/components/ui/Skeleton';
import { Heart, ArrowRight } from 'lucide-react';

export default function FavoritesPage() {
    const { t } = useLanguage();
    const { favorites, clearFavorites } = useFavorites();

    const destinations = favorites
        .map((id) => getDestinationById(id))
        .filter(Boolean);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center mb-12 section-divider">
                <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)] text-[var(--color-foreground)] heading-accent">
                    {t('Favorites', 'المفضلة')}
                </h1>
                <p className="text-[var(--color-muted)] mt-1">
                    {favorites.length} {t('saved destinations', 'وجهة محفوظة')}
                </p>
                {favorites.length > 0 && (
                    <button
                        onClick={clearFavorites}
                        className="mt-3 text-sm text-[var(--color-muted)] hover:text-red-500 transition-colors  "
                    >
                        {t('Clear all', 'مسح الكل')}
                    </button>
                )}
            </div>

            {destinations.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {destinations.map((dest, i) => (
                        <DestinationCard key={dest!.id} destination={dest!} index={i} />
                    ))}
                </div>
            ) : (
                <EmptyState
                    icon={<Heart size={32} />}
                    title={t('No favorites yet', 'ليس لديك مفضلة بعد')}
                    description={t(
                        'Start exploring and save your favorite destinations by clicking the heart icon',
                        'ابدأ بالاستكشاف واحفظ وجهاتك المفضلة بالضغط على أيقونة القلب'
                    )}
                    action={
                        <Link
                            href="/explore"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg text-sm font-medium"
                        >
                            {t('Start Exploring', 'ابدأ الاستكشاف')}
                            <ArrowRight size={16} />
                        </Link>
                    }
                />
            )}
        </div>
    );
}
