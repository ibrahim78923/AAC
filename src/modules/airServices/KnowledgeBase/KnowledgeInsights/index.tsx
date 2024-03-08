import { Box, Typography } from '@mui/material';
import { TicketRelated } from './TicketRelated';
import { useKnowledgeInsights } from './useKnowledgeInsights';
import NoData from '@/components/NoData';
import TanstackTable from '@/components/Table/TanstackTable';
import ApiErrorState from '@/components/ApiErrorState';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';

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
    knowledgeInsightId,
  } = useKnowledgeInsights();
  if (isLoading || isFetching) return <SkeletonTable />;
  if (isError) <ApiErrorState />;

  return (
    <>
      {!!!data?.data?.articles?.length ? (
        <NoData message={'No Knowledge Insights found'} />
      ) : (
        <>
          {!!!knowledgeInsightId ? (
            <Box>
              <Typography variant="h5" py={'0.625rem'}>
                Trending insights
              </Typography>

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
                onPageChange={(page: any) => setPage(page)}
                isPagination
              />
            </Box>
          ) : (
            <TicketRelated />
          )}
        </>
      )}
    </>
  );
};
