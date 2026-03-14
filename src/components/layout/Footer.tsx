'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { Compass, Github, Heart } from 'lucide-react';

export function Footer() {
    const { t } = useLanguage();

    return (
        <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="w-9 h-9 rounded-lg bg-[var(--color-primary)] flex items-center justify-center text-white">
                                <Compass size={20} />
                            </div>
                            <span className="text-lg font-bold font-[family-name:var(--font-heading)]">
                                <span className="gradient-text">Visit</span>{' '}
                                <span className="text-[var(--color-foreground)]">Oman</span>
                            </span>
                        </Link>
                        <p className="text-sm text-[var(--color-muted)] max-w-md leading-relaxed">
                            {t(
                                'Explore 300+ stunning destinations across the Sultanate of Oman. From pristine beaches to ancient forts, discover the beauty that awaits.',
                                'استكشف أكثر من 300 وجهة سياحية مذهلة في سلطنة عمان. من الشواطئ البكر إلى الحصون القديمة، اكتشف الجمال الذي ينتظرك.'
                            )}
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-[var(--color-foreground)] mb-4 font-[family-name:var(--font-heading)]">
                            {t('Explore', 'استكشف')}
                        </h3>
                        <ul className="space-y-2.5">
                            {[
                                { href: '/explore', label: t('All Destinations', 'جميع الوجهات') },
                                { href: '/map', label: t('Map View', 'عرض الخريطة') },
                                { href: '/hidden-gems', label: t('Hidden Gems', 'جواهر مخفية') },
                                { href: '/best-time', label: t('Best Time to Visit', 'أفضل وقت للزيارة') },
                            ].map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Regions */}
                    <div>
                        <h3 className="text-sm font-semibold text-[var(--color-foreground)] mb-4 font-[family-name:var(--font-heading)]">
                            {t('Regions', 'المناطق')}
                        </h3>
                        <ul className="space-y-2.5">
                            {[
                                { slug: 'muscat', label: t('Muscat', 'مسقط') },
                                { slug: 'dhofar', label: t('Dhofar', 'ظفار') },
                                { slug: 'dakhiliya', label: t('Dakhiliya', 'الداخلية') },
                                { slug: 'sharqiya', label: t('Sharqiya', 'الشرقية') },
                                { slug: 'batinah', label: t('Batinah', 'الباطنة') },
                                { slug: 'dhahira', label: t('Dhahira', 'الظاهرة') },
                            ].map((r) => (
                                <li key={r.slug}>
                                    <Link
                                        href={`/region/${r.slug}`}
                                        className="text-sm text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors"
                                    >
                                        {r.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-10 pt-6 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-[var(--color-muted)]">
                        © {new Date().getFullYear()} Visit Oman. {t('Built with Abdulmomen Al-Brayky', 'بُني بـ عبدالمنعم البريكي')}{' '}
                        <Heart size={12} className="inline text-[var(--color-food)]" />{' '}
                        {t('for Rihal Academy', 'لأكاديمية رحال')}
                    </p>
                    <div className="flex items-center gap-4">
                        <span className="text-xs text-[var(--color-muted)]">
                            Next.js · React · TypeScript · Tailwind CSS
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
