import CustomPagination from '@/components/CustomPagination';

import TanstackTable from '@/components/Table/TanstackTable';

import SMSBroadcastHeader from './SMSBroadcastHeader';

import useScheduledSMS from '../SMSDashboard/ScheduledSMS/useScheduledSMS';

import { broadcastColumns, broadcastData } from './SMSBroadcast.data';
import useSMSBroadcast from './useSMSBroadcast';

const SMSBroadcast = () => {
  const { statusTag, theme } = useScheduledSMS();
  const { setSelectedId, selectedId } = useSMSBroadcast();
  const columnsParams = {
    selectedId,
    setSelectedId,
    statusTag,
    theme,
  };
  return (
    <>
      <SMSBroadcastHeader selectedId={selectedId} />
      <TanstackTable
        columns={broadcastColumns(columnsParams)}
        data={broadcastData}
      />
      <CustomPagination count={1} rowsPerPageOptions={[1, 2]} entriePages={1} />
    </>
  );
};

export default SMSBroadcast;
