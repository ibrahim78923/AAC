import { Theme } from '@mui/material';

export const styles = {
  buttonCard: (theme: Theme) => ({
    height: '70px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: `1px solid ${theme.palette.grey[300]}`,
    borderRadius: '6px',
  }),
  plainItem: {
    padding: '0',
    '&:hover': {
      backgroundColor: 'transparent',
    },
    '& .MuiTypography-h6': {
      margin: '30px 0',
    },
  },
};
