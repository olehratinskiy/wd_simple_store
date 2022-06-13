import React from 'react';
import { render } from '@testing-library/react'
import UserCart from "../UserCart";

test('renders user cart', () => {
    beforeEach(() => jest.resetAllMocks())
    render(<UserCart />);
});