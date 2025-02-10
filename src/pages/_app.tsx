import { LocalizationProvider } from '@mui/x-date-pickers';

import ThemeProvider from '../../theme';
import ThemeLocalization from '../../theme/ThemeLocalization';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { SnackbarProvider } from 'notistack';

import { Provider } from 'react-redux';
import store from '@/redux/store';

import '@/styles/globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { formatPathname } from '@/utils/app-title';
import { PROJECT_DESCRIPTION, PROJECT_NAME } from '@/config';

export default function App(props: any) {
  const { Component, pageProps } = props;

  const router = useRouter();

  const { pathname } = router;

  const formattedPathname = formatPathname(pathname);

  const getLayout = Component.getLayout ?? ((page: any) => page);

  return (
    <ThemeProvider>
      <Head>
        <title>
          {formattedPathname
            ? `${formattedPathname} - ${PROJECT_NAME}`
            : PROJECT_NAME}
        </title>

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/android-chrome-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="/android-chrome-512x512.png"
        />

        <link rel="manifest" href="/site.webmanifest" />

        <meta name="description" content={PROJECT_DESCRIPTION} />

        <meta property="og:title" content={PROJECT_NAME} />
        <meta property="og:description" content={PROJECT_DESCRIPTION} />
        <meta property="og:image" content="/og-logo.png" />
        <meta property="og:type" content="website" />

        <meta name="twitter:title" content={PROJECT_NAME} />
        <meta name="twitter:description" content={PROJECT_DESCRIPTION} />
        <meta name="twitter:image" content="/og-logo.png" />
      </Head>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Provider store={store}>
          <SnackbarProvider
            preventDuplicate
            anchorOrigin={{
              horizontal: 'center',
              vertical: 'top',
            }}
          >
            <AuthProvider>
              <ThemeLocalization>
                {getLayout(<Component {...pageProps} />)}
              </ThemeLocalization>
            </AuthProvider>
          </SnackbarProvider>
        </Provider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
