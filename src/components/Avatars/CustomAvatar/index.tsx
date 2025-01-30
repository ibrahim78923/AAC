import { generateImage } from '@/utils/avatarUtils';
import { Avatar, Typography } from '@mui/material';
import { CustomTooltip } from '../../CustomTooltip';
import { pxToRem } from '@/utils/getFontValue';
import { AVATAR_VARIANTS } from '@/constants/mui-constant';
import { CustomAvatarPropsI } from '../Avatars.interface';

export const CustomAvatar = (props: CustomAvatarPropsI) => {
  const {
    avatarSize,
    nameInitial,
    avatarSrc,
    tooltipTitle,
    customTooltipProps,
    backgroundColor = 'primary.main',
    customStyles,
    padding,
    initialColor = 'grey.200',
  } = props;

  const nameInitialSize = (avatarSize?.height ?? 28) / 3;

  return (
    <CustomTooltip title={tooltipTitle} isCapital {...customTooltipProps}>
      <Avatar
        sx={{
          backgroundColor,
          width: avatarSize?.width ?? 28,
          height: avatarSize?.height ?? 28,
          padding,
          ...customStyles,
        }}
        variant={avatarSize?.variant ?? AVATAR_VARIANTS?.CIRCULAR}
        src={generateImage(avatarSrc)}
        alt={nameInitial}
      >
        {!!nameInitial && (
          <Typography
            variant="avatarNameInitial"
            textTransform={'uppercase'}
            sx={{ fontSize: pxToRem(nameInitialSize), color: initialColor }}
          >
            {nameInitial}
          </Typography>
        )}
      </Avatar>
    </CustomTooltip>
  );
};
