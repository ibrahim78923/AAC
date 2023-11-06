export const styles = {
  mainBox: (theme: any) => ({
    border: '.1rem solid',
    borderColor: theme?.palette?.grey?.[700],
    maxWidth: '33.7rem',
    width: '100%',
    height: '25rem',
    radius: '.5rem',
    padding: '.6rem',
  }),

  heading: {
    marginTop: '1.25rem',
    marginLeft: '1.4rem',
    fontWeight: 600,
    fontSize: '1.1rem',
    lineHeight: '1.7rem',
  },

  contentBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '1.2rem',
  },

  contentBoxData: (theme: any) => ({
    marginBottom: '.7rem',
    paddingRight: '1.2rem',
    paddingLeft: '1.2rem',
    borderRadius: '.5rem',
    display: 'flex',
    backgroundColor: theme?.palette?.grey?.[100],
    maxWidth: '30rem',
    width: '100%',
    height: '3.2rem',
    justifyContent: 'space-between',
    alignItems: 'center',
    '@media screen and (max-width: 30rem)': {
      marginBottom: '1.2rem',
      flexDirection: 'column',
      gap: '.6rem',
      height: 'auto',
    },
  }),
};
