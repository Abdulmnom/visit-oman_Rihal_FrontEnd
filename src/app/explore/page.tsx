'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { getAllDestinations } from '@/lib/data';
import { applyFilters } from '@/lib/filters';
import { Category, CrowdLevel, RegionSlug, FilterState, DEFAULT_FILTERS, SortOption } from '@/types';
import { useDebounce } from '@/hooks/useDebounce';
import { SearchBar } from '@/components/ui/SearchBar';
import { FilterPanel } from '@/components/explore/FilterPanel';
import { DestinationCard } from '@/components/destination/DestinationCard';
import { EmptyState } from '@/components/ui/Skeleton';
import { Grid3X3, List, SlidersHorizontal, X, Shuffle, SearchX } from 'lucide-react';

export default function ExplorePage() {
    return (
        <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-8"><div className="shimmer h-96 rounded-2xl" /></div>}>
            <ExploreContent />
        </Suspense>
    );
}

function ExploreContent() {
    const { t } = useLanguage();
    const allDestinations = getAllDestinations();
    const searchParams = useSearchParams();

    // Initialize filters from URL params
    const initialCategories = (searchParams.get('categories')?.split(',').filter(Boolean) || []) as Category[];

    const [search, setSearch] = useState('');
    const [categories, setCategories] = useState<Category[]>(initialCategories);
    const [regions, setRegions] = useState<RegionSlug[]>([]);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 20]);
    const [crowdLevels, setCrowdLevels] = useState<CrowdLevel[]>([]);
    const [months, setMonths] = useState<number[]>([]);
    const [sort, setSort] = useState<SortOption>('name');
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    const debouncedSearch = useDebounce(search, 300);

    const filters: FilterState = useMemo(
        () => ({
            categories,
            regions,
            priceRange,
            crowdLevels,
            months,
            search: debouncedSearch,
            sort,
        }),
        [categories, regions, priceRange, crowdLevels, months, debouncedSearch, sort]
    );

    const filteredDestinations = useMemo(
        () => applyFilters(allDestinations, filters),
        [allDestinations, filters]
    );

    const clearFilters = () => {
        setSearch('');
        setCategories([]);
        setRegions([]);
        setPriceRange([0, 20]);
        setCrowdLevels([]);
        setMonths([]);
        setSort('name');
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] text-[var(--color-foreground)]">
                    {t('Explore Destinations', 'استكشف الوجهات')}
                </h1>
                <p className="text-[var(--color-muted)] mt-2">
                    {t(
                        'Discover your perfect destination in Oman',
                        'اكتشف وجهتك المثالية في عمان'
                    )}
                </p>
            </div>

            {/* Search + Sort bar */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <div className="flex-1">
                    <SearchBar value={search} onChange={setSearch} />
                </div>
                <div className="flex gap-2">
                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value as SortOption)}
                        className="px-3 py-2.5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-sm text-[var(--color-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30"
                    >
                        <option value="name">{t('Name (A-Z)', 'الاسم (أ-ي)')}</option>
                        <option value="price-asc">{t('Price: Low to High', 'السعر: من الأقل')}</option>
                        <option value="price-desc">{t('Price: High to Low', 'السعر: من الأعلى')}</option>
                        <option value="crowd-asc">{t('Least Crowded', 'الأقل ازدحاماً')}</option>
                        <option value="crowd-desc">{t('Most Crowded', 'الأكثر ازدحاماً')}</option>
                        <option value="duration">{t('Duration', 'المدة')}</option>
                    </select>

                    {/* Mobile filter toggle */}
                    <button
                        onClick={() => setShowMobileFilters(!showMobileFilters)}
                        className="lg:hidden px-3 py-2.5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-sm text-[var(--color-foreground)] flex items-center gap-2"
                    >
                        <SlidersHorizontal size={16} />
                        {t('Filters', 'تصفية')}
                    </button>
                </div>
            </div>

            <div className="flex gap-8">
                {/* Desktop Sidebar */}
                <aside className="hidden lg:block w-72 shrink-0">
                    <div className="sticky top-24 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-5">
                        <FilterPanel
                            categories={categories}
                            regions={regions}
                            priceRange={priceRange}
                            crowdLevels={crowdLevels}
                            months={months}
                            onCategoriesChange={setCategories}
                            onRegionsChange={setRegions}
                            onPriceRangeChange={setPriceRange}
                            onCrowdLevelsChange={setCrowdLevels}
                            onMonthsChange={setMonths}
                            onClear={clearFilters}
                            totalResults={filteredDestinations.length}
                        />
                    </div>
                </aside>

                {/* Mobile Filter Panel */}
                {showMobileFilters && (
                    <div className="fixed inset-0 z-50 lg:hidden">
                        <div className="absolute inset-0 bg-black/40" onClick={() => setShowMobileFilters(false)} />
                        <div className="absolute bottom-0 inset-x-0 max-h-[85vh] overflow-y-auto rounded-t-3xl bg-[var(--color-surface)] p-6 animate-slide-up">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-bold font-[family-name:var(--font-heading)]">
                                    {t('Filters', 'التصفية')}
                                </h2>
                                <button
                                    onClick={() => setShowMobileFilters(false)}
                                    className="p-2 rounded-lg hover:bg-[var(--color-surface-hover)]"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                            <FilterPanel
                                categories={categories}
                                regions={regions}
                                priceRange={priceRange}
                                crowdLevels={crowdLevels}
                                months={months}
                                onCategoriesChange={setCategories}
                                onRegionsChange={setRegions}
                                onPriceRangeChange={setPriceRange}
                                onCrowdLevelsChange={setCrowdLevels}
                                onMonthsChange={setMonths}
                                onClear={clearFilters}
                                totalResults={filteredDestinations.length}
                            />
                            <button
                                onClick={() => setShowMobileFilters(false)}
                                className="w-full mt-6 py-3 bg-[var(--color-primary)] text-white font-semibold rounded-xl"
                            >
                                {t(`Show ${filteredDestinations.length} Results`, `عرض ${filteredDestinations.length} نتائج`)}
                            </button>
                        </div>
                    </div>
                )}

                {/* Results Grid */}
                <div className="flex-1 min-w-0">
                    {filteredDestinations.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                            {filteredDestinations.map((dest, i) => (
                                <DestinationCard key={dest.id} destination={dest} index={i} />
                            ))}
                        </div>
                    ) : (
                        <EmptyState
                            icon={<SearchX size={32} />}
                            title={t('No destinations found', 'لم يتم العثور على وجهات')}
                            description={t(
                                'Try adjusting your filters or search query',
                                'حاول تعديل الفلاتر أو كلمة البحث'
                            )}
                            action={
                                <button
                                    onClick={clearFilters}
                                    className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg text-sm font-medium"
                                >
                                    {t('Clear Filters', 'مسح الفلاتر')}
                                </button>
                            }
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
