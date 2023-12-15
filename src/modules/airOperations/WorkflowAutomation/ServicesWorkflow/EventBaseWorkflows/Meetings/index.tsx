import TanstackTable from '@/components/Table/TanstackTable';
import { meetingsListData } from './Meetings.data';
import { useMeetings } from './useMeetings';
import MeetingsHeader from './MeetingsHeader';

const Meetings = () => {
  const { selectedMeetingsList, meetingsListsColumns } = useMeetings();
  return (
    <>
      <MeetingsHeader selectedMeetingsList={selectedMeetingsList} />
      <TanstackTable
        data={meetingsListData}
        columns={meetingsListsColumns}
        isPagination
      />
    </>
  );
};

export default Meetings;
