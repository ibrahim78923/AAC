import { useTicketRelated } from './useTicketRelated';
import TanstackTable from '@/components/Table/TanstackTable';
import {
  NO_DATA_MESSAGE,
  knowledgeInsightsRelatedTicketColumns,
} from './TicketRelated.data';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { TicketRelatedPropsI } from './TicketRelated.interface';
import { TruncateText } from '@/components/TruncateText';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { SKELETON_TYPES } from '@/constants/mui-constant';

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

  return (
    <>
      <PageTitledHeader
        moveBack={() => setSelectedArticle?.({})}
        canMovedBack
        title={<TruncateText text={selectedArticle?.title} />}
      />
      <ApiRequestFlow
        hasNoData={!!!data?.data?.articles?.length}
        showSkeleton={isLoading || isFetching}
        hasError={isError}
        noDataMessage="No inserted tickets found"
        canRefresh={error?.data?.message !== NO_DATA_MESSAGE}
        errorMessage={
          error?.data?.message === NO_DATA_MESSAGE
            ? error?.data?.message
            : 'SOMETHING WENT WRONG'
        }
        refreshApi={refetch}
        skeletonType={SKELETON_TYPES?.TABLE}
      >
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
      </ApiRequestFlow>
    </>
  );
};
