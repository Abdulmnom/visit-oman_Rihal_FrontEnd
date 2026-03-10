export type Category = 'beach' | 'culture' | 'desert' | 'food' | 'mountain' | 'nature';

export type CrowdLevel = 1 | 2 | 3 | 4 | 5;

export type RegionSlug = 'muscat' | 'dakhiliya' | 'dhahira' | 'dhofar' | 'batinah' | 'sharqiya';

export interface BilingualText {
  en: string;
  ar: string;
}

export interface Destination {
  id: string;
  name: BilingualText;
  lat: number;
  lng: number;
  region: BilingualText;
  categories: Category[];
  company: BilingualText;
  avg_visit_duration_minutes: number;
  ticket_cost_omr: number;
  recommended_months: number[];
  crowd_level: CrowdLevel;
}
