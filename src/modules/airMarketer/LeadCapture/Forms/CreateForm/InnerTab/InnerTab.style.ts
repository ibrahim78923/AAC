export const styles = {
  subDiv: (showView: any) => {
    return {
      backgroundColor: 'white',
      height: '60vh',
      width: showView ? '40%' : '67%',
      boxShadow: '0px 0px 10px -2px rgba(0, 0, 0, 0.19);',
      borderRadius: '8px',
      margin: 'auto',
      padding: '15px',
      '@media (max-width:500px)': {
        width: '100%',
        boxShadow: 'none',
      },
    };
  },

  innerBox: {
    backgroundColor: 'white',
    height: '56vh',
    width: '99%',
    boxShadow:
      '0px 2px 4px -2px rgba(16, 24, 40, 0.06), 0px 4px 8px -2px rgba(16, 24, 40, 0.10);',
    borderRadius: '4px',
    marginTop: '25px',
    margin: 'auto',
    padding: '20px',
    position: 'relative',
    overflow: 'scroll',
    '@media (max-width:500px)': {
      width: '100%',
      boxShadow: 'none',
    },
  },

  hoverEffect: {
    position: 'absolute',
    top: '0px',
    right: '10px',
    zIndex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: '10px',
  },
};
