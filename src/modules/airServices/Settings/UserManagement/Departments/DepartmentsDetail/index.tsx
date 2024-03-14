import {
  Avatar,
  AvatarGroup,
  Box,
  Grid,
  IconButton,
  Skeleton,
  Typography,
} from '@mui/material';
import { AddCircle } from '@mui/icons-material';
import { v4 as uuidv4 } from 'uuid';
import {
  generateColorFromName,
  generateImage,
  truncateText,
} from '@/utils/avatarUtils';
import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import { useDepartmentsDetail } from './useDepartmentsDetail';
import { DepartmentsFormModal } from '../DepartmentsFormModal';
import { DepartmentsHeader } from '../DepartmentsHeader';
import CustomPagination from '@/components/CustomPagination';
import { DepartmentMenu } from './DepartmentMenu';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { Permissions } from '@/constants/permissions';
import NoData from '@/components/NoData';
import ApiErrorState from '@/components/ApiErrorState';

const MAX_WORDS = 95;
export const DepartmentsDetail = () => {
  const {
    theme,
    openDelete,
    setOpenDelete,
    handleDeleteClose,
    handleDeleteSubmit,
    openEdit,
    setOpenEdit,
    departmentData,
    search,
    setSearch,
    departmentMetaData,
    page,
    setPage,
    pageLimit,
    setPageLimit,
    openAddModal,
    setOpenAddModal,
    submitForm,
    userList,
    editFormMethod,
    handleClose,
    isLoading,
    updateIsLoading,
    isSmallScreen,
    lazyGetDepartmentData,
  } = useDepartmentsDetail();
  return (
    <>
      <DepartmentsHeader
        searchBy={search}
        setSearchBy={setSearch}
        openAddModal={openAddModal}
        setOpenAddModal={setOpenAddModal}
      />
      <br />
      <br />
      {lazyGetDepartmentData?.isLoading || lazyGetDepartmentData?.isFetching ? (
        <Grid container spacing={2}>
          {Array?.from({ length: 6 }, () => (
            <Grid key={uuidv4()} item xl={4} md={6} xs={12}>
              <Skeleton variant="rounded" animation="wave" height={250} />
            </Grid>
          ))}
        </Grid>
      ) : lazyGetDepartmentData?.isSuccess && !departmentData?.length ? (
        <NoData message="No department found" />
      ) : lazyGetDepartmentData?.isError ? (
        <ApiErrorState />
      ) : (
        <>
          <PermissionsGuard
            permissions={
              Permissions?.AIR_SERVICES_SETTINGS_USER_MANAGEMENT_VIEW_DEPARTMENTS
            }
          >
            <Grid container spacing={2}>
              {departmentData?.map((item: any) => (
                <Grid item xl={4} md={6} xs={12} key={item?._id}>
                  <Box
                    p={2}
                    borderRadius={3}
                    boxShadow={2}
                    sx={{
                      minHeight: isSmallScreen ? '200px' : '250px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
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
                        <Typography variant="h5">
                          {truncateText(item?.name)}
                        </Typography>
                      </Box>
                      <PermissionsGuard
                        permissions={
                          Permissions?.AIR_SERVICES_SETTINGS_USER_MANAGEMENT_EDIT_DELETE_DEPARTMENTS
                        }
                      >
                        <DepartmentMenu
                          setOpenEdit={setOpenEdit}
                          setOpenDelete={setOpenDelete}
                          itemData={item}
                        />
                      </PermissionsGuard>
                    </Box>
                    <Box
                      borderBottom={`1px solid ${theme?.palette?.custom?.off_white_one}`}
                      p="30px 0 30px 0"
                      mb={1}
                      overflow="hidden"
                      height="100px"
                      width="90%"
                    >
                      <Typography variant="body2">
                        <Box
                          dangerouslySetInnerHTML={{
                            __html: truncateText(item?.description, MAX_WORDS),
                          }}
                        />
                      </Typography>
                    </Box>
                    <Box display={'flex'} alignItems={'center'}>
                      <AvatarGroup
                        max={5}
                        sx={{
                          transform: 'scaleX(-1)',
                          '& .MuiAvatar-root': {
                            width: 30,
                            height: 30,
                            border: 0,
                          },
                          '& .MuiAvatar-root:last-child': {
                            ml: '-6px !important',
                          },
                        }}
                      >
                        {item?.membersListDetails
                          ?.slice(0, 4)
                          ?.map((ava: any) => (
                            <Avatar
                              key={ava?._id}
                              src={generateImage(ava?.avatar?.url)}
                            />
                          ))}
                      </AvatarGroup>
                      <IconButton
                        onClick={() =>
                          setOpenEdit({
                            item,
                            val: true,
                          })
                        }
                      >
                        <AddCircle color="primary" />
                      </IconButton>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </PermissionsGuard>
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
        </>
      )}
      <AlertModals
        open={openDelete?.val}
        handleClose={handleDeleteClose}
        handleSubmitBtn={handleDeleteSubmit}
        message="Are you sure you want to delete this Department?"
        type={ALERT_MODALS_TYPE?.DELETE}
        loading={isLoading}
      />
      <DepartmentsFormModal
        formTitle="Edit Department"
        open={openEdit?.val}
        handleClose={handleClose}
        methods={editFormMethod}
        handleSubmit={submitForm}
        userList={userList}
        isLoading={updateIsLoading}
      />
    </>
  );
};
