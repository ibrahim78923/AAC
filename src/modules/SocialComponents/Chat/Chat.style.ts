export const styles = {
  leftWrapper: (theme: any) => {
    return {
      backgroundColor: theme?.palette?.common?.white,
      height: '85vh',
      border: `1.5px solid ${theme?.palette?.grey[100]}`,
      borderRadius: '8px',
      padding: '10px 0px',
    };
  },
  rightWrapper: () => {
    return {
      backgroundColor: '#FFFFFF',
      border: '1.5px solid #e7e7e9',
      borderRadius: '8px',
    };
  },
  usersBox: () => {
    return {
      height: '200px',
      overflow: 'scroll',
      mt: 1,
    };
  },
  userCard: () => {
    return {
      p: 1,
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      cursor: 'pointer',
      width: '100%',
      justifyContent: 'flex-start',
      '&:hover': {
        background: '#efefef',
      },
    };
  },
};
