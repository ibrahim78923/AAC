export const styles = {
  mainBoxStyle: (theme: any) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: '.1rem solid ' + theme.palette.grey?.[0],
    borderRadius: '.5rem',
    padding: '.7rem',
    marginBottom: '1rem',
  }),

  subBoxStyle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1rem',
  },

  buttonStyle: (theme: any) => ({
    backgroundColor: theme?.palette?.primary?.light,
    borderRadius: '1rem',
  }),
};
