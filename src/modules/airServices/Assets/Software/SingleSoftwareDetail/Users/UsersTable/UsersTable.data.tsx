import { Checkbox } from '@mui/material';
import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import dayjs from 'dayjs';
import { CALENDAR_FORMAT } from '@/constants';

export const usersTableColumns = (
  usersData: any,
  setUsersData: any,
  tableData: any,
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
        onChange={(e: any) => {
          e?.target?.checked
            ? setUsersData([
                ...usersData,
                tableData?.find((item: any) => item?._id === info?.getValue()),
              ])
            : setUsersData(
                usersData?.filter((item: any) => {
                  return item?._id !== info?.getValue();
                }),
              );
        }}
        color="primary"
        name={info?.getValue()}
      />
    ),
    header: (
      <Checkbox
        icon={<CheckboxIcon />}
        checkedIcon={<CheckboxCheckedIcon />}
        checked={usersData?.length === tableData?.length}
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
    cell: (info: any) => info?.getValue() ?? '__',
    header: 'Name',
    isSortable: true,
  },
  {
    accessorFn: (row: any) => row?.Department,
    id: 'Department',
    cell: (info: any) => info?.getValue() ?? '__',
    header: 'Department',
    isSortable: true,
  },
  {
    accessorFn: (row: any) => row?.Source,
    id: 'Source',
    isSortable: true,
    header: 'Source',
    cell: (info: any) => info?.getValue() ?? '__',
  },
  {
    accessorFn: (row: any) => row?.data?.createdAt,
    id: 'createdAt',
    isSortable: true,
    header: 'First Seen',
    cell: (info: any) => dayjs(info?.getValue())?.format(CALENDAR_FORMAT?.UI),
  },
  {
    accessorFn: (row: any) => row?.data?.updatedAt,
    id: 'updatedAt',
    isSortable: true,
    header: 'Last Seen',
    cell: (info: any) => dayjs(info?.getValue())?.format(CALENDAR_FORMAT?.UI),
  },
  {
    accessorFn: (row: any) => row?.data?.createdAt,
    id: 'createdAt',
    isSortable: true,
    header: 'Assigned Date',
    cell: (info: any) => dayjs(info?.getValue())?.format(CALENDAR_FORMAT?.UI),
  },
  {
    accessorFn: (row: any) => row?.Contract,
    id: 'Contract',
    isSortable: true,
    header: 'Contract',
    cell: (info: any) => info?.getValue() ?? '__',
  },
];
