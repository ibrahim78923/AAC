import { Avatar, Box, Typography, useTheme } from '@mui/material';
import { generateImage } from '@/utils/avatarUtils';
import { capitalizeFirstLetter } from '@/utils/api';
import { MemberDetailsPropsI } from '../Teams.interface';

const MemberDetails = (props: MemberDetailsPropsI) => {
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
          <Avatar
            src={generateImage(props?.img)}
            alt="Remy Sharp"
            sx={{
              color: theme?.palette?.grey[600],
              fontSize: '12px',
              fontWeight: 500,
            }}
          >
            {capitalizeFirstLetter(props?.name?.charAt(0))}
          </Avatar>
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
