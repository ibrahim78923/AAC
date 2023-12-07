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
    };
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
  },
  buttonStyleOFTimeEntries: {
    maxWidth: '100%',
  },
  buttonHeigh: {
    width: '100%',
    height: '100%',
  },
  timeEnterMainGride: (theme: any) => {
    return {
      justifyContent: 'space-between',
      display: 'flex',
      flexDirection: 'row',
      maxWidth: '100%',
      marginTop: '4rem',
      border: `2px solid ${theme?.palette?.custom?.dark}`,
      borderRadius: '8px',
    };
  },
  timeEnterSecGride: () => {
    return {
      justifyContent: 'space-between',
      display: 'flex',
      flexDirection: 'row',
      maxWidth: '100%',
    };
  },
  timeEnterInnerGrid: {
    display: 'flex',
    m: '1rem',
  },
  timeEnterInnerSecGrid: {
    display: 'flex',
    m: '4rem',
    flexDirection: 'column',
  },
  timeEnterInnerBox: {
    display: 'flex',
    justifyContent: 'space-between',
    m: '4px',
    flexDirection: 'row',
  },
  timeEnterInnerSecBox: {
    display: 'flex',
    justifyContent: 'space-between',
    m: '4px',
    flexDirection: 'row',
    mt: '2rem',
  },
  timeEnterInnerThirdGrid: {
    display: 'flex',
    m: '1rem',
    flexDirection: 'column',
    justifyContent: 'end',
  },
  timeEnterInnerThirdBox: {
    display: 'flex',
    m: '4px',
    flexDirection: 'column',
  },
  timeEnterInnerTypography: {
    ml: '4rem',
    justifyContent: 'end',
    display: 'flex',
  },
};
