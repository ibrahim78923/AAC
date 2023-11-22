import CustomPagination from '@/components/CustomPagination';

import TanstackTable from '@/components/Table/TanstackTable';

import SMSBroadcastHeader from './SMSBroadcastHeader';

import useScheduledSMS from '../SMSDashboard/ScheduledSMS/useScheduledSMS';

import { broadcastColumns, broadcastData } from './SMSBroadcast.data';

const SMSBroadcast = () => {
  const { statusTag, theme } = useScheduledSMS();
  return (
    <>
      <SMSBroadcastHeader />
      <TanstackTable
        columns={broadcastColumns(statusTag, theme)}
        data={broadcastData}
      />
      <CustomPagination count={1} rowsPerPageOptions={[1, 2]} entriePages={1} />
    </>
  );
};

export default SMSBroadcast;
