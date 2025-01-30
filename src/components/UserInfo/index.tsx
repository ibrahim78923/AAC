import { Box, Typography } from '@mui/material';
import { CustomAvatar } from '../Avatars/CustomAvatar';

export const UserInfo = (props: any) => {
  const {
    avatarSrc,
    avatarSize = { width: 28, height: 28, variant: 'circular' },
    name = '---',
    nameInitial = '-',
    email,
    nameProps,
    emailProps,
    boxProps,
    handleBoxClick,
    handleNameClick,
    isNameCapital = true,
    optionDetail,
    optionDetailProps,
    tooltipTitle,
    customTooltipProps,
    nameVariant = 'body4',
  } = props;

  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      gap={1}
      onClick={() => handleBoxClick?.()}
      {...boxProps}
    >
      <CustomAvatar
        avatarSrc={avatarSrc}
        nameInitial={nameInitial}
        avatarSize={{
          width: avatarSize?.width,
          height: avatarSize?.height,
          variant: avatarSize?.variant,
        }}
        tooltipTitle={tooltipTitle}
        customTooltipProps={customTooltipProps}
      />
      <Box>
        <Typography
          variant={nameVariant}
          component={'div'}
          color="slateBlue.main"
          onClick={() => handleNameClick?.()}
          textTransform={isNameCapital ? 'capitalize' : 'none'}
          {...nameProps}
        >
          {name}
        </Typography>
        {!!email && (
          <Typography
            variant="body3"
            component={'div'}
            color="custom.light"
            {...emailProps}
          >
            {email}
          </Typography>
        )}
        {!!optionDetail && (
          <Typography
            variant="body4"
            component={'div'}
            color="slateBlue.main"
            {...optionDetailProps}
          >
            {optionDetail}
          </Typography>
        )}
      </Box>
    </Box>
  );
};
