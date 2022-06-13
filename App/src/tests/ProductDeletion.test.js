import React from 'react';
import { render } from '@testing-library/react'
import ProductDeletion from '../ProductDeletion';

test('renders ProductDeletion', () => {
    beforeEach(() => jest.resetAllMocks())
    render(<ProductDeletion />);
});