import { Box } from '@mui/material';
import TanstackTable from '@/components/Table/TanstackTable';
import Search from '@/components/Search';
import { useAllRewards } from './useAllRewards';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_LOYALTY_PROGRAM_LOYALTY_REWARDS_PERMISSIONS } from '@/constants/permission-keys';
import { SingleRewardDetails } from '../SingleRewardsDetails';

export const AllRewards = () => {
  const {
    lazyGetLoyaltyAllRewardsListStatus,
    setSearch,
    loyaltyAllRewardColumn,
    isRewardDetailsOpen,
    setIsRewardDetailsOpen,
  } = useAllRewards();

  return (
    <>
      {!isRewardDetailsOpen?.isOpen ? (
        <Box>
          <PermissionsGuard
            permissions={[
              AIR_LOYALTY_PROGRAM_LOYALTY_REWARDS_PERMISSIONS?.SEARCH,
            ]}
          >
            <Search label="Search Here" setSearchBy={setSearch} />
          </PermissionsGuard>
          <Box mt={'0.75rem'}>
            <TanstackTable
              columns={loyaltyAllRewardColumn}
              data={lazyGetLoyaltyAllRewardsListStatus?.data?.data?.rewards}
              isLoading={lazyGetLoyaltyAllRewardsListStatus?.isLoading}
              isFetching={lazyGetLoyaltyAllRewardsListStatus?.isFetching}
              isError={lazyGetLoyaltyAllRewardsListStatus?.isError}
              isSuccess={lazyGetLoyaltyAllRewardsListStatus?.isSuccess}
            />
          </Box>
        </Box>
      ) : (
        <SingleRewardDetails
          isRewardDetailsOpen={isRewardDetailsOpen}
          setIsRewardDetailsOpen={setIsRewardDetailsOpen}
        />
      )}
    </>
  );
};
