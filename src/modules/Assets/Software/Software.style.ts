export const styles = {
  GridItems: {
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
    border: '1px solid #EAECF0',
  },

  HeadBox: {
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

  ButtonBox: {
    marginRight: '12px',
    '@media screen and (max-width: 640px)': {
      marginLeft: '24px',
      marginTop: '12px',
    },
  },

  ButtonStyle: {
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
