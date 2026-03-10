'use client';

import { ThemeProvider } from 'next-themes';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { FavoritesProvider } from '@/contexts/FavoritesContext';
import { PlannerProvider } from '@/contexts/PlannerContext';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <LanguageProvider>
                <FavoritesProvider>
                    <PlannerProvider>{children}</PlannerProvider>
                </FavoritesProvider>
            </LanguageProvider>
        </ThemeProvider>
    );
}
