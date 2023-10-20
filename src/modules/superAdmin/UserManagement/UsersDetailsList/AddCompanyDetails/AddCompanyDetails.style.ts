export const styles = {
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
      border: `1px solid ${theme?.palette?.custom.off_white_one}`,
      borderRadius: '8px',
      padding: '0.7rem',
    };
  },
};
