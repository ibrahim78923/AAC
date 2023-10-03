const Button = (theme: any) => {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            boxShadow: 'none',
          },
          height: 48,
          borderradius: '8px',
        },

        // contained
        containedInherit: {
          color: theme.palette.grey[800],
          boxShadow: theme?.customShadows?.z8,
          // '&:hover': {
          //   backgroundColor: theme.palette.grey[400],
          // },
        },
        containedPrimary: {
          boxShadow: theme?.customShadows?.primary,
        },
        containedSecondary: {
          color: theme?.palette?.common?.white,
        },
        containedInfo: {
          color: theme?.palette?.common?.white,
        },
        containedSuccess: {
          boxShadow: theme?.customShadows?.success,
          color: theme?.palette?.common?.white,
        },
        containedWarning: {
          boxShadow: theme?.customShadows?.warning,
          color: theme?.palette?.common?.white,
        },
        containedError: {
          boxShadow: theme?.customShadows?.error,
          color: theme?.palette?.common?.white,
        },
        // outlined
        outlinedInherit: {
          border: `1px solid ${theme.palette.grey[500_32]}`,
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
        },
        textInherit: {
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
        },
      },
    },
  };
};
export default Button;
