import React from 'react';
import { render } from '@testing-library/react'
import ProductEdition from '../ProductEdition';

test('renders ProductEdition', () => {
    beforeEach(() => jest.resetAllMocks())
    render(<ProductEdition />);
});