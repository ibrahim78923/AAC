import { Box, Checkbox } from '@mui/material';
import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';

export const usersTableColumns = (
  usersData: any,
  setUsersData: any,
  usersMainData: any,
) => [
  {
    accessorFn: (row: any) => row?.data?.details,
    id: 'details',
    cell: (info: any) => (
      <Checkbox
        icon={<CheckboxIcon />}
        checkedIcon={<CheckboxCheckedIcon />}
        checked={
          !!usersData?.find((item: any) => item?.id === info?.getValue()?._id)
        }
        onChange={(e) => {
          const selectedId = info?.getValue()?._id;
          if (e?.target?.checked) {
            setUsersData([
              ...usersData,
              usersMainData?.find((item: any) => item?.id === selectedId),
            ]);
          } else {
            setUsersData(
              usersData?.filter((item: any) => item?.id !== selectedId),
            );
          }
        }}
        color="primary"
        name={info?.getValue()?._id}
      />
    ),
    header: (
      <Checkbox
        icon={<CheckboxIcon />}
        checkedIcon={<CheckboxCheckedIcon />}
        checked={usersData?.length === usersMainData?.length}
        onChange={(e) => {
          if (e?.target?.checked) {
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
    accessorFn: (row: any) => row?.data?.details,
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
    accessorFn: (row: any) => row?.data?.department,
    id: 'Department',
    cell: (info: any) => info?.getValue(),
    header: 'Department',
    isSortable: true,
  },
  {
    accessorFn: (row: any) => row?.data?.source,
    id: 'Source',
    isSortable: true,
    header: 'Source',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.data?.usage,
    id: 'Usage',
    isSortable: true,
    header: 'Usage',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.data?.firstseen,
    id: 'First Seen',
    isSortable: true,
    header: 'First Seen',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.data?.lastseen,
    id: 'Last Seen',
    isSortable: true,
    header: 'Last Seen',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.data?.assigneddate,
    id: 'Assigned Date',
    isSortable: true,
    header: 'Assigned Date',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.data?.contract,
    id: 'Contract',
    isSortable: true,
    header: 'Contract',
    cell: (info: any) => info?.getValue(),
  },
];
