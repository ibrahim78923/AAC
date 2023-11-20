export const styles = {
  wrapperBox: () => {
    return {
      display: 'flex',
      justifyContent: 'center',
    };
  },
  mainWrapperBox: () => {
    return {
      padding: '20px 20px',
      width: '100%',
      backgroundColor: 'white',
      minHeight: '87vh',
      borderRadius: '8px',
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

  filterButton: {
    border: '1.5px solid #e7e7e9',
    borderRadius: '8px',
    color: '#6B7280',
    gap: 0.5,
    padding: '0px 15px',
  },
};
