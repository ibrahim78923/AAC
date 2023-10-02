import '@/styles/globals.css';
import ThemeProvider from '../../theme';
import ThemeLocalization from '../../theme/ThemeLocalization';

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
