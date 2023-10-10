export const styles = {
  mainBox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '32px',
    width: '100%',
    '@media screen and (max-width: 550px)': {
      flexWrap: 'wrap',
      justifyContent: 'start',
      marginTop: '2px',
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

  addButtonStyle: (theme: any) => ({
    marginRight: '12px',
    backgroundColor: theme.palette.primary?.main,
    color: '#FFFFFF',
    '&:hover': {
      backgroundColor: theme.palette.primary?.main,
    },
    '@media screen and (max-width: 640px)': {
      marginTop: '6px',
    },
  }),
};
