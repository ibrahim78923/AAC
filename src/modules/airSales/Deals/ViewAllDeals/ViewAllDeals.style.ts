import { Theme } from '@mui/material';

export const styles = {
  viewBox: (theme: Theme) => ({
    padding: '0px 16px',
    borderRadius: '8px',
    border: `1.5px solid ${theme?.palette?.grey[700]}`,
    color: theme?.palette?.grey[900],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }),
  viewChildBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    fontWeight: 400,
  },
  viewRecStyle: (theme: Theme) => ({
    '& .MuiFormControlLabel-root': {
      width: '100%',
      justifyContent: 'space-between',
      flexDirection: 'row-reverse',
      border: `1px solid ${theme?.palette?.grey[700]}`,
      borderRadius: '8px',
      padding: '0px 12px',
      margin: '5px 0px',
    },
  }),
};
