import { PageTitledHeader } from '@/components/PageTitledHeader';
import { useRewards } from './useRewards';
import { Box } from '@mui/material';
import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import { SingleRewardDetails } from './SingleRewardsDetails';
import { UpsertRewards } from './UpsertRewards';
import { AIR_LOYALTY_PROGRAM_LOYALTY_REWARDS_PERMISSIONS } from '@/constants/permission-keys';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AgentConversionDelete } from '@/modules/SocialComponents/Meetings/ListView/AgentConversionDelete';

export const Rewards = () => {
  const {
    lazyGetLoyaltyRewardsListStatus,
    setPageLimit,
    setPage,
    loyaltyAllRewardColumn,
    isRewardDetailsOpen,
    setIsRewardDetailsOpen,
    refetch,
    isRewardDrawerOpen,
    setIsRewardDrawerOpen,
    handleSearch,
    isRewardDelete,
    setIsRewardDelete,
    handleDeleteSubmit,
    rewardDeleteStatus,
  } = useRewards();
  return (
    <>
      {!isRewardDetailsOpen?.isOpen ? (
        <>
          <PageTitledHeader
            title="Rewards"
            addTitle="Add"
            handleAction={() =>
              setIsRewardDrawerOpen?.({ isOpen: true, data: '' })
            }
            createPermissionKey={[
              AIR_LOYALTY_PROGRAM_LOYALTY_REWARDS_PERMISSIONS?.ADD_REWARDS,
            ]}
          />
          <Box>
            <PermissionsGuard
              permissions={[
                AIR_LOYALTY_PROGRAM_LOYALTY_REWARDS_PERMISSIONS?.SEARCH_REWARDS,
              ]}
            >
              <Search label="Search Here" setSearchBy={handleSearch} />
            </PermissionsGuard>
            <Box mt={'0.75rem'}>
              <TanstackTable
                columns={loyaltyAllRewardColumn}
                data={
                  lazyGetLoyaltyRewardsListStatus?.data?.data?.physicalrewards
                }
                isLoading={lazyGetLoyaltyRewardsListStatus?.isLoading}
                currentPage={
                  lazyGetLoyaltyRewardsListStatus?.data?.data?.meta?.page
                }
                count={lazyGetLoyaltyRewardsListStatus?.data?.data?.meta?.pages}
                pageLimit={
                  lazyGetLoyaltyRewardsListStatus?.data?.data?.meta?.limit
                }
                totalRecords={
                  lazyGetLoyaltyRewardsListStatus?.data?.data?.meta?.total
                }
                setPage={setPage}
                setPageLimit={setPageLimit}
                isFetching={lazyGetLoyaltyRewardsListStatus?.isFetching}
                isError={lazyGetLoyaltyRewardsListStatus?.isError}
                isSuccess={lazyGetLoyaltyRewardsListStatus?.isSuccess}
                onPageChange={(page: any) => setPage(page)}
                errorProps={{ canRefresh: true, refresh: refetch }}
                isPagination
              />
            </Box>
          </Box>
        </>
      ) : (
        <SingleRewardDetails
          isRewardDetailsOpen={isRewardDetailsOpen}
          setIsRewardDetailsOpen={setIsRewardDetailsOpen}
        />
      )}
      {isRewardDrawerOpen?.isOpen && (
        <UpsertRewards
          isRewardDrawerOpen={isRewardDrawerOpen}
          setIsRewardDrawerOpen={setIsRewardDrawerOpen}
        />
      )}
      {isRewardDelete?.isOpen && (
        <AgentConversionDelete
          message={'Are you sure you want to delete this entry?'}
          open={isRewardDelete?.isOpen ?? false}
          handleClose={() => {
            setIsRewardDelete({ isOpen: false, data: '' });
          }}
          submitDeleteModal={handleDeleteSubmit}
          deleteMeetingsStatus={rewardDeleteStatus}
        />
      )}
    </>
  );
};
