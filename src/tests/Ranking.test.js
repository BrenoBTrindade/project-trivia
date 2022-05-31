import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import Ranking from '../pages/Ranking';

describe('Testa página de Ranking', () => {
  beforeEach(() => {
    const localStorageItems = [{"name":"amanda","score":0,"picture":"https://www.gravatar.com/avatar/c8d86ad5ed1add319e802f7f659df166"},{"name":"amanda","score":39,"picture":"https://www.gravatar.com/avatar/c8d86ad5ed1add319e802f7f659df166"}]

    localStorage.setItem('ranking', JSON.stringify(localStorageItems));
  })
  it('Testa se os dados do jogador aparecem no Ranking após um jogo', async () => {
    const { debug } = renderWithRouterAndRedux(<Ranking />);

    const rankingTitle = screen.getByRole('heading', { level: 1, name: /ranking/i })
    const playerAvatar = screen.getAllByRole('img', { alt: /player avatar/i});
    const playerOneName = screen.getByTestId('player-name-0');
    const playerTwoName = screen.getByTestId('player-name-1');
    const playerOneScore = screen.getByTestId('player-score-0');
    const playerTwoScore = screen.getByTestId('player-score-1');
    const loginBtn = screen.getByRole('button', { name: /login/i });

    expect(rankingTitle).toBeInTheDocument();
    expect(playerAvatar.length).toBe(2);
    expect(playerOneName).toBeInTheDocument();
    expect(playerTwoName).toBeInTheDocument();
    expect(playerOneScore).toBeInTheDocument();
    expect(playerTwoScore).toBeInTheDocument();
    expect(loginBtn).toBeInTheDocument();
    
  })
})