import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ThemeProvider from '../../theme';
import ThemeLocalization from '../../theme/ThemeLocalization';
import { SnackbarProvider } from 'notistack';

import { Provider } from 'react-redux';
import store from '@/redux/store';

import '@/styles/globals.css';
import { AuthProvider } from '@/contexts/AuthContext';

export default function App(props: any) {
  const { Component, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page: any) => page);

  return (
    <ThemeProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Provider store={store}>
          <AuthProvider>
            <ThemeLocalization>
              <SnackbarProvider>
                {getLayout(<Component {...pageProps} />)}
              </SnackbarProvider>
            </ThemeLocalization>
          </AuthProvider>
        </Provider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
