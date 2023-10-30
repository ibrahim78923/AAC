export const styles = {
  mainBox: (theme: any) => ({
    border: '1.51px solid',
    borderColor: theme.palette.grey?.[700],
    maxWidth: '540px',
    width: '100%',
    height: '400px',
    radius: '8px',
    padding: '10px',
  }),

  heading: {
    marginTop: '20px',
    marginLeft: '23px',
    fontWeight: 600,
    fontSize: '18px',
    lineHeight: '28px',
  },

  contentBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px',
  },

  contentBoxData: (theme: any) => ({
    marginBottom: '12px',
    paddingRight: '20px',
    paddingLeft: '20px',
    borderRadius: '8px',
    display: 'flex',
    backgroundColor: theme.palette.grey?.[100],
    maxWidth: '480px',
    width: '100%',
    height: '52px',
    justifyContent: 'space-between',
    alignItems: 'center',
    '@media screen and (max-width: 480px)': {
      marginBottom: '20px',
      flexDirection: 'column',
      gap: '10px',
      height: 'auto',
    },
  }),
};
