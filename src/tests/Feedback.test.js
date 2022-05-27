import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import Feedback from '../pages/Feedback';
import App from '../App';

const initialState = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  correctAnswers: 0,
}

describe('Testa componente Feedback', () => {
  it('Verifica se contem as informações da pessoa que joga', () => {
    renderWithRouterAndRedux(<Feedback />);
    const profileImg = screen.getByRole('img', { name: /Player avatar/i });
    const playerName = screen.getByRole('heading', { level: 3, name: '' })
    const headerScore = screen.getByRole('heading', { level: 4, name: 0 })
    
    expect(playerName).toBeInTheDocument();
    expect(profileImg).toBeInTheDocument();
    expect(headerScore).toBeInTheDocument();
  })

  it('Verifica a mensagem de desempenho', () => {
    renderWithRouterAndRedux(<Feedback />)
    const message = screen.getByTestId('feedback-text');

    expect(message).toHaveTextContent('Could be better...');
    expect(message).toBeInTheDocument();
  })

  it('Verifica a mensagem de desempenho', () => {
    renderWithRouterAndRedux(<Feedback />)
    const totalScore = screen.getByTestId('feedback-total-score');
    const totalQuestion = screen.getByTestId('feedback-total-question');

    expect(totalScore).toBeInTheDocument();
    expect(totalQuestion).toBeInTheDocument();
    expect(totalScore).toHaveTextContent('0');
    expect(totalQuestion).toHaveTextContent('0');
  })

  it('Verifica o botão "Play Again"', () => {
    const { history } = renderWithRouterAndRedux(<App />, initialState, '/feedback');

    const playAgainBtn = screen.getByRole('button', { name: /play again/i});
    userEvent.click(playAgainBtn)

    const { pathname } = history.location;
    expect(pathname).toBe('/')
  })

  it('Verifica o botão "Ranking"', () => {
    const { history } = renderWithRouterAndRedux(<App />, initialState, '/feedback');
    
    const rankingBtn = screen.getByRole('button', { name: /ranking/i});
    userEvent.click(rankingBtn)
    
    const { pathname } = history.location;
    expect(pathname).toBe('/ranking');
  })
})