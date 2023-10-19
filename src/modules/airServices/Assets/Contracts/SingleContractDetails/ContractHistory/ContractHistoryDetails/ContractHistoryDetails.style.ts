export const styles = {
  activityTimeDetails: (theme: any) => {
    return {
      color: theme?.palette?.grey[600],
      textAlign: 'center',
      fontSize: '12px',
      fontStyle: 'normal',
      fontWeight: 500,
      marginRight: '22px',
      letterSpacing: '-0.24px',
    };
  },
  renewCreateText: (theme: any) => {
    return {
      color: theme?.palette?.primary.main,
      fontSize: '14px',
      fontStyle: 'normal',
      fontWeight: 600,
    };
  },
  datestamp: (theme: any) => {
    return {
      color: theme?.palette?.grey[600],
      fontSize: '14px',
      fontStyle: 'normal',
      fontWeight: 600,
    };
  },
  activityDetails: () => {
    return {
      color: 'custom.main',
      fontSize: '14px',
      fontStyle: 'normal',
      fontWeight: 600,
      letterSpacing: '-0.28px',
    };
  },
  activityDetailsButton: (theme: any) => {
    return {
      color: theme?.palette?.grey[600],
      background: theme?.palette?.primary.lighter,
      fontSize: '12px',
      fontStyle: 'normal',
      fontWeight: 400,
      letterSpacing: '-0.24px',
    };
  },
};
