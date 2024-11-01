export const styles = {
  fiterButton: (theme: any) => {
    return {
      display: 'flex',
      alignContent: 'center',
      columnGap: '10px',
      border: `1px solid ${theme?.palette?.grey[0]}`,
      color: `${theme?.palette?.custom.main}`,
      fontWeight: 500,
      fontSize: '14px',
    };
  },
  avatarStyle: (theme: any) => {
    return {
      '.MuiAvatar-root.MuiAvatar-circular.MuiAvatar-colorDefault.MuiAvatarGroup-avatar':
        {
          color: theme?.palette?.grey[500],
          fontSize: '12px',
          width: '25px',
          height: '25px',
        },
    };
  },
};
