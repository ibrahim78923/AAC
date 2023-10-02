import '@/styles/globals.css';

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
