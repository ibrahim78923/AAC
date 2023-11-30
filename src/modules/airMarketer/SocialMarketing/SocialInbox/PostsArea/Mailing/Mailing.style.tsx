export const styles = {
  mainMailingWrapper: () => {
    return {};
  },
  contentContainer: () => {
    return {
      boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.10)',
      // padding: '14px',
      position: 'relative',
      mb: 2,
    };
  },
  mailMenu: () => {
    return {
      position: 'absolute',
      right: '14px',
      top: '14px',
      display: 'flex',
      alignItems: 'center',
      '@media (max-width:500px)': {
        flexDirection: 'column',
        alignItems: 'flex-end',
      },
    };
  },
  menuItems: () => {
    return {
      borderLeft: '1px solid #E9EAEF',
      marginLeft: '10px',
      paddingLeft: '10px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      '@media (max-width:500px)': {
        borderLeft: '1px solid transparent',
      },
    };
  },
  sendMailButton: () => {
    return {
      borderRadius: '6px',
      overflow: 'hidden !important',
      button: {
        borderRadius: '0px',
        minWidth: 'auto',
      },
    };
  },
  unStyledButton: () => {
    return {
      borderRadius: '50%',
      width: 'fit-content',
      minWidth: 'fit-content',
      height: 'fit-content',
      margin: '0',
      padding: '0',
    };
  },
};
