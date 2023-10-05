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
  },

  buttonBox: {
    marginRight: '12px',
    '@media screen and (max-width: 640px)': {
      marginLeft: '24px',
      marginTop: '12px',
    },
  },

  buttonStyle: {
    marginRight: '12px',
    border: '1px solid #D1D5DB',
    color: '#6B7280',
    '&:hover': {
      border: '1px solid #D1D5DB',
      color: '#6B7280',
      backgroundColor: '#EAECF0',
    },
    '@media screen and (max-width: 640px)': {
      marginTop: '6px',
    },
  },
};
