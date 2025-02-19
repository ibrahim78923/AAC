import { UserTableDataI } from './UsersList.interface';
import { TruncateText } from '@/components/TruncateText';
import { splitCapitalizedWords } from '@/utils/api';
import { uiDateFormat } from '@/lib/date-time';
import { tableCheckbox } from '@/utils/table-checkbox';

export const usersListColumnsDynamic = (
  usersData: UserTableDataI[],
  setUsersData: React.Dispatch<React.SetStateAction<UserTableDataI[]>>,
  tableData: UserTableDataI[],
) => [
  tableCheckbox({
    selectedList: usersData,
    setSelectedList: setUsersData,
    tableData,
  }),
  {
    accessorFn: (row: any) => row?.Name,
    id: 'Name',
    cell: (info: any) => <TruncateText text={info?.getValue()} />,
    header: 'Name',
    isSortable: true,
  },
  {
    accessorFn: (row: any) => row?.Department,
    id: 'Department',
    cell: (info: any) => <TruncateText text={info?.getValue()} />,
    header: 'Department',
    isSortable: true,
  },
  {
    accessorFn: (row: any) => row?.Source,
    id: 'Source',
    isSortable: true,
    header: 'Source',
    cell: (info: any) => splitCapitalizedWords(info?.getValue()) ?? '---',
  },
  {
    accessorFn: (row: any) => row?.data?.createdAt,
    id: 'createdAt',
    isSortable: true,
    header: 'First Seen',
    cell: (info: any) => uiDateFormat(info?.getValue()),
  },
  {
    accessorFn: (row: any) => row?.data?.updatedAt,
    id: 'updatedAt',
    isSortable: true,
    header: 'Last Seen',
    cell: (info: any) => uiDateFormat(info?.getValue()),
  },
  {
    accessorFn: (row: any) => row?.data?.createdAt,
    id: 'assignedDate',
    isSortable: true,
    header: 'Assigned Date',
    cell: (info: any) => uiDateFormat(info?.getValue()),
  },
  {
    accessorFn: (row: any) => row?.Contract,
    id: 'Contract',
    isSortable: true,
    header: 'Contract',
    cell: (info: any) => <TruncateText text={info?.getValue()} />,
  },
];
