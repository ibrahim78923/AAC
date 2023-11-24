export const style = {
  mainBox: (theme: any) => {
    return {
      border: `1px solid ${theme?.palette?.grey[700]}`,
      borderRadius: '8px',
      paddingLeft: '16px',
      paddingTop: '16px',
      background:
        'linear-gradient(180deg, rgba(96, 213, 196, 0.084) 0%, rgba(96, 213, 196, 0) 100%)',
    };
  },
  chartBox: () => {
    return {
      paddingLeft: { lg: '10rem', md: '0rem', sm: '3rem', xs: '0rem' },
    };
  },
  completePercent: (theme: any) => {
    return {
      background: `${theme.palette.primary?.main}`,
      borderRadius: '6px',
      paddingLeft: '5px',
      paddingRight: '5px',
      paddingTop: '2px',
      paddingBottom: '2px',
      fontWeight: 400,
      color: `${theme?.palette?.common?.white}`,
    };
  },
  pendingPercent: (theme: any) => {
    return {
      background: `${theme.palette.error?.main}`,
      borderRadius: '6px',
      paddingLeft: '5px',
      paddingRight: '5px',
      paddingTop: '2px',
      paddingBottom: '2px',
      fontWeight: 400,
      color: `${theme?.palette?.common?.white}`,
    };
  },
  enquryTypo: (theme: any) => {
    return {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      fontWeight: 500,
      color: `${theme?.palette?.slateBlue?.main}`,
      lineHeight: '20px',
    };
  },
};
