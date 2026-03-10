'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Compass, Code, MapPin, Heart } from 'lucide-react';

export default function AboutPage() {
    const { t } = useLanguage();

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-12">
                <div className="w-16 h-16 rounded-2xl bg-[var(--color-primary)] flex items-center justify-center text-white mx-auto mb-4">
                    <Compass size={32} />
                </div>
                <h1 className="text-4xl font-bold font-[family-name:var(--font-heading)] text-[var(--color-foreground)]">
                    {t('About Visit Oman', 'عن زيارة عمان')}
                </h1>
                <p className="text-[var(--color-muted)] mt-3 text-lg max-w-2xl mx-auto leading-relaxed">
                    {t(
                        'Visit Oman is a modern tourism discovery platform designed to help travelers explore the beauty and diversity of the Sultanate of Oman.',
                        'زيارة عمان هي منصة حديثة لاكتشاف السياحة، مصممة لمساعدة المسافرين على استكشاف جمال وتنوع سلطنة عمان.'
                    )}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-6 text-center">
                    <MapPin size={28} className="mx-auto mb-3 text-[var(--color-primary)]" />
                    <h3 className="font-bold font-[family-name:var(--font-heading)] mb-2">{t('300+ Destinations', '300+ وجهة')}</h3>
                    <p className="text-sm text-[var(--color-muted)]">
                        {t(
                            'Explore beaches, mountains, historical sites, and more across 6 regions',
                            'استكشف الشواطئ والجبال والمواقع التاريخية وأكثر عبر 6 مناطق'
                        )}
                    </p>
                </div>
                <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-6 text-center">
                    <Heart size={28} className="mx-auto mb-3 text-[var(--color-food)]" />
                    <h3 className="font-bold font-[family-name:var(--font-heading)] mb-2">{t('Smart Planning', 'تخطيط ذكي')}</h3>
                    <p className="text-sm text-[var(--color-muted)]">
                        {t(
                            'Build custom itineraries, save favorites, and find hidden gems',
                            'أنشئ رحلات مخصصة، احفظ المفضلة، واكتشف الجواهر المخفية'
                        )}
                    </p>
                </div>
                <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-6 text-center">
                    <Code size={28} className="mx-auto mb-3 text-[var(--color-culture)]" />
                    <h3 className="font-bold font-[family-name:var(--font-heading)] mb-2">{t('Modern Tech', 'تقنية حديثة')}</h3>
                    <p className="text-sm text-[var(--color-muted)]">
                        {t(
                            'Built with Next.js, React, TypeScript, and Tailwind CSS',
                            'بُني بـ Next.js و React و TypeScript و Tailwind CSS'
                        )}
                    </p>
                </div>
            </div>

            {/* Tech Stack */}
            <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-8">
                <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-6 text-center">
                    {t('Technology Stack', 'المكونات التقنية')}
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {[
                        { name: 'Next.js 15', desc: 'App Router' },
                        { name: 'React 19', desc: 'UI Library' },
                        { name: 'TypeScript', desc: 'Type Safety' },
                        { name: 'Tailwind CSS 4', desc: 'Styling' },
                        { name: 'Leaflet', desc: 'Maps' },
                        { name: 'Framer Motion', desc: 'Animations' },
                    ].map((tech) => (
                        <div key={tech.name} className="p-4 rounded-xl bg-[var(--color-surface-hover)] text-center">
                            <div className="font-bold text-sm">{tech.name}</div>
                            <div className="text-xs text-[var(--color-muted)] mt-0.5">{tech.desc}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Credits */}
            <div className="mt-8 text-center text-sm text-[var(--color-muted)]">
                {t('Built for Rihal Academy', 'بُني لأكاديمية رحال')} · {new Date().getFullYear()}
            </div>
        </div>
    );
}
