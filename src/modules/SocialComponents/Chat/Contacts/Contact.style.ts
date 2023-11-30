export const styles = {
  wrapperButtons: (theme: any) => {
    return {
      padding: '20px 0px',
      borderBottom: `1px solid ${theme?.palette?.grey[700]}`,
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
    };
  },
  toggleButtonLeft: (theme: any) => {
    return {
      border: `1.5px solid ${theme?.palette?.grey[700]}`,
      borderRadius: '8px 0px 0px 8px',
      height: '36px',
      padding: '0px 10px',
      '&.Mui-selected': {
        background: `${theme?.palette?.blue?.main} !important`,
        color: '#fff',
      },
    };
  },
  toggleButtonRight: (theme: any) => {
    return {
      border: `1.5px solid ${theme?.palette?.grey[700]}`,
      borderRadius: '0px 8px 8px 0px',
      height: '36px',
      padding: '0px 10px',
      '&.Mui-selected': {
        background: `${theme?.palette?.blue?.main} !important`,
        color: '#fff',
      },
    };
  },
};
