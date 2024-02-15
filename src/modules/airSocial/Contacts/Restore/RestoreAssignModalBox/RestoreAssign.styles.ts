export const styles = {
  parentBox: () => {
    return {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };
  },

  modalBox: (theme: any) => {
    return {
      background: 'white',
      borderRadius: '20px',
      maxWidth: '580px',
      width: '100%',
      border: `1px solid ${theme?.palette?.grey[700]}`,
      boxShadow: '0px 4px 24px -4px rgba(16, 24, 40, 0.02)',
      margin: 'auto',
      minHeight: '190px',
      padding: '24px',
      '@media (max-width:581px)': {
        maxWidth: '100%',
        margin: '0 12px',
      },
    };
  },
  innerBoxOne: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  innerBoxTwo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '10px',
  },
  modalTypeText: (theme: any) => {
    return {
      color: theme?.palette?.slateBlue?.main,
      fontSize: '24px',
      fontStyle: 'normal',
      fontWeight: 600,
      lineHeight: '30px',
      textTransform: 'capitalize',
    };
  },
  buttonBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '16px',
  },
};
