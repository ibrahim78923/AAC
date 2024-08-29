import TanstackTable from '@/components/Table/TanstackTable';
import BroadcastHeader from './BroadcastHeader';
import useBroadcast from './useBroadcast';
import { broadcastColumns } from './Broadcast.data';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_MARKETER_WHATSAPP_MARKETING_PERMISSIONS } from '@/constants/permission-keys';

const Broadcast = () => {
  const {
    whatsAppBroadcastData,
    handleOpenDelete,
    setDatePickerVal,
    setFilterValues,
    broadcastsData,
    setCheckedRows,
    datePickerVal,
    resetFilters,
    filterValues,
    setPageLimit,
    startedDate,
    checkedRows,
    endedDate,
    isLoading,
    isSuccess,
    setPage,
    theme,
  } = useBroadcast();
  const columnsParams = {
    setCheckedRows: setCheckedRows,
    checkedRows: checkedRows,
    data: broadcastsData,
    theme,
  };

  return (
    <>
      <BroadcastHeader
        checkedRows={checkedRows}
        setCheckedRows={setCheckedRows}
        handleOpenDelete={handleOpenDelete}
        filterValues={filterValues}
        setFilterValues={setFilterValues}
        datePickerVal={datePickerVal}
        setDatePickerVal={setDatePickerVal}
        startedDate={startedDate}
        endedDate={endedDate}
        resetFilters={resetFilters}
      />

      <PermissionsGuard
        permissions={[AIR_MARKETER_WHATSAPP_MARKETING_PERMISSIONS?.LIST_VIEW]}
      >
        <TanstackTable
          columns={broadcastColumns(columnsParams)}
          totalRecords={whatsAppBroadcastData?.data?.meta?.total}
          currentPage={whatsAppBroadcastData?.data?.meta?.page}
          pageLimit={whatsAppBroadcastData?.data?.meta?.limit}
          count={whatsAppBroadcastData?.data?.meta?.pages}
          onPageChange={(page: any) => setPage(page)}
          setPageLimit={setPageLimit}
          isLoading={isLoading}
          data={broadcastsData}
          isSuccess={isSuccess}
          setPage={setPage}
          isPagination
        />
      </PermissionsGuard>
    </>
  );
};

export default Broadcast;
