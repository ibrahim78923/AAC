export const styles = {
  main: () => ({
    display: 'flex',
    height: '100%',
    margin: '-24px',
    minHeight: 'calc(100% - 70px)',
  }),
  sidebar: (theme: any) => ({
    width: '276px',
    radius: '8px 0 0 8px',
    borderRight: `1px solid ${theme?.palette?.graph?.slate_gray}`,
    height: '100%',
    padding: '24px',
  }),
  sidebarHeader: (theme: any) => ({
    borderBottom: `1px solid ${theme?.palette?.graph?.slate_gray}`,
    pb: '24px',

    '& > .MuiTypography-root': {
      fontSize: '24px',
      lineHeight: '30px',
      fontWeight: '600',
    },
  }),
  nav: () => ({
    p: '24px 0',
    '& > div + div': {
      mt: '24px',
    },
  }),
  menuItem: (theme: any) => ({
    px: '8px',
    '& .MuiListItemText-root': {
      '& > span': {
        color: theme?.palette?.grey[900],
      },
    },
    '&:hover': {
      backgroundColor: theme?.palette?.grey[400],
    },
  }),
  submenuItem: (theme: any) => ({
    pl: '16px',
    '&:hover': {
      backgroundColor: 'transparent',
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '0',
      left: '16px',
      height: '100%',
      width: '1px',
      backgroundColor: theme?.palette?.graph?.slate_gray,
    },
    '& .MuiListItemText-root': {
      pl: '24px',
      position: 'relative',
      '& > span': {
        fontSize: '12px',
        color: theme?.palette?.grey[900],
      },
      '&::before': {
        content: '""',
        position: 'absolute',
        top: '0px',
        left: '0',
        height: '14px',
        width: '14px',
        border: `1px solid ${theme?.palette?.graph?.slate_gray}`,
        borderTop: 'none',
        borderRight: 'none',
        borderRadius: '0 0 0 7px',
      },
    },
  }),

  content: () => ({
    flex: '1',
    padding: '24px',
  }),
};
