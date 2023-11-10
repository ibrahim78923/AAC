export const styles = {
  scheduledSMSCardStyle: (theme: any) => {
    return {
      border: `1px solid ${theme?.palette?.grey[700]}`,
      borderRadius: '8px',
      padding: '1rem',
    };
  },
  scheduledSMSHeader: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heading: (theme: any) => {
    return {
      color: `${theme?.palette?.custom.dark_blue}`,
      fontWeight: 600,
    };
  },
};
