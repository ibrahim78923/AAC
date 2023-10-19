export const InstallationStyle = (theme: any) => [
  {
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
    headerRemoveBtn: {
      bgcolor: 'transparent',
      border: `1px solid ${theme.palette.grey[700]}`,
      p: '18px',
      color: theme.palette.custom.main,
    },
    headerEaBtn: {
      color: theme.palette.slateBlue.main,
      p: '18px',
      ':hover': { bgcolor: theme.palette.grey[0] },
    },
    headerPop: { mt: '4px', '& .MuiPaper-root': { width: '7% !important' } },
  },
];
