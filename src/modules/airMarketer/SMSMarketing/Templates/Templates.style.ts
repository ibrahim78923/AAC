export const styles = {
  createBtn: {
    display: 'flex',
    columnGap: '10px',
    height: '38px',
    fontWeight: '500',
    '@media (max-width: 500px)': {
      marginTop: '15px',
      width: '100%',
    },
  },
  searchAction: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: '1rem',
    '@media (max-width: 500px)': {
      marginTop: '15px',
    },
  },

  actionBtn: (theme: any) => {
    return {
      border: `1px solid ${theme?.palette?.custom?.dark}`,
      borderRadius: '4px',
      color: `${theme?.palette?.custom?.main}`,
      display: 'flex',
      alignItems: 'center',
      padding: '6px 15px',
      height: '36px',
      '@media (max-width: 500px)': {
        marginTop: '15px',
        width: '100%',
      },
      '&:disabled': {
        color: theme?.palette?.grey[0],
      },
    };
  },
};
