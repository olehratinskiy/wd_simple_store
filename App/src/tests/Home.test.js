import React from 'react';
import { render } from '@testing-library/react'
import Home from '../Home';

test('renders home', () => {
    beforeEach(() => jest.resetAllMocks())
    render(<Home />);
});