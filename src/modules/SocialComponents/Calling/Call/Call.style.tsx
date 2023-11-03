export const styles = {
  leftWrapper: () => {
    return {
      height: '80vh',
      borderRadius: '8px',
      '@media (max-width:1200px)': {
        height: 'auto !important',
      },
    };
  },
  rightWrapper: () => {
    return {
      borderLeft: '1.5px solid #e7e7e9',
    };
  },
};
