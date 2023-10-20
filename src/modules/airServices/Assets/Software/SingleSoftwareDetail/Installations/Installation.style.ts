export const styles = {
  headerContainer: {
    alignItems: 'center',
    justifyContent: { md: 'space-between', xs: 'center' },
    px: 2,
  },
  headerItem: {
    display: 'flex',
    gap: 1.5,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  headerRemoveBtn: (theme: any) => ({
    bgcolor: 'transparent',
    border: `1px solid ${theme.palette.grey[700]}`,
    p: '18px',
    color: theme.palette.custom.main,
  }),
  headerPop: { mt: '4px', '& .MuiPaper-root': { width: '7% !important' } },
};
