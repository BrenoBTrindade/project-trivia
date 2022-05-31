import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import AnswerButtons from '../components/AnswerButtons/AnswerButtons.jsx'

describe('Testa o componente Timer na tela Game', () => {
  renderWithRouterAndRedux(<AnswerButtons />);
  const timer = screen.getByTestId('timer');
  expect(timer).toBeInTheDocument();
})