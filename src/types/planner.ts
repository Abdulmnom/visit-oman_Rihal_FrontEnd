import { Destination } from './destination';

export interface PlannerItem {
    id: string;
    destinationId: string;
    destination: Destination;
    notes?: string;
}

export interface PlannerDay {
    id: string;
    label: string;
    items: PlannerItem[];
}

export interface PlannerState {
    days: PlannerDay[];
    title: string;
}
