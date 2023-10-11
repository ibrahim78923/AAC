export const styles = {
  gridItems: {
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
    border: '1px solid #EAECF0',
  },

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
};
