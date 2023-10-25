export const styles = {
  cardStyle: (theme: any) => ({
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
    boxShadow: '.2rem .2rem .2rem rgba(0, 0, 0, 0.1)',
    padding: '1.2rem',
    borderRadius: '.6rem',
    borderLeft: '.5rem solid' + theme?.palette?.primary?.main,
    marginBottom: '1rem',
    flexWrap: 'wrap',
  }),

  headingTypography: (theme: any) => ({
    color: theme?.palette?.primary?.main,
    fontSize: '.9rem',
    fontWeight: '30rem',
  }),

  iconBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '.5rem',
    cursor: 'pointer',
  },

  dividerStyle: (theme: any) => ({
    marginRight: '2rem',
    marginLeft: '2rem',
    border: '1px solid' + theme?.palette?.grey[700],
    backgroundColor: 'transparent',
  }),
  spanStyle: (theme: any) => ({
    fontSize: '.9rem',
    marginRight: '.3rem',
    color: theme?.palette?.grey[900],
  }),
};
