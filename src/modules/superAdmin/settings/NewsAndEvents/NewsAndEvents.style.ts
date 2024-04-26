export const styles = {
  search: () => ({
    maxWidth: '260px',
    '@media (max-width:560px)': {
      maxWidth: '100%',
    },
  }),
  filterBar: () => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    pt: '32px',
    width: '100%',
    '@media (max-width: 1036px)': {
      display: 'block',
    },
  }),
  filterButtons: () => ({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '10px',
    '@media (max-width: 1036px)': {
      mt: '10px',
    },
  }),
  actionBtn: (theme: any) => ({
    color: theme?.palette?.grey[500],
    width: '112px',
    border: `1.5px solid ${theme?.palette?.custom?.border_grayish_blue}`,
    '@media (max-width:560px)': {
      width: '100%',
    },
  }),
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
