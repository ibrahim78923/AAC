export const styles = {
  container: {
    padding: '40px',
    position: 'relative',
    maxWidth: '960px',
    margin: '0 auto',
  },
  heading: {
    padding: '32px 0 24px',
  },
  title: (theme: any) => ({
    color: theme?.palette?.slateBlue?.main,
    textAlign: 'center',
    fontWeight: '600',
    fontSize: '48px !important',
  }),
  paper: (theme: any) => ({
    padding: '64px 32px',
    textAlign: 'center',
    backgroundColor: theme?.palette?.graph?.slate_gray,
  }),
  message: (theme: any) => ({
    color: theme?.palette?.slateBlue?.light,
    fontSize: '24px',
    fontWeight: '600',
  }),
  desc: (theme: any) => ({
    maxWidth: '720px',
    margin: '32px auto 0',
    color: theme?.palette?.slateBlue?.main,
    lineHeight: '1.75',
    fontSize: '18px',
  }),
};
