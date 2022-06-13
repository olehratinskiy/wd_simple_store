import React from 'react';
import { render } from '@testing-library/react'
import Login from '../Login';

test('renders login', () => {
    beforeEach(() => jest.resetAllMocks())
    render(<Login />);
});