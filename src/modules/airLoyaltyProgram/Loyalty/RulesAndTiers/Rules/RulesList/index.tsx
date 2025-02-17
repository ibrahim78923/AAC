import { SkeletonTanStackTable } from '@/components/Skeletons/SkeletonTanStackTable';
import TanstackTable from '@/components/Table/TanstackTable';
import { useRulesList } from './useRulesList';

export const RulesList = () => {
  const {
    rulesListColumns,
    lazyGetLoyaltyProgramLoyaltyRulesListStatus,
    handlePageChange,
    handleSetPage,
    handleSetPageLimit,
    refetch,
    increment,
    decrement,
    isApiCalled,
  } = useRulesList();

  if (isApiCalled) return <SkeletonTanStackTable />;

  return (
    <TanstackTable
      columns={rulesListColumns}
      data={
        lazyGetLoyaltyProgramLoyaltyRulesListStatus?.data?.data?.tierRules ?? []
      }
      isLoading={lazyGetLoyaltyProgramLoyaltyRulesListStatus?.isLoading}
      currentPage={
        lazyGetLoyaltyProgramLoyaltyRulesListStatus?.data?.data?.meta?.page
      }
      count={
        lazyGetLoyaltyProgramLoyaltyRulesListStatus?.data?.data?.meta?.pages
      }
      pageLimit={
        lazyGetLoyaltyProgramLoyaltyRulesListStatus?.data?.data?.meta?.limit
      }
      totalRecords={
        lazyGetLoyaltyProgramLoyaltyRulesListStatus?.data?.data?.meta?.total
      }
      setPage={handleSetPage}
      setPageLimit={handleSetPageLimit}
      isFetching={lazyGetLoyaltyProgramLoyaltyRulesListStatus?.isFetching}
      isError={lazyGetLoyaltyProgramLoyaltyRulesListStatus?.isError}
      isSuccess={lazyGetLoyaltyProgramLoyaltyRulesListStatus?.isSuccess}
      onPageChange={handlePageChange}
      isPagination
      errorProps={{
        canRefresh: true,
        refresh: refetch,
      }}
      incrementPageClick={increment}
      decrementPageClick={decrement}
      noDataTableText="No rule found"
    />
  );
};
