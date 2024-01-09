export const styles = {
  subDiv: {
    backgroundColor: 'white',
    minHeight: '60vh',
    width: '100%',
    boxShadow: '0px 0px 10px -2px rgba(0, 0, 0, 0.19);',
    borderRadius: '8px',
    marginTop: '25px',
    padding: '15px',
    '@media (max-width:500px)': {
      width: '100%',
      boxShadow: 'none',
    },
  },
  headerBar: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    paddingBottom: '20px',
    '@media (max-width:900px)': {
      height: 'fit-content',
      paddingY: '20px',
    },
  },
  mainDiv: {
    background: '#F7F9FB',
    height: '100vh',
    '@media (max-width:700px)': {
      height: 'fit-content',
    },
  },
  formSideBar: {
    backgroundColor: 'white',
    padding: '20px',
    borderTopLeftRadius: '20px',
    borderBottomLeftRadius: '20px',
    height: '90vh',
    overflow: 'scroll',
    marginTop: '25px',
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
  iconBoxStyling: {
    background: '#e5e7eb4d',
    padding: '5px',
    borderRadius: '4px',
    height: '36px',
    width: '36px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerIcon: (theme: any) => {
    return {
      cursor: 'pointer',
      padding: '20px',
      borderRadius: '4px',
      marginX: '10px',
      width: '155x',
      '&:hover': {
        background: theme?.palette?.primary?.lighter,
      },
    };
  },
};
