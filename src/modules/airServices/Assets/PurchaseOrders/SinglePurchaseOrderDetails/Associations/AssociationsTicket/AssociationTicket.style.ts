export const styles = {
  addButtonStyle: (theme: any) => ({
    marginRight: '12px',
    backgroundColor: theme?.palette?.primary?.light,
    color: theme?.palette?.primary?.main,
    '&:hover': {
      bgcolor: theme?.palette?.grey[400],
    },
  }),

  buttonContainer: {
    display: 'flex',
    justifyContent: 'end',
    marginBottom: '1rem',
  },

  ticketBoxStyle: (theme: any) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '4px 4px 4px rgba(0, 0, 0, 0.1)',
    padding: '.7rem',
    borderRadius: '.6rem',
    borderLeft: '.5rem solid' + theme?.palette?.primary?.main,
  }),

  buttonStyle: (theme: any) => ({
    backgroundColor: theme?.palette?.primary?.light,
    borderRadius: '1rem',
  }),
};
