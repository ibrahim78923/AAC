export const styles = {
  counterHolder: () => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),
  decrementBtn: () => ({
    height: '32px',
    width: '32px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),
  incrementBtn: () => ({
    height: '32px',
    width: '32px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),
  textField: (theme: any) => ({
    m: '0 10px',

    '& > input': {
      fontSize: '14px',
      border: `1.5px solid ${theme.palette.grey[700]}`,
      borderRadius: '8px',
      width: '58px',
      height: '44px',
      color: theme.palette.grey[900],
      textAlign: 'center',
      '&:focus': {
        outline: '0',
      },
    },
  }),
};
