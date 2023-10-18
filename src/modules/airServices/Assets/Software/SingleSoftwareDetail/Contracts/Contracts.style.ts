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
    '@media screen and (max-width: 640px)': {
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
    '@media screen and (max-width: 640px)': {
      marginLeft: '24px',
      marginTop: '12px',
    },
  },

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
