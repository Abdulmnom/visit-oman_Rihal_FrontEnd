import { Destination, Category, RegionSlug } from '@/types';
import rawData from '../../public/data.json';

const destinations: Destination[] = rawData as Destination[];

export function getAllDestinations(): Destination[] {
    return destinations;
}

export function getDestinationById(id: string): Destination | null {
    return destinations.find((d) => d.id === id) ?? null;
}

export function getDestinationsByRegion(regionSlug: RegionSlug): Destination[] {
    const regionName = REGION_SLUG_TO_NAME[regionSlug];
    return destinations.filter((d) => d.region.en === regionName);
}

export function getDestinationsByCategory(category: Category): Destination[] {
    return destinations.filter((d) => d.categories.includes(category));
}

export function getDestinationsByMonth(month: number): Destination[] {
    return destinations.filter((d) => d.recommended_months.includes(month));
}

export function getHiddenGems(): Destination[] {
    return destinations.filter((d) => d.crowd_level <= 2);
}

export function getUniqueRegions(): { en: string; ar: string; slug: RegionSlug }[] {
    const seen = new Set<string>();
    const regions: { en: string; ar: string; slug: RegionSlug }[] = [];
    for (const d of destinations) {
        if (!seen.has(d.region.en)) {
            seen.add(d.region.en);
            regions.push({
                en: d.region.en,
                ar: d.region.ar,
                slug: d.region.en.toLowerCase() as RegionSlug,
            });
        }
    }
    return regions.sort((a, b) => a.en.localeCompare(b.en));
}

export function getUniqueCategories(): Category[] {
    const cats = new Set<Category>();
    for (const d of destinations) {
        for (const c of d.categories) {
            cats.add(c);
        }
    }
    return Array.from(cats).sort();
}

const REGION_SLUG_TO_NAME: Record<RegionSlug, string> = {
    muscat: 'Muscat',
    dakhiliya: 'Dakhiliya',
    dhahira: 'Dhahira',
    dhofar: 'Dhofar',
    batinah: 'Batinah',
    sharqiya: 'Sharqiya',
};

export function getRandomDestination(): Destination {
    const idx = Math.floor(Math.random() * destinations.length);
    return destinations[idx];
}

export function getNearbyDestinations(
    destination: Destination,
    limit: number = 4
): Destination[] {
    return destinations
        .filter((d) => d.id !== destination.id)
        .map((d) => ({
            ...d,
            distance: Math.sqrt(
                Math.pow(d.lat - destination.lat, 2) +
                Math.pow(d.lng - destination.lng, 2)
            ),
        }))
        .sort((a, b) => a.distance - b.distance)
        .slice(0, limit);
}
