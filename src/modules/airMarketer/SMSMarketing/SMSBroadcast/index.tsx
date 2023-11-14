import CustomPagination from '@/components/CustomPagination';

import TanstackTable from '@/components/Table/TanstackTable';

import { broadcastColumns, broadcastData } from './SMSBroadcast.data';

import SMSBroadcastHeader from './SMSBroadcastHeader';

import useScheduledSMS from '../SMSDashboard/ScheduledSMS/useScheduledSMS';

const SMSBroadcast = () => {
  const { statusTag } = useScheduledSMS();
  return (
    <>
      <SMSBroadcastHeader />
      <TanstackTable
        columns={broadcastColumns(statusTag)}
        data={broadcastData}
      />
      <CustomPagination count={1} rowsPerPageOptions={[1, 2]} entriePages={1} />
    </>
  );
};

export default SMSBroadcast;
