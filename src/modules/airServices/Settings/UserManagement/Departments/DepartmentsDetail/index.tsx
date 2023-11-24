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
import { departmentsData } from './DepartmentsDetail.data';
import { useDepartmentsDetail } from './useDepartmentsDetail';
import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';

export const DepartmentsDetail = () => {
  const {
    theme,
    actionPop,
    handleActionClick,
    handleActionClose,
    openAction,
    openDelete,
    setOpenDelete,
    handleDeleteClose,
    handleDeleteSubmit,
  } = useDepartmentsDetail();
  return (
    <>
      <Grid container spacing={2}>
        {departmentsData?.map((item) => (
          <Grid item lg={4} md={6} sm={12} key={item?.id}>
            <Box p={2} borderRadius={3} boxShadow={2}>
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
                  sx={{
                    '& .MuiPaper-root': {
                      boxShadow: 2,
                      width: '7%',
                      borderRadius: 2,
                    },
                  }}
                  transformOrigin={{ vertical: 10, horizontal: 100 }}
                >
                  <MenuItem>Edit</MenuItem>
                  <MenuItem onClick={() => setOpenDelete(true)}>
                    Delete
                  </MenuItem>
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
                    <Avatar key={ava?.id} src={ava?.src?.src} />
                  ))}
                </AvatarGroup>
                <IconButton>
                  <AddCircle color="primary" />
                </IconButton>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
      <AlertModals
        open={openDelete}
        handleClose={handleDeleteClose}
        handleSubmitBtn={handleDeleteSubmit}
        message="Are you sure you want to delete this Department?"
        type={ALERT_MODALS_TYPE?.DELETE}
      />
    </>
  );
};
