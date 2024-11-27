import { Theme } from '@mui/material';

export const styles = {
  plainLayout: (theme: Theme) => ({
    minHeight: '100vh',
    backgroundColor: theme?.palette?.custom?.pale_grayish_blue,
  }),
};
