'use client';

import React from 'react';
import { Category, CrowdLevel, RegionSlug } from '@/types';
import { CATEGORIES, REGIONS, CROWD_LEVELS, MONTHS } from '@/lib/constants';
import { useLanguage } from '@/contexts/LanguageContext';
import { X, SlidersHorizontal } from 'lucide-react';

interface FilterPanelProps {
    categories: Category[];
    regions: RegionSlug[];
    priceRange: [number, number];
    crowdLevels: CrowdLevel[];
    months: number[];
    onCategoriesChange: (categories: Category[]) => void;
    onRegionsChange: (regions: RegionSlug[]) => void;
    onPriceRangeChange: (range: [number, number]) => void;
    onCrowdLevelsChange: (levels: CrowdLevel[]) => void;
    onMonthsChange: (months: number[]) => void;
    onClear: () => void;
    totalResults: number;
}

export function FilterPanel({
    categories,
    regions,
    priceRange,
    crowdLevels,
    months,
    onCategoriesChange,
    onRegionsChange,
    onPriceRangeChange,
    onCrowdLevelsChange,
    onMonthsChange,
    onClear,
    totalResults,
}: FilterPanelProps) {
    const { t, language } = useLanguage();

    const hasFilters =
        categories.length > 0 ||
        regions.length > 0 ||
        crowdLevels.length > 0 ||
        months.length > 0 ||
        priceRange[0] > 0 ||
        priceRange[1] < 20;

    const toggleCategory = (cat: Category) => {
        onCategoriesChange(
            categories.includes(cat)
                ? categories.filter((c) => c !== cat)
                : [...categories, cat]
        );
    };

    const toggleRegion = (region: RegionSlug) => {
        onRegionsChange(
            regions.includes(region)
                ? regions.filter((r) => r !== region)
                : [...regions, region]
        );
    };

    const toggleCrowdLevel = (level: CrowdLevel) => {
        onCrowdLevelsChange(
            crowdLevels.includes(level)
                ? crowdLevels.filter((l) => l !== level)
                : [...crowdLevels, level]
        );
    };

    const toggleMonth = (month: number) => {
        onMonthsChange(
            months.includes(month)
                ? months.filter((m) => m !== month)
                : [...months, month]
        );
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <SlidersHorizontal size={18} className="text-[var(--color-primary)]" />
                    <h3 className="font-semibold text-[var(--color-foreground)] font-[family-name:var(--font-heading)]">
                        {t('Filters', 'التصفية')}
                    </h3>
                </div>
                {hasFilters && (
                    <button
                        onClick={onClear}
                        className="text-xs text-[var(--color-primary)] hover:underline flex items-center gap-1"
                    >
                        <X size={12} />
                        {t('Clear all', 'مسح الكل')}
                    </button>
                )}
            </div>

            {/* Results count */}
            <div className="text-sm text-[var(--color-muted)]">
                {totalResults} {t('destinations found', 'وجهة موجودة')}
            </div>

            {/* Category Filter */}
            <FilterSection title={t('Category', 'الفئة')}>
                <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat.value}
                            onClick={() => toggleCategory(cat.value)}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${categories.includes(cat.value)
                                    ? 'bg-[var(--color-primary)] text-white shadow-sm'
                                    : 'bg-[var(--color-surface-hover)] text-[var(--color-muted)] hover:text-[var(--color-foreground)]'
                                }`}
                        >
                            {cat.icon} {language === 'ar' ? cat.labelAr : cat.label}
                        </button>
                    ))}
                </div>
            </FilterSection>

            {/* Region Filter */}
            <FilterSection title={t('Region', 'المنطقة')}>
                <div className="flex flex-wrap gap-2">
                    {REGIONS.map((region) => (
                        <button
                            key={region.value}
                            onClick={() => toggleRegion(region.value)}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${regions.includes(region.value)
                                    ? 'bg-[var(--color-primary)] text-white shadow-sm'
                                    : 'bg-[var(--color-surface-hover)] text-[var(--color-muted)] hover:text-[var(--color-foreground)]'
                                }`}
                        >
                            {language === 'ar' ? region.labelAr : region.label}
                        </button>
                    ))}
                </div>
            </FilterSection>

            {/* Price Range */}
            <FilterSection title={t('Ticket Price (OMR)', 'سعر التذكرة (ر.ع)')}>
                <div className="space-y-2">
                    <input
                        type="range"
                        min={0}
                        max={20}
                        step={0.5}
                        value={priceRange[1]}
                        onChange={(e) => onPriceRangeChange([priceRange[0], parseFloat(e.target.value)])}
                        className="w-full"
                    />
                    <div className="flex justify-between text-xs text-[var(--color-muted)]">
                        <span>{t('Free', 'مجاني')}</span>
                        <span>{priceRange[1]} OMR</span>
                    </div>
                </div>
            </FilterSection>

            {/* Crowd Level */}
            <FilterSection title={t('Crowd Level', 'مستوى الازدحام')}>
                <div className="flex flex-wrap gap-2">
                    {CROWD_LEVELS.map((crowd) => (
                        <button
                            key={crowd.value}
                            onClick={() => toggleCrowdLevel(crowd.value)}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${crowdLevels.includes(crowd.value)
                                    ? 'text-white shadow-sm'
                                    : 'bg-[var(--color-surface-hover)] text-[var(--color-muted)] hover:text-[var(--color-foreground)]'
                                }`}
                            style={
                                crowdLevels.includes(crowd.value)
                                    ? { backgroundColor: crowd.color }
                                    : undefined
                            }
                        >
                            {crowd.emoji} {language === 'ar' ? crowd.labelAr : crowd.label}
                        </button>
                    ))}
                </div>
            </FilterSection>

            {/* Month Filter */}
            <FilterSection title={t('Recommended Month', 'الشهر الموصى به')}>
                <div className="grid grid-cols-4 gap-1.5">
                    {MONTHS.map((month) => (
                        <button
                            key={month.value}
                            onClick={() => toggleMonth(month.value)}
                            className={`px-2 py-1.5 rounded-lg text-xs font-medium transition-all ${months.includes(month.value)
                                    ? 'bg-[var(--color-primary)] text-white shadow-sm'
                                    : 'bg-[var(--color-surface-hover)] text-[var(--color-muted)] hover:text-[var(--color-foreground)]'
                                }`}
                        >
                            {month.short}
                        </button>
                    ))}
                </div>
            </FilterSection>
        </div>
    );
}

function FilterSection({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div>
            <h4 className="text-sm font-medium text-[var(--color-foreground)] mb-2.5">{title}</h4>
            {children}
        </div>
    );
}
