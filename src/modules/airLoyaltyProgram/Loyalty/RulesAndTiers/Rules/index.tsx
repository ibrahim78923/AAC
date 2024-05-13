import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import { useRules } from './useRules';
import { Box } from '@mui/material';

export const Rules = () => {
  const {
    setSearch,
    setPageLimit,
    setPage,
    lazyGetRulesListStatus,
    rulesColumns,
  } = useRules();

  return (
    <>
      <Search label="Search Here" setSearchBy={setSearch} />
      <Box marginY={2}></Box>
      <TanstackTable
        columns={rulesColumns}
        data={lazyGetRulesListStatus?.data?.data?.tierRules}
        isLoading={lazyGetRulesListStatus?.isLoading}
        currentPage={lazyGetRulesListStatus?.data?.data?.meta?.page}
        count={lazyGetRulesListStatus?.data?.data?.meta?.pages}
        pageLimit={lazyGetRulesListStatus?.data?.data?.meta?.limit}
        totalRecords={lazyGetRulesListStatus?.data?.data?.meta?.total}
        setPage={setPage}
        setPageLimit={setPageLimit}
        isFetching={lazyGetRulesListStatus?.isFetching}
        isError={lazyGetRulesListStatus?.isError}
        isSuccess={lazyGetRulesListStatus?.isSuccess}
        onPageChange={(page: any) => setPage(page)}
        isPagination
      />
    </>
  );
};
