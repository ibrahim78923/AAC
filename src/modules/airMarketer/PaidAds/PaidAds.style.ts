export const style = {
  button: (theme: any) => {
    return {
      '.MuiButton-root': {
        padding: '9px 18px',
        fontSize: '14px',
        fontWeight: '500',
        '&.audienceBtn': {
          backgroundColor: theme?.primary?.light,
          'svg path': {
            fill: theme?.primary?.main,
            stroke: 'transparent',
          },
        },
        '&.eventBtn': {
          border: `1px solid ${theme?.grey[0]}`,
          color: theme?.custom?.main,
          'svg path': {
            fill: theme?.custom?.main,
            stroke: 'transparent',
          },
        },
      },
    };
  },
};
