'use client';

import React, { useState, useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getDestinationsByMonth } from '@/lib/data';
import { MONTHS } from '@/lib/constants';
import { DestinationCard } from '@/components/destination/DestinationCard';
import { Calendar } from 'lucide-react';

export default function BestTimePage() {
    const { t, language } = useLanguage();
    const currentMonth = new Date().getMonth() + 1;
    const [selectedMonth, setSelectedMonth] = useState(currentMonth);

    const destinations = useMemo(
        () => getDestinationsByMonth(selectedMonth),
        [selectedMonth]
    );

    const monthInfo = MONTHS.find((m) => m.value === selectedMonth);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center mb-14 section-divider">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-sm mb-4">
                    <Calendar size={16} />
                    {t('Seasonal Recommendations', 'توصيات موسمية')}
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] text-[var(--color-foreground)] heading-accent">
                    {t('Best Time to Visit', 'أفضل وقت للزيارة')}
                </h1>
                <p className="text-[var(--color-muted)] mt-2 max-w-lg mx-auto">
                    {t(
                        'Discover which destinations are perfect for each month of the year',
                        'اكتشف الوجهات المثالية لكل شهر من أشهر السنة'
                    )}
                </p>
            </div>

            {/* Month Selector */}
            <div className="flex justify-center gap-3 flex-wrap mb-12">
                {MONTHS.map((month) => (
                    <button
                        key={month.value}
                        onClick={() => setSelectedMonth(month.value)}
                        className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${selectedMonth === month.value
                                ? 'bg-[var(--color-primary)] text-white shadow-lg shadow-[var(--color-primary)]/20 scale-105'
                                : 'bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-muted)] hover:text-[var(--color-foreground)] hover:border-[var(--color-primary)]'
                            }`}
                    >
                        {language === 'ar' ? month.labelAr : month.short}
                    </button>
                ))}
            </div>

            {/* Selected Month Header */}
            <div className="text-center mb-10">
                <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)]">
                    {language === 'ar' ? monthInfo?.labelAr : monthInfo?.label}
                </h2>
                <p className="text-[var(--color-muted)] mt-1">
                    {destinations.length} {t('recommended destinations', 'وجهة موصى بها')}
                </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {destinations.map((dest, i) => (
                    <DestinationCard key={dest.id} destination={dest} index={i} />
                ))}
            </div>
        </div>
    );
}
