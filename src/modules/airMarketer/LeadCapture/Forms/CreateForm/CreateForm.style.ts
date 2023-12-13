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
  headerBar: {
    backgroundColor: 'white',
    height: '80px',
    alignItems: 'center',
    borderBottom: '1px solid #E5E7EB',
    justifyContent: 'space-between',
    textAlign: 'center',
    '@media (max-width:900px)': {
      height: 'fit-content',
      paddingY: '20px',
    },
  },
  saveChangesBtn: {
    color: '#47B263',
    background: '#ECFDF3',
    width: 'fit-content',
    fontWeight: '500',
    padding: '7px 10px',
    borderRadius: '20px',
    cursor: 'pointer',
  },
  mainDiv: {
    background: '#F7F9FB',
    height: '100vh',
    '@media (max-width:700px)': {
      height: 'fit-content',
    },
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
  formSideBar: {
    backgroundColor: 'white',
    padding: '20px',
    borderTopLeftRadius: '20px',
    borderBottomLeftRadius: '20px',
    height: '90vh',
    overflow: 'scroll',
  },
  customField: {
    borderRadius: ' 8px',
    border: '1px solid #E5E7EB',
    marginTop: '25px',
    cursor: 'pointer',
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
