import TanstackTable from '@/components/Table/TanstackTable';
import { InstallationHeader } from './InstallationHeader';
import { useInstallationDetail } from './useInstallationsDetail';
import { installationTableColumns } from './InstallationTable.data';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_ASSETS_SOFTWARE_PERMISSIONS } from '@/constants/permission-keys';

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
    <PermissionsGuard
      permissions={[AIR_SERVICES_ASSETS_SOFTWARE_PERMISSIONS?.INSTALLATIONS]}
    >
      <InstallationHeader
        activeCheck={activeCheck}
        setActiveCheck={setActiveCheck}
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
    </PermissionsGuard>
  );
};
