export const styles = (theme: any) => {
  return {
    import_step1: {
      'form > div': {
        height: '277px',
        paddingTop: '25px',
        '& div p': {
          marginTop: '22px',
        },
        '& div >span': {
          display: 'inline-flex',
          paddingTop: '20px',
        },
      },
    },
    head: {
      color: theme.palette.blue['dull_blue'],
      fontSize: '18px',
      fontWeight: 600,
      lineHeight: '24px',
      marginTop: '23px',
    },
    title: {
      color: theme.palette.grey[600],
      fontSize: '14px',
      fontWeight: 500,
      marginBottom: '5px',
      textTransform: 'capitalize',
    },
    desc: {
      color: theme.palette.slateBlue['main'],
      fontSize: '13px',
      fontWeight: 500,
      marginTop: '14px',
    },
    list_ul: {
      margin: '14px 0px',
      listStyle: 'none',
      display: 'flex',
      flexDirection: 'column',
      gap: '14px',
      textTransform: 'capitalize',
      '& li': {
        color: theme.palette.blue['dull_blue'],
        fontSize: '13px',
        fontWeight: 500,
        position: 'relative',
        paddingLeft: '15px',
        '&::before': {
          position: 'absolute',
          content: "''",
          top: '7px',
          left: '0px',
          borderRadius: '50px',
          padding: '3px',
          background: theme.palette.blue['dull_blue'],
        },
      },
    },
    sampleFile: {
      color: '#0AADC7',
      fontSize: '13px',
      fontWeight: 500,
      marginBottom: '40px',
      cursor: 'pointer',
      marginLeft: '-7px',
    },
  };
};
