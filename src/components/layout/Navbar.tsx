'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useLanguage } from '@/contexts/LanguageContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { NAV_LINKS } from '@/lib/constants';
import {
    Sun,
    Moon,
    Menu,
    X,
    Heart,
    Globe,
    Compass,
} from 'lucide-react';

export function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();
    const { language, setLanguage, t } = useLanguage();
    const { favorites } = useFavorites();

    return (
        <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-surface)]/80 backdrop-blur-xl">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-9 h-9 rounded-lg bg-[var(--color-primary)] flex items-center justify-center text-white transition-transform group-hover:scale-105">
                            <Compass size={20} />
                        </div>
                        <span className="text-lg font-bold font-[family-name:var(--font-heading)]">
                            <span className="gradient-text">Visit</span>{' '}
                            <span className="text-[var(--color-foreground)]">Oman</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-1">
                        {NAV_LINKS.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-colors ${isActive
                                            ? 'text-[var(--color-primary)] bg-[var(--color-primary-light)]'
                                            : 'text-[var(--color-muted)] hover:text-[var(--color-foreground)] hover:bg-[var(--color-surface-hover)]'
                                        }`}
                                >
                                    {t(link.label, link.labelAr)}
                                    {link.href === '/favorites' && favorites.length > 0 && (
                                        <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[var(--color-food)] text-white text-[10px] flex items-center justify-center font-bold">
                                            {favorites.length}
                                        </span>
                                    )}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-2">
                        {/* Language Toggle */}
                        <button
                            onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
                            className="p-2 rounded-lg text-[var(--color-muted)] hover:text-[var(--color-foreground)] hover:bg-[var(--color-surface-hover)] transition-colors"
                            title={t('Switch to Arabic', 'التبديل إلى الإنجليزية')}
                        >
                            <Globe size={18} />
                        </button>

                        {/* Theme Toggle */}
                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="p-2 rounded-lg text-[var(--color-muted)] hover:text-[var(--color-foreground)] hover:bg-[var(--color-surface-hover)] transition-colors"
                            title={t('Toggle theme', 'تبديل المظهر')}
                        >
                            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                        </button>

                        {/* Mobile Favorites */}
                        <Link
                            href="/favorites"
                            className="md:hidden relative p-2 rounded-lg text-[var(--color-muted)] hover:text-[var(--color-foreground)] hover:bg-[var(--color-surface-hover)] transition-colors"
                        >
                            <Heart size={18} />
                            {favorites.length > 0 && (
                                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[var(--color-food)] text-white text-[9px] flex items-center justify-center font-bold">
                                    {favorites.length}
                                </span>
                            )}
                        </Link>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="md:hidden p-2 rounded-lg text-[var(--color-muted)] hover:text-[var(--color-foreground)] hover:bg-[var(--color-surface-hover)] transition-colors"
                        >
                            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileOpen && (
                    <div className="md:hidden border-t border-[var(--color-border)] py-3 animate-fade-in">
                        {NAV_LINKS.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMobileOpen(false)}
                                    className={`block px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${isActive
                                            ? 'text-[var(--color-primary)] bg-[var(--color-primary-light)]'
                                            : 'text-[var(--color-muted)] hover:text-[var(--color-foreground)] hover:bg-[var(--color-surface-hover)]'
                                        }`}
                                >
                                    {t(link.label, link.labelAr)}
                                </Link>
                            );
                        })}
                    </div>
                )}
            </nav>
        </header>
    );
}
