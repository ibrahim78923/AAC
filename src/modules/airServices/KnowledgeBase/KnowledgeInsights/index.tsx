import { Typography } from '@mui/material';
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
    selectedArticle,
    setSelectedArticle,
    refetch,
  } = useKnowledgeInsights();

  if (isLoading || isFetching) return <SkeletonTable />;

  if (isError) return <ApiErrorState canRefresh refresh={refetch} />;

  if (!!!data?.data?.articles?.length)
    return <NoData message={'No Knowledge Insights found'} />;

  return (
    <>
      {!!!selectedArticle?._id ? (
        <>
          <Typography variant="h5">Trending insights</Typography>
          <br />
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
