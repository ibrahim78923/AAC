export const styles: any = {
  iconBoxStyling: (theme: any) => {
    return {
      width: '32px',
      height: '32px',
      border: `1px solid ${theme?.palette?.custom?.dark}`,
      borderRadius: '8px ',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '4px',
      cursor: 'pointer',
    };
  },

  iconKabaMenuStyle: {
    width: '32px',
    height: '32px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '4px',
    cursor: 'pointer',
  },

  iconBoxTimerStyling: {
    width: '80px',
    height: '32px',
    border: 'none',
    borderRadius: '8px ',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '4px',
    cursor: 'pointer',
  },
};
