import {computed, observable} from 'mobx';
import {EonetEventsResponse} from "../models/eonetEventsResponse";
import {EonetEvent} from "../models/eonetEvent";
import {EonetGeometry} from "../models/eonetGeometry";
import moment, {Moment} from "moment";

function compareStrings(strA: string, strB: string) {
    return strA.toLocaleLowerCase() < strB.toLocaleUpperCase() ? 1 : -1;
}

function compareBools(boolA: boolean | undefined, boolB: boolean | undefined) {
    return ((boolA ? 1 : 0) + (boolB ? -1 : 0));
}

function orderSign(direction: SortableDirections) {
    return (direction === 'up') ? 1 : -1;
}

export type SortableField = 'status' | 'date' | 'category';
export type SortableDirections = 'up' | 'down' | '';

export interface SortableFields {
    status: SortableDirections;
    date: SortableDirections;
    category: SortableDirections;
}

export class EonetEvents {
    @observable events: EonetEvent[] = [];
    @observable sortFields: SortableFields = {category: '', date: '', status: ''};
    @observable filter: {
        category?: string;
        status?: string;
        date: {
            from?: Moment | null;
            to?: Moment | null;
        }
    } = {
        date: {}
    };

    fetchEvents(limit: string, days: string) {
        const filters = [];

        if (limit) {
            filters.push(`limit=${limit}`);
        }

        if (days) {
            filters.push(`limit=${days}`);
        }

        fetch('https://eonet.sci.gsfc.nasa.gov/api/v2.1/events?' + filters.join('&'))
            .then(res => res.json())
            .catch(error => {

            })
            .then((eventsResponse: EonetEventsResponse) => {
                this.events = eventsResponse.events
            });
    }

    @computed
    get sortedEvents(): EonetEvent[] {
        let events = this.events;

        events = this.filterByStatus(events);
        events = this.filterByDate(events);
        events = this.filterByCategory(events);

        if (this.sortFields.status) {
            events.sort((a, b) => {
                return this.sortByStatus(a, b);
            })
        }

        if (this.sortFields.date) {
            events.sort((a, b) => {
                return this.sortByDate(a, b);
            })
        }

        if (this.sortFields.category) {
            events.sort((a, b) => {
                return this.sortByCategory(a, b);
            })
        }

        return events;
    }

    filterByCategory(events: EonetEvent[]) {
        const {category} = this.filter;

        if (!category) {
            return events;
        }

        const lowerCategory = category.toLowerCase();
        return events.filter((event) =>
            event.categories.some(c => c.title.toLowerCase().includes(lowerCategory)))
    }

    filterByStatus(events: EonetEvent[]) {
        const {status} = this.filter;

        if (!status) {
            return events;
        }

        const filterClosed = status === 'close';

        return events.filter((event) => filterClosed ? event.closed : !event.closed)
    }

    filterByDate(events: EonetEvent[]) {
        const {from, to} = this.filter.date;

        if (!(from || to)) {
            return events;
        }

        return events.filter((event) => this.filterByGeometries(event.geometries, from as Moment, to as Moment));
    }

    sortByDate(a: EonetEvent, b: EonetEvent) {
        const aHasGeometries = !!a.geometries.length;
        const bHasGeometries = !!b.geometries.length;

        if (!aHasGeometries || !bHasGeometries) {
            return compareBools(aHasGeometries, bHasGeometries);
        }

        return compareStrings(a.geometries[0].date, b.geometries[0].date)
            * orderSign(this.sortFields.date);
    }

    sortByStatus(a: EonetEvent, b: EonetEvent) {
        return compareBools(a.closed, b.closed)
            * orderSign(this.sortFields.status);
    }

    sortByCategory(a: EonetEvent, b: EonetEvent) {
        return compareStrings(a.categories[0].title, b.categories[0].title)
            * orderSign(this.sortFields.category);
    }

    toggleSort(field: SortableField) {
        if (!this.sortFields[field]) {
            this.sortFields[field] = 'up';
        } else if (this.sortFields[field] === 'up') {
            this.sortFields[field] = 'down';
        } else {
            this.sortFields[field] = '';
        }
    }

    private filterByGeometries(geometries: EonetGeometry[], from: Moment, to: Moment) {
        if (!geometries.length) {
            return false;
        }

        return geometries.some(geometry => {
            console.log(geometry.date, moment(geometry.date).format('DD/MM/YYYY'));
            console.log((!from || from.isSameOrBefore(geometry.date)) && (!to || to.isSameOrAfter(geometry.date)));
            return (!from || from.isSameOrBefore(geometry.date)) && (!to || to.isSameOrAfter(geometry.date));
        });
    }
}

export const eonetEventsState = new EonetEvents();
