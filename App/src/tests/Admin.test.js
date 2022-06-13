import { render, screen, fireEvent, act, waitFor, findByText, waitForElement } from '@testing-library/react';
import Admin from '../Admin';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from "react-router-dom";

test('tests admin page', async() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
        json: jest.fn().mockResolvedValue({message: '123msg'}),
        status: 200,
    });
});