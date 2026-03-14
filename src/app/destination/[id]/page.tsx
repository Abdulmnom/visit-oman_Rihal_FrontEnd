'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getDestinationById, getNearbyDestinations } from '@/lib/data';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePlanner } from '@/contexts/PlannerContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { formatDuration, formatPrice, getMonthName } from '@/lib/utils';
import { CATEGORIES, CROWD_LEVELS, MONTHS } from '@/lib/constants';
import { CategoryBadge } from '@/components/ui/CategoryBadge';
import { CrowdIndicator } from '@/components/ui/CrowdIndicator';
import { FavoriteButton } from '@/components/ui/FavoriteButton';
import { DestinationCard } from '@/components/destination/DestinationCard';
import {
    ArrowLeft,
    Clock,
    MapPin,
    Ticket,
    Building2,
    Calendar,
    Plus,
    Check,
    Navigation,
} from 'lucide-react';

export default function DestinationDetailPage() {
    const params = useParams();
    const id = params.id as string;
    const destination = getDestinationById(id);
    const { language, t } = useLanguage();
    const { addItemToDay, isInPlanner, planner } = usePlanner();

    if (!destination) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-20 text-center">
                <h1 className="text-2xl font-bold">{t('Destination not found', 'الوجهة غير موجودة')}</h1>
                <Link href="/explore" className="text-[var(--color-primary)] mt-4 inline-block hover:underline">
                    {t('Back to Explore', 'العودة للاستكشاف')}
                </Link>
            </div>
        );
    }

    const name = language === 'ar' ? destination.name.ar : destination.name.en;
    const region = language === 'ar' ? destination.region.ar : destination.region.en;
    const company = language === 'ar' ? destination.company.ar : destination.company.en;
    const nearby = getNearbyDestinations(destination, 4);
    const categoryInfo = CATEGORIES.find((c) => c.value === destination.categories[0]);
    const crowdInfo = CROWD_LEVELS.find((c) => c.value === destination.crowd_level);
    const inPlanner = isInPlanner(destination.id);

    const getCategoryGradient = (cat: string) => {
        const g: Record<string, string> = {
            beach: 'from-cyan-400 to-blue-500',
            culture: 'from-purple-400 to-violet-600',
            desert: 'from-amber-400 to-orange-500',
            food: 'from-red-400 to-rose-500',
            mountain: 'from-indigo-400 to-blue-600',
            nature: 'from-emerald-400 to-green-600',
        };
        return g[cat] || 'from-gray-400 to-gray-600';
    };

    return (
        <div>
            {/* Hero Banner */}
            <div className={`relative h-64 sm:h-80 bg-gradient-to-br ${getCategoryGradient(destination.categories[0])}`}>
                <div className="absolute inset-0 opacity-15" style={{
                    backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.2) 1px, transparent 1px)`,
                    backgroundSize: '20px 20px'
                }} />
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[120px] opacity-20">{categoryInfo?.icon || '📍'}</span>
                </div>

                {/* Top bar */}
                <div className="absolute top-0 inset-x-0 p-4 flex items-center justify-between">
                    <Link
                        href="/explore"
                        className="p-2 rounded-xl bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
                    >
                        <ArrowLeft size={20} />
                    </Link>
                    <FavoriteButton destinationId={destination.id} size={22} />
                </div>

                {/* Bottom gradient */}
                <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[var(--color-background)] to-transparent" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10 pb-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Title Card */}
                        <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-6 text-center">
                            <div className="flex flex-wrap gap-2 mb-3 justify-center">
                                {destination.categories.map((cat) => (
                                    <CategoryBadge key={cat} category={cat} size="md" />
                                ))}
                            </div>
                            <h1 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] text-[var(--color-foreground)]">
                                {name}
                            </h1>
                            {language === 'en' && (
                                <p className="text-lg text-[var(--color-muted)] mt-1">{destination.name.ar}</p>
                            )}
                            <div className="flex items-center gap-2 mt-3 text-[var(--color-muted)] justify-center">
                                <MapPin size={16} />
                                <span>{region}</span>
                            </div>
                        </div>

                        {/* Info Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <InfoCard
                                icon={<Ticket size={20} />}
                                label={t('Ticket Price', 'سعر التذكرة')}
                                value={formatPrice(destination.ticket_cost_omr)}
                                color="#D97706"
                                isPrice
                            />
                            <InfoCard
                                icon={<Clock size={20} />}
                                label={t('Duration', 'المدة')}
                                value={formatDuration(destination.avg_visit_duration_minutes)}
                                color="var(--color-culture)"
                            />
                            <InfoCard
                                icon={<Building2 size={20} />}
                                label={t('Operator', 'المشغل')}
                                value={company}
                                color="var(--color-secondary)"
                                small
                            />
                            <div className="rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] p-4">
                                <div className="text-sm text-[var(--color-muted)] mb-2">{t('Crowd Level', 'الازدحام')}</div>
                                <CrowdIndicator level={destination.crowd_level} />
                            </div>
                        </div>

                        {/* Recommended Months */}
                        <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-6">
                            <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] mb-4 flex items-center gap-2">
                                <Calendar size={20} className="text-[var(--color-primary)]" />
                                {t('Best Time to Visit', 'أفضل وقت للزيارة')}
                            </h2>
                            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                                {MONTHS.map((month) => {
                                    const isRecommended = destination.recommended_months.includes(month.value);
                                    return (
                                        <div
                                            key={month.value}
                                            className={`text-center py-2.5 rounded-xl text-sm font-medium transition-colors ${isRecommended
                                                ? 'bg-[var(--color-primary)] text-white'
                                                : 'bg-[var(--color-surface-hover)] text-[var(--color-muted)]'
                                                }`}
                                        >
                                            {month.short}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Map Embed */}
                        <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-6">
                            <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] mb-4 flex items-center gap-2">
                                <Navigation size={20} className="text-[var(--color-primary)]" />
                                {t('Location', 'الموقع')}
                            </h2>
                            <div className="rounded-xl overflow-hidden h-64 bg-[var(--color-surface-hover)]">
                                <iframe
                                    src={`https://www.openstreetmap.org/export/embed.html?bbox=${destination.lng - 0.02},${destination.lat - 0.015},${destination.lng + 0.02},${destination.lat + 0.015}&layer=mapnik&marker=${destination.lat},${destination.lng}`}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 'none' }}
                                    loading="lazy"
                                    title={`Map of ${destination.name.en}`}
                                />
                            </div>
                            <div className="mt-3 text-xs text-[var(--color-muted)]">
                                {t('Coordinates', 'الإحداثيات')}: {destination.lat.toFixed(4)}, {destination.lng.toFixed(4)}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Add to Planner */}
                        <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-6 sticky top-24">
                            <h3 className="text-lg font-bold font-[family-name:var(--font-heading)] mb-4">
                                {t('Add to Trip', 'أضف إلى الرحلة')}
                            </h3>
                            {inPlanner ? (
                                <div className="flex items-center gap-2 text-sm text-[var(--color-nature)] bg-[var(--color-primary-light)] px-4 py-3 rounded-xl">
                                    <Check size={18} />
                                    {t('Added to your plan', 'تمت الإضافة إلى خطتك')}
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    {planner.days.map((day) => (
                                        <button
                                            key={day.id}
                                            onClick={() => addItemToDay(day.id, destination)}
                                            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-[var(--color-primary)] to-[#0E7C6B] text-white hover:shadow-lg hover:shadow-[var(--color-primary)]/20 hover:scale-[1.02] transition-all"
                                        >
                                            <Plus size={16} />
                                            {t(`Add to ${day.label}`, `أضف إلى ${day.label}`)}
                                        </button>
                                    ))}
                                </div>
                            )}
                            <Link
                                href="/planner"
                                className="block mt-3 text-center text-sm text-[var(--color-primary)] hover:underline"
                            >
                                {t('View Full Planner →', 'عرض المخطط الكامل →')}
                            </Link>
                        </div>

                        {/* Quick Info */}
                        <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-6">
                            <h3 className="text-lg font-bold font-[family-name:var(--font-heading)] mb-4">
                                {t('Quick Info', 'معلومات سريعة')}
                            </h3>
                            <ul className="space-y-3 text-sm">
                                <li className="flex justify-between">
                                    <span className="text-[var(--color-muted)]">{t('Region', 'المنطقة')}</span>
                                    <Link href={`/region/${destination.region.en.toLowerCase()}`} className="text-[var(--color-primary)] hover:underline">
                                        {region}
                                    </Link>
                                </li>
                                <li className="flex justify-between">
                                    <span className="text-[var(--color-muted)]">{t('Cost', 'التكلفة')}</span>
                                    <span className="font-bold price-display">{formatPrice(destination.ticket_cost_omr)}</span>
                                </li>
                                <li className="flex justify-between">
                                    <span className="text-[var(--color-muted)]">{t('Duration', 'المدة')}</span>
                                    <span className="font-medium">{formatDuration(destination.avg_visit_duration_minutes)}</span>
                                </li>
                                <li className="flex justify-between">
                                    <span className="text-[var(--color-muted)]">{t('Crowd', 'الازدحام')}</span>
                                    <span className="font-medium" style={{ color: crowdInfo?.color }}>
                                        {crowdInfo?.emoji} {language === 'ar' ? crowdInfo?.labelAr : crowdInfo?.label}
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Nearby Destinations */}
                {nearby.length > 0 && (
                    <div className="mt-20">
                        <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-[var(--color-foreground)] mb-6 text-center">
                            {t('Nearby Destinations', 'وجهات قريبة')}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            {nearby.map((dest) => (
                                <DestinationCard key={dest.id} destination={dest} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function InfoCard({
    icon,
    label,
    value,
    color,
    small = false,
    isPrice = false,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
    color: string;
    small?: boolean;
    isPrice?: boolean;
}) {
    return (
        <div className="rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] p-4 text-center">
            <div className="w-10 h-10 rounded-xl mb-2 flex items-center justify-center mx-auto" style={{ backgroundColor: `${color}15`, color }}>
                {icon}
            </div>
            <div className="text-sm text-[var(--color-muted)]">{label}</div>
            <div className={`font-bold ${isPrice ? 'price-display text-xl' : `text-[var(--color-foreground)] ${small ? 'text-xs' : 'text-lg'}`} mt-0.5 line-clamp-2`}>
                {value}
            </div>
        </div>
    );
}
