import { Typography } from '@mui/material';
import { TicketRelated } from './TicketRelated';
import { useKnowledgeInsights } from './useKnowledgeInsights';
import TanstackTable from '@/components/Table/TanstackTable';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { SKELETON_TYPES } from '@/constants/mui-constant';

export const KnowledgeInsights = () => {
  const {
    data,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    setPageLimit,
    setPage,
    knowledgeInsightsColumns,
    selectedArticle,
    setSelectedArticle,
    refetch,
  } = useKnowledgeInsights();

  return (
    <>
      {!!!selectedArticle?._id ? (
        <>
          <Typography variant="h5">Trending insights</Typography>
          <br />
          <ApiRequestFlow
            refreshApi={refetch}
            showSkeleton={isLoading || isFetching}
            hasError={isError}
            hasNoData={!data?.data?.articles?.length}
            noDataMessage="No Knowledge Insights found"
            skeletonType={SKELETON_TYPES?.TABLE}
          >
            <TanstackTable
              data={data?.data?.articles}
              columns={knowledgeInsightsColumns}
              isLoading={isLoading}
              currentPage={data?.data?.meta?.page}
              count={data?.data?.meta?.pages}
              pageLimit={data?.data?.meta?.limit}
              totalRecords={data?.data?.meta?.total}
              setPage={setPage}
              setPageLimit={setPageLimit}
              isFetching={isFetching}
              isError={isError}
              isSuccess={isSuccess}
              onPageChange={(page: number) => setPage(page)}
              isPagination
            />
          </ApiRequestFlow>
        </>
      ) : (
        <TicketRelated
          selectedArticle={selectedArticle}
          setSelectedArticle={setSelectedArticle}
        />
      )}
    </>
  );
};
