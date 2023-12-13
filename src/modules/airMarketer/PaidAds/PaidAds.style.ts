export const style = {
  button: (theme: any) => {
    return {
      '.MuiButton-root': {
        fontWeight: '500',
        '&.audienceBtn': {
          backgroundColor: theme?.primary?.light,
          color: theme?.priamry?.main,
          padding: '9px 18px',
          'svg path': {
            fill: theme?.primary?.main,
            stroke: 'transparent',
          },
        },
        '&.eventBtn svg path': {
          fill: theme?.custom?.main,
          stroke: 'transparent',
        },
      },
    };
  },
};
