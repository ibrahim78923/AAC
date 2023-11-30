export const styles = {
  dailPadBtn: (theme: any) => {
    return {
      background: theme?.palette?.grey[400],
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      display: 'flex',
      flexDirection: 'column',
      alignIems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
    };
  },
  dailkeysWrapper: () => {
    return {
      width: '160px',
    };
  },
  phoneDispWrapper: () => {
    return {
      width: '180px',
      height: '30px',
      overflow: 'hidden',
      textAlign: 'center',
    };
  },
};
