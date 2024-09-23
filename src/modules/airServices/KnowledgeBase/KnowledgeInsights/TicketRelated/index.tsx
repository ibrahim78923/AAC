import { useTicketRelated } from './useTicketRelated';
import TanstackTable from '@/components/Table/TanstackTable';
import {
  NO_DATA_MESSAGE,
  knowledgeInsightsRelatedTicketColumns,
} from './TicketRelated.data';
import NoData from '@/components/NoData';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import ApiErrorState from '@/components/ApiErrorState';
import { TicketRelatedPropsI } from './TicketRelated.interface';
import { TruncateText } from '@/components/TruncateText';
import { SkeletonTanStackTable } from '@/components/Skeletons/SkeletonTanStackTable';

export const TicketRelated = (props: TicketRelatedPropsI) => {
  const { selectedArticle, setSelectedArticle } = props;
  const {
    data,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    setPageLimit,
    setPage,
    error,
    refetch,
  }: any = useTicketRelated(props);

  if (isLoading || isFetching) return <SkeletonTanStackTable />;

  if (isError)
    return (
      <>
        <PageTitledHeader
          moveBack={() => setSelectedArticle?.({})}
          canMovedBack
          title=""
        />
        <ApiErrorState
          message={
            error?.data?.message === NO_DATA_MESSAGE
              ? error?.data?.message
              : 'SOMETHING WENT WRONG'
          }
          canRefresh={error?.data?.message !== NO_DATA_MESSAGE}
          refresh={refetch}
        />
      </>
    );

  if (!!!data?.data?.articles?.length)
    return (
      <>
        <PageTitledHeader
          moveBack={() => setSelectedArticle?.({})}
          canMovedBack
          title=""
        />
        <NoData message="No inserted tickets found" />;
      </>
    );

  return (
    <>
      <PageTitledHeader
        moveBack={() => setSelectedArticle?.({})}
        canMovedBack
        title={<TruncateText text={selectedArticle?.title} />}
      />
      <TanstackTable
        data={data?.data?.articles}
        columns={knowledgeInsightsRelatedTicketColumns}
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
  );
};
