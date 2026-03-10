import { Destination, FilterState } from '@/types';

export function applyFilters(
    destinations: Destination[],
    filters: FilterState
): Destination[] {
    let result = [...destinations];

    // Search filter
    if (filters.search.trim()) {
        const query = filters.search.toLowerCase().trim();
        result = result.filter(
            (d) =>
                d.name.en.toLowerCase().includes(query) ||
                d.name.ar.includes(query)
        );
    }

    // Category filter
    if (filters.categories.length > 0) {
        result = result.filter((d) =>
            filters.categories.some((cat) => d.categories.includes(cat))
        );
    }

    // Region filter
    if (filters.regions.length > 0) {
        result = result.filter((d) =>
            filters.regions.includes(d.region.en.toLowerCase() as never)
        );
    }

    // Price range filter
    result = result.filter(
        (d) =>
            d.ticket_cost_omr >= filters.priceRange[0] &&
            d.ticket_cost_omr <= filters.priceRange[1]
    );

    // Crowd level filter
    if (filters.crowdLevels.length > 0) {
        result = result.filter((d) =>
            filters.crowdLevels.includes(d.crowd_level)
        );
    }

    // Month filter
    if (filters.months.length > 0) {
        result = result.filter((d) =>
            filters.months.some((m) => d.recommended_months.includes(m))
        );
    }

    // Sort
    result = sortDestinations(result, filters.sort);

    return result;
}

export function sortDestinations(
    destinations: Destination[],
    sort: string
): Destination[] {
    const sorted = [...destinations];
    switch (sort) {
        case 'name':
            return sorted.sort((a, b) => a.name.en.localeCompare(b.name.en));
        case 'price-asc':
            return sorted.sort((a, b) => a.ticket_cost_omr - b.ticket_cost_omr);
        case 'price-desc':
            return sorted.sort((a, b) => b.ticket_cost_omr - a.ticket_cost_omr);
        case 'duration':
            return sorted.sort(
                (a, b) => a.avg_visit_duration_minutes - b.avg_visit_duration_minutes
            );
        case 'crowd-asc':
            return sorted.sort((a, b) => a.crowd_level - b.crowd_level);
        case 'crowd-desc':
            return sorted.sort((a, b) => b.crowd_level - a.crowd_level);
        default:
            return sorted;
    }
}
