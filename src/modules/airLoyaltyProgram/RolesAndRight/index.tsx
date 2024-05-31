import Search from '@/components/Search';
import { Box } from '@mui/material';
import TanstackTable from '@/components/Table/TanstackTable';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { useRolesAndRight } from './useRolesAndRight';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { AIR_LOYALTY_PROGRAM } from '@/constants';
import { GENERIC_UPSERT_FORM_CONSTANT } from '@/constants/strings';

export const RolesAndRight = () => {
  const {
    loyaltyRolesAndRightColumns,
    setSearch,
    setPageLimit,
    setPage,
    lazyGetPermissionsRoleForLoyaltyStatus,
    renderPortalComponent,
    isPortalOpen,
    actionButtonDropdown,
    selectedRolesList,
    router,
  } = useRolesAndRight();

  return (
    <>
      <Box
        py={2}
        borderRadius={2}
        boxShadow={1}
        border={`1px solid`}
        borderColor="custom.off_white_three"
      >
        <br />
        <Box px={2}>
          <PageTitledHeader
            title="Roles and Rights"
            addTitle="Add new Role"
            handleAction={() => {
              router?.push({
                pathname: AIR_LOYALTY_PROGRAM?.UPSERT_ROLES,
                query: {
                  action: GENERIC_UPSERT_FORM_CONSTANT?.ADD,
                },
              });
            }}
          />
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
            gap={2}
            flexWrap={'wrap'}
          >
            <Box>
              <Search label="Search Here" setSearchBy={setSearch} />
            </Box>
            <SingleDropdownButton
              dropdownOptions={actionButtonDropdown}
              disabled={!!!selectedRolesList?.length}
            />
          </Box>
        </Box>
        <br />
        <TanstackTable
          columns={loyaltyRolesAndRightColumns}
          data={
            lazyGetPermissionsRoleForLoyaltyStatus?.data?.data
              ?.companyaccountroles
          }
          isLoading={lazyGetPermissionsRoleForLoyaltyStatus?.isLoading}
          currentPage={
            lazyGetPermissionsRoleForLoyaltyStatus?.data?.data?.meta?.page
          }
          count={
            lazyGetPermissionsRoleForLoyaltyStatus?.data?.data?.meta?.pages
          }
          pageLimit={
            lazyGetPermissionsRoleForLoyaltyStatus?.data?.data?.meta?.limit
          }
          totalRecords={
            lazyGetPermissionsRoleForLoyaltyStatus?.data?.data?.meta?.total
          }
          setPage={setPage}
          setPageLimit={setPageLimit}
          isFetching={lazyGetPermissionsRoleForLoyaltyStatus?.isFetching}
          isError={lazyGetPermissionsRoleForLoyaltyStatus?.isError}
          isSuccess={lazyGetPermissionsRoleForLoyaltyStatus?.isSuccess}
          onPageChange={(page: any) => setPage(page)}
          isPagination
        />
      </Box>
      {isPortalOpen?.isOpen && renderPortalComponent?.()}
    </>
  );
};
