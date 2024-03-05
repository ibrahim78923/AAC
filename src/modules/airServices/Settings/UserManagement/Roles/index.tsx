import { Box, Typography } from '@mui/material';
import RolesCards from './RolesCards';
import { AIR_SERVICES } from '@/constants';
import { useRouter } from 'next/router';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Search from '@/components/Search';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_SETTINGS_USER_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';
import { useGetPermissionsRoleQuery } from '@/services/airServices/settings/user-management/roles';
import { useState } from 'react';
import { PAGINATION } from '@/config';

export const Roles = () => {
  const router: any = useRouter();
  const [searchValue, setSearchValue] = useState<any>('');

  const [page, setPage] = useState(PAGINATION?.PAGE_COUNT);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);

  const { data, isLoading, isFetching, isError } = useGetPermissionsRoleQuery({
    page: page,
    limit: pageLimit,
    search: searchValue,
  });

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
            '65e0582afafa591831a18cef',
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
