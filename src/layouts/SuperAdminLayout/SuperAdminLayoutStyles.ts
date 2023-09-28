export const SuperAdminLayoutStyles = {
  collapseMenu: (subItem: any, router: any, theme: any) => {
    return {
      padding: '8px 0px  8px 55px',
      fontSize: '12px',
      '&:hover': {
        background: 'transparent',
      },
      color:
        router.pathname.includes(`${subItem.key}`) &&
        theme.palette.secondary.main,
    };
  },
  collapseMenuOpener: (
    item: any,
    router: any,
    isDropDownOpen: any,
    theme: any,
  ) => {
    return {
      background:
        (router.pathname.includes(`${item.key}`) || isDropDownOpen) &&
        theme.palette.grey[400],
      '&:hover': {
        background:
          router.pathname.includes(`${item.key}`) || isDropDownOpen
            ? theme.palette.grey[400]
            : 'transparent',
      },
      padding: '6px  15px',
      borderRadius: '5px',
      fontSize: '14px',
      color:
        router.pathname.includes(`${item.key}`) ||
        (isDropDownOpen && theme.palette.secondary.main),
    };
  },

  mainNavLink: (link: any, router: any, theme: any) => {
    return {
      background:
        router.pathname.includes(`${link.key}`) && theme.palette.grey[400],
      '&:hover': {
        background: router.pathname.includes(`${link.key}`)
          ? theme.palette.grey[400]
          : 'transparent',
      },
      padding: '7px 0px 7px 10px',
      borderRadius: '5px',
      fontSize: '14px',
      color:
        router.pathname.includes(`${link.key}`) && theme.palette.secondary.main,
    };
  },
  appToolbar: (drawerWidth: number, theme: any) => {
    return {
      width: { md: `calc(100% - ${drawerWidth}px)` },
      ml: { sm: `${drawerWidth}px` },
      background: theme.palette.common.white,
      boxShadow: 'none',
      color: 'black',
      padding: '18px 24px',
      height: '70px',
    };
  },
  mainDrawer: (drawerWidth: number) => {
    return {
      display: { xs: 'none', md: 'block' },
      padding: '20px',
      '& .MuiDrawer-paper': {
        boxSizing: 'border-box',
        width: drawerWidth,
        padding: '20px',
      },
    };
  },

  mobileDrawer: (drawerWidth: number) => {
    return {
      display: { xs: 'block', md: 'none' },
      '& .MuiDrawer-paper': {
        boxSizing: 'border-box',
        width: drawerWidth,
        padding: '20px',
      },
    };
  },

  layoutBox: (drawerWidth: number) => {
    return {
      flexGrow: 1,
      p: 3,
      width: { sm: `calc(100% - ${drawerWidth}px)` },
      background: '#F7F9FB',
      height: 'calc(100vh)',
      padding: '24px',
      overflow: 'auto',
    };
  },
  layoutInnerBox: (theme: any) => {
    return {
      background: theme.palette.common.white,
      minHeight: `calc(100% - ${70}px)`,
      height: 'auto',
      padding: '24px',
      borderRadius: '8px',
    };
  },
};
