import { Avatar, Box, Checkbox, Typography } from '@mui/material';
import { REQUESTERS_STATUS } from '@/constants/strings';
import { AIR_SERVICES } from '@/constants';
import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import { ProfileImage } from '@/assets/images';

export const requestersDropdown = (
  setDeleteModal: any,
  setWarningModal: any,
) => [
  {
    title: 'Delete',
    handleClick: (close: any) => {
      setDeleteModal(true);
      close(null);
    },
  },
  {
    title: 'Convert to Agent',
    handleClick: (close: any) => {
      setWarningModal(true);
      close(null);
    },
  },
];

export const requestersList: any = (
  selectedRequestersList: any,
  setSelectedRequestersList: any,
  theme: any,
  router: any,
  tableListData: any,
) => [
  {
    accessorFn: (row: any) => row?._id,
    id: '_id',
    cell: (info: any) => (
      <Checkbox
        icon={<CheckboxIcon />}
        checkedIcon={<CheckboxCheckedIcon />}
        checked={
          !!selectedRequestersList?.find(
            (item: any) => item?._id === info?.getValue(),
          )
        }
        onChange={(e: any) => {
          e?.target?.checked
            ? setSelectedRequestersList([
                ...selectedRequestersList,
                tableListData?.find(
                  (item: any) => item?._id === info?.getValue(),
                ),
              ])
            : setSelectedRequestersList(
                selectedRequestersList?.filter((item: any) => {
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
        checked={selectedRequestersList?.length === tableListData?.length}
        onChange={(e: any) => {
          e?.target?.checked
            ? setSelectedRequestersList([...tableListData])
            : setSelectedRequestersList([]);
        }}
        color="primary"
        name="_id"
      />
    ),
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row?.fullName,
    id: 'fullName',
    header: 'Name',
    isSortable: true,
    cell: (info: any) => (
      <Box display={'flex'} alignItems={'center'} gap={1}>
        <Avatar
          src={info?.row?.original?.icon?.src || ProfileImage}
          alt={info?.row?.original?.icon?.name}
        />
        <Typography
          sx={{
            color: 'blue.main',
            cursor: 'pointer',
          }}
          onClick={() =>
            router?.push({
              pathname: AIR_SERVICES?.SINGLE_REQUESTERS_DETAILS,
              query: { _id: info?.row?.original?._id },
            })
          }
        >
          {info?.getValue()}
        </Typography>
      </Box>
    ),
  },
  {
    accessorFn: (row: any) => row?.email,
    id: 'email',
    isSortable: true,
    header: 'Email',

    cell: (info: any) => {
      return (
        <Typography
          style={{
            textTransform: 'lowercase',
            cursor: 'pointer',
            textDecoration:
              info?.row?.original?.status === REQUESTERS_STATUS?.INACTIVE
                ? 'underline'
                : 'none',
          }}
          onClick={() =>
            info?.row?.original?.status === REQUESTERS_STATUS?.INACTIVE &&
            router?.push(`mailto:${info?.getValue()}`)
          }
        >
          {info?.getValue()}
        </Typography>
      );
    },
  },
  {
    accessorFn: (row: any) => row?.status,
    id: 'status',
    isSortable: true,
    header: 'Activation Status',
    cell: (info: any) => {
      const status = info?.getValue();
      const color =
        status === REQUESTERS_STATUS?.ACTIVE
          ? theme?.palette?.success?.main
          : status === REQUESTERS_STATUS?.INACTIVE
          ? theme?.palette?.warning?.main
          : '';

      return (
        <Typography
          sx={{
            color: color,
            width: 'fit-content',
          }}
        >
          {status}
        </Typography>
      );
    },
  },
  {
    accessorFn: (row: any) => row?.role,
    id: 'role',
    isSortable: true,
    header: 'Job Title',
    cell: (info: any) => info?.getValue(),
  },
];
