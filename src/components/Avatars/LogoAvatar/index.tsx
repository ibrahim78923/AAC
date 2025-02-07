import { AgenticCreedLogo, AgenticCreedWhiteLogo } from '@/assets/images';
import { Avatar, Box, Typography } from '@mui/material';
import { LogoAvatarPropsI } from '../Avatars.interface';
import { PROJECT_NAME } from '@/config';

export const LogoAvatar = (props: LogoAvatarPropsI) => {
  const {
    productName,
    isWhite = false,
    width = '100%',
    height = 38,
    variant = 'square',
  } = props;

  const Logo = isWhite ? AgenticCreedWhiteLogo?.src : AgenticCreedLogo?.src;
  return (
    <Box>
      <Avatar
        src={Logo}
        alt={PROJECT_NAME}
        sx={{ width, height, objectFit: 'cover' }}
        variant={variant}
      />
      {!!productName && (
        <Typography
          variant="body3"
          component={'p'}
          sx={{
            color: 'primary.main',
            textAlign: 'right',
            fontWeight: 'fontWeightBold',
          }}
        >
          {productName}
        </Typography>
      )}
    </Box>
  );
};
