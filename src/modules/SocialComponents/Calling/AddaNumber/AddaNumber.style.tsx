export const styles = {
  wrapperContainer: () => {
    return {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      height: '70vh',
      gap: '32px',
      '@media (max-width:600px)': {
        height: 'auto !important',
      },
    };
  },
  insetWrapper: () => {
    return {
      position: 'relative',
      width: '480px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '16px',
      '@media (max-width:600px)': {
        width: '80% !important',
      },
    };
  },
  dropDown: () => {
    return {
      width: '100%',
      boxShadow:
        '0px 4px 6px -2px rgba(16, 24, 40, 0.03), 0px 12px 16px -4px rgba(16, 24, 40, 0.08)',
      maxHeight: '224px',
      padding: '8px',
      borderRadius: '8px',
    };
  },
};
