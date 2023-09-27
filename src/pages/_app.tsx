import ThemeLocalization from '../theme/ThemeLocalization';
import ThemeProvider from '../theme/index';
import '@/styles/globals.css';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function App(props: any) {
  const { Component, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page: any) => page);

  return (
    <ThemeProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeLocalization>
          {getLayout(<Component {...pageProps} />)}
        </ThemeLocalization>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
