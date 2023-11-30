export const styles = {
  customModal: () => {
    return {
      '& .css-wh8348-MuiBackdrop-root-MuiModal-backdrop': {
        background:
          'linear-gradient(75deg, rgb(83 83 83 / 37%) 0%, rgb(27 27 27 / 53%) 100%) !important',
      },
    };
  },
  infoModalWrapper: () => {
    return {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 425,
      bgcolor: 'background.paper',
      boxShadow: 24,
      p: 2,
      borderRadius: '8px',
    };
  },
  chatInfoDetails: (theme: any) => {
    return {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      color: theme?.palette?.custom?.grayish_blue,
    };
  },

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
