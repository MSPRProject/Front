export interface Pandemic {
    id: number;
    link: string;
    name: string;
    pathogen?: string;
    startDate?: Date;
    endDate?: Date;
    description?: string;
    notes?: string;
}