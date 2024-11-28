import { Theme } from '@mui/material';

export const styles = {
  card: (theme: Theme) => ({
    border: `0.75px solid ${theme?.palette?.custom?.light_lavender_gray}`,
    borderRadius: '7.5px',
    display: 'flex',
    flexDirection: 'column',
    height: '148px',
    backgroundColor: theme?.palette?.common?.white,
  }),

  cardContent: () => ({
    p: '12px',
    flex: '1',
  }),

  cardIcon: () => ({
    display: 'flex',
  }),

  cardContentTitle: () => ({
    fontSize: '12px',
    lineHeight: '1.25',
    color: '#1D2939',
    mt: '12px',
  }),

  cardFooter: (theme: Theme) => ({
    height: '40px',
    borderTop: `0.75px solid ${theme?.palette?.custom?.light_lavender_gray}`,
    padding: '6px 12px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }),

  updatedText: () => ({
    fontSize: '9px',
    lineHeight: '1.25',
    color: '#98A2B3',
  }),

  updatedOn: () => ({
    fontSize: '10.5px',
    lineHeight: '1.25047619',
    color: '#475467',
    mt: '3px',
  }),
};
