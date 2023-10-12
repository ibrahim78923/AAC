export const styles = {
  wrapperButtons: () => {
    return {
      padding: '20px 0px',
      borderBottom: '1px solid #E5E7EB',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
    };
  },
  toggleButtonLeft: () => {
    return {
      border: '1.5px solid #E5E7EB',
      borderRadius: '8px 0px 0px 8px',
      height: '36px',
      padding: '0px 10px',
      '&.Mui-selected': {
        background: ' #1F305D !important',
        color: '#fff',
      },
    };
  },
  toggleButtonRight: () => {
    return {
      border: '1.5px solid #E5E7EB',
      borderRadius: '0px 8px 8px 0px',
      height: '36px',
      padding: '0px 10px',
      '&.Mui-selected': {
        background: ' #1F305D !important',
        color: '#fff',
      },
    };
  },
};
