const ButtonGroup = (theme: any) => {
  const styleContained = (color: any) => ({
    props: { variant: 'contained', color },
  });

  return {
    MuiButtonGroup: {
      variants: [
        {
          props: { variant: 'contained', color: 'inherit' },
        },
        styleContained('primary'),
        styleContained('secondary'),
        styleContained('info'),
        styleContained('success'),
        styleContained('warning'),
        styleContained('error'),

        {
          props: { disabled: true },
          style: {
            boxShadow: 'none',
            '& .MuiButtonGroup-grouped.Mui-disabled': {
              color: theme.palette?.action?.disabled,
              borderColor: `${theme?.palette?.action?.disabledBackground} !important`,
              '&.MuiButton-contained': {
                backgroundColor: theme?.palette?.action?.disabledBackground,
              },
            },
          },
        },
      ],

      styleOverrides: {
        root: {
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
  };
};
export default ButtonGroup;
