export const styles = {
  headerContainer: {
    alignItems: 'center',
    justifyContent: { md: 'space-between', xs: 'center' },
    px: 2,
  },
  headerAddBtn: (theme: any) => ({
    color: theme.palette.slateBlue.main,
    p: '18px',
    ':hover': { bgcolor: theme.palette.grey[0] },
  }),
};
