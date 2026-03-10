'use client';

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Mountain, Ticket, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getAllDestinations, getHiddenGems, getUniqueRegions, getUniqueCategories } from '@/lib/data';

export function AnimatedStats() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const { t } = useLanguage();

    const destinations = getAllDestinations();
    const freeCount = destinations.filter((d) => d.ticket_cost_omr === 0).length;
    const regions = getUniqueRegions().length;
    const gems = getHiddenGems().length;

    const stats = [
        {
            icon: <MapPin size={24} />,
            value: destinations.length,
            label: t('Destinations', 'وجهة'),
            color: 'var(--color-primary)',
        },
        {
            icon: <Mountain size={24} />,
            value: regions,
            label: t('Regions', 'مناطق'),
            color: 'var(--color-culture)',
        },
        {
            icon: <Ticket size={24} />,
            value: freeCount,
            label: t('Free Attractions', 'مجانية'),
            color: 'var(--color-nature)',
        },
        {
            icon: <Users size={24} />,
            value: gems,
            label: t('Hidden Gems', 'جواهر مخفية'),
            color: 'var(--color-secondary)',
        },
    ];

    return (
        <section ref={ref} className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="text-center p-6 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] card-hover"
                    >
                        <div
                            className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center"
                            style={{ backgroundColor: `${stat.color}15`, color: stat.color }}
                        >
                            {stat.icon}
                        </div>
                        <div className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] text-[var(--color-foreground)]">
                            {isInView ? <CountUp target={stat.value} /> : 0}
                        </div>
                        <div className="text-sm text-[var(--color-muted)] mt-1">{stat.label}</div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

function CountUp({ target }: { target: number }) {
    const [count, setCount] = React.useState(0);

    React.useEffect(() => {
        let start = 0;
        const duration = 1500;
        const step = Math.ceil(target / (duration / 16));
        const timer = setInterval(() => {
            start += step;
            if (start >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(start);
            }
        }, 16);
        return () => clearInterval(timer);
    }, [target]);

    return <span>{count}+</span>;
}
