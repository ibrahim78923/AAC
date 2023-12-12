export const styles = {
  regNumText: (theme: any) => ({
    fontSize: '14px',
    fontWeight: '500',
    lineHeight: '21px',
    color: theme?.palette?.custom?.black_pearl,
  }),
  dialog: (theme: any) => ({
    '& .MuiDialog-paper': {
      borderRadius: '8px',
      maxWidth: '784px',

      '& .MuiDialogTitle-root': {
        fontSize: '24px',
        fontWeight: '600',
        lineHeight: '1.25',
        color: theme?.palette?.slateBlue?.main,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: '24px 24px 0',
      },
      '& .MuiDialogContent-root': {
        p: '8px 24px 0',
      },
      '& .MuiDialogActions-root': {
        p: '24px 24px 0',
      },
    },
  }),
  btnOutlined: (theme: any) => ({
    borderColor: theme?.palette?.custom?.dark,
    color: theme?.palette?.custom?.main,
    '&:hover': {
      borderColor: theme?.palette?.custom?.dark,
    },
  }),
  bottom: (theme: any) => ({
    p: '10px 24px 24px',
    fontSize: '12px',
    lineHeight: '18px',
    color: theme?.palette?.grey[600],
    '& > span': {
      color: 'primary.main',
      cursor: 'pointer',
    },
  }),
};
