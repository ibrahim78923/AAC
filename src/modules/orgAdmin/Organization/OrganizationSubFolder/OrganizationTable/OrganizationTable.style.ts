export const styles = {
  actionButton: (theme: any) => {
    return {
      border: `1px solid ${theme?.palette?.custom.dark}`,
      color: `${theme?.palette?.custom.main}`,
      fontSize: '14px',
      fontWeight: 500,
      width: { lg: 'unset', md: 'unset', sm: 'unset', xs: '100%' },
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
  productCard: () => {
    return {
      border: '1px solid #E9EAEF',
      borderRadius: '8px',
      padding: '0.7rem',
    };
  },
};
