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
  } = props;

  return (
    <Box
      display={'flex'}
      flexWrap={'wrap'}
      alignItems={'center'}
      gap={1}
      onClick={() => handleBoxClick?.()}
      {...boxProps}
    >
      <Avatar
        sx={{
          bgcolor: 'primary.main',
          width: avatarSize?.width,
          height: avatarSize?.height,
        }}
        variant={avatarSize?.variant}
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
