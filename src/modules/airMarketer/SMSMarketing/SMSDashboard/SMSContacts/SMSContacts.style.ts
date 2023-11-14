export const styles = {
  SMSContactsCardStyle: (theme: any) => {
    return {
      height: 'auto',
      border: `1px solid ${theme?.palette?.grey[700]}`,
      borderRadius: '8px',
      padding: '1rem',
      '.cardWrapper': {
        height: '300px',
        overflowY: 'scroll',
        '.innerCard': {
          border: '1px solid #E5E7EB',
          borderRadius: '8px',
          flexWrap: 'wrap',
          padding: '16px',
          margin: 1,
        },
      },
    };
  },
  SMSContactsHeader: {
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
