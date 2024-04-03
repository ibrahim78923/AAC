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
            ? `${formattedPathname} - Air Apple Cart`
            : 'Air Apple Cart'}
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

        <meta
          name="description"
          content="Air Applecart is a robust and adaptable CRM platform that adopts a customer-centric approach, enables businesses to attract and nurture customers through valuable content. It provides tools and resources for implementing inbound marketing strategies effectively. The platform caters to businesses of all sizes and industries, helping them centralize customer data, automate marketing and sales processes, and deliver exceptional customer experiences."
        />

        <meta property="og:title" content="Air Apple Cart" />
        <meta
          property="og:description"
          content="Air Applecart is a robust and adaptable CRM platform that adopts a customer-centric approach, enables businesses to attract and nurture customers through valuable content. It provides tools and resources for implementing inbound marketing strategies effectively. The platform caters to businesses of all sizes and industries, helping them centralize customer data, automate marketing and sales processes, and deliver exceptional customer experiences."
        />
        <meta property="og:image" content="/og-logo.png" />
        <meta property="og:type" content="website" />

        <meta name="twitter:title" content="Air Apple Cart" />
        <meta
          name="twitter:description"
          content="Air Applecart is a robust and adaptable CRM platform that adopts a customer-centric approach, enables businesses to attract and nurture customers through valuable content. It provides tools and resources for implementing inbound marketing strategies effectively. The platform caters to businesses of all sizes and industries, helping them centralize customer data, automate marketing and sales processes, and deliver exceptional customer experiences."
        />
        <meta name="twitter:image" content="/og-logo.png" />
      </Head>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Provider store={store}>
          <AuthProvider>
            <ThemeLocalization>
              <SnackbarProvider
                preventDuplicate
                anchorOrigin={{
                  horizontal: 'center',
                  vertical: 'top',
                }}
              >
                {getLayout(<Component {...pageProps} />)}
              </SnackbarProvider>
            </ThemeLocalization>
          </AuthProvider>
        </Provider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
