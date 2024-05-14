import type { Theme } from '@mui/material';

export const styles = {
  statusBtn: (theme: Theme) => ({
    width: 'fit-content',
    borderRadius: '16px',
    padding: '2px 8px',
    '.dot': {
      width: '6px',
      height: '6px',
      borderRadius: '50%',
      backgroundColor: theme?.palette?.success?.main,
    },
    '.pauseIcon': {
      width: '8px',
      height: '8px',
    },
  }),
  actionButton: (theme: any) => {
    return {
      border: `1px solid ${theme?.palette?.custom?.dark}`,
      borderRadius: '4px',
      color: `${theme?.palette?.custom.main}`,
      display: 'flex',
      alignItems: 'center',
      width: { xs: '100%', sm: '112px' },
      height: '36px',
    };
  },
};
