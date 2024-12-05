import { Theme } from '@mui/material';

export const styles = {
  addCard: (theme: Theme) => ({
    border: `1px dashed ${theme?.palette?.custom?.light_lavender_gray}`,
    borderRadius: '6px',
    p: '60px 18px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    height: '100%',
    '&:hover': {
      '& .add-card-icon': {
        backgroundColor: theme?.palette?.primary?.main,
        color: theme?.palette?.common?.white,
        borderColor: theme?.palette?.primary?.main,
        transform: 'scale(0.75)',
      },
    },
  }),

  addCardContent: () => ({
    maxWidth: '180px',
    width: '100%',
  }),

  addCardIcon: (theme: Theme) => ({
    width: '72px',
    height: '72px',
    border: `1px solid ${theme?.palette?.custom?.light_lavender_gray}`,
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto',
    transition: 'all 0.35s',
    color: 'secondary.main',
  }),

  addCardTitle: () => ({
    mt: '18px',
    fontSize: '18px',
    fontWeight: '500',
    lineHeight: '1.25',
    color: 'secondary.main',
    textAlign: 'center',
  }),

  addCardDesc: (theme: Theme) => ({
    mt: '9px',
    fontSize: '10.5px',
    fontWeight: '500',
    lineHeight: '1.25047619',
    color: theme?.palette?.custom?.light,
    textAlign: 'center',
  }),
};
