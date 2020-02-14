import {EonetEvent} from "./eonetEvent";

export interface EonetEventsResponse {
    title: string;
    description: string;
    link: string;
    events: EonetEvent[];
}
