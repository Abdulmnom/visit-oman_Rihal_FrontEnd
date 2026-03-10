'use client';

import React from 'react';
import { Category } from '@/types';
import { CATEGORIES, CATEGORY_COLORS } from '@/lib/constants';
import { useLanguage } from '@/contexts/LanguageContext';

interface CategoryBadgeProps {
    category: Category;
    size?: 'sm' | 'md' | 'lg';
    showIcon?: boolean;
    onClick?: () => void;
    active?: boolean;
}

export function CategoryBadge({
    category,
    size = 'sm',
    showIcon = true,
    onClick,
    active = false,
}: CategoryBadgeProps) {
    const { language } = useLanguage();
    const info = CATEGORIES.find((c) => c.value === category);
    if (!info) return null;

    const color = CATEGORY_COLORS[category];
    const label = language === 'ar' ? info.labelAr : info.label;

    const sizeClasses = {
        sm: 'px-2 py-0.5 text-[10px]',
        md: 'px-3 py-1 text-xs',
        lg: 'px-4 py-1.5 text-sm',
    };

    const Component = onClick ? 'button' : 'span';

    return (
        <Component
            onClick={onClick}
            className={`inline-flex items-center gap-1 rounded-full font-medium transition-all ${sizeClasses[size]} ${onClick ? 'cursor-pointer hover:scale-105' : ''
                }`}
            style={{
                backgroundColor: active ? color : `${color}18`,
                color: active ? 'white' : color,
                border: `1px solid ${active ? color : `${color}30`}`,
            }}
        >
            {showIcon && <span>{info.icon}</span>}
            {label}
        </Component>
    );
}
