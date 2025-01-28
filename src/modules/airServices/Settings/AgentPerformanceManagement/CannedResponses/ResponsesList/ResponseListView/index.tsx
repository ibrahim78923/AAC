import TanstackTable from '@/components/Table/TanstackTable';
import { useResponsesListView } from './useResponseListView';
import { DeleteResponseModal } from '../DeleteResponseModal';
import { MoveFolderModal } from '../MoveFolderModal';
import { CANNED_RESPONSES } from '@/constants/strings';

export const ResponseListView = (props: any) => {
  const {
    setPage,
    page,
    setSelectedData,
    selectedData,
    isPortalOpen,
    setIsPortalOpen,
  } = props;

  const {
    lazyGetResponsesListStatus,
    responsesListColumns,
    responsesList,
    responsesListMetaData,
    getResponsesListData,
    setPageLimit,
  } = useResponsesListView(props);

  return (
    <>
      <TanstackTable
        columns={responsesListColumns}
        data={responsesList}
        isLoading={lazyGetResponsesListStatus?.isLoading}
        isFetching={lazyGetResponsesListStatus?.isFetching}
        isError={lazyGetResponsesListStatus?.isError}
        isSuccess={lazyGetResponsesListStatus?.isSuccess}
        currentPage={responsesListMetaData?.page}
        count={responsesListMetaData?.pages}
        pageLimit={responsesListMetaData?.limit}
        totalRecords={responsesListMetaData?.total}
        onPageChange={(page: number) => setPage(page)}
        setPage={setPage}
        setPageLimit={setPageLimit}
        isPagination
        errorProps={{
          canRefresh: true,
          refresh: () => getResponsesListData?.(page),
        }}
        noDataTableText="No response found"
      />
      {isPortalOpen?.isOpen &&
        isPortalOpen?.action === CANNED_RESPONSES?.DELETE && (
          <DeleteResponseModal
            isPortalOpen={isPortalOpen}
            setIsPortalOpen={setIsPortalOpen}
            setSelectedData={setSelectedData}
            selectedData={selectedData}
            setPage={setPage}
            page={page}
            totalRecords={responsesList?.length}
            getResponseList={getResponsesListData}
          />
        )}
      {isPortalOpen?.isOpen &&
        isPortalOpen?.action === CANNED_RESPONSES?.MOVE && (
          <MoveFolderModal
            isPortalOpen={isPortalOpen}
            setIsPortalOpen={setIsPortalOpen}
            setSelectedData={setSelectedData}
            selectedData={selectedData}
            setPage={setPage}
            page={page}
            totalRecords={responsesList?.length}
            getResponseList={getResponsesListData}
          />
        )}
    </>
  );
};
