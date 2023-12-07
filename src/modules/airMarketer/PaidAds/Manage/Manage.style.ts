import type { Theme } from '@mui/material';

export const style = {
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
};
