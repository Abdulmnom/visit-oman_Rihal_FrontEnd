'use client';

import React from 'react';
import { CrowdLevel } from '@/types';
import { CROWD_LEVELS } from '@/lib/constants';
import { useLanguage } from '@/contexts/LanguageContext';

interface CrowdIndicatorProps {
    level: CrowdLevel;
    compact?: boolean;
    showLabel?: boolean;
}

export function CrowdIndicator({ level, compact = false, showLabel = true }: CrowdIndicatorProps) {
    const { language } = useLanguage();
    const info = CROWD_LEVELS.find((c) => c.value === level);
    if (!info) return null;

    const label = language === 'ar' ? info.labelAr : info.label;

    if (compact) {
        return (
            <div className="flex items-center gap-1" title={label}>
                <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div
                            key={i}
                            className="w-1.5 h-3 rounded-full transition-colors"
                            style={{
                                backgroundColor: i <= level ? info.color : 'var(--color-border)',
                            }}
                        />
                    ))}
                </div>
                {showLabel && (
                    <span className="text-[10px] text-[var(--color-muted)] ml-0.5">{level}/5</span>
                )}
            </div>
        );
    }

    return (
        <div className="flex items-center gap-2">
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div
                        key={i}
                        className="w-2.5 h-5 rounded-sm transition-colors"
                        style={{
                            backgroundColor: i <= level ? info.color : 'var(--color-border)',
                        }}
                    />
                ))}
            </div>
            {showLabel && (
                <span className="text-sm text-[var(--color-muted)]">{label}</span>
            )}
        </div>
    );
}
