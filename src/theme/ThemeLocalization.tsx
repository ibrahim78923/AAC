import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles';
import { ReactNode } from 'react';

export default function ThemeLocalization({
  children,
}: {
  children: ReactNode;
}) {
  const defaultTheme = useTheme();

  const theme = createTheme(defaultTheme);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
