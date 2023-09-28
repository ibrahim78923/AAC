import NotistackProvider from '@/components/CustomNotistack';
import '@/styles/globals.css';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import '@/styles/globals.css';
import ThemeProvider from '../../theme';
import ThemeLocalization from '../../theme/ThemeLocalization';

export default function App(props: any) {
  const { Component, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page: any) => page);

  return (
    <ThemeProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeLocalization>
          <NotistackProvider>
            {getLayout(<Component {...pageProps} />)}
          </NotistackProvider>
        </ThemeLocalization>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
