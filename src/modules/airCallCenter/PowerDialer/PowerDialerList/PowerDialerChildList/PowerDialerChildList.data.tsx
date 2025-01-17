import { AvatarImage } from '@/assets/images';
import { SingleDropdownButton } from '@/components/Buttons/SingleDropdownButton';
import { Avatar, Box, Checkbox, Typography } from '@mui/material';
import {
  ArrowDownIcon,
  CheckboxCheckedIcon,
  CheckboxIcon,
} from '@/assets/icons';
import {
  statusColors,
  statusDropDown,
  statuses,
} from '../PowerDialerList.data';
import { DeletePowerDialerItem } from './DeletePowerDialer';
import { CallTags } from './CallTags';
import CallsDetailsDrawer from './CallsDetailsDrawer';

export const transactionTableData = [
  {
    id: 1,
    customerName: 'Olivia Rhye',
    agent: `John Doe`,
    phoneNumber: '+1234567890',
    email: 'johndoe@ceative.co.uk',
    queuedOn: '5 minutes ago',
    callTags: ['Product Sales', 'Customer Support', 'Feedback'],
    customer: '10 Customers',
    status: `IN progress`,
  },
];
export const UserList: any = (
  responsesData: any,
  setResponsesData: any,
  responsesMainData: any,
  buttonName: any,
  setButtonName: any,
) => [
  {
    accessorFn: (row: any) => row?._id,
    id: '_id',
    cell: (info: any) => (
      <Checkbox
        icon={<CheckboxIcon />}
        checkedIcon={<CheckboxCheckedIcon />}
        checked={
          !!responsesData?.find((item: any) => item?._id === info?.getValue())
        }
        onChange={(e: any) => {
          e?.target?.checked
            ? setResponsesData([
                ...responsesData,
                responsesMainData?.find(
                  (item: any) => item?._id === info?.getValue(),
                ),
              ])
            : setResponsesData(
                responsesData?.filter((item: any) => {
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
        checked={responsesData?.length === responsesMainData?.length}
        onChange={(e: any) => {
          e?.target?.checked
            ? setResponsesData([...responsesMainData])
            : setResponsesData([]);
        }}
        color="primary"
        name="id"
      />
    ),
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row?.customerName,
    id: 'customerName',
    header: 'Customer Name',
    isSortable: true,
    cell: (info: any) => (
      <Box display="flex" alignItems="center" gap={1}>
        <Avatar
          src={AvatarImage.src}
          sx={{ color: 'common.black' }}
          alt="img"
        />
        <Typography>{info?.getValue()}</Typography>
      </Box>
    ),
  },
  {
    accessorFn: (row: any) => row?.agent,
    id: 'agent',
    isSortable: true,
    header: 'Agent',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.phoneNumber,
    id: 'phoneNumber',
    isSortable: true,
    header: 'Phone Number',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.email,
    id: 'email',
    isSortable: true,
    header: 'Email ID',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.queuedOn,
    id: 'queuedOn',
    isSortable: true,
    header: 'Queued On',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.callTags,
    id: 'callTags',
    isSortable: true,
    header: 'Call Tags',
    cell: (info: any) => (
      <>
        {info?.getValue()[0]}
        <CallTags data={info?.getValue()} />
      </>
    ),
  },
  {
    accessorFn: (row: any) => row?.status,
    id: 'status',
    isSortable: true,
    header: 'Status',
    cell: () => (
      <SingleDropdownButton
        disabled={buttonName === statuses[1]}
        endIcon={
          buttonName === statuses[1] ? (
            <></>
          ) : (
            <ArrowDownIcon color="#fff" size={18} />
          )
        }
        dropdownOptions={statusDropDown(setButtonName)}
        btnVariant
        sx={{
          p: 0.5,
          borderRadius: 50,
          height: 22,
          minWidth: 81,
          bgcolor: statusColors[buttonName],
          color: 'common.white',
          fontSize: 12,
          fontWeight: 400,
          '&:hover': {
            bgcolor: statusColors[buttonName],
            color: 'common.white',
          },
          '&.Mui-disabled': {
            color: 'common.white',
            fontSize: 12,
            fontWeight: 400,
          },
        }}
        dropdownName={buttonName}
      />
    ),
  },
  {
    accessorFn: (row: any) => row?.action,
    id: 'action',
    isSortable: true,
    header: 'Action',
    cell: () => (
      <Box display="flex">
        <CallsDetailsDrawer />
        <DeletePowerDialerItem />
      </Box>
    ),
  },
];
