import React from 'react';
import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import apiMockedResult from './helpers/apiMockedResult';
import invalidTokenMock from './helpers/invalidTokenMock';

const INITIAL_STATE = {
    player: {
    name: 'player1',
    assertions: 0,
    score: 0,
    gravatarEmail: 'player@test.com',
    correctAnswers: 0,
  }
}

describe('Testa a página Game com um token válido', () => {
  jest.useFakeTimers();

  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({ json: jest.fn().mockResolvedValue(apiMockedResult)})
  })

  it('Testa se o jogador consegue passar para a próxima pergunta', async () => {

    const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, '/game')

    for (let i = 0; i < 5; i+= 1) {
      await waitFor(() => expect(screen.getByTestId('correct-answer')).toBeInTheDocument())

      const correctAnswerBtn = screen.getByTestId('correct-answer');
      userEvent.click(correctAnswerBtn);
  
      const nextBtn = screen.getByTestId('btn-next');
      userEvent.click(nextBtn)
    }

    expect(history.location.pathname).toBe('/feedback');

  });

  it('Testa o funcionamento do timer', async () => {
    renderWithRouterAndRedux(<App />, INITIAL_STATE, '/game');
    
    await waitForElementToBeRemoved(() => screen.getByText('Loading...'));

    const correctAnswerBtn = await screen.findByTestId('correct-answer');
    const timer = await screen.findByTestId('timer');

    await waitFor(() => {
      jest.advanceTimersByTime(31000);
      expect(correctAnswerBtn).toBeDisabled();
      expect(timer).toHaveTextContent('0');
    })
  })
})

describe('Testa a página Game com um token inválido', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({ json: jest.fn().mockResolvedValue(invalidTokenMock)})
  })

  it('Testa se o jogador é redirecionado para a página Login se jogar com token inválido', () => {

    const { history, debug } = renderWithRouterAndRedux(<App />)

    const playerInput = screen.getByLabelText(/player name:/i);
    const emailInput = screen.getByLabelText(/e-mail:/i);
    const playBtn = screen.getByRole('button', { name: /play/i});

    userEvent.type(playerInput, "Usuário teste");
    userEvent.type(emailInput, "teste@teste.com");
    userEvent.click(playBtn);

    expect(history.location.pathname).toBe('/');
  })
})