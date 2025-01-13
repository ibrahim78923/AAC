import { generateImage } from '@/utils/avatarUtils';
import { Avatar, Box, Typography } from '@mui/material';

export const AvatarItemCountCard = (props: any) => {
  const {
    avatarBgColor,
    name,
    count,
    avatarUrl,
    isDynamic = true,
    avatarSize = {},
    avatarPadding = 1,
  } = props;

  const avatarSrc = isDynamic ? generateImage(avatarUrl) : avatarUrl?.src;

  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      gap={1.5}
      flexWrap={'wrap'}
      borderRadius={2}
      border={`1px solid `}
      borderColor="custom.off_white_three"
      px={1.5}
      py={1}
      height={'100%'}
    >
      <Box>
        <Avatar
          alt={name}
          src={avatarSrc}
          sx={{
            width: avatarSize?.width ?? 50,
            height: avatarSize?.height ?? 50,
            backgroundColor: avatarBgColor,
            padding: avatarPadding,
          }}
          variant={avatarSize?.variant ?? 'circular'}
        />
      </Box>
      <Box sx={{ flex: 1 }}>
        <Typography variant="h4" color="slateBlue.main">
          {count}
        </Typography>
        <Typography variant="body1" color="slateBlue.main">
          {name}
        </Typography>
      </Box>
    </Box>
  );
};
