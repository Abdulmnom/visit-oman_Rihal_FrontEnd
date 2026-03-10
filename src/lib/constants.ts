import { Category, RegionSlug } from '@/types';

export const CATEGORIES: { value: Category; label: string; labelAr: string; icon: string }[] = [
    { value: 'beach', label: 'Beach', labelAr: 'شاطئ', icon: '🏖️' },
    { value: 'culture', label: 'Culture', labelAr: 'ثقافة', icon: '🕌' },
    { value: 'desert', label: 'Desert', labelAr: 'صحراء', icon: '🏜️' },
    { value: 'food', label: 'Food', labelAr: 'طعام', icon: '🍽️' },
    { value: 'mountain', label: 'Mountain', labelAr: 'جبل', icon: '⛰️' },
    { value: 'nature', label: 'Nature', labelAr: 'طبيعة', icon: '🌿' },
];

export const REGIONS: { value: RegionSlug; label: string; labelAr: string }[] = [
    { value: 'batinah', label: 'Batinah', labelAr: 'الباطنة' },
    { value: 'dakhiliya', label: 'Dakhiliya', labelAr: 'الداخلية' },
    { value: 'dhahira', label: 'Dhahira', labelAr: 'الظاهرة' },
    { value: 'dhofar', label: 'Dhofar', labelAr: 'ظفار' },
    { value: 'muscat', label: 'Muscat', labelAr: 'مسقط' },
    { value: 'sharqiya', label: 'Sharqiya', labelAr: 'الشرقية' },
];

export const MONTHS = [
    { value: 1, label: 'January', labelAr: 'يناير', short: 'Jan' },
    { value: 2, label: 'February', labelAr: 'فبراير', short: 'Feb' },
    { value: 3, label: 'March', labelAr: 'مارس', short: 'Mar' },
    { value: 4, label: 'April', labelAr: 'أبريل', short: 'Apr' },
    { value: 5, label: 'May', labelAr: 'مايو', short: 'May' },
    { value: 6, label: 'June', labelAr: 'يونيو', short: 'Jun' },
    { value: 7, label: 'July', labelAr: 'يوليو', short: 'Jul' },
    { value: 8, label: 'August', labelAr: 'أغسطس', short: 'Aug' },
    { value: 9, label: 'September', labelAr: 'سبتمبر', short: 'Sep' },
    { value: 10, label: 'October', labelAr: 'أكتوبر', short: 'Oct' },
    { value: 11, label: 'November', labelAr: 'نوفمبر', short: 'Nov' },
    { value: 12, label: 'December', labelAr: 'ديسمبر', short: 'Dec' },
];

export const CROWD_LEVELS = [
    { value: 1 as const, label: 'Very Peaceful', labelAr: 'هادئ جداً', color: '#10B981', emoji: '🟢' },
    { value: 2 as const, label: 'Low Traffic', labelAr: 'حركة قليلة', color: '#22D3EE', emoji: '🔵' },
    { value: 3 as const, label: 'Moderate', labelAr: 'معتدل', color: '#F59E0B', emoji: '🟡' },
    { value: 4 as const, label: 'Busy', labelAr: 'مزدحم', color: '#F97316', emoji: '🟠' },
    { value: 5 as const, label: 'Very Crowded', labelAr: 'مزدحم جداً', color: '#EF4444', emoji: '🔴' },
];

export const CATEGORY_COLORS: Record<Category, string> = {
    beach: '#06B6D4',
    culture: '#8B5CF6',
    desert: '#F59E0B',
    food: '#EF4444',
    mountain: '#6366F1',
    nature: '#10B981',
};

export const REGION_SLUG_TO_NAME: Record<RegionSlug, string> = {
    muscat: 'Muscat',
    dakhiliya: 'Dakhiliya',
    dhahira: 'Dhahira',
    dhofar: 'Dhofar',
    batinah: 'Batinah',
    sharqiya: 'Sharqiya',
};

export const NAV_LINKS = [
    { href: '/', label: 'Home', labelAr: 'الرئيسية' },
    { href: '/explore', label: 'Explore', labelAr: 'استكشف' },
    { href: '/map', label: 'Map', labelAr: 'الخريطة' },
    { href: '/best-time', label: 'Best Time', labelAr: 'أفضل وقت' },
    { href: '/hidden-gems', label: 'Hidden Gems', labelAr: 'جواهر مخفية' },
    { href: '/planner', label: 'Planner', labelAr: 'مخطط الرحلة' },
    { href: '/favorites', label: 'Favorites', labelAr: 'المفضلة' },
];
