import TanstackTable from '@/components/Table/TanstackTable';
import { useInstallDevicesList } from './useInstallDevicesList';
import { DevicesListPropsI } from '../Installations.interface';
import { RemoveDevice } from '../RemoveDevice';
import { INSTALLATION_PORTAL_ACTION } from '../Installations.data';

export const InstallDevicesList = (props: DevicesListPropsI) => {
  const {
    setPage,
    page,
    isPortalOpen,
    setIsPortalOpen,
    setSelectedDeviceList,
    selectedDeviceList,
  } = props;

  const {
    pageLimit,
    setPageLimit,
    isLoading,
    isError,
    isFetching,
    isSuccess,
    metaData,
    installationData,
    getInstallationListData,
    installDevicesListColumn,
  } = useInstallDevicesList(props);

  return (
    <>
      <TanstackTable
        data={installationData}
        columns={installDevicesListColumn}
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
        errorProps={{ canRefresh: true, refresh: getInstallationListData }}
      />
      {isPortalOpen?.isOpen &&
        isPortalOpen?.action === INSTALLATION_PORTAL_ACTION?.REMOVE_DEVICE && (
          <RemoveDevice
            isPortalOpen={isPortalOpen}
            setIsPortalOpen={setIsPortalOpen}
            setSelectedDeviceList={setSelectedDeviceList}
            selectedDeviceList={selectedDeviceList}
            page={page}
            setPage={setPage}
            getInstallationListData={getInstallationListData}
            totalRecords={installationData?.length}
          />
        )}
    </>
  );
};
