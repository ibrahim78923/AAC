export const styles = {
  subDiv: {
    backgroundColor: 'white',
    width: '100%',
    boxShadow: '0px 0px 10px -2px rgba(0, 0, 0, 0.19);',
    borderRadius: '8px',
    marginTop: '25px',
    padding: '15px',
    overflow: 'scroll',
    height: '70vh',
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
  mainDiv: (theme: any) => {
    return {
      background: theme?.palette?.custom?.pale_grayish_blue,
      height: '75vh',
      '@media (max-width:700px)': {
        height: 'fit-content',
      },
    };
  },
  formSideBar: {
    backgroundColor: 'white',
    padding: '20px',
    borderTopLeftRadius: '20px',
    borderBottomLeftRadius: '20px',
    height: '70vh',
    overflow: 'scroll',
    marginTop: '25px',
  },
  customField: (theme: any) => {
    return {
      borderRadius: ' 8px',
      border: ` 1px solid ${theme?.palette?.custom?.white_fifty}`,
      marginTop: '25px',
      cursor: 'pointer',
      boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
    };
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
  iconBoxStyling: (theme: any) => {
    return {
      background: theme?.palette?.custom?.light_grey_bg,
      padding: '5px',
      borderRadius: '4px',
      height: '36px',
      width: '36px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    };
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
  parentBox: (theme: any) => {
    return {
      position: 'absolute' as const,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '50vw',
      backgroundColor: theme?.palette?.common?.white,
      p: 2,
      borderRadius: '20px',
      '@media (max-width:1200px)': {
        width: '60vw',
      },
      '@media (max-width:581px)': {
        width: '90vw',
      },
    };
  },
};
