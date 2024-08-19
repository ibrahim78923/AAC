import { Theme } from '@mui/material';

export const styles = {
  productsList: {
    mt: 3,
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))',
    gap: '24px',
  },
  productCard: (theme: Theme) => ({
    borderRadius: '12px',
    cursor: 'pointer',
    padding: '16px',

    '& .product-icon': {
      height: '48px',
      widht: '48px',
      minWidth: '48px',
      backgroundColor: theme?.palette?.custom?.light_grayish_blue,
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    '&.active': {
      borderColor: theme?.palette?.primary?.main,
    },
  }),

  selectCompanyAccount: {
    maxWidth: '536px',
    mt: '40px',
  },

  moduleCardsWrapper: {
    mt: '18px',
  },
};
