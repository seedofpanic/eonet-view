import { eonetEventsState } from './eonetEvents';

function getResponse(data: any) {
    return {
        json: () => {
            return data;
        }
    }
}

describe('fetch data request', () => {
    // TODO: extend cases
    it('should form url parameters right', async () => {
        window.fetch = jasmine.createSpy('fetch').and
            .callFake((url: string) => {
                expect(url.includes('limit=10')).toBeTruthy();

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
