export const styles = {
  leftWrapper: () => {
    return {
      height: '80vh',
      padding: '10px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    };
  },
  leftInset: () => {
    return {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '21vw',
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
    };
  },
  callingWrapper: (theme: any) => {
    return {
      border: `1px solid ${theme.palette.grey[700]}`,
      borderRadius: '8px',
      width: '100%',
      height: '65vh',
    };
  },
  callingAreaBx: (theme: any) => {
    return {
      border: `1px solid ${theme.palette.grey[700]}`,
      borderRadius: '8px',
      width: '20vw',
      height: '65vh',
      padding: '20px 0px',
    };
  },
};
