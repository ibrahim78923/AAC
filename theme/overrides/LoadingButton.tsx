const LoadingButton = () => {
  return {
    MuiLoadingButton: {
      styleOverrides: {
        root: {
          '&.MuiLoadingButton-loading': {
            backgroundColor: '#16847f',
          },
          '&.MuiButton-text': {
            '& .MuiLoadingButton-startIconPendingStart': {
              marginLeft: 0,
            },
            '& .MuiLoadingButton-endIconPendingEnd': {
              marginRight: 0,
            },
          },
        },
      },
    },
  };
};
export default LoadingButton;
