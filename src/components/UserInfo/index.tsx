import { generateImage } from '@/utils/avatarUtils';
import { Avatar, Box, Typography } from '@mui/material';

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
  } = props;

  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      gap={1}
      onClick={() => handleBoxClick?.()}
      {...boxProps}
    >
      <Avatar
        sx={{
          bgcolor: 'primary.main',
          width: avatarSize?.width ?? 28,
          height: avatarSize?.height ?? 28,
        }}
        variant={avatarSize?.variant ?? 'circular'}
        src={generateImage(avatarSrc)}
      >
        <Typography variant="body2" textTransform={'uppercase'}>
          {nameInitial}
        </Typography>
      </Avatar>
      <Box>
        <Typography
          variant="body4"
          component={'div'}
          color="blue.dull_blue"
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
      </Box>
    </Box>
  );
};
