export const styles = {
  typography: {
    fontWeight: 600,
    fontSize: '24px',
  },

  headBox: {
    marginBottom: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '@media screen and (max-width: 640px)': {
      flexWrap: 'wrap',
      marginLeft: '24px',
    },
  },

  subHeadBoxBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginLeft: '24px',
  },

  actionBox: {
    marginRight: '24px',
    '@media screen and (max-width: 640px)': {
      marginLeft: '60px',
      marginTop: '12px',
    },
  },
};
