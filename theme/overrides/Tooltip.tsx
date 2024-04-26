const Tooltip = (theme: any) => {
  return {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: theme.palette.blue?.main,
          padding: '8px',
        },
        arrow: {
          color: theme.palette.blue?.main,
        },
      },
    },
  };
};
export default Tooltip;
