// src/__tests__/App.test.jsx
import React from 'react'
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "../pages/login";
import configureStore from 'redux-mock-store'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { signin } from '../features/userSlice'
import thunk from 'redux-thunk'
import axios from 'axios'

//store mock
const mockStore = configureStore([thunk])

//react-redux mock
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  // useSelector: jest.fn()
}))

//axios mock
jest.mock('axios')

describe('login test', () => {

  let store;

  beforeEach(() => {
    store = mockStore({
      store: {
        isLoading: false,
        store: null,
        status: null,
        error: null
      },
      user: {
        isLoading: false,
        user: null,
        token: null,
      }
    })

    // useSelector.mockReturnValue({ user: { isLoading: false, user: null, token: null }, error: null });

  })
  //init render success
  test('init render success', () => {
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    )
    expect(screen.getByText(/ログイン/i)).toBeTruthy()
  })
  //submit click success
  test('submit click success', async () => {
    //init render
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    )

    //axios mock
    axios.get.mockResolvedValue({ data: { payload: { user: "david.hoover", token: "asflkjflkjalkfjalks" } } })

    //submit button click mock
    const usernameInput = screen.getByPlaceholderText('メールアドレスを入力');
    const passwordInput = screen.getByPlaceholderText('パスワードを入力')
    const submitbtn = screen.getByText(/ログイン/i)

    fireEvent.change(usernameInput, { target: { value: 'david.hoover@gmail' } })
    fireEvent.change(passwordInput, { target: { value: 'qazxsw' } })
    fireEvent.click(submitbtn)

    await waitFor(() => {
      const expectedActions = [
        { type: '/login/pending', meta: expect.anything() },
      ];
      expect(store.getActions()).toEqual(expectedActions);
    });

  })


})