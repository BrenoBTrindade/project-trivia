import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import Game from '../pages/Game';

const INITIAL_STATE = {
    player: {
    name: 'player1',
    assertions: 0,
    score: 0,
    gravatarEmail: 'player@test.com',
    correctAnswers: 0,
  }
}

describe('Testa a página Game', () => {
  it('Testa se o jogador consegue passar para a próxima pergunta', async () => {
    const token = 'd1d751355a8d598ca4b95b63ae98d827f0f44829def1037c21650dc6a9317ba6';
    localStorage.setItem('token', token)
    const { debug, history } = renderWithRouterAndRedux(<Game />, INITIAL_STATE)
    // console.log(history)

    for (let i = 0; i < 5; i+= 1) {
      await waitFor(() => expect(screen.getByTestId('correct-answer')).toBeInTheDocument())

      const correctAnswerBtn = screen.getByTestId('correct-answer');
      userEvent.click(correctAnswerBtn);
  
      const nextBtn = screen.getByTestId('btn-next');
      userEvent.click(nextBtn)
    }
    // history.push('/feedback')

  })
})