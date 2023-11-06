export const styles = {
  leftWrapper: () => {
    return {
      height: '80vh',
      padding: '10px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      '@media (max-width:1200px)': {
        height: 'auto !important',
      },
    };
  },
  leftInset: () => {
    return {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '21vw',
      '@media (max-width:1200px)': {
        width: '80%',
      },
    };
  },
  rightWrapper: (theme: any) => {
    return {
      height: '80vh',
      display: 'flex',
      borderLeft: `1px solid ${theme.palette.grey[700]}`,
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '20px',
      '@media (max-width:1200px)': {
        height: 'auto !important',
      },
    };
  },
  callingWrapper: (theme: any) => {
    return {
      border: `1px solid ${theme.palette.grey[700]}`,
      borderRadius: '8px',
      width: '100%',
      height: '65vh',
      '@media (max-width:1200px)': {
        height: 'auto !important',
        padding: '15px',
      },
    };
  },
};
