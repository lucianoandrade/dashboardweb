import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import AppRoutes from '.';
import store from '../store';


describe('Routes', () => {
  it('renders', () => {
    render(
      <Provider store={store}>
        <AppRoutes />
      </Provider>
    );
  });
});
