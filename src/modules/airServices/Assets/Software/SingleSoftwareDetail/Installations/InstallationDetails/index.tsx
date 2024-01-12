import TanstackTable from '@/components/Table/TanstackTable';
import { InstallationHeader } from './InstallationHeader';
import { useInstallationDetail } from './useInstallationsDetail';
import { installationTableColumns } from './InstallationTable.data';

export const InstallationDetails = () => {
  const {
    activeCheck,
    setActiveCheck,
    page,
    setPage,
    pageLimit,
    setPageLimit,
    isLoading,
    isError,
    isFetching,
    isSuccess,
    metaData,
    searchBy,
    setSearchBy,
    installationData,
    getInstallationListDataExport,
  } = useInstallationDetail();
  return (
    <>
      <InstallationHeader
        activeCheck={activeCheck}
        searchBy={searchBy}
        setSearchBy={setSearchBy}
        getInstallationListDataExport={getInstallationListDataExport}
      />
      <br />
      <TanstackTable
        data={installationData}
        columns={installationTableColumns(
          installationData,
          activeCheck,
          setActiveCheck,
        )}
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
        isSuccess={isSuccess}
        isPagination
        count={metaData?.pages}
        pageLimit={pageLimit}
        currentPage={page}
        totalRecords={metaData?.total}
        onPageChange={(page: any) => setPage(page)}
        setPage={setPage}
        setPageLimit={setPageLimit}
      />
    </>
  );
};
