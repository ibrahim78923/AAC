export const style = {
  mainBox: (theme: any) => {
    return {
      border: `1px solid ${theme?.palette?.grey[700]}`,
      borderRadius: '8px',
      padding: '1rem',
      display: 'flex',
      justifyContent: 'space-between',
      cursor: 'pointer',
      background:
        'linear-gradient(180deg, rgba(96, 213, 196, 0.084) 0%, rgba(96, 213, 196, 0) 100%)',
    };
  },
  completePercent: (theme: any) => {
    return {
      background: `${theme.palette.primary.main}`,
      borderRadius: '6px',
      paddingLeft: '5px',
      paddingRight: '5px',
      paddingTop: '2px',
      paddingBottom: '2px',
    };
  },
  pendingPercent: (theme: any) => {
    return {
      background: `${theme.palette.error.main}`,
      borderRadius: '6px',
      paddingLeft: '5px',
      paddingRight: '5px',
      paddingTop: '2px',
      paddingBottom: '2px',
    };
  },
  enquryTypo: () => {
    return {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      fontWeight: 500,
      color: '#374151',
      lineHeight: '20px',
    };
  },
};
