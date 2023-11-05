export const styles = {
  userDetailCard: () => {
    return {
      background: '#F3F4F6',
      width: '100%',
      height: '127px',
      paddingTop: '20px',
      marginBottom: '20px',
      '@media (max-width:600px)': {
        height: 'auto !important',
      },
    };
  },
  wrapperDetailsInset: () => {
    return {
      width: '95%',
      margin: '0 auto',
      height: '127px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      '@media (max-width:600px)': {
        height: 'auto !important',
        flexWrap: 'wrap',
      },
    };
  },
  cardFeatures: () => {
    return {
      display: 'flex',
      gap: '12px',
      '@media (max-width:600px)': {
        width: '100%',
        justifyContent: 'flex-end',
        mb: 1,
      },
    };
  },
};
