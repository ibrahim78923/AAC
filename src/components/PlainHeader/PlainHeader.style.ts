import { Theme } from '@mui/material';

export const styles = {
  header: (theme: Theme) => ({
    backgroundColor: theme?.palette?.common?.white,
    boxShadow: `0px 3px 6px 0px ${theme?.palette?.custom?.custom_shadow}`,
    height: '60px',
    px: '60px',
    '@media (max-width: 1200px)': {
      px: '40px',
    },
    '@media (max-width: 800px)': {
      px: '24px',
    },
  }),
};
