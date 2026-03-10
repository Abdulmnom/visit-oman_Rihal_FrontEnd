import { Destination } from '@/types';

export function formatDuration(minutes: number): string {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (mins === 0) return `${hours}h`;
    return `${hours}h ${mins}m`;
}

export function formatPrice(omr: number): string {
    if (omr === 0) return 'Free';
    return `${omr.toFixed(2)} OMR`;
}

export function formatPriceShort(omr: number): string {
    if (omr === 0) return 'Free';
    return `${omr.toFixed(1)}`;
}

export function getMonthName(month: number): string {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December',
    ];
    return months[month - 1] || '';
}

export function getMonthShort(month: number): string {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[month - 1] || '';
}

export function calculateTotalCost(destinations: Destination[]): number {
    return destinations.reduce((sum, d) => sum + d.ticket_cost_omr, 0);
}

export function calculateTotalDuration(destinations: Destination[]): number {
    return destinations.reduce((sum, d) => sum + d.avg_visit_duration_minutes, 0);
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
    return classes.filter(Boolean).join(' ');
}

export function slugify(text: string): string {
    return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
}

export function generateId(): string {
    return Math.random().toString(36).substring(2, 9);
}
