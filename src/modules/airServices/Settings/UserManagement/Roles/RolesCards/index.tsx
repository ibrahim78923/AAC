import { Box, Divider, Grid, Popover, Typography } from '@mui/material';
import { AddRoleIcon } from '@/assets/icons';
import { AIR_SERVICES } from '@/constants';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_SETTINGS_USER_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CustomPagination from '@/components/CustomPagination';
import ApiErrorState from '@/components/ApiErrorState';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import NoData from '@/components/NoData';
import { AssociationsImage } from '@/assets/images';
import useRolesCards from './useRolesCards';

const RolesCards = ({
  data,
  setPage,
  setPageLimit,
  isError,
  isLoading,
  isFetching,
}: any) => {
  const { router, setAnchorEl, setRoleId, id, open, anchorEl, theme, roleId } =
    useRolesCards();

  if (isError) return <ApiErrorState />;

  if (isLoading || isFetching) return <SkeletonTable />;

  return (
    <>
      <Grid container spacing={2}>
        <PermissionsGuard
          permissions={[
            AIR_SERVICES_SETTINGS_USER_MANAGEMENT_PERMISSIONS?.ADD_NEW_ROLE,
          ]}
        >
          <Grid item xs={12} md={6} xl={4}>
            <Box
              width={'100%'}
              border={1}
              borderColor={'grey.0'}
              borderRadius={2}
              p={3}
              height={'100%'}
              sx={{ cursor: 'pointer' }}
              onClick={() =>
                router?.push(AIR_SERVICES?.USER_UPSERT_ROLES_SETTINGS)
              }
            >
              <Box
                display={'flex'}
                justifyContent={'space-between'}
                height={'100%'}
              >
                <Typography variant="h5">Add New</Typography>

                <Box height={'100%'} display={'flex'} alignItems={'end'}>
                  <AddRoleIcon />
                </Box>
              </Box>
            </Box>
          </Grid>
        </PermissionsGuard>

        {data?.data?.companyaccountroles?.length ? (
          data?.data?.companyaccountroles?.map((item: any) => (
            <Grid item xs={12} md={6} xl={4} key={item?._id}>
              <Box
                width={'100%'}
                border={1}
                borderColor={'grey.0'}
                borderRadius={2}
                p={3}
                height={'100%'}
                overflow={'hidden'}
              >
                <Box display={'flex'} justifyContent={'space-between'} mb={1}>
                  <Typography variant="h5">{item?.name}</Typography>

                  <Box>
                    <MoreHorizIcon
                      onClick={(event: any) => {
                        event.stopPropagation();
                        setAnchorEl(event?.currentTarget);
                        setRoleId(item?._id);
                      }}
                      sx={{ cursor: 'pointer', color: 'grey.600' }}
                    />
                  </Box>
                </Box>

                <Box
                  dangerouslySetInnerHTML={{ __html: item?.description }}
                  color={'custom.mulled_wine'}
                />
                <Divider sx={{ my: 2 }} />
              </Box>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <NoData
              message="No data is available"
              image={AssociationsImage}
              height={'50vh'}
            />
          </Grid>
        )}

        <Grid item xs={12}>
          <CustomPagination
            count={data?.data?.meta?.pages}
            pageLimit={data?.data?.meta?.limit}
            currentPage={data?.data?.meta?.page}
            onPageChange={(page: any) => setPage(page)}
            setPage={setPage}
            setPageLimit={setPageLimit}
            totalRecords={data?.data?.meta?.total}
          />
        </Grid>
      </Grid>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={() => {
          setAnchorEl(null);
          setRoleId(null);
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{
          '& .MuiPopover-paper': { borderRadius: 3, width: '9rem' },
        }}
      >
        <PermissionsGuard
          permissions={[
            AIR_SERVICES_SETTINGS_USER_MANAGEMENT_PERMISSIONS?.EDIT_ROLE,
          ]}
        >
          <Typography
            sx={{
              px: 2,
              py: 1,
              cursor: 'pointer',
              '&:hover': {
                bgcolor: theme?.palette?.grey?.[700],
              },
            }}
            onClick={() => {
              setAnchorEl(null);
              router?.push({
                pathname: AIR_SERVICES?.USER_UPSERT_ROLES_SETTINGS,
                query: { roleId: roleId },
              });
              setRoleId(null);
            }}
          >
            Edit
          </Typography>
        </PermissionsGuard>

        <PermissionsGuard
          permissions={[
            AIR_SERVICES_SETTINGS_USER_MANAGEMENT_PERMISSIONS?.DELETE_ROLE,
          ]}
        >
          <Typography
            sx={{
              px: 2,
              py: 1,
              cursor: 'pointer',
              '&:hover': {
                bgcolor: theme?.palette?.grey?.[700],
              },
            }}
            onClick={() => {
              setAnchorEl(null);
              setRoleId(null);
            }}
          >
            Delete
          </Typography>
        </PermissionsGuard>
      </Popover>
    </>
  );
};

export default RolesCards;
