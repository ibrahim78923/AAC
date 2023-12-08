import TanstackTable from '@/components/Table/TanstackTable';
import Header from '../Tickets/Header';
import { meetingsListData } from './Meetings.data';
import { useMeetings } from './useMeetings';

const Meetings = () => {
  const { selectedMeetingsList, meetingsListsColumns } = useMeetings();
  return (
    <>
      <Header selectedTicketsList={selectedMeetingsList} />
      <TanstackTable
        data={meetingsListData}
        columns={meetingsListsColumns}
        isPagination
      />
    </>
  );
};

export default Meetings;
