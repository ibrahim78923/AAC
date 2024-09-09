import { pxToRem } from '@/utils/getFontValue';

export const customerPortalStyles = {
  listNavBarStyles: (
    routerPathName: string,
    pathNameKey: string,
    reducedOpacityBgColor: any,
    customerPortalStyling: any,
  ) => ({
    background:
      routerPathName === pathNameKey ? reducedOpacityBgColor : 'transparent',
    borderRadius: pxToRem(5),
    color: customerPortalStyling?.iconPrimary,
    fontWeight: routerPathName === pathNameKey ? 500 : 400,
    fontSize: pxToRem(14),
    '&:hover': {
      background: reducedOpacityBgColor,
    },
  }),

  logoutButtonStyles: (
    customerPortalStyling: any,
    reducedOpacityBgColor: any,
  ) => ({
    borderRadius: pxToRem(5),
    color: customerPortalStyling?.iconPrimary,
    fontSize: pxToRem(14),
    '&:hover': {
      background: reducedOpacityBgColor,
    },
  }),

  appToolbarStyles: (drawerWidth: number, theme: any) => ({
    width: { md: `calc(100% - ${drawerWidth}px)` },
    ml: { sm: `${drawerWidth}px` },
    background: theme?.palette?.common?.white,
    boxShadow: 'none',
    color: 'black',
    padding: '18px 24px',
    height: '70px',
  }),

  mobileDrawerStyles: (drawerWidth: number, customerPortalStyling: any) => ({
    display: { xs: 'block', md: 'none' },
    '& .MuiDrawer-paper': {
      boxSizing: 'border-box',
      width: drawerWidth,
      padding: '20px',
      bgcolor: customerPortalStyling?.sideMenu,
    },
  }),

  mainDrawerStyles: (drawerWidth: number, customerPortalStyling: any) => ({
    display: { xs: 'none', md: 'block' },
    padding: '20px',
    '& .MuiDrawer-paper': {
      boxSizing: 'border-box',
      width: drawerWidth,
      padding: '20px',
      bgcolor: customerPortalStyling?.sideMenu,
    },
  }),

  layoutBoxStyles: (drawerWidth: number, theme: any) => ({
    flexGrow: 1,
    p: 3,
    width: { sm: `calc(100% - ${drawerWidth}px)` },
    background: theme?.palette?.custom?.pale_grayish_blue,
    height: 'calc(100vh)',
    padding: '24px',
    overflow: 'auto',
  }),

  layoutInnerBoxStyle: (theme: any, isZeroPaddingRoutes: any) => {
    return {
      background: isZeroPaddingRoutes
        ? 'transparent'
        : theme?.palette?.common?.white,
      minHeight: `calc(100% - ${70}px)`,
      height: 'auto',
      padding: `${isZeroPaddingRoutes ? '1px' : '24px'}`,
      borderRadius: '8px',
      position: 'relative',
    };
  },
};
