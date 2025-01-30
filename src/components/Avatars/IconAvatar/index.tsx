import { AVATAR_VARIANTS } from '@/constants/mui-constant';
import { Avatar } from '@mui/material';
import { IconAvatarPropsI } from '../Avatars.interface';

export const IconAvatar = (props: IconAvatarPropsI) => {
  const {
    avatarSize,
    alt,
    backgroundColor = 'primary.main',
    customStyles,
    padding,
    children,
  } = props;

  return (
    <Avatar
      sx={{
        backgroundColor,
        width: avatarSize?.width ?? 25,
        height: avatarSize?.height ?? 25,
        padding,
        ...customStyles,
      }}
      variant={avatarSize?.variant ?? AVATAR_VARIANTS?.CIRCULAR}
      alt={alt}
    >
      {children}
    </Avatar>
  );
};
