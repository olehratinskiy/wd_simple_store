import React from 'react';
import { render } from '@testing-library/react'
import Message from '../Message'

test('renders message', () => {
    beforeEach(() => jest.resetAllMocks())
    render(<Message />);
});