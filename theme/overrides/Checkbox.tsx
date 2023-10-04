const Checkbox = (theme: any) => {
  return {
    MuiCheckbox: {
      styleOverrides: {
        root: {
          padding: theme.spacing(1),
          '&.Mui-checked.Mui-disabled, &.Mui-disabled': {
            color: theme.palette.action.disabled,
          },
          '& .MuiSvgIcon-fontSizeMedium': {
            width: 20,
            height: 20,
          },
          '& .MuiSvgIcon-fontSizeSmall': {
            width: 20,
            height: 20,
          },
          svg: {
            fontSize: 20,
            '&[font-size=small]': {
              fontSize: 20,
            },
          },
        },
      },
    },
  };
};
export default Checkbox;
