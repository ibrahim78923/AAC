import { Box, Typography } from '@mui/material';
import RolesCards from './RolesCards';
import { AIR_SERVICES } from '@/constants';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Search from '@/components/Search';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_SETTINGS_USER_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';
import useRoles from './useRoles';

export const Roles = () => {
  const {
    router,
    setSearchValue,
    data,
    isLoading,
    isFetching,
    isError,
    setPage,
    setPageLimit,
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
          <Search label="Search Here" setSearchBy={setSearchValue} />
        </PermissionsGuard>
      </Box>

      <RolesCards
        data={data}
        setPage={setPage}
        setPageLimit={setPageLimit}
        isError={isError}
        isLoading={isLoading}
        isFetching={isFetching}
      />
    </>
  );
};
