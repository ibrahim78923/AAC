export const styles = {
  inActive: (theme: any) => {
    return {
      borderRadius: '40px',
      display: 'flex',
      alignItems: 'center',
      background: '#FF4A4A1A',
      color: `${theme?.palette?.error.main}`,
      padding: '0.4rem',
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: '18px',
    };
  },
  Active: (theme: any) => {
    return {
      borderRadius: '40px',
      display: 'flex',
      alignItems: 'center',
      background: `${theme?.palette?.primary.light}`,
      color: `${theme?.palette?.primary.main}`,
      padding: '0.4rem',
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: '18px',
    };
  },
  productTitle: (theme: any) => {
    return {
      fontWeight: 600,
      fontSize: '20px',
      lineHeight: '30px',
      color: `${theme?.palette?.custom.main}`,
      textAlign: {
        lg: 'start',
        md: 'start',
        sm: 'center',
        xs: 'center',
      },
    };
  },
  editSection: () => {
    return {
      display: 'flex',
      alignItems: 'center',
      columnGap: '5px',
      cursor: 'pointer',
      justifyContent: {
        lg: 'start',
        md: 'start',
        sm: 'center',
        xs: 'center',
      },
    };
  },
  statusSection: () => {
    return {
      display: 'flex',
      columnGap: '10px',
      justifyContent: {
        lg: 'flex-end',
        md: 'flex-end',
        sm: 'center',
        xs: 'center',
      },
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
