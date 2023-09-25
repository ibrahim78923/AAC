import ThemeLocalization from '../theme/ThemeLocalization';
import ThemeProvider from '../theme/index';
import '@/styles/globals.css';

export default function App(props: any) {
  const { Component, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page: any) => page);

  return (
    <ThemeProvider>
      <ThemeLocalization>
        {getLayout(<Component {...pageProps} />)}
      </ThemeLocalization>
    </ThemeProvider>
  );
}
