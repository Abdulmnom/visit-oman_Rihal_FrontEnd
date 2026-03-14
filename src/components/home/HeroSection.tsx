'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Sparkles } from 'lucide-react';

export function HeroSection() {
    const { t } = useLanguage();

    return (
        <section className="relative min-h-[85vh] flex items-center overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#064E3B] via-[#0E7C6B] to-[#0891B2]">
                {/* Animated orbs */}
                <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-[#14B8A6]/20 blur-3xl animate-pulse" />
                <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-[#D97706]/15 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/5 blur-3xl" />

                {/* Pattern */}
                <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }} />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="max-w-3xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-white/80 text-sm border border-white/20 mb-6">
                            <Sparkles size={14} />
                            {t('300+ Destinations to Explore', 'أكثر من 300 وجهة لاستكشافها')}
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.15 }}
                        className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white font-[family-name:var(--font-heading)] leading-[1.1] mb-6"
                    >
                        {t('Discover the', 'اكتشف')}{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400">
                            {t('Beauty', 'جمال')}
                        </span>{' '}
                        <br />
                        {t('of Oman', 'سلطنة عمان')}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="text-lg sm:text-xl text-white/70 leading-relaxed mb-8 max-w-xl mx-auto"
                    >
                        {t(
                            'From pristine beaches and towering mountains to ancient forts and vibrant souqs — plan your perfect journey across the Sultanate.',
                            'من الشواطئ البكر والجبال الشاهقة إلى الحصون القديمة والأسواق النابضة بالحياة — خطط لرحلتك المثالية عبر السلطنة.'
                        )}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.45 }}
                        className="flex flex-wrap gap-4 justify-center"
                    >
                        <Link
                            href="/explore"
                            className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-[#064E3B] font-semibold rounded-xl hover:bg-white/90 transition-all hover:scale-105 shadow-lg shadow-black/10"
                        >
                            {t('Start Exploring', 'ابدأ الاستكشاف')}
                            <ArrowRight size={18} />
                        </Link>
                        <Link
                            href="/map"
                            className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 backdrop-blur-sm transition-all hover:scale-105"
                        >
                            <MapPin size={18} />
                            {t('View Map', 'عرض الخريطة')}
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Bottom wave */}
            <div className="absolute bottom-0 inset-x-0">
                <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
                    <path d="M0 50L48 45C96 40 192 30 288 35C384 40 480 60 576 65C672 70 768 60 864 50C960 40 1056 30 1152 35C1248 40 1344 60 1392 70L1440 80V120H0V50Z" fill="var(--color-background)" />
                </svg>
            </div>
        </section>
    );
}
