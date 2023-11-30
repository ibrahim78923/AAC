const Button = (theme: any) => {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            boxShadow: 'none',
          },
          height: 44,
          borderradius: '8px',
          '&.small': {
            height: '36px',
          },
          '&.medium': {
            height: '44px',
          },

          '&.large': {
            height: '54px',
          },
          '&.Mui-disabled': {
            fontWeight: 500,
            color: '#D1D5DB',
            fontSize: '14px',
            '& .MuiLoadingButton-loadingIndicator': {
              color: 'rgba(0,0,0,0.5)',
            },
          },
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
          border: `1px solid ${theme?.palette?.custom?.dark}`,
          color: theme?.palette?.custom?.main,
          '&:hover': {
            backgroundColor: theme?.palette?.action?.hover,
          },
        },
        textInherit: {
          '&:hover': {
            backgroundColor: theme?.palette?.action?.hover,
          },
        },
      },
    },
  };
};
export default Button;
