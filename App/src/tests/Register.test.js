import React from 'react';
import { render } from '@testing-library/react'
import Register from '../Register';

test('renders register', () => {
    beforeEach(() => jest.resetAllMocks())
    render(<Register />);
});