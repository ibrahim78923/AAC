const Tooltip = (theme: any) => {
  return {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: theme.palette.blue?.main,
          padding: '8px',
        },
        arrow: {
          color: theme.palette.common?.white,
        },
      },
    },
  };
};
export default Tooltip;
