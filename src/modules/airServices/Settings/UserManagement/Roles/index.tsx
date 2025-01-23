import { Box, Typography } from '@mui/material';
import RolesCards from './RolesList';
import { AIR_SERVICES } from '@/constants/routes';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Search from '@/components/Search';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_SETTINGS_USER_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';
import useRoles from './useRoles';

export const Roles = () => {
  const {
    router,
    handleSearch,
    permissionsRoleStatus,
    setPage,
    setPageLimit,
    rolesListData,
    page,
  } = useRoles();

  return (
    <>
      <Box
        display={'flex'}
        alignItems={'center'}
        gap={2}
        justifyContent={'space-between'}
        mb={2}
      >
        <Box display={'flex'} alignItems={'center'} gap={1}>
          <ArrowBackIcon
            onClick={() =>
              router?.push({ pathname: AIR_SERVICES?.USER_MANAGEMENT })
            }
            sx={{ cursor: 'pointer' }}
          />
          <Typography variant="h3">Roles</Typography>
        </Box>

        <PermissionsGuard
          permissions={[
            AIR_SERVICES_SETTINGS_USER_MANAGEMENT_PERMISSIONS?.SEARCH_ROLES,
          ]}
        >
          <Search label="Search Here" setSearchBy={handleSearch} size="small" />
        </PermissionsGuard>
      </Box>

      <RolesCards
        data={permissionsRoleStatus?.data}
        setPage={setPage}
        page={page}
        setPageLimit={setPageLimit}
        rolesListData={rolesListData}
        isError={permissionsRoleStatus?.isError}
        isLoading={permissionsRoleStatus?.isLoading}
        isFetching={permissionsRoleStatus?.isFetching}
      />
    </>
  );
};
