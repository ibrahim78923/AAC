import Image from 'next/image';
import { Box, Typography, useTheme } from '@mui/material';
import { UserAvatarImage } from '@/assets/images';

const MemberDetails = (props: any) => {
  const theme = useTheme();
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: `1px solid ${theme?.palette?.custom?.off_white_three}`,
          paddingBottom: '1rem',
          marginY: '1rem',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
          }}
        >
          <Image
            src={props?.img ?? UserAvatarImage}
            alt="img"
            width={40}
            height={40}
          />
          <Box sx={{ display: 'grid' }}>
            <Typography
              variant="body3"
              sx={{
                fontWeight: 500,
                color: `${theme?.palette?.blue?.dull_blue}`,
              }}
            >
              {props?.name}
            </Typography>
            <Typography
              variant="body3"
              sx={{
                fontWeight: 400,
                color: `${theme?.palette?.custom?.steel_blue_alpha}`,
              }}
            >
              {props?.email}
            </Typography>
            <Typography
              variant="body3"
              sx={{
                fontWeight: 400,
                color: `${theme?.palette?.custom?.steel_blue_alpha}`,
              }}
            >
              {props?.designation}
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default MemberDetails;
