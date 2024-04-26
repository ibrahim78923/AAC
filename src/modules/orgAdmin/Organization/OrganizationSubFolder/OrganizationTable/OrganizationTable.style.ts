export const styles = {
  actionButton: (theme: any) => {
    return {
      color: theme?.palette?.grey[500],
      width: { lg: '112px', md: 'unset', sm: 'unset', xs: '100%' },
      border: `1.5px solid ${theme?.palette?.custom?.border_grayish_blue}`,
      height: '46px',
      '@media (max-width:560px)': {
        width: '100%',
      },
      fontSize: '14px',
      fontWeight: 500,
    };
  },
  productItem: () => {
    return {
      display: 'grid',
      justifyItems: 'center',
      marginTop: '0.7rem',
      paddingBottom: '2rem',
      marginX: '2.5rem',
    };
  },
  productCard: (theme: any) => {
    return {
      border: `1px solid ${theme?.palette?.custom?.off_white_one}`,
      borderRadius: '8px',
      padding: '0.7rem',
    };
  },
};
