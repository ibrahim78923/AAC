import { Box } from '@mui/material';
import TanstackTable from '@/components/Table/TanstackTable';
import Search from '@/components/Search';
import { useAllRewards } from './useAllRewards';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_LOYALTY_PROGRAM_LOYALTY_REWARDS_PERMISSIONS } from '@/constants/permission-keys';

export const AllRewards = () => {
  const {
    lazyGetLoyaltyAllRewardsListStatus,
    setSearch,
    setPageLimit,
    setPage,
    loyaltyAllRewardColumn,
  } = useAllRewards();

  return (
    <Box>
      <PermissionsGuard
        permissions={AIR_LOYALTY_PROGRAM_LOYALTY_REWARDS_PERMISSIONS?.SEARCH}
      >
        <Search label="Search Here" setSearchBy={setSearch} />
      </PermissionsGuard>
      <Box mt={'0.75rem'}>
        <PermissionsGuard
          permissions={
            AIR_LOYALTY_PROGRAM_LOYALTY_REWARDS_PERMISSIONS?.VIEW_REWARDS_DETAILS
          }
        >
          <TanstackTable
            columns={loyaltyAllRewardColumn}
            data={lazyGetLoyaltyAllRewardsListStatus?.data?.data}
            isLoading={lazyGetLoyaltyAllRewardsListStatus?.isLoading}
            currentPage={
              lazyGetLoyaltyAllRewardsListStatus?.data?.data?.meta?.page
            }
            count={lazyGetLoyaltyAllRewardsListStatus?.data?.data?.meta?.pages}
            pageLimit={
              lazyGetLoyaltyAllRewardsListStatus?.data?.data?.meta?.limit
            }
            totalRecords={
              lazyGetLoyaltyAllRewardsListStatus?.data?.data?.meta?.total
            }
            setPage={setPage}
            setPageLimit={setPageLimit}
            isFetching={lazyGetLoyaltyAllRewardsListStatus?.isFetching}
            isError={lazyGetLoyaltyAllRewardsListStatus?.isError}
            isSuccess={lazyGetLoyaltyAllRewardsListStatus?.isSuccess}
            onPageChange={(page: any) => setPage(page)}
            isPagination
          />
        </PermissionsGuard>
      </Box>
    </Box>
  );
};
