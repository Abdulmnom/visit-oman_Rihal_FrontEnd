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
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <SlidersHorizontal size={18} className="text-[var(--color-primary)]" />
                    <h3 className="font-semibold text-lg text-[var(--color-foreground)] font-[family-name:var(--font-heading)]">
                        {t('Filters', 'التصفية')}
                    </h3>
                </div>
                {hasFilters && (
                    <button
                        onClick={onClear}
                        className="text-sm text-[var(--color-primary)] hover:underline flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-[var(--color-primary)]/10 transition-colors"
                    >
                        <X size={14} />
                        {t('Clear all', 'مسح الكل')}
                    </button>
                )}
            </div>

            {/* Results count */}
            <div className="text-sm text-[var(--color-muted)] font-medium bg-[var(--color-surface-hover)] px-4 py-2.5 rounded-xl">
                🎯 {totalResults} {t('destinations found', 'وجهة موجودة')}
            </div>

            <div className="gradient-separator" />

            {/* Category Filter */}
            <FilterSection title={t('Category', 'الفئة')} icon="📂">
                <div className="flex flex-wrap gap-3">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat.value}
                            onClick={() => toggleCategory(cat.value)}
                            className={`chip-button ${categories.includes(cat.value) ? 'active' : ''}`}
                        >
                            {cat.icon} {language === 'ar' ? cat.labelAr : cat.label}
                        </button>
                    ))}
                </div>
            </FilterSection>

            {/* Region Filter */}
            <FilterSection title={t('Region', 'المنطقة')} icon="📍">
                <div className="flex flex-wrap gap-3">
                    {REGIONS.map((region) => (
                        <button
                            key={region.value}
                            onClick={() => toggleRegion(region.value)}
                            className={`chip-button ${regions.includes(region.value) ? 'active' : ''}`}
                        >
                            {language === 'ar' ? region.labelAr : region.label}
                        </button>
                    ))}
                </div>
            </FilterSection>

            {/* Price Range */}
            <FilterSection title={t('Ticket Price (OMR)', 'سعر التذكرة (ر.ع)')} icon="🎫">
                <div className="space-y-3">
                    <input
                        type="range"
                        min={0}
                        max={20}
                        step={0.5}
                        value={priceRange[1]}
                        onChange={(e) => onPriceRangeChange([priceRange[0], parseFloat(e.target.value)])}
                        className="w-full"
                    />
                    <div className="flex justify-between text-sm text-[var(--color-muted)] font-medium">
                        <span>{t('Free', 'مجاني')}</span>
                        <span className="font-bold text-[var(--color-foreground)]">{priceRange[1]} OMR</span>
                    </div>
                </div>
            </FilterSection>

            {/* Crowd Level */}
            <FilterSection title={t('Crowd Level', 'مستوى الازدحام')} icon="👥">
                <div className="flex flex-wrap gap-3">
                    {CROWD_LEVELS.map((crowd) => (
                        <button
                            key={crowd.value}
                            onClick={() => toggleCrowdLevel(crowd.value)}
                            className={`chip-button ${crowdLevels.includes(crowd.value) ? '' : ''}`}
                            style={
                                crowdLevels.includes(crowd.value)
                                    ? { backgroundColor: crowd.color, color: 'white', boxShadow: `0 2px 12px ${crowd.color}40`, transform: 'translateY(-1px)' }
                                    : undefined
                            }
                        >
                            {crowd.emoji} {language === 'ar' ? crowd.labelAr : crowd.label}
                        </button>
                    ))}
                </div>
            </FilterSection>

            {/* Month Filter */}
            <FilterSection title={t('Recommended Month', 'الشهر الموصى به')} icon="📅">
                <div className="grid grid-cols-4 gap-2.5">
                    {MONTHS.map((month) => (
                        <button
                            key={month.value}
                            onClick={() => toggleMonth(month.value)}
                            className={`chip-button justify-center ${months.includes(month.value) ? 'active' : ''}`}
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
    icon,
    children,
}: {
    title: string;
    icon?: string;
    children: React.ReactNode;
}) {
    return (
        <div className="filter-section-card">
            <h4 className="text-sm font-bold text-[var(--color-foreground)] mb-4 flex items-center gap-2">
                {icon && <span className="text-base">{icon}</span>}
                {title}
            </h4>
            {children}
        </div>
    );
}
