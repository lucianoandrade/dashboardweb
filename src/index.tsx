import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { PersistGate } from 'redux-persist/integration/react';
import 'react-toastify/dist/ReactToastify.min.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core';
import { ThemeProvider as ThemeProviderStyled } from 'styled-components';

import ToastContainer from './components/ToastContainer';
import store, { persistor } from './store';
import ApplicationRouter from './routes';
import theme from './globalTheme';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <CssBaseline />
      <ThemeProviderStyled theme={theme}>
        <ThemeProvider theme={theme}>
          <ToastContainer />
          <ApplicationRouter />
        </ThemeProvider>
      </ThemeProviderStyled>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
