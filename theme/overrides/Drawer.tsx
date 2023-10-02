import { alpha } from '@mui/material';

const Drawer = (theme: any) => {
  const isLight = theme.palette.mode === 'light';

  return {
    MuiDrawer: {
      styleOverrides: {
        modal: {
          '&[role="presentation"]': {
            '& .MuiDrawer-paperAnchorLeft': {
              boxShadow: `2px 0px 4px 4px ${alpha(
                theme.palette.grey[900],
                isLight ? 0.16 : 0.48,
              )}`,
            },
            '& .MuiDrawer-paperAnchorRight': {
              borderRadius: '30px 0px 0px 30px',
              boxShadow: `-2px 0px 4px 4px ${alpha(
                theme.palette.grey[900],
                isLight ? 0.16 : 0.48,
              )}`,
            },
            '& .css-wh8348-MuiBackdrop-root-MuiModal-backdrop': {
              backgroundColor: 'rgba(96, 96, 96, 0.25)',
            },
          },
        },
      },
    },
  };
};
export default Drawer;
