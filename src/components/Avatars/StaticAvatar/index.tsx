import { AVATAR_VARIANTS } from '@/constants/mui-constant';
import { Avatar } from '@mui/material';
import { StaticAvatarPropsI } from '../Avatars.interface';

export const StaticAvatar = (props: StaticAvatarPropsI) => {
  const {
    avatarSize,
    alt,
    backgroundColor = 'transparent',
    customStyles,
    padding,
    children,
    avatarSrc,
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
      src={avatarSrc}
    >
      {children}
    </Avatar>
  );
};
