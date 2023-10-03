import { Box, Checkbox } from '@mui/material';
export const MeetingsTableColumns = (
  meetingsData: any,
  setMeetingsData: any,
  meetingsMainData: any,
): any => [
  {
    accessorFn: (row: any) => row.id,
    id: 'id',
    cell: (info: any) => (
      <Checkbox
        checked={
          !!meetingsData.find((item: any) => item.id === info.getValue())
        }
        onChange={(e: any) => {
          e.target.checked
            ? setMeetingsData([
                ...meetingsData,
                meetingsMainData.find(
                  (item: any) => item.id === info.getValue(),
                ),
              ])
            : setMeetingsData(
                meetingsData.filter((item: any) => {
                  return item.id !== info.getValue();
                }),
              );
        }}
        color="primary"
        name={info.getValue()}
      />
    ),
    header: (
      <Checkbox
        checked={meetingsData.length === meetingsMainData.length}
        onChange={(e: any) => {
          e.target.checked
            ? setMeetingsData([...meetingsMainData])
            : setMeetingsData([]);
        }}
        color="primary"
        name="id"
      />
    ),
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row.title,
    id: 'title',
    cell: (info: any) => (
      <Box sx={{ color: 'common.black', fontWeight: '500' }}>
        {info.getValue()}
      </Box>
    ),
    header: 'Title',
    isSortable: true,
  },
  {
    accessorFn: (row: any) => row.owner,
    id: 'owner',
    isSortable: true,
    header: 'Owner',
    cell: (info: any) => (
      <Box sx={{ color: 'common.black', fontWeight: '500' }}>
        {info.getValue()}
      </Box>
    ),
  },
  {
    accessorFn: (row: any) => row.dueDate,
    id: 'dueDate',
    isSortable: true,
    header: 'Due Date',
    cell: (info: any) => (
      <Box sx={{ color: 'blue.dull_blue', fontWeight: '500' }}>
        {info.getValue()}
      </Box>
    ),
  },
  {
    accessorFn: (row: any) => row.outcome,
    id: 'outcome',
    isSortable: true,
    header: 'Outcome',
    cell: (info: any) => (
      <Box sx={{ color: 'custom.main', fontWeight: '500' }}>
        {info.getValue()}
      </Box>
    ),
  },
];

export const MeetingsTableData: any = [
  {
    id: '1',
    title: 'Discuss related tickets',
    dueDate: '06:45 - 07:15, Wed 29 Mar, 2023',
    owner: 'Jhon dyson',
    outcome: 'To do',
  },
  {
    id: '2',
    title: 'Resolving',
    dueDate: '06:45 - 07:15, Wed 29 Mar, 2023',
    owner: 'Maria',
    outcome: '--',
  },
];
