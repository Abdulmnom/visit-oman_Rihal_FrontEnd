'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { getDestinationsByRegion, getUniqueRegions } from '@/lib/data';
import { RegionSlug } from '@/types';
import { DestinationCard } from '@/components/destination/DestinationCard';
import { CATEGORIES, CROWD_LEVELS } from '@/lib/constants';
import { formatPrice } from '@/lib/utils';
import { MapPin, ArrowLeft } from 'lucide-react';

export default function RegionPage() {
    const params = useParams();
    const slug = params.slug as RegionSlug;
    const { t, language } = useLanguage();

    const regions = getUniqueRegions();
    const regionInfo = regions.find((r) => r.slug === slug);
    const destinations = getDestinationsByRegion(slug);

    if (!regionInfo) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-20 text-center">
                <h1 className="text-2xl font-bold">{t('Region not found', 'المنطقة غير موجودة')}</h1>
                <Link href="/explore" className="text-[var(--color-primary)] mt-4 inline-block">
                    {t('Back to Explore', 'العودة للاستكشاف')}
                </Link>
            </div>
        );
    }

    const regionName = language === 'ar' ? regionInfo.ar : regionInfo.en;
    const freeCount = destinations.filter((d) => d.ticket_cost_omr === 0).length;
    const avgCost = destinations.length > 0
        ? destinations.reduce((s, d) => s + d.ticket_cost_omr, 0) / destinations.length
        : 0;
    const peaceCount = destinations.filter((d) => d.crowd_level <= 2).length;

    // Category distribution
    const catCounts: Record<string, number> = {};
    destinations.forEach((d) =>
        d.categories.forEach((c) => (catCounts[c] = (catCounts[c] || 0) + 1))
    );

    return (
        <div>
            {/* Hero */}
            <div className="relative h-52 sm:h-64 bg-gradient-to-br from-[var(--color-primary-dark)] to-[var(--color-primary)]">
                <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                    backgroundSize: '16px 16px',
                }} />
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end pb-8">
                    <Link
                        href="/explore"
                        className="absolute top-6 left-6 sm:left-8 p-2 rounded-xl bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
                    >
                        <ArrowLeft size={20} />
                    </Link>
                    <div className="text-center">
                        <div className="flex items-center gap-2 text-white/70 text-sm mb-2 justify-center">
                            <MapPin size={14} />
                            {t('Region', 'المنطقة')}
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold text-white font-[family-name:var(--font-heading)]">
                            {regionName}
                        </h1>
                        <p className="text-white/70 mt-1">
                            {destinations.length} {t('destinations', 'وجهة')}
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 mb-14">
                    <StatCard label={t('Total', 'الإجمالي')} value={destinations.length.toString()} />
                    <StatCard label={t('Free', 'مجاني')} value={freeCount.toString()} />
                    <StatCard label={t('Avg Price', 'متوسط السعر')} value={formatPrice(avgCost)} />
                    <StatCard label={t('Hidden Gems', 'جواهر')} value={peaceCount.toString()} />
                </div>

                {/* Category chips */}
                <div className="flex flex-wrap gap-3 mb-12 justify-center">
                    {Object.entries(catCounts).sort((a, b) => b[1] - a[1]).map(([cat, count]) => {
                        const info = CATEGORIES.find((c) => c.value === cat);
                        return (
                            <span key={cat} className="px-3 py-1.5 rounded-full text-xs font-medium bg-[var(--color-surface)] border border-[var(--color-border)]">
                                {info?.icon} {language === 'ar' ? info?.labelAr : info?.label} ({count})
                            </span>
                        );
                    })}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {destinations.map((dest, i) => (
                        <DestinationCard key={dest.id} destination={dest} index={i} />
                    ))}
                </div>
            </div>
        </div>
    );
}

function StatCard({ label, value }: { label: string; value: string }) {
    return (
        <div className="rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] p-4 text-center">
            <div className="text-2xl font-bold font-[family-name:var(--font-heading)]">{value}</div>
            <div className="text-xs text-[var(--color-muted)] mt-0.5">{label}</div>
        </div>
    );
}
