export const styles = {
  filterBar: () => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    p: '32px 24px 16px',
    width: '100%',
    '@media (max-width: 600px)': {
      display: 'block',
    },
  }),
  search: () => ({
    maxWidth: '260px',
    '@media (max-width:600px)': {
      maxWidth: '100%',
    },
  }),
  filterButtons: () => ({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '10px',
    '@media (max-width: 600px)': {
      mt: '10px',
    },
  }),
  actionBtn: (theme: any) => ({
    color: theme?.palette?.grey[500],
    width: '112px',
    border: `1.5px solid ${theme?.palette?.custom?.border_grayish_blue}`,
    '@media (max-width:600px)': {
      width: '100%',
    },
  }),
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
  filterButton: (theme: any) => {
    return {
      width: '95px',
      border: `1.5px solid ${theme?.palette?.custom?.border_grayish_blue}`,
      fontWeight: 500,
      color: theme?.palette?.grey[600],
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
