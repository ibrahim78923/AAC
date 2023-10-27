import TanstackTable from '@/components/Table/TanstackTable';
import { meetingsTableColumns, meetingsTableData } from './MeetingsTable.data';

export const MeetingsTable = ({ setMeetingsData, meetingsData }: any) => {
  return (
    <div>
      <TanstackTable
        columns={meetingsTableColumns(
          meetingsData,
          setMeetingsData,
          meetingsTableData,
        )}
        data={meetingsTableData}
      />
    </div>
  );
};
