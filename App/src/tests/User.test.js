import React from 'react';
import { render } from '@testing-library/react'
import User from '../User';

test('renders user', () => {
    beforeEach(() => jest.resetAllMocks())
    render(<User />);
});