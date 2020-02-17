import React from 'react';
import { render } from '@testing-library/react';
import {AppComponent} from './App';

test('renders events container', () => {
  const { getByTestId } = render(<AppComponent />);
  const element = getByTestId("events-container");
  expect(element).toBeInTheDocument();
});
