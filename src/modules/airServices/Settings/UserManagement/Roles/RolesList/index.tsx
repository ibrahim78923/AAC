import { Box, Typography } from '@mui/material';
import { AddRoleIcon } from '@/assets/icons';
import { AIR_SERVICES } from '@/constants/routes';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_SETTINGS_USER_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';
import CustomPagination from '@/components/CustomPagination';
import { useRolesList } from './useRolesList';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { SKELETON_TYPES } from '@/constants/mui-constant';
import { InteractiveInfoCard } from '@/components/Cards/InteractiveInfoCard';
import { DeleteRole } from '../DeleteRole';
import { CustomGrid } from '@/components/Grids/CustomGrid';
import { ContainerGrid } from '@/components/Grids/ContainerGrid';

const RolesCards = (props: any) => {
  const {
    data,
    setPage,
    setPageLimit,
    isError,
    isLoading,
    isFetching,
    page,
    rolesListData,
  } = props;

  const {
    router,
    setOpenDeleteModal,
    openDeleteModal,
    roleListActionDropdown,
  } = useRolesList();

  return (
    <>
      <ContainerGrid>
        <PermissionsGuard
          permissions={[
            AIR_SERVICES_SETTINGS_USER_MANAGEMENT_PERMISSIONS?.ADD_NEW_ROLE,
          ]}
        >
          <CustomGrid md={6} xl={4}>
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
                <Typography variant={'h5'}>Add New</Typography>

                <Box height={'100%'} display={'flex'} alignItems={'end'}>
                  <AddRoleIcon />
                </Box>
              </Box>
            </Box>
          </CustomGrid>
        </PermissionsGuard>
        <ApiRequestFlow
          showSkeleton={isLoading || isFetching}
          hasNoData={!!!data?.data?.companyaccountroles?.length}
          noDataMessage="No Role is available"
          hasError={isError}
          refreshApi={() => rolesListData?.(page)}
          skeletonType={SKELETON_TYPES?.BASIC_CARD}
          cardSkeletonType={
            SKELETON_TYPES?.LARGE_VERTICAL_TWO_LAYER_DOUBLE_CARD
          }
        >
          {data?.data?.companyaccountroles?.map((item: any) => (
            <CustomGrid md={6} xl={4} key={item?._id}>
              <InteractiveInfoCard
                name={item?.name}
                description={item?.description}
                count={item?.userCount}
                itemToCount="Agents"
                dropdownOptions={roleListActionDropdown?.(item?._id)}
                dropdownPermissions={[
                  AIR_SERVICES_SETTINGS_USER_MANAGEMENT_PERMISSIONS?.EDIT_ROLE,
                  AIR_SERVICES_SETTINGS_USER_MANAGEMENT_PERMISSIONS?.DELETE_ROLE,
                ]}
              />
            </CustomGrid>
          ))}
        </ApiRequestFlow>
      </ContainerGrid>
      <br />
      <CustomPagination
        count={data?.data?.meta?.pages}
        pageLimit={data?.data?.meta?.limit}
        currentPage={data?.data?.meta?.page}
        onPageChange={(page: any) => setPage(page)}
        setPage={setPage}
        setPageLimit={setPageLimit}
        totalRecords={data?.data?.meta?.total}
      />

      {openDeleteModal?.isOpen && (
        <DeleteRole
          openDeleteModal={openDeleteModal}
          setOpenDeleteModal={setOpenDeleteModal}
          totalRecords={data?.data?.companyaccountroles?.length}
          page={page}
          setPage={setPage}
          rolesListData={rolesListData}
        />
      )}
    </>
  );
};

export default RolesCards;
