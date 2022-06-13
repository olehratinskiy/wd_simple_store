import React from 'react';
import { render } from '@testing-library/react'
import UserInfo from '../UserInfo';

test('renders user info', () => {
    beforeEach(() => jest.resetAllMocks())
    render(<UserInfo />);
});