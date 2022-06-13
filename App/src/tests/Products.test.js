import React from 'react';
import { render } from '@testing-library/react'
import Products from '../Products';

test('renders products', () => {
    beforeEach(() => jest.resetAllMocks())
    render(<Products />);
});