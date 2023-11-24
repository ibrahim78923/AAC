import {
  Avatar,
  AvatarGroup,
  Box,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import { MoreHoriz, AddCircle } from '@mui/icons-material';
import { v4 as uuidv4 } from 'uuid';
import { departmentsData } from './DepartmentsDetail.data';
import { useDepartmentsDetail } from './useDepartmentsDetail';

export const DepartmentsDetail = () => {
  const { theme, actionPop, handleActionClick, handleActionClose, openAction } =
    useDepartmentsDetail();
  return (
    <Grid container gap={2}>
      {departmentsData?.map((item) => (
        <Grid
          item
          key={item?.id}
          xs={3.8}
          p={2}
          borderRadius={3}
          boxShadow={`0px 0px 8px 2px rgba(9, 161, 218, 0.2)`}
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
            <IconButton onClick={handleActionClick}>
              <MoreHoriz
                sx={{ color: theme?.palette?.secondary?.lighter }}
                fontSize="large"
              />
            </IconButton>
            <Menu
              open={openAction}
              anchorEl={actionPop}
              onClose={handleActionClose}
              sx={{ '& .MuiPaper-root': { boxShadow: 2 } }}
              transformOrigin={{ vertical: 10, horizontal: 80 }}
            >
              <MenuItem sx={{ pr: 5 }}>Edit</MenuItem>
              <MenuItem sx={{ pr: 5 }}>Delete</MenuItem>
            </Menu>
          </Box>
          <Box
            borderBottom={`1px solid ${theme?.palette?.custom?.off_white_one}`}
            py={'30px'}
            mb={1.5}
          >
            <Typography variant="body2" sx={{ maxWidth: '80%' }}>
              {item?.description?.length > 95
                ? item?.description?.slice(0, 95) + '....'
                : item?.description}
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
              <AddCircle color="primary" />
            </IconButton>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};
