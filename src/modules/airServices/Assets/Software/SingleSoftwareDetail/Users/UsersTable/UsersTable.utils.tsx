import { Box, Checkbox } from '@mui/material';
export const usersTableColumns = (
  usersData: any,
  setusersData: any,
  usersMainData: any,
): any => [
  {
    accessorFn: (row: any) => row.id,
    id: 'id',
    cell: (info: any) => (
      <Checkbox
        checked={!!usersData.find((item: any) => item.id === info.getValue())}
        // onChange={(e: any) => {
        //   e.target.checked
        //     ? setusersData([
        //         ...usersData,
        //         usersMainData.find((item: any) => item.id === info.getValue()),
        //       ])
        //     : setusersData(
        //         usersData.filter((item: any) => {
        //           return item.id !== info.getValue();
        //         }),
        //       );
        // }}
        color="primary"
        name={info.getValue()}
      />
    ),
    header: (
      <Checkbox
        checked={usersData.length === usersMainData.length}
        // onChange={(e: any) => {
        //   e.target.checked
        //     ? setusersData([...usersMainData])
        //     : setusersData([]);
        // }}
        color="primary"
        name="id"
      />
    ),
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row.username,
    id: 'Name',
    cell: (info: any) => (
      <Box sx={{ color: 'common.black', fontWeight: '500' }}>
        {info.getValue()}
      </Box>
    ),
    header: 'Name',
    isSortable: true,
  },
  {
    accessorFn: (row: any) => row.department,
    id: 'Department',
    cell: (info: any) => (
      <Box sx={{ color: 'common.black', fontWeight: '500' }}>
        {info.getValue()}
      </Box>
    ),
    header: 'Department',
    isSortable: true,
  },
  {
    accessorFn: (row: any) => row.source,
    id: 'Source',
    isSortable: true,
    header: 'Source',
    cell: (info: any) => (
      <Box sx={{ color: 'common.black', fontWeight: '500' }}>
        {info.getValue()}
      </Box>
    ),
  },
  {
    accessorFn: (row: any) => row.usage,
    id: 'Usage',
    isSortable: true,
    header: 'Usage',
    cell: (info: any) => (
      <Box sx={{ color: 'blue.dull_blue', fontWeight: '500' }}>
        {info.getValue()}
      </Box>
    ),
  },
  {
    accessorFn: (row: any) => row.firstseen,
    id: 'First Seen',
    isSortable: true,
    header: 'First Seen',
    cell: (info: any) => (
      <Box sx={{ color: 'blue.dull_blue', fontWeight: '500' }}>
        {info.getValue()}
      </Box>
    ),
  },
  {
    accessorFn: (row: any) => row.lastseen,
    id: 'Last Seen',
    isSortable: true,
    header: 'Last Seen',
    cell: (info: any) => (
      <Box sx={{ color: 'blue.dull_blue', fontWeight: '500' }}>
        {info.getValue()}
      </Box>
    ),
  },
  {
    accessorFn: (row: any) => row.assigneddate,
    id: 'Assigned Date',
    isSortable: true,
    header: 'Assigned Date',
    cell: (info: any) => (
      <Box sx={{ color: 'blue.dull_blue', fontWeight: '500' }}>
        {info.getValue()}
      </Box>
    ),
  },
  {
    accessorFn: (row: any) => row.contract,
    id: 'Contract',
    isSortable: true,
    header: 'Contract',
    cell: (info: any) => (
      <Box sx={{ color: 'blue.dull_blue', fontWeight: '500' }}>
        {info.getValue()}
      </Box>
    ),
  },
];

export const usersTableData: any = [
  {
    id: '1',
    username: 'Andrea',
    department: '-',
    source: '-',
    usage: '-',
    firstseen: '22 Mar, 2023',
    lastseen: '22 Mar, 2023',
    assigneddate: '22 Mar, 2023',
    contract: 'Freshservice Trial License',
  },
];
