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
import { generateColorFromName } from '@/utils/avatarUtils';
import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import { UsersAvatarRoundedImage } from '@/assets/images';
import { useDepartmentsDetail } from './useDepartmentsDetail';
import { DepartmentsFormModal } from '../DepartmentsFormModal';
import { DepartmentsHeader } from '../DepartmentsHeader';
import CustomPagination from '@/components/CustomPagination';

const MAX_WORDS = 95;
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
    openEdit,
    setOpenEdit,
    formProps,
    departmentData,
    search,
    setSearch,
    departmentMetaData,
    page,
    setPage,
    pageLimit,
    setPageLimit,
  } = useDepartmentsDetail();
  const { editFormMethod, handleSubmit, submitEditForm } = formProps;
  return (
    <>
      <DepartmentsHeader searchBy={search} setSearchBy={setSearch} />
      <br />
      <br />
      <Grid container spacing={2}>
        {departmentData?.map((item: any) => (
          <Grid item lg={4} md={6} xs={12} key={item?._id}>
            <Box p={2} borderRadius={3} boxShadow={2}>
              <Box
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
              >
                <Box display={'flex'} alignItems={'center'} gap={0.5}>
                  <Avatar
                    sx={{
                      bgcolor: generateColorFromName(item?.name),
                      width: 25,
                      height: 25,
                      fontSize: 14,
                    }}
                    variant="rounded"
                  >
                    {item?.name?.slice(0, 2)?.toUpperCase()}
                  </Avatar>
                  <Typography variant="h5">{item?.name}</Typography>
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
                  <MenuItem onClick={() => setOpenEdit(true)}>Edit</MenuItem>
                  <MenuItem onClick={() => setOpenDelete(true)}>
                    Delete
                  </MenuItem>
                </Menu>
              </Box>
              <Box
                borderBottom={`1px solid ${theme?.palette?.custom?.off_white_one}`}
                p="30px 0 30px 0"
                mb={1}
                overflow="hidden"
                maxHeight="80px"
              >
                <Typography
                  variant="body2"
                  sx={{ maxWidth: '80%', height: '20px' }}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html:
                        item?.description?.length > MAX_WORDS
                          ? item?.description?.slice(0, MAX_WORDS) + '....'
                          : item?.description,
                    }}
                  ></div>
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
                  {item?.members?.map((ava: any) => (
                    <Avatar
                      key={ava}
                      src={ava?.src ?? UsersAvatarRoundedImage?.src}
                    />
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
      <br />
      {departmentMetaData && departmentMetaData?.total > 5 && (
        <Grid item xs={12}>
          <CustomPagination
            currentPage={page}
            count={departmentMetaData?.pages}
            pageLimit={pageLimit}
            totalRecords={departmentMetaData?.total}
            onPageChange={(page: any) => setPage(page)}
            setPage={setPage}
            setPageLimit={setPageLimit}
          />
        </Grid>
      )}
      <AlertModals
        open={openDelete}
        handleClose={handleDeleteClose}
        handleSubmitBtn={handleDeleteSubmit}
        message="Are you sure you want to delete this Department?"
        type={ALERT_MODALS_TYPE?.DELETE}
      />
      <DepartmentsFormModal
        formTitle="Edit Department"
        open={openEdit}
        handleClose={setOpenEdit}
        methods={editFormMethod}
        handleSubmit={handleSubmit}
        submitForm={submitEditForm}
      />
    </>
  );
};
