export const styles = {
  downloadIcon: (theme: any) => {
    return {
      border: `1px solid ${theme?.palette?.grey[700]}`,
      width: '52px',
      height: '52px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '8px',
      cursor: 'pointer',
    };
  },
  refreshButton: (theme: any) => {
    return {
      width: '54px',
      border: `1.5px solid ${theme?.palette?.custom?.border_grayish_blue}`,
      '@media (max-width:600px)': {
        width: '100%',
      },
      '&:hover': {
        background: `${theme?.palette?.grey[400]}`,
        border: '1.5px solid transparent',
      },
    };
  },
};
