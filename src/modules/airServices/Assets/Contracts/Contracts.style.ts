export const styles = {
  gridItems: {
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
    border: '1px solid #EAECF0',
  },
  parentBoxAddContract: {
    border: '2px solid #EAECF0',
    p: '20px',
    height: { lg: '75vh' },
    mb: '10px',
    overflow: 'scroll',
  },
  childBoxAddContract: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
    mr: '30px',
  },
  cancelButtonAddContract: (theme: any) => ({
    color: theme.palette.grey[500],
    border: '1px solid #E5E7EB',
    padding: '25px',
    fontWeight: '500',
  }),

  headBox: {
    marginTop: '12px',
    marginBottom: '12px',
    display: 'flex',
    justifyContent: 'space-between',
    '@media screen and (max-width: 924px)': {
      flexWrap: 'wrap',
      marginLeft: '24px',
      marginTop: '12px',
    },
    '@media screen and (max-width: 450px)': {
      paddingRight: '25px',
      marginLeft: '0px',
    },
  },

  buttonBox: {
    marginRight: '12px',
    '@media screen and (max-width: 924px)': {
      marginLeft: '24px',
      marginTop: '12px',
    },
  },

  buttonStyle: (theme: any) => ({
    marginRight: '12px',
    borderColor: theme.palette.grey?.[0],
    color: theme.palette.grey?.[500],
    '&:hover': {
      borderColor: theme.palette.grey?.[0],
      backgroundColor: '#EAECF0',
    },
    '@media screen and (max-width: 640px)': {
      marginTop: '6px',
    },
  }),

  exportButtonStyle: (theme: any) => ({
    marginRight: '12px',
    color: theme.palette.grey?.[500],
    border: 'none',
    '&:hover': {
      border: 'none',
      color: theme.palette.grey?.[500],
      backgroundColor: '#EAECF0',
    },
    '@media screen and (max-width: 740px)': {
      marginTop: '4px',
    },
  }),
};
