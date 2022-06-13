import React from 'react';
import { render } from '@testing-library/react'
import ProductCreation from '../ProductCreation';

test('renders ProductCreation', () => {
    beforeEach(() => jest.resetAllMocks())
    render(<ProductCreation />);
});