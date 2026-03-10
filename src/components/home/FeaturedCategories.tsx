'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { CATEGORIES } from '@/lib/constants';
import { getDestinationsByCategory } from '@/lib/data';
import { ArrowRight } from 'lucide-react';

const BENTO_CLASSES = [
    'md:col-span-2 md:row-span-2',
    'md:col-span-1 md:row-span-1',
    'md:col-span-1 md:row-span-1',
    'md:col-span-1 md:row-span-2',
    'md:col-span-1 md:row-span-1',
    'md:col-span-1 md:row-span-1',
];

const GRADIENTS = [
    'from-cyan-500 to-blue-600',
    'from-purple-500 to-violet-700',
    'from-amber-500 to-orange-600',
    'from-red-500 to-rose-600',
    'from-indigo-500 to-blue-700',
    'from-emerald-500 to-green-700',
];

export function FeaturedCategories() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });
    const { t, language } = useLanguage();

    return (
        <section ref={ref} className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="text-center mb-10">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] text-[var(--color-foreground)]"
                >
                    {t('Explore by Category', 'استكشف حسب الفئة')}
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.1 }}
                    className="text-[var(--color-muted)] mt-2 text-lg"
                >
                    {t('What kind of adventure are you looking for?', 'ما نوع المغامرة التي تبحث عنها؟')}
                </motion.p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:auto-rows-[180px]">
                {CATEGORIES.map((cat, i) => {
                    const count = getDestinationsByCategory(cat.value).length;
                    return (
                        <motion.div
                            key={cat.value}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.4, delay: i * 0.08 }}
                            className={BENTO_CLASSES[i]}
                        >
                            <Link
                                href={`/explore?categories=${cat.value}`}
                                className={`group relative h-full rounded-2xl bg-gradient-to-br ${GRADIENTS[i]} overflow-hidden flex flex-col justify-end p-5 transition-transform hover:scale-[1.02]`}
                            >
                                {/* Pattern */}
                                <div className="absolute inset-0 opacity-10" style={{
                                    backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                                    backgroundSize: '16px 16px',
                                }} />

                                {/* Icon */}
                                <span className="absolute top-4 right-4 text-4xl md:text-5xl opacity-40 group-hover:opacity-60 group-hover:scale-110 transition-all duration-500">
                                    {cat.icon}
                                </span>

                                {/* Text */}
                                <div className="relative z-10">
                                    <h3 className="text-xl md:text-2xl font-bold text-white font-[family-name:var(--font-heading)]">
                                        {language === 'ar' ? cat.labelAr : cat.label}
                                    </h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-sm text-white/70">{count} {t('destinations', 'وجهة')}</span>
                                        <ArrowRight size={14} className="text-white/50 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
