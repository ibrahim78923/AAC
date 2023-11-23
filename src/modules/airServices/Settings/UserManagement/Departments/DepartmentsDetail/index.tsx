import {
  Avatar,
  AvatarGroup,
  Box,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { MoreHoriz } from '@mui/icons-material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { departmentsData } from './DepartmentsDetail.data';
import { useDepartmentsDetail } from './useDepartmentsDetail';

export const DepartmentsDetail = () => {
  const { theme } = useDepartmentsDetail();
  return (
    <Grid container gap={2}>
      {departmentsData?.map((item) => (
        <Grid
          item
          key={uuidv4()}
          xs={3.8}
          sx={{
            p: 2,
            borderRadius: 3,
            boxShadow: `0px 0px 8px 2px rgba(9, 161, 218, 0.2)`,
          }}
        >
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Box display={'flex'} alignItems={'center'} gap={0.5}>
              <item.icon />
              <Typography variant="h5">{item?.department}</Typography>
            </Box>
            <MoreHoriz
              sx={{ color: '#A0A3BD', cursor: 'pointer' }}
              fontSize="large"
            />
          </Box>
          <Box
            sx={{
              borderBottom: `1px solid ${theme?.palette?.custom?.off_white_one}`,
              py: '30px',
              mb: 1.5,
            }}
          >
            <Typography variant="body2" sx={{ maxWidth: '80%' }}>
              {item?.description}
            </Typography>
          </Box>
          <Box display={'flex'} alignItems={'center'}>
            <AvatarGroup
              max={4}
              sx={{
                transform: 'scaleX(-1)',
                '& .MuiAvatar-root': { width: 30, height: 30, border: 0 },
                '& .MuiAvatar-root:last-child': { ml: '-6px !important' },
              }}
            >
              {item?.avatar?.map((ava) => (
                <Avatar key={uuidv4()} src={ava?.src} />
              ))}
            </AvatarGroup>
            <IconButton>
              <AddCircleIcon color="primary" />
            </IconButton>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};
