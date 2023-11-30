export const styles = {
  refreshButton: (theme: any) => {
    return {
      width: '54px',
      border: '1.5px solid #e7e7e9',
      '&:hover': {
        background: `${theme?.palette?.grey[400]}`,
        border: '1.5px solid transparent',
      },
      '@media (max-width:581px)': {
        width: '100%',
      },
    };
  },
  filterButton: (theme: any) => {
    return {
      width: '95px',
      border: '1.5px solid #e7e7e9',
      fontWeight: 500,
      color: theme?.palette?.grey[600],
      '&:hover': {
        background: `${theme?.palette?.grey[400]}`,
        border: '1.5px solid transparent',
      },
      '@media (max-width:581px)': {
        width: '100%',
      },
    };
  },
};
