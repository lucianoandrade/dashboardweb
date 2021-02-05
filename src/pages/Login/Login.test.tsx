import React from 'react';
import { render } from '@testing-library/react';
import Login from '.';
import { Provider } from 'react-redux';
import store from '../../store';

describe('Login Page', () => {
  it('render', () => {
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );
  });
});
