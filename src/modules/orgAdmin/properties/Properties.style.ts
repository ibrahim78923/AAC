export const styles = {
  skeleton: (theme: any) => ({
    bgcolor: theme?.palette?.grey?.[300],
    borderRadius: '6px',
  }),
  productsList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))',
    gap: '24px',
  },
  productCard: (theme: any) => ({
    borderRadius: '12px',
    cursor: 'pointer',
    padding: '16px',

    '& .product-icon': {
      height: '48px',
      widht: '48px',
      minWidth: '48px',
      backgroundColor: theme?.palette?.custom?.light_grayish_blue,
      color: theme?.palette?.custom?.dark_grey,
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    '&.active': {
      color: theme?.palette?.primary?.main,
      borderColor: theme?.palette?.primary?.light,
      '& .product-icon': {
        backgroundColor: theme?.palette?.primary?.lighter,
        color: theme?.palette?.primary?.main,
      },
      '& .MuiTypography-body2': {
        color: theme?.palette?.primary?.main,
      },
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
