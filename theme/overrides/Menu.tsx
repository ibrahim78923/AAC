const Menu = (theme: any) => {
  return {
    MuiMenuItem: {
      styleOverrides: {
        root: {
          '&.MuiMenuItem-root': {
            fontSize: '14px',
          },
          '&.Mui-selected': {
            backgroundColor: theme.palette.action.selected,
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
            },
          },
        },
      },
    },
  };
};
export default Menu;
