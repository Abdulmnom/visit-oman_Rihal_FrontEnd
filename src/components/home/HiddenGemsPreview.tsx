'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { getHiddenGems } from '@/lib/data';
import { DestinationCard } from '@/components/destination/DestinationCard';
import { ArrowRight, Gem } from 'lucide-react';

export function HiddenGemsPreview() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });
    const { t } = useLanguage();

    const gems = getHiddenGems().slice(0, 4);

    return (
        <section ref={ref} className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="text-center mb-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    className="flex items-center gap-2 mb-2 justify-center"
                >
                    <Gem size={20} className="text-[var(--color-secondary)]" />
                    <span className="text-sm font-medium text-[var(--color-secondary)]">
                        {t('Low Crowds · High Beauty', 'أقل ازدحاماً · أكثر جمالاً')}
                    </span>
                </motion.div>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.1 }}
                    className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] text-[var(--color-foreground)]"
                >
                    {t('Hidden Gems', 'الجواهر المخفية')}
                </motion.h2>
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.2 }}
                    className="mt-3"
                >
                    <Link
                        href="/hidden-gems"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-primary)] hover:underline"
                    >
                        {t('View all', 'عرض الكل')}
                        <ArrowRight size={16} />
                    </Link>
                </motion.div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {gems.map((dest, i) => (
                    <motion.div
                        key={dest.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                    >
                        <DestinationCard destination={dest} />
                    </motion.div>
                ))}
            </div>

            <div className="sm:hidden mt-6 text-center">
                <Link
                    href="/hidden-gems"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-primary)]"
                >
                    {t('View all hidden gems', 'عرض جميع الجواهر المخفية')}
                    <ArrowRight size={16} />
                </Link>
            </div>
        </section>
    );
}
