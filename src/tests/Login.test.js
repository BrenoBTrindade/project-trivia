import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import fetchToken from '../services/api';


describe('Testa componente Login', () => {
  it('Verifica se todos os elementos estão renderizados', () => {
    renderWithRouterAndRedux(<App />);
    const loginTitle = screen.getByRole('heading', { level: 1, name: /login/i });
    const playerInput = screen.getByLabelText(/player name:/i)
    const emailInput = screen.getByLabelText(/e-mail:/i)
    const playBtn = screen.getByRole('button', { name: /play/i});
    const settingsBtn = screen.getByRole('button', { name: /settings/i});
    
    expect(emailInput).toBeInTheDocument();
    expect(playerInput).toBeInTheDocument();
    expect(loginTitle).toBeInTheDocument();
    expect(playBtn).toBeInTheDocument();
    expect(settingsBtn).toBeInTheDocument();
  })
  
  it('Ao preencher os inputs, o usuário consegue apertar no botão play', async () => {
    const token = {
      "response_code":0,
      "response_message":"Token Generated Successfully!",
      "token":"f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6"
    }
  
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({ json: jest.fn().mockResolvedValue(token)})

    const { history } = renderWithRouterAndRedux(<App />);

    const playerInput = screen.getByLabelText(/player name:/i)
    const emailInput = screen.getByLabelText(/e-mail:/i)
    const playBtn = screen.getByRole('button', { name: /play/i});

    userEvent.type(playerInput, "Usuário teste")
    userEvent.type(emailInput, "teste@teste.com")
    expect(playBtn).toBeEnabled()
    userEvent.click(playBtn)


    expect(global.fetch).toHaveBeenCalled();

    await waitFor(() => expect(screen.getByText(/game/i)).toBeInTheDocument())
    expect(playBtn).not.toBeInTheDocument();

    const { pathname } = history.location;
    expect(pathname).toBe('/game')

  })
})