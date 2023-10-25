import { Checkbox } from '@mui/material';

export const usersTableColumns = (
  usersData: any,
  setUsersData: any,
  usersMainData: any,
) => [
  {
    accessorFn: (row: any) => row.id,
    id: 'id',
    cell: (info: any) => (
      <Checkbox
        checked={!!usersData.find((item: any) => item.id === info.getValue())}
        onChange={(e) => {
          const selectedId = info.getValue();
          if (e.target.checked) {
            setUsersData([
              ...usersData,
              usersMainData.find((item: any) => item.id === selectedId),
            ]);
          } else {
            setUsersData(
              usersData.filter((item: any) => item.id !== selectedId),
            );
          }
        }}
        color="primary"
        name={info.getValue()}
      />
    ),
    header: (
      <Checkbox
        checked={usersData.length === usersMainData.length}
        onChange={(e) => {
          if (e.target.checked) {
            setUsersData([...usersMainData]);
          } else {
            setUsersData([]);
          }
        }}
        color="primary"
        name="id"
      />
    ),
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row.username,
    id: 'Name',
    cell: (info: any) => info.getValue(),
    header: 'Name',
    isSortable: true,
  },
  {
    accessorFn: (row: any) => row.department,
    id: 'Department',
    cell: (info: any) => info.getValue(),
    header: 'Department',
    isSortable: true,
  },
  {
    accessorFn: (row: any) => row.source,
    id: 'Source',
    isSortable: true,
    header: 'Source',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.usage,
    id: 'Usage',
    isSortable: true,
    header: 'Usage',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.firstseen,
    id: 'First Seen',
    isSortable: true,
    header: 'First Seen',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.lastseen,
    id: 'Last Seen',
    isSortable: true,
    header: 'Last Seen',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.assigneddate,
    id: 'Assigned Date',
    isSortable: true,
    header: 'Assigned Date',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.contract,
    id: 'Contract',
    isSortable: true,
    header: 'Contract',
    cell: (info: any) => info.getValue(),
  },
];

export const usersTableData: any = [
  {
    id: '1',
    username: 'Andrea',
    department: '-',
    source: '-',
    usage: '10',
    firstseen: '22 Mar, 2023',
    lastseen: '22 Mar, 2023',
    assigneddate: '22 Mar, 2023',
    contract: 'Freshservice Trial License',
  },
  {
    id: '2',
    username: 'Andrea',
    department: '-',
    source: '-',
    usage: '10',
    firstseen: '22 Mar, 2023',
    lastseen: '22 Mar, 2023',
    assigneddate: '22 Mar, 2023',
    contract: 'Freshservice Trial License',
  },
];
