'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePlanner } from '@/contexts/PlannerContext';
import { getAllDestinations } from '@/lib/data';
import { formatDuration, formatPrice, calculateTotalCost, calculateTotalDuration } from '@/lib/utils';
import { CATEGORIES } from '@/lib/constants';
import { SearchBar } from '@/components/ui/SearchBar';
import { useDebounce } from '@/hooks/useDebounce';
import {
    Plus,
    Trash2,
    GripVertical,
    Calendar,
    Clock,
    Ticket,
    MapPin,
    X,
    ChevronDown,
    ChevronUp,
} from 'lucide-react';

export default function PlannerPage() {
    const { t, language } = useLanguage();
    const { planner, addDay, removeDay, addItemToDay, removeItem, setTitle, clearPlanner } =
        usePlanner();
    const [search, setSearch] = useState('');
    const [showAddPanel, setShowAddPanel] = useState(false);
    const debouncedSearch = useDebounce(search, 300);

    const allDestinations = getAllDestinations();
    const searchResults = debouncedSearch.trim()
        ? allDestinations.filter(
            (d) =>
                d.name.en.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                d.name.ar.includes(debouncedSearch)
        ).slice(0, 10)
        : [];

    const allItems = planner.days.flatMap((d) => d.items);
    const totalCost = calculateTotalCost(allItems.map((i) => i.destination));
    const totalDuration = calculateTotalDuration(allItems.map((i) => i.destination));

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="text-center mb-12 section-divider">
                <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)] text-[var(--color-foreground)] heading-accent">
                    {t('Travel Planner', 'مخطط الرحلة')}
                </h1>
                <input
                    type="text"
                    value={planner.title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-1 text-lg text-[var(--color-muted)] bg-transparent border-none outline-none focus:text-[var(--color-foreground)] w-full text-center"
                    placeholder={t('Trip name...', 'اسم الرحلة...')}
                />
                <div className="flex gap-2 justify-center mt-4">
                    <button
                        onClick={() => setShowAddPanel(!showAddPanel)}
                        className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-xl text-sm font-medium flex items-center gap-1.5 hover:opacity-90 transition-opacity"
                    >
                        <Plus size={16} />
                        {t('Add Destination', 'أضف وجهة')}
                    </button>
                    <button
                        onClick={addDay}
                        className="px-4 py-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl text-sm font-medium flex items-center gap-1.5 hover:bg-[var(--color-surface-hover)] transition-colors"
                    >
                        <Calendar size={16} />
                        {t('Add Day', 'أضف يوم')}
                    </button>
                </div>
            </div>

            {/* Add Destination Panel */}
            {showAddPanel && (
                <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-6 mb-6 animate-fade-in">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold font-[family-name:var(--font-heading)]">
                            {t('Search & Add', 'ابحث وأضف')}
                        </h3>
                        <button onClick={() => setShowAddPanel(false)} className="p-1 rounded hover:bg-[var(--color-surface-hover)]">
                            <X size={18} />
                        </button>
                    </div>
                    <SearchBar value={search} onChange={setSearch} />
                    {searchResults.length > 0 && (
                        <ul className="mt-3 space-y-1 max-h-60 overflow-y-auto">
                            {searchResults.map((dest) => (
                                <li key={dest.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-[var(--color-surface-hover)] transition-colors">
                                    <div>
                                        <div className="font-medium text-sm">
                                            {language === 'ar' ? dest.name.ar : dest.name.en}
                                        </div>
                                        <div className="text-xs text-[var(--color-muted)]">
                                            {language === 'ar' ? dest.region.ar : dest.region.en} · {formatPrice(dest.ticket_cost_omr)}
                                        </div>
                                    </div>
                                    <div className="flex gap-1">
                                        {planner.days.map((day) => (
                                            <button
                                                key={day.id}
                                                onClick={() => addItemToDay(day.id, dest)}
                                                className="px-2 py-1 text-[10px] rounded-lg bg-[var(--color-primary)]/10 text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-colors"
                                            >
                                                + {day.label}
                                            </button>
                                        ))}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}

            {/* Summary */}
            <div className="grid grid-cols-3 gap-5 mb-12">
                <div className="rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] p-4 text-center">
                    <MapPin size={20} className="mx-auto mb-1 text-[var(--color-primary)]" />
                    <div className="text-2xl font-bold font-[family-name:var(--font-heading)]">{allItems.length}</div>
                    <div className="text-xs text-[var(--color-muted)]">{t('Destinations', 'وجهات')}</div>
                </div>
                <div className="rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] p-4 text-center">
                    <Clock size={20} className="mx-auto mb-1 text-[var(--color-culture)]" />
                    <div className="text-2xl font-bold font-[family-name:var(--font-heading)]">{formatDuration(totalDuration)}</div>
                    <div className="text-xs text-[var(--color-muted)]">{t('Total Time', 'الوقت الكلي')}</div>
                </div>
                <div className="rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] p-4 text-center">
                    <Ticket size={20} className="mx-auto mb-1 text-[var(--color-secondary)]" />
                    <div className="text-2xl font-bold font-[family-name:var(--font-heading)]">{formatPrice(totalCost)}</div>
                    <div className="text-xs text-[var(--color-muted)]">{t('Total Cost', 'التكلفة الكلية')}</div>
                </div>
            </div>

            {/* Days */}
            <div className="space-y-8">
                {planner.days.map((day, dayIndex) => {
                    const dayCost = calculateTotalCost(day.items.map((i) => i.destination));
                    const dayDuration = calculateTotalDuration(day.items.map((i) => i.destination));
                    return (
                        <div key={day.id} className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] overflow-hidden">
                            {/* Day Header */}
                            <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)] bg-[var(--color-surface-hover)]/50">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-[var(--color-primary)] text-white flex items-center justify-center text-sm font-bold">
                                        {dayIndex + 1}
                                    </div>
                                    <div>
                                        <h3 className="font-bold font-[family-name:var(--font-heading)]">{day.label}</h3>
                                        <span className="text-xs text-[var(--color-muted)]">
                                            {day.items.length} {t('stops', 'محطات')} · {formatDuration(dayDuration)} · {formatPrice(dayCost)}
                                        </span>
                                    </div>
                                </div>
                                {planner.days.length > 1 && (
                                    <button
                                        onClick={() => removeDay(day.id)}
                                        className="p-2 rounded-lg text-[var(--color-muted)] hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                )}
                            </div>

                            {/* Items */}
                            <div className="p-4">
                                {day.items.length === 0 ? (
                                    <div className="text-center py-8 text-sm text-[var(--color-muted)]">
                                        {t('No destinations added yet', 'لم يتم إضافة وجهات بعد')}
                                    </div>
                                ) : (
                                    <ul className="space-y-2">
                                        {day.items.map((item, idx) => {
                                            const catInfo = CATEGORIES.find((c) => c.value === item.destination.categories[0]);
                                            return (
                                                <li key={item.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-[var(--color-surface-hover)] transition-colors group">
                                                    <div className="text-[var(--color-muted)] opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <GripVertical size={16} />
                                                    </div>
                                                    <span className="text-lg">{catInfo?.icon}</span>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="font-medium text-sm truncate">
                                                            {language === 'ar' ? item.destination.name.ar : item.destination.name.en}
                                                        </div>
                                                        <div className="text-xs text-[var(--color-muted)]">
                                                            {formatDuration(item.destination.avg_visit_duration_minutes)} · {formatPrice(item.destination.ticket_cost_omr)}
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={() => removeItem(day.id, item.id)}
                                                        className="p-1.5 rounded-lg text-[var(--color-muted)] opacity-0 group-hover:opacity-100 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                                                    >
                                                        <X size={14} />
                                                    </button>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Clear */}
            {allItems.length > 0 && (
                <div className="mt-8 text-center">
                    <button
                        onClick={clearPlanner}
                        className="text-sm text-[var(--color-muted)] hover:text-red-500 transition-colors"
                    >
                        {t('Clear entire plan', 'مسح الخطة')}
                    </button>
                </div>
            )}
        </div>
    );
}
