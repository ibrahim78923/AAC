import { Theme } from '@mui/material';

export const styles = {
  root: (theme: Theme) => ({
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme?.palette?.common?.white,
    padding: '16px 32px',
    borderBottom: `1px solid #E5E7EB`,
  }),
  logo: {
    display: 'inline-flex',
  },
};
