export const styles = {
  refreshButton: {
    width: '54px',
    height: '40px',
    border: '1.5px solid #e7e7e9',
    '&:hover': {
      background: '#F3F4F6 !important',
      border: '1.5px solid transparent',
    },
  },
  filterButton: (theme: any) => {
    return {
      width: '95px',
      height: '40px',
      border: '1.5px solid #e7e7e9',
      fontWeight: 500,
      color: theme?.palette.grey[600],
      '&:hover': {
        background: '#F3F4F6 !important',
        border: '1.5px solid transparent',
      },
    };
  },
};
