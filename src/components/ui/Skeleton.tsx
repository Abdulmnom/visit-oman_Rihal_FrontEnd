'use client';

import React from 'react';

export function Skeleton({ className = '' }: { className?: string }) {
    return <div className={`shimmer rounded-lg ${className}`} />;
}

export function DestinationCardSkeleton() {
    return (
        <div className="rounded-2xl overflow-hidden bg-[var(--color-surface)] border border-[var(--color-border)]">
            <Skeleton className="h-48 rounded-none" />
            <div className="p-4 space-y-3">
                <Skeleton className="h-5 w-3/4" />
                <div className="flex gap-1.5">
                    <Skeleton className="h-5 w-16 rounded-full" />
                    <Skeleton className="h-5 w-14 rounded-full" />
                </div>
                <div className="flex justify-between pt-3 border-t border-[var(--color-border)]">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-12" />
                </div>
            </div>
        </div>
    );
}

export function EmptyState({
    icon,
    title,
    description,
    action,
}: {
    icon?: React.ReactNode;
    title: string;
    description?: string;
    action?: React.ReactNode;
}) {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            {icon && (
                <div className="w-16 h-16 rounded-2xl bg-[var(--color-surface-hover)] flex items-center justify-center mb-4 text-[var(--color-muted)]">
                    {icon}
                </div>
            )}
            <h3 className="text-lg font-semibold text-[var(--color-foreground)] font-[family-name:var(--font-heading)]">
                {title}
            </h3>
            {description && (
                <p className="mt-1.5 text-sm text-[var(--color-muted)] max-w-md">
                    {description}
                </p>
            )}
            {action && <div className="mt-4">{action}</div>}
        </div>
    );
}
