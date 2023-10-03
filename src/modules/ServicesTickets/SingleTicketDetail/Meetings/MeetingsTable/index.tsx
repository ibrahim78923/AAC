import TanstackTable from '@/components/Tabel/TanstackTable';
import { MeetingsTableColumns, MeetingsTableData } from './MeetingsTable.utils';

export const MeetingsTable = ({ setMeetingsData, meetingsData }: any) => {
  return (
    <div>
      <TanstackTable
        columns={MeetingsTableColumns(
          meetingsData,
          setMeetingsData,
          MeetingsTableData,
        )}
        data={MeetingsTableData}
      />
    </div>
  );
};
