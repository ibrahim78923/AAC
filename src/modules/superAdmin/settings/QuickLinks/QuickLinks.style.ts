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
  quickLinksCard: (theme: any) => {
    return {
      borderRadius: '8px',
      border: `1px solid ${theme?.palette.grey[700]}`,
      boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
    };
  },
  quickLinksCardHead: (theme: any) => {
    return {
      background: theme?.palette.primary['lighter'],
      height: '48px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };
  },
};
