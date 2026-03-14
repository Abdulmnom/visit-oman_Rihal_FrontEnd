'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { PlannerState, PlannerDay, PlannerItem, Destination } from '@/types';
import { generateId } from '@/lib/utils';

interface PlannerContextType {
    planner: PlannerState;
    addDay: () => void;
    removeDay: (dayId: string) => void;
    addItemToDay: (dayId: string, destination: Destination) => void;
    removeItem: (dayId: string, itemId: string) => void;
    moveItem: (fromDayId: string, toDayId: string, itemId: string) => void;
    reorderItems: (dayId: string, oldIndex: number, newIndex: number) => void;
    clearPlanner: () => void;
    setTitle: (title: string) => void;
    isInPlanner: (destinationId: string) => boolean;
}

const PlannerContext = createContext<PlannerContextType | undefined>(undefined);

const DEFAULT_PLANNER: PlannerState = {
    title: 'My Oman Trip',
    days: [
        { id: generateId(), label: 'Day 1', items: [] },
        { id: generateId(), label: 'Day 2', items: [] },
        { id: generateId(), label: 'Day 3', items: [] },
    ],
};

export function PlannerProvider({ children }: { children: ReactNode }) {
    const [planner, setPlanner] = useState<PlannerState>(DEFAULT_PLANNER);

    useEffect(() => {
        const saved = localStorage.getItem('planner');
        if (saved) {
            try {
                setPlanner(JSON.parse(saved));
            } catch {
                setPlanner(DEFAULT_PLANNER);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('planner', JSON.stringify(planner));
    }, [planner]);

    const addDay = useCallback(() => {
        setPlanner((prev) => ({
            ...prev,
            days: [
                ...prev.days,
                {
                    id: generateId(),
                    label: `Day ${prev.days.length + 1}`,
                    items: [],
                },
            ],
        }));
    }, []);

    const removeDay = useCallback((dayId: string) => {
        console.log('Attempting to remove day:', dayId);
        let confirmed = false;
        try {
            confirmed = typeof window !== 'undefined' && window.confirm('Are you sure you want to remove this day?');
        } catch (e) {
            console.error('Confirm failed:', e);
            confirmed = true; // Fallback to delete if confirm fails
        }
        
        if (confirmed) {
            setPlanner((prev) => ({
                ...prev,
                days: prev.days.filter((d) => d.id !== dayId),
            }));
        }
    }, []);

    const addItemToDay = useCallback((dayId: string, destination: Destination) => {
        const newItem: PlannerItem = {
            id: generateId(),
            destinationId: destination.id,
            destination,
        };
        setPlanner((prev) => ({
            ...prev,
            days: prev.days.map((d) =>
                d.id === dayId ? { ...d, items: [...d.items, newItem] } : d
            ),
        }));
    }, []);

    const removeItem = useCallback((dayId: string, itemId: string) => {
        setPlanner((prev) => ({
            ...prev,
            days: prev.days.map((d) =>
                d.id === dayId
                    ? { ...d, items: d.items.filter((i) => i.id !== itemId) }
                    : d
            ),
        }));
    }, []);

    const moveItem = useCallback((fromDayId: string, toDayId: string, itemId: string) => {
        setPlanner((prev) => {
            const fromDay = prev.days.find((d) => d.id === fromDayId);
            const item = fromDay?.items.find((i) => i.id === itemId);
            if (!item) return prev;
            return {
                ...prev,
                days: prev.days.map((d) => {
                    if (d.id === fromDayId) return { ...d, items: d.items.filter((i) => i.id !== itemId) };
                    if (d.id === toDayId) return { ...d, items: [...d.items, item] };
                    return d;
                }),
            };
        });
    }, []);

    const reorderItems = useCallback((dayId: string, oldIndex: number, newIndex: number) => {
        setPlanner((prev) => ({
            ...prev,
            days: prev.days.map((d) => {
                if (d.id !== dayId) return d;
                const items = [...d.items];
                const [removed] = items.splice(oldIndex, 1);
                items.splice(newIndex, 0, removed);
                return { ...d, items };
            }),
        }));
    }, []);

    const clearPlanner = useCallback(() => {
        console.log('Attempting to clear planner');
        let confirmed = false;
        try {
            confirmed = typeof window !== 'undefined' && window.confirm('Are you sure you want to clear the entire planner?');
        } catch (e) {
            console.error('Confirm failed:', e);
            confirmed = true; // Fallback to clear if confirm fails
        }

        if (confirmed) {
            // Use a fresh copy of the default planner with new day IDs to ensure React re-renders
            setPlanner({
                ...DEFAULT_PLANNER,
                days: DEFAULT_PLANNER.days.map((d) => ({
                    ...d,
                    id: generateId(), // Fresh IDs
                    items: [],
                })),
            });
        }
    }, []);

    const setTitle = useCallback((title: string) => {
        setPlanner((prev) => ({ ...prev, title }));
    }, []);

    const isInPlanner = useCallback(
        (destinationId: string) =>
            planner.days.some((d) => d.items.some((i) => i.destinationId === destinationId)),
        [planner]
    );

    return (
        <PlannerContext.Provider
            value={{
                planner,
                addDay,
                removeDay,
                addItemToDay,
                removeItem,
                moveItem,
                reorderItems,
                clearPlanner,
                setTitle,
                isInPlanner,
            }}
        >
            {children}
        </PlannerContext.Provider>
    );
}

export function usePlanner() {
    const context = useContext(PlannerContext);
    if (!context) throw new Error('usePlanner must be used within PlannerProvider');
    return context;
}
