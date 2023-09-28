import '@/styles/globals.css';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ThemeProvider from '../../theme';
import ThemeLocalization from '../../theme/ThemeLocalization';
import { SnackbarProvider } from 'notistack';

export default function App(props: any) {
  const { Component, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page: any) => page);

  return (
    <ThemeProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeLocalization>
          <SnackbarProvider>
            {getLayout(<Component {...pageProps} />)}
          </SnackbarProvider>
        </ThemeLocalization>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
