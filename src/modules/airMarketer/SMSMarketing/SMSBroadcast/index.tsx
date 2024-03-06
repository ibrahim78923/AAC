import TanstackTable from '@/components/Table/TanstackTable';
import SMSBroadcastHeader from './SMSBroadcastHeader';
import useScheduledSMS from '../SMSDashboard/ScheduledSMS/useScheduledSMS';
import { broadcastColumns } from './SMSBroadcast.data';
import useSMSBroadcast from './useSMSBroadcast';

const SMSBroadcast = () => {
  const { statusTag, theme } = useScheduledSMS();
  const {
    smsBroadcastData,
    isLoading,
    isSuccess,
    resetFilters,
    setPage,
    setPageLimit,
    filterValues,
    setFilterValues,
    checkedRows,
    setCheckedRows,
    datePickerVal,
    setDatePickerVal,
    startedDate,
    endedDate,
  } = useSMSBroadcast();

  const broadCastData = smsBroadcastData?.data?.smsbroadcasts;

  const columnsParams = {
    checkedRows: checkedRows,
    setCheckedRows: setCheckedRows,
    statusTag,
    theme,
    data: broadCastData,
  };

  return (
    <>
      <SMSBroadcastHeader
        checkedRows={checkedRows}
        setCheckedRows={setCheckedRows}
        filterValues={filterValues}
        setFilterValues={setFilterValues}
        resetFilters={resetFilters}
        datePickerVal={datePickerVal}
        setDatePickerVal={setDatePickerVal}
        startedDate={startedDate}
        endedDate={endedDate}
      />

      <TanstackTable
        columns={broadcastColumns(columnsParams)}
        data={broadCastData}
        totalRecords={smsBroadcastData?.data?.meta?.total}
        onPageChange={(page: any) => setPage(page)}
        setPage={setPage}
        setPageLimit={setPageLimit}
        count={smsBroadcastData?.data?.meta?.pages}
        isPagination
        pageLimit={smsBroadcastData?.data?.meta?.limit}
        isLoading={isLoading}
        isSuccess={isSuccess}
      />
    </>
  );
};

export default SMSBroadcast;
