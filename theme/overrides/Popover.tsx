const Popover = (theme: any) => {
  return {
    MuiPopover: {
      styleOverrides: {
        paper: {
          boxShadow: theme?.customShadows?.dropdown,
          borderRadius: '10px',
        },
      },
    },
  };
};
export default Popover;
