export const styles = {
  typographyStyle: (theme: any) => ({
    color: theme.palette.slate_blue?.[0],
    fontSize: '24px',
    fontWeight: 600,
    marginLeft: '24px',
  }),

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
  actionbuttonStyle: () => ({
    marginRight: '12px',
    border: '1px solid #D1D5DB',
    color: 'custom.main',
    ':hover': { bgcolor: 'common.white' },
    '@media screen and (max-width: 640px)': {
      marginTop: '6px',
      display: 'flex',
      alignItems: 'center',
      justifyContents: 'center',
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

  headerStyle: (theme: any) => ({
    lineHeight: '18px',
    fontWeight: 800,
    fontSize: '14px',
    color: theme.palette.blue?.main,
  }),

  firstCellStyle: {
    lineHeight: '18px',
    fontWeight: 500,
    fontSize: '14px',
    color: '#0AADC7',
  },

  cellStyle: (theme: any) => ({
    lineHeight: '18px',
    fontWeight: 500,
    fontSize: '14px',
    color: theme.palette.grey?.[500],
  }),
};
