import { eonetEventsState } from './eonetEvents';
import {EonetEvent} from "../models/eonetEvent";
import {EonetCategory} from "../models/eonetCategory";
import {EonetSource} from "../models/eonetSource";
import {EonetGeometry} from "../models/eonetGeometry";
import {toJS} from "mobx";

function getResponse(data: any) {
    return {
        json: () => {
            return data;
        }
    }
}

const CLOSED_FREQUENCY = 3;

function getMockedEvents(count: number): EonetEvent[] {
    const events = [];

    for (let i = 0; i < count; i++) {
        events.push({
            id: 'id1',
            title: 'title1',
            description: 'description1',
            link: 'link' + i,
            categories: [
                {
                    id: 1,
                    title: 'catTitle1'
                }
            ],
            sources: [],
            geometries: [],
            closed: i % CLOSED_FREQUENCY === 0
        });
    }

    return events;
}

describe('eonetEventsState', () => {
    describe('fetch data request', () => {
        // TODO: extend cases
        it('should form url parameters right', async () => {
            window.fetch = jasmine.createSpy('fetch').and
                .callFake((url: string) => {
                    expect(url.split('?')[1].includes('limit=10')).toBeTruthy();

                    return Promise.resolve(getResponse({events: []}));
                });
            await eonetEventsState.fetchEvents('10', '');
        });

        it('should extract events from the response', async () => {
            const events: any[] = [1];

            window.fetch = jasmine.createSpy('fetch').and
                .callFake(() => {
                    return Promise.resolve(getResponse({events: events}));
                });
            await eonetEventsState.fetchEvents('10', '');

            expect(eonetEventsState.events).toStrictEqual(events);
        });
    });

    describe('get sorted events', () => {
        it('should return same array if no filter were set', () => {
            eonetEventsState.events = getMockedEvents(10);

            expect(eonetEventsState.sortedEvents).toStrictEqual(eonetEventsState.events);
        });

        it('should sort by status when filter is set', () => {
            let changes = 0;
            let last: boolean;

            eonetEventsState.events = getMockedEvents(10);
            eonetEventsState.toggleSort('status');

            eonetEventsState.sortedEvents.forEach(event => {
                if (!!event.closed !== last) {
                    last = !!event.closed;
                    changes++;
                }
            });

            expect(changes).toBe(2);
        });

        it('should filter by status=open when filter is set', () => {
            eonetEventsState.events = getMockedEvents(10);
            eonetEventsState.filter.status = 'open';

            const eventsLength = eonetEventsState.events.length;

            expect(eonetEventsState.sortedEvents.length)
                .toBe(Math.floor(eventsLength - eventsLength / CLOSED_FREQUENCY));
        });
    });
});
