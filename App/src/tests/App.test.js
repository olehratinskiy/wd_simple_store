import React from 'react';
import { render } from '@testing-library/react'
import App from '../App'

test('renders app', () => {
    beforeEach(() => jest.resetAllMocks())
    render(<App />);
});