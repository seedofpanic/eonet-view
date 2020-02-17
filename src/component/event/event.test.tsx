import { render } from '@testing-library/react';
import React from 'react';
import { EonetEvent } from '../../models/eonetEvent';
import { EventComponent } from './event.component';
import { getByText, getAllByTestId, getByTestId } from '@testing-library/dom';

test('renders event line contents', () => {
    const event: EonetEvent = {
        categories: [
            { id: 1, title: 'category1' },
            { id: 2, title: 'category2' }
        ],
        description: 'description-test',
        geometries: [
            { date: '2020-02-15T06:00:00Z', type: 'type1', coordinates: [1, 2] },
            { date: '2020-02-15T06:00:00Z', type: 'type2', coordinates: [2, 1] }
        ],
        id: 'id-test',
        link: 'link-test',
        sources: [
            { id: '1', url: 'url1' },
            { id: '2', url: 'url2' },
        ],
        title: 'title-test'
    };

    const container = render(<table><tbody><EventComponent event={event}/></tbody></table>).getByTestId('event-line');

    const idElement = getByText(container, 'id-test');
    expect(idElement).toBeInTheDocument();
    const titleElement = getByText(container, 'title-test');
    expect(titleElement).toBeInTheDocument();
    const categoriesElements = getAllByTestId(container, 'category');
    expect(categoriesElements.length).toBe(2);
    const sourcesElements = getAllByTestId(container, 'source');
    expect(sourcesElements.length).toBe(2);
    const geometriesElement = getByTestId(container, 'geometry-td');
    expect(geometriesElement.innerHTML.trim()).toBe('2');
});

test('renders event body contents', () => {
    const event: EonetEvent = {
        categories: [],
        description: 'description-test',
        geometries: [],
        id: 'id-test',
        link: 'link-test',
        sources: [],
        title: 'title-test'
    };

    const container = render(<table><tbody><EventComponent event={event}/></tbody></table>).getByTestId('event-body');

    const descriptionElement = getByText(container, 'description-test');
    expect(descriptionElement).toBeInTheDocument();
    const titleElement = getByText(container, 'title-test');
    expect(titleElement).toBeInTheDocument();
    const geometriesElement = getByTestId(container, 'geometries');
    expect(geometriesElement).toBeInTheDocument();
});
