export const styles = {
  mainContainerBox: (theme: any) => ({
    backgroundColor: theme?.palette?.primary?.light,
    width: '100%',
    borderRadius: '6px',
  }),
  childContainerBox: {
    display: 'flex',
    alignItems: 'center',
    padding: '20px',
  },
  borderBox: (theme: any) => ({
    borderBottom: '1px solid ' + theme?.palette?.grey?.[700],
    height: '2vh',
  }),
};
