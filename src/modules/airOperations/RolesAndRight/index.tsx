import Search from '@/components/Search';
import { Box } from '@mui/material';
import TanstackTable from '@/components/Table/TanstackTable';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { useRolesAndRight } from './useRolesAndRight';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { AIR_OPERATIONS } from '@/constants/routes';
import { GENERIC_UPSERT_FORM_CONSTANT } from '@/constants/strings';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_OPERATIONS_ROLES_AND_RIGHT_ROLES_LIST_PERMISSIONS } from '@/constants/permission-keys';
import { Permissions } from '@/constants/permissions';

export const RolesAndRight = () => {
  const {
    operationsRolesAndRightColumns,
    handleSearch,
    setPageLimit,
    setPage,
    lazyGetPermissionsRoleForOperationsStatus,
    renderPortalComponent,
    isPortalOpen,
    actionButtonDropdown,
    selectedRolesList,
    router,
  } = useRolesAndRight();

  return (
    <Box
      py={2}
      borderRadius={2}
      boxShadow={1}
      border={`1px solid`}
      borderColor="custom.off_white_three"
    >
      <Box px={2}>
        <PageTitledHeader
          title="Roles and Rights"
          addTitle="Add new Role"
          handleAction={() => {
            router?.push({
              pathname: AIR_OPERATIONS?.UPSERT_ROLES,
              query: {
                action: GENERIC_UPSERT_FORM_CONSTANT?.ADD,
              },
            });
          }}
          createPermissionKey={[
            AIR_OPERATIONS_ROLES_AND_RIGHT_ROLES_LIST_PERMISSIONS?.ADD_ROLE,
          ]}
        />
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
          gap={2}
          flexWrap={'wrap'}
        >
          {' '}
          <PermissionsGuard
            permissions={[
              AIR_OPERATIONS_ROLES_AND_RIGHT_ROLES_LIST_PERMISSIONS?.SEARCH_RECORD,
            ]}
          >
            <Box>
              <Search
                label="Search Here"
                setSearchBy={handleSearch}
                size="small"
              />
            </Box>
          </PermissionsGuard>
          <PermissionsGuard
            permissions={
              Permissions?.AIR_OPERATIONS_ROLES_AND_RIGHT_ROLES_LIST_ACTIONS
            }
          >
            <SingleDropdownButton
              dropdownOptions={actionButtonDropdown}
              disabled={!!!selectedRolesList?.length}
            />
          </PermissionsGuard>
        </Box>
      </Box>
      <br />
      <TanstackTable
        columns={operationsRolesAndRightColumns}
        data={
          lazyGetPermissionsRoleForOperationsStatus?.data?.data
            ?.companyaccountroles
        }
        isLoading={lazyGetPermissionsRoleForOperationsStatus?.isLoading}
        currentPage={
          lazyGetPermissionsRoleForOperationsStatus?.data?.data?.meta?.page
        }
        count={
          lazyGetPermissionsRoleForOperationsStatus?.data?.data?.meta?.pages
        }
        pageLimit={
          lazyGetPermissionsRoleForOperationsStatus?.data?.data?.meta?.limit
        }
        totalRecords={
          lazyGetPermissionsRoleForOperationsStatus?.data?.data?.meta?.total
        }
        setPage={setPage}
        setPageLimit={setPageLimit}
        isFetching={lazyGetPermissionsRoleForOperationsStatus?.isFetching}
        isError={lazyGetPermissionsRoleForOperationsStatus?.isError}
        isSuccess={lazyGetPermissionsRoleForOperationsStatus?.isSuccess}
        onPageChange={(page: number) => setPage(page)}
        isPagination
      />
      {isPortalOpen?.isOpen && renderPortalComponent?.()}
    </Box>
  );
};
