import { Checkbox } from '@mui/material';
import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import { UserTableDataI } from './UsersTable.interface';
import { TruncateText } from '@/components/TruncateText';
import { splitCapitalizedWords } from '@/utils/api';
import { uiDateFormat } from '@/lib/date-time';

export const usersTableColumns = (
  usersData: UserTableDataI[],
  setUsersData: React.Dispatch<React.SetStateAction<UserTableDataI[]>>,
  tableData: UserTableDataI[],
) => [
  {
    accessorFn: (row: any) => row?._id,
    id: '_id',
    cell: (info: any) => (
      <Checkbox
        icon={<CheckboxIcon />}
        checkedIcon={<CheckboxCheckedIcon />}
        checked={
          !!usersData?.find((item: any) => item?._id === info?.getValue())
        }
        onChange={(e) => {
          if (e?.target?.checked) {
            const foundItem = tableData?.find(
              (item) => item?._id === info?.getValue(),
            );
            if (foundItem) {
              setUsersData([...usersData, foundItem]);
            }
          } else {
            setUsersData(
              usersData?.filter((item) => item?._id !== info?.getValue()),
            );
          }
        }}
        color="primary"
        name={info?.getValue()}
      />
    ),
    header: (
      <Checkbox
        icon={<CheckboxIcon />}
        checkedIcon={<CheckboxCheckedIcon />}
        checked={
          tableData?.length ? usersData?.length === tableData?.length : false
        }
        onChange={(e: any) => {
          e?.target?.checked ? setUsersData([...tableData]) : setUsersData([]);
        }}
        color="primary"
        name="_id"
      />
    ),
  },
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
