export const styles = {
  scheduledSMSCardStyle: (theme: any) => {
    return {
      border: `1px solid ${theme?.palette?.grey[700]}`,
      borderRadius: '8px',
      padding: '1rem',
      height: 'auto',

      '.cardWrapper': {
        overflowY: 'scroll',
        height: '340px',
      },

      '.scheduledSMSHeader': {
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        flexWrap: 'wrap',
        display: 'flex',
      },
    };
  },
  cardHeader: (theme: any) => {
    return {
      background: theme?.palette?.grey[400],
      alignItems: 'center',
      width: 'fit-content',
      borderRadius: '30px',
      display: 'flex',
      p: '8px 16px',
      gap: 1,
    };
  },

  heading: (theme: any) => {
    return {
      color: `${theme?.palette?.custom.dark_blue}`,
      fontWeight: `${theme?.typography?.fontWeightMedium}`,
    };
  },
};
