import { Category, CrowdLevel, RegionSlug } from './destination';

export type SortOption = 'name' | 'price-asc' | 'price-desc' | 'duration' | 'crowd-asc' | 'crowd-desc';

export interface FilterState {
    categories: Category[];
    regions: RegionSlug[];
    priceRange: [number, number];
    crowdLevels: CrowdLevel[];
    months: number[];
    search: string;
    sort: SortOption;
}

export const DEFAULT_FILTERS: FilterState = {
    categories: [],
    regions: [],
    priceRange: [0, 20],
    crowdLevels: [],
    months: [],
    search: '',
    sort: 'name',
};
