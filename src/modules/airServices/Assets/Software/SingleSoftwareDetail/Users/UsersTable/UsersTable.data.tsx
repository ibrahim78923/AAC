import { Box, Checkbox } from '@mui/material';
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
    accessorFn: (row: any) => row?.details,
    id: 'Name',
    cell: (info: any) => (
      <Box fontWeight={700}>
        {`${info?.getValue()?.firstName} ${info?.getValue()?.lastName}`}
      </Box>
    ),
    header: 'Name',
    isSortable: true,
  },
  {
    accessorFn: (row: any) => row?.departmentDetails?.name,
    id: 'Department',
    cell: (info: any) => info?.getValue() ?? '__',
    header: 'Department',
    isSortable: true,
  },
  {
    accessorFn: (row: any) => row?.source,
    id: 'Source',
    isSortable: true,
    header: 'Source',
    cell: (info: any) => info?.getValue() ?? '__',
  },
  {
    accessorFn: (row: any) => row?.data?.usage,
    id: 'Usage',
    isSortable: true,
    header: 'Usage',
    cell: (info: any) => info?.getValue() ?? '__',
  },
  {
    accessorFn: (row: any) => row?.details?.createdAt,
    id: 'createdAt',
    isSortable: true,
    header: 'First Seen',
    cell: (info: any) => dayjs(info?.getValue())?.format(CALENDAR_FORMAT?.UI),
  },
  {
    accessorFn: (row: any) => row?.details?.updatedAt,
    id: 'updatedAt',
    isSortable: true,
    header: 'Last Seen',
    cell: (info: any) => dayjs(info?.getValue())?.format(CALENDAR_FORMAT?.UI),
  },
  {
    accessorFn: (row: any) => row?.createdAt,
    id: 'createdAt',
    isSortable: true,
    header: 'Assigned Date',
    cell: (info: any) => dayjs(info?.getValue())?.format(CALENDAR_FORMAT?.UI),
  },
  {
    accessorFn: (row: any) => row?.contractDetails?.name,
    id: 'Contract',
    isSortable: true,
    header: 'Contract',
    cell: (info: any) => info?.getValue() ?? '__',
  },
];
