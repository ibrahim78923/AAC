export const styles = {
  pageHeader: () => ({
    padding: '16px 24px',
  }),
  heading: () => ({
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    alignItems: 'center',
  }),
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
    '@media (max-width: 940px)': {
      display: 'block',
    },
  }),
  filterButtons: () => ({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '10px',
    '@media (max-width: 940px)': {
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
      border: `1.5px solid ${theme?.palette?.custom?.border_grayish_blue}`,
      '@media (max-width:560px)': {
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
      '@media (max-width:560px)': {
        width: '100%',
      },
      '&:hover': {
        background: `${theme?.palette?.grey[400]}`,
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
