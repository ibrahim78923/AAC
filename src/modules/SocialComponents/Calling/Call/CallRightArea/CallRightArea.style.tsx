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
  rightWrapper: () => {
    return {
      height: '80vh',
      display: 'flex',
      borderLeft: '1px solid #E5E7EB',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '20px',
    };
  },
  callingWrapper: () => {
    return {
      border: '1px solid #E5E7EB',
      borderRadius: '8px',
      width: '100%',
      height: '50vh',
    };
  },
};
