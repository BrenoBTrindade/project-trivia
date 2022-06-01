import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import Settings from '../pages/Settings';

describe('Testa página settings', () => {
  it('Testa se renderiza elementos do componente Settings', () => {
    renderWithRouterAndRedux(<Settings />)
    const settingsTitle = screen.getByText(/settings/i);
    expect(settingsTitle).toBeInTheDocument();
  })
})