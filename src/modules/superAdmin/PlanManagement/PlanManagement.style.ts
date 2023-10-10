export const styles = {
  main: {
    boxShadow: '0px 1px 3px 0px rgba(16, 24, 40, 0.1)',
    padding: '1.5rem',
  },
  planManagementHeading: {
    fontWeight: 600,
    lineHeight: '30px',
    letterSpacing: '-2%',
  },
  linkStyle: {
    '@media (max-width: 400px)': {
      width: '100%',
    },
  },
  actionButton: (theme: any) => {
    return {
      border: `1px solid ${theme?.palette?.custom.dark}`,
      borderRadius: '4px',
      color: `${theme?.palette?.custom.main}`,
      display: 'flex',
      alignItems: 'center',
      padding: '18px',
      width: '112px',
    };
  },
  filterButton: (theme: any) => {
    return {
      width: '96px',
      padding: '18px',
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
