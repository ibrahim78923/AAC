import { UserTableDataI } from './UsersList.interface';
import { TruncateText } from '@/components/TruncateText';
import { splitCapitalizedWords } from '@/utils/api';
import { uiDateFormat } from '@/lib/date-time';
import { CheckboxField } from '@/components/InputFields/CheckboxField';

export const usersListColumnsDynamic = (
  usersData: UserTableDataI[],
  setUsersData: React.Dispatch<React.SetStateAction<UserTableDataI[]>>,
  tableData: UserTableDataI[],
) => [
  {
    accessorFn: (row: any) => row?._id,
    id: '_id',
    cell: (info: any) => (
      <CheckboxField
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
        name={info?.getValue()}
      />
    ),
    header: (
      <CheckboxField
        checked={
          tableData?.length ? usersData?.length === tableData?.length : false
        }
        onChange={(e: any) => {
          e?.target?.checked ? setUsersData([...tableData]) : setUsersData([]);
        }}
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
