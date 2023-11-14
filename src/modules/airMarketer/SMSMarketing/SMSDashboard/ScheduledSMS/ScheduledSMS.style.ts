export const styles = {
  scheduledSMSCardStyle: (theme: any) => {
    return {
      height: 'auto',
      border: `1px solid ${theme?.palette?.grey[700]}`,
      borderRadius: '8px',
      padding: '1rem',
      '.cardWrapper': {
        height: '340px',
        overflowY: 'scroll',
      },
      '.scheduledSMSHeader': {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        display: 'flex',
        marginBottom: '20px',
      },
    };
  },
  cardHeader: (theme: any) => {
    return {
      background: theme?.palette?.grey[400],
      alignItems: 'center',
      borderRadius: '30px',
      display: 'flex',
      p: '8px 16px',
      gap: 1,
    };
  },
  heading: (theme: any) => {
    return {
      color: `${theme?.palette?.custom.dark_blue}`,
      fontWeight: 600,
    };
  },
};
