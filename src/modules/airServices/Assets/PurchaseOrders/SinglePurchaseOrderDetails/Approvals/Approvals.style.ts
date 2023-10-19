export const styles = {
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

  buttonContainer: {
    display: 'flex',
    justifyContent: 'end',
  },

  approvalBox: {
    marginTop: '2rem',
  },
};
