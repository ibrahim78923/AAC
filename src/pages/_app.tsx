import { LocalizationProvider } from '@mui/x-date-pickers';

import ThemeProvider from '../../theme';
import ThemeLocalization from '../../theme/ThemeLocalization';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { SnackbarProvider } from 'notistack';

import { Provider } from 'react-redux';
import store from '@/redux/store';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import '@/styles/globals.css';
import { AuthProvider } from '@/contexts/AuthContext';

export default function App(props: any) {
  const { Component, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page: any) => page);
  const persistor = persistStore(store);
  return (
    <ThemeProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Provider store={store}>
          <AuthProvider>
            <PersistGate loading={null} persistor={persistor}>
              <ThemeLocalization>
                <SnackbarProvider
                  maxSnack={1}
                  preventDuplicate
                  anchorOrigin={{
                    horizontal: 'center',
                    vertical: 'top',
                  }}
                >
                  {getLayout(<Component {...pageProps} />)}
                </SnackbarProvider>
              </ThemeLocalization>
            </PersistGate>
          </AuthProvider>
        </Provider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
