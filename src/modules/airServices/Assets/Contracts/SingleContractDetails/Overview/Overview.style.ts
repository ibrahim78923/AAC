export const styles = {
  mainContainerBox: (theme: any) => ({
    backgroundColor: theme.palette.primary.light,
    width: '100%',
    borderRadius: '0.375rem',
  }),
  chlidContainerBox: {
    display: 'flex',
    alignItems: 'center',
    padding: '1.25rem',
  },
  borderBox: (theme: any) => ({
    borderBottom: `1px solid ${theme.palette.grey[700]}`,
    height: '2vh',
  }),
};
