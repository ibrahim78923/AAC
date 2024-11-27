import { Theme } from '@mui/material';

export const styles = {
  card: (theme: Theme) => ({
    border: `0.75px solid ${theme?.palette?.custom?.light_lavender_gray}`,
    borderRadius: '7.5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '148px',
    backgroundColor: theme?.palette?.common?.white,
    cursor: 'pointer',
    textAlign: 'center',
  }),
  createDraft: () => ({
    fontSize: '10.5px',
    lineHeight: '1.25047619',
    color: '#667085',
    mt: '12px',
  }),
};
