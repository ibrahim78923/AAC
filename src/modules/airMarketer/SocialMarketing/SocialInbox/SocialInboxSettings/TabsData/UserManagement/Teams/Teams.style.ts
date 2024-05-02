export const styles = {
  activeMemberBox: (theme: any) => {
    return {
      border: `1px solid ${theme?.palette?.custom?.bluish_gray}`,
      borderRadius: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: `${theme?.palette?.grey[100]}`,
      padding: '1rem',
      marginTop: '1rem',
    };
  },
};
