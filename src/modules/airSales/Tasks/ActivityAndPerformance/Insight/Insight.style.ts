export const styles = (theme: any) => {
  return {
    activity: {
      color: theme.palette.blue['main'],
      fontSize: '14px',
      fontWeight: 500,
      marginBottom: '24px',
      display: 'flex',
      aligItems: 'center',
      gap: '10px',
    },
    dateRange: {
      color: theme.palette.custom['main'],
      fontSize: '14px',
      fontWeight: 500,
      display: 'flex',
      aligItems: 'center',
      gap: '10px',
    },
    weekCard: {
      textAlign: 'center',
      background: theme.palette.grey[100],
      border: `1px solid ${theme.palette.custom['bluish_gray']}`,
      margin: '24px 0px',
      borderRadius: '10px',
      padding: '20px 12px 2px 12px',
      '& .week_title': {
        color: theme.palette.slateBlue['main'],
        fontSize: '14px',
        fontWeight: 600,
      },
      '& .week_count': {
        color: theme.palette.slateBlue['main'],
        fontSize: '14px',
        fontWeight: 600,
        margin: '20px 0px 10px 0px',
      },
      '& .week_desc': {
        color: theme.palette.custom['main'],
        fontSize: '12px',
        fontWeight: 500,
        textAlign: 'start',
      },
    },
    activityReportDate: {
      color: theme.palette.custom['main'],
      fontSize: '12px',
      fontWeight: 500,
    },
  };
};
