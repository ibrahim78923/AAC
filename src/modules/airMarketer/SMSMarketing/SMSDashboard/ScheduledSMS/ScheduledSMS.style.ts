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
      // width: 'fit-content',
      width: '130px',
      borderRadius: '30px',
      p: '8px 16px',
    };
  },

  heading: (theme: any) => {
    return {
      color: `${theme?.palette?.blue?.light}`,
      fontWeight: `${theme?.typography?.fontWeightMedium}`,
    };
  },
};
