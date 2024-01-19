export const styles = {
  chatFooterWrapper: (theme: any) => {
    return {
      border: `1px solid ${theme.palette.grey[700]}`,
      borderRadius: '8px',
    };
  },
  chatReply: (theme: any) => {
    return {
      position: 'relative',
      background: theme?.palette?.primary?.lighter,
      borderRadius: '8px',
      padding: '10px',
      width: '97%',
      margin: '0 auto',
      marginTop: '12px',
      border: `1px solid ${theme?.palette?.grey[700]}`,
    };
  },

  customButtons: (theme: any) => {
    return {
      backgroundColor: theme?.palette?.primary?.main,
      padding: '9px 20px',
      margin: '0 auto',
      marginTop: '12px',
      display: 'flex',
      alignItems: 'center',
      borderRadius: '8px',
      color: theme.palette?.common?.white,
      fontSize: '14px',
    };
  },

  chatFooter: () => {
    return {
      height: '57px',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '10px',
      padding: '0px 10px',
    };
  },
  chatTextarea: () => {
    return {
      width: '100%',
      '& .css-1d3z3hw-MuiOutlinedInput-notchedOutline': {
        border: '0px',
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
