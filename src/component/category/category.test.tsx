import { render } from '@testing-library/react';
import React from 'react';
import { EonetCategory } from '../../models/eonetCategory';
import { CategoryComponent } from './category.component';

test('renders category contents', () => {
    const category: EonetCategory = {
        id: 1,
        title: 'test'
    };

    const { getByText } = render(<CategoryComponent category={category}/>);
    const element = getByText("test");
    expect(element).toBeInTheDocument();
});
