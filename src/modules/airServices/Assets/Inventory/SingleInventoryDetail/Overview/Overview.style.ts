export const styles = {
  mainContainerBox: (theme: any) => ({
    backgroundColor: theme?.palette?.primary?.light,
    width: '100%',
    borderRadius: '0.375rem',
  }),
  childContainerBox: {
    display: 'flex',
    alignItems: 'center',
    padding: '1.25rem',
  },
  borderBox: (theme: any) => ({
    borderBottom: `0.0625rem solid ${theme?.palette?.divider}`,
    height: '2vh',
  }),
};
