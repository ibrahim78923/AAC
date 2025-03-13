import { Theme } from '@mui/material';

export const styles = {
  dialog: (width: string) => ({
    '& .MuiPaper-root.MuiDialog-paper': {
      borderRadius: '20px',
      maxWidth: width,

      '& .MuiDialogActions-root': {
        padding: '10px 20px 20px',
      },
    },
  }),

  dialogTitle: (theme: Theme) => ({
    color: theme.palette.slateBlue.main,
    fontSize: '18px',
    fontWeight: '600',
    lineHeight: '1.25',
    letterSpacing: '-0.4px',
    padding: '24px 20px 0',
    paddingRight: '60px',
    '@media (min-width: 900px)': {
      fontSize: '18px',
      letterSpacing: '-0.44px',
    },
    '@media (min-width: 1200px)': {
      fontSize: '18px',
      letterSpacing: '-0.48px',
    },
  }),

  closeButton: (theme: Theme, title: boolean) => ({
    position: 'absolute',
    right: title ? '20px' : '8px',
    top: title ? '22px' : '8px',
    color: theme.palette.grey[500],
  }),

  dialogContent: () => ({
    padding: '30px 20px',
  }),
};
