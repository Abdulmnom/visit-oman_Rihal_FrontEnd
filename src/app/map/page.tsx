'use client';

import React, { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { getAllDestinations } from '@/lib/data';
import { applyFilters } from '@/lib/filters';
import { useLanguage } from '@/contexts/LanguageContext';
import { Category, CrowdLevel, RegionSlug, FilterState, DEFAULT_FILTERS } from '@/types';
import { CATEGORIES } from '@/lib/constants';
import { SearchBar } from '@/components/ui/SearchBar';
import { useDebounce } from '@/hooks/useDebounce';
import { Layers, List } from 'lucide-react';

const MapContainer = dynamic(
    () => import('react-leaflet').then((mod) => mod.MapContainer),
    { ssr: false }
);
const TileLayer = dynamic(
    () => import('react-leaflet').then((mod) => mod.TileLayer),
    { ssr: false }
);
const Marker = dynamic(
    () => import('react-leaflet').then((mod) => mod.Marker),
    { ssr: false }
);
const Popup = dynamic(
    () => import('react-leaflet').then((mod) => mod.Popup),
    { ssr: false }
);

export default function MapPage() {
    const { t, language } = useLanguage();
    const allDestinations = getAllDestinations();
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [isClient, setIsClient] = React.useState(false);

    React.useEffect(() => {
        setIsClient(true);
    }, []);

    const debouncedSearch = useDebounce(search, 300);

    const filters: FilterState = useMemo(
        () => ({
            ...DEFAULT_FILTERS,
            search: debouncedSearch,
            categories: selectedCategory ? [selectedCategory] : [],
        }),
        [debouncedSearch, selectedCategory]
    );

    const filteredDestinations = useMemo(
        () => applyFilters(allDestinations, filters),
        [allDestinations, filters]
    );

    // Oman center
    const center: [number, number] = [22.5, 57.5];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center mb-6">
                <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)] text-[var(--color-foreground)]">
                    {t('Map View', 'عرض الخريطة')}
                </h1>
                <p className="text-[var(--color-muted)] mt-1">
                    {t(
                        `Showing ${filteredDestinations.length} destinations on the map`,
                        `عرض ${filteredDestinations.length} وجهة على الخريطة`
                    )}
                </p>
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4 items-center justify-center">
                <div className="flex-1 max-w-md w-full">
                    <SearchBar value={search} onChange={setSearch} />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-1 justify-center">
                    <button
                        onClick={() => setSelectedCategory(null)}
                        className={`px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${!selectedCategory
                                ? 'bg-[var(--color-primary)] text-white'
                                : 'bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-muted)]'
                            }`}
                    >
                        {t('All', 'الكل')}
                    </button>
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat.value}
                            onClick={() => setSelectedCategory(selectedCategory === cat.value ? null : cat.value)}
                            className={`px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${selectedCategory === cat.value
                                    ? 'bg-[var(--color-primary)] text-white'
                                    : 'bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-muted)]'
                                }`}
                        >
                            {cat.icon} {language === 'ar' ? cat.labelAr : cat.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Map */}
            <div className="rounded-2xl overflow-hidden border border-[var(--color-border)] h-[70vh] bg-[var(--color-surface-hover)]">
                {isClient && (
                    <>
                        <link
                            rel="stylesheet"
                            href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
                            crossOrigin=""
                        />
                        <MapContainer
                            center={center}
                            zoom={7}
                            scrollWheelZoom={true}
                            style={{ height: '100%', width: '100%' }}
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            {filteredDestinations.map((dest) => (
                                <Marker key={dest.id} position={[dest.lat, dest.lng]}>
                                    <Popup>
                                        <div className="min-w-[200px]">
                                            <h3 className="font-bold text-sm mb-1">
                                                {language === 'ar' ? dest.name.ar : dest.name.en}
                                            </h3>
                                            <p className="text-xs text-gray-500 mb-1">
                                                {language === 'ar' ? dest.region.ar : dest.region.en}
                                            </p>
                                            <div className="flex gap-1 mb-2">
                                                {dest.categories.map((cat) => {
                                                    const info = CATEGORIES.find((c) => c.value === cat);
                                                    return (
                                                        <span key={cat} className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">
                                                            {info?.icon} {info?.label}
                                                        </span>
                                                    );
                                                })}
                                            </div>
                                            <a
                                                href={`/destination/${dest.id}`}
                                                className="text-xs text-blue-600 hover:underline"
                                            >
                                                View Details →
                                            </a>
                                        </div>
                                    </Popup>
                                </Marker>
                            ))}
                        </MapContainer>
                    </>
                )}
            </div>
        </div>
    );
}
