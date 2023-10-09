export const activityStyles = {
  exportBtn: () => {
    return {
      color: 'slateBlue.light',
      fontSize: '14px',
      fontStyle: 'normal',
      fontWeight: 500,
      lineHeight: '20px',
      letterSpacing: '-0.28px',
    };
  },
  activityTimeDetails: (theme: any) => {
    return {
      color: theme?.palette?.grey[600],
      textAlign: 'center',
      fontSize: '12px',
      fontStyle: 'normal',
      fontWeight: 500,

      marginRight: '22px',
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
};
