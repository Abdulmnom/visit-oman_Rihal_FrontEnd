'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getHiddenGems } from '@/lib/data';
import { DestinationCard } from '@/components/destination/DestinationCard';
import { Gem, Sparkles } from 'lucide-react';

export default function HiddenGemsPage() {
    const { t } = useLanguage();
    const gems = getHiddenGems();

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] text-sm mb-4">
                    <Gem size={16} />
                    {t('Low Crowds · High Beauty', 'أقل ازدحاماً · أكثر جمالاً')}
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] text-[var(--color-foreground)]">
                    {t('Hidden Gems', 'الجواهر المخفية')}
                </h1>
                <p className="text-[var(--color-muted)] mt-2 max-w-lg mx-auto">
                    {t(
                        'Discover peaceful, less-visited destinations with crowd levels of 1-2',
                        'اكتشف وجهات هادئة وأقل زيارة بمستوى ازدحام 1-2'
                    )}
                </p>
                <div className="mt-4 inline-flex items-center gap-1 text-sm text-[var(--color-muted)]">
                    <Sparkles size={14} className="text-[var(--color-secondary)]" />
                    {gems.length} {t('hidden gems found', 'جوهرة مخفية')}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {gems.map((dest, i) => (
                    <DestinationCard key={dest.id} destination={dest} index={i} />
                ))}
            </div>
        </div>
    );
}
