export const styles = {
  container: () => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  text: (theme: any) => ({
    fontSize: '16px',
    fontWeight: '500',
    color: theme?.palette?.grey[600],
    mt: '24px',
  }),
};
