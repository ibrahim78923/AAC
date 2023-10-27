export const styles: any = {
  headContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headText: (theme: any) => ({
    color: theme?.palette?.slateBlue?.main,
    fontWeight: 500,
  }),
  actionBtn: (theme: any) => ({
    px: '18px',
    color: theme?.palette?.custom?.main,
    border: `1px solid ${theme?.palette?.grey[0]}`,
  }),
  addTaskBtn: (theme: any) => ({
    px: '18px',
    bgcolor: theme?.palette?.primary?.main,
    color: theme?.palette?.common?.white,
    ':hover': { bgcolor: theme?.palette?.primary?.main },
  }),
  btnContainer: {
    display: 'flex',
    gap: '20px',
    justifyContent: { sm: 'flex-end', xs: 'center' },
  },
};
