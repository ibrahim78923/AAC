import { AgenticCreedSmallLogo } from '@/assets/images';
import { Avatar, Box } from '@mui/material';
import { SmallLogoAvatarPropsI } from '../Avatars.interface';
import { PROJECT_NAME } from '@/config';

export const SmallLogoAvatar = (props: SmallLogoAvatarPropsI) => {
  const { width = '100%', height = 38, variant = 'square' } = props;

  return (
    <Box>
      <Avatar
        src={AgenticCreedSmallLogo?.src}
        alt={PROJECT_NAME}
        sx={{ width, height, objectFit: 'cover' }}
        variant={variant}
      />
    </Box>
  );
};
