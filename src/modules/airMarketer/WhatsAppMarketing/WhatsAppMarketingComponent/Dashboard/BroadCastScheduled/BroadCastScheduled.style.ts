export const styles = {
  scheduledSMSCardStyle: (theme: any) => {
    return {
      height: '432px',
      border: `1px solid ${theme?.palette?.grey[700]}`,
      borderRadius: '8px',
      padding: '8px',
      '.cardWrapper': {
        height: '350px',
        overflowY: 'scroll',
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
      fontSize: '14px',
      fontWeight: '500',
      width: 'fit-content',
      borderRadius: '30px',
      display: 'flex',
      p: '6px 12px',
      gap: 1,
      mr: 1,
    };
  },

  heading: (theme: any) => {
    return {
      color: `${theme?.palette?.custom?.dark_blue}`,
      fontWeight: `${theme?.typography?.fontWeightMedium}`,
    };
  },
};
