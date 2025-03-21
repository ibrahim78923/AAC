import { Theme } from '@mui/material';

export const styles = {
  container: (theme: Theme) => ({
    backgroundColor: theme?.palette?.common?.white,
    border: `3px dashed ${theme?.palette?.primary?.main}`,
    padding: '4px 16px 20px',
    maxWidth: '430px',
    width: '100%',
    zIndex: '100',
  }),
  addTextControls: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
};
