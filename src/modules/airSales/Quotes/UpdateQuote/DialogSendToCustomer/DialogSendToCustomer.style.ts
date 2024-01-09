export const styles = {
  dialog: (theme: any) => ({
    '& .MuiDialog-paper': {
      borderRadius: '8px',

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
        p: '24px 24px 0',
      },
      '& .MuiDialogActions-root': {
        p: '24px',
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
};
