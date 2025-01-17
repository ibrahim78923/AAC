import { generateImage } from '@/utils/avatarUtils';
import { Avatar, Typography } from '@mui/material';
import { CustomTooltip } from '../../CustomTooltip';

export const CustomAvatar = (props: any) => {
  const {
    avatarSize,
    nameInitial,
    avatarSrc,
    tooltipTitle,
    customTooltipProps,
    backgroundColor = 'primary.main',
    customStyles,
    padding,
  } = props;
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
        variant={avatarSize?.variant ?? 'circular'}
        src={generateImage(avatarSrc)}
      >
        <Typography variant="avatarNameInitial" textTransform={'uppercase'}>
          {nameInitial}
        </Typography>
      </Avatar>
    </CustomTooltip>
  );
};
