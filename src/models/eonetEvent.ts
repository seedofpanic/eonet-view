import {EonetCategory} from "./eonetCategory";
import {EonetSource} from "./eonetSource";
import {EonetGeometry} from "./eonetGeometry";

export interface EonetEvent {
    id: string;
    title: string;
    description: string;
    link: string;
    categories: EonetCategory[];
    sources: EonetSource[],
    geometries: EonetGeometry[];
    closed?: boolean;
}
