export const style = {
  avatarStyle: (theme: any) => {
    return {
      display: 'flex',
      justifyContent: 'start',
      '.MuiAvatar-square': {
        backgroundColor: theme?.palette?.primary?.light,
        color: theme?.palette?.blue?.light,
        fontSize: '12px',
        fontWeight: 500,
        borderRadius: '12px',
      },
      '.MuiAvatar-circular': {
        color: theme?.palette?.blue?.light,
        fontSize: '12px',
        fontWeight: 500,
      },
      '.Mui-disabled svg': {
        fill: theme?.palette?.grey[0],
      },
    };
  },
};
