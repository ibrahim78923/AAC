import { Theme } from '@mui/material';

export const styles = {
  moduleCard: (theme: Theme) => ({
    border: `1px solid ${theme?.palette?.primary?.main}`,
    borderRadius: '8px',
    padding: '24px',
    cursor: 'pointer',

    '& .module-card-icon': {
      height: '56px',
      width: '56px',
      borderRadius: '8px',
      backgroundColor: theme?.palette?.primary?.light,
      color: theme?.palette?.primary?.main,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }),

  moduleCardTitle: (theme: Theme) => ({
    fontSize: '16px',
    fontWeight: '700',
    lineHeight: '1.5',
    mt: '20px',
    color: theme?.palette?.grey[600],
  }),

  moduleCardDesc: (theme: Theme) => ({
    color: theme?.palette?.custom?.steel_blue_alpha,
    mt: '6px',
  }),
};
