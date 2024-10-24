import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import { TruncateText } from '@/components/TruncateText';
import { LOYALTY_CONSUMER_STATUS } from '@/constants/strings';
import { Checkbox, MenuItem, Select, Typography } from '@mui/material';
import { IConsumer } from './Consumer.interface';

export const consumerData = [
  {
    _id: 1,
    avatar: '',
    firstName: 'John',
    lastName: 'Doe',
    address: '123 Main St, New York, NY 10001',
    phone: '1234567890',
    status: LOYALTY_CONSUMER_STATUS?.ACTIVE,
    totalPointsEarned: '100',
    currentPointsBalance: '100',
    noOfTransactions: '10',
    firstPointsReceptionDate: '2021-10-10',
    lastTransactionDate: '2021-10-10',
    tier: 'Gold',
  },
  {
    _id: 14440,
    firstName: 'JohnCina',
    lastName: 'Doe',
    address: '123 Main St, New York, NY 10001',
    phone: '1234567890',
    status: LOYALTY_CONSUMER_STATUS?.ACTIVE,
    totalPointsEarned: '100',
    currentPointsBalance: '100',
    noOfTransactions: '10',
    firstPointsReceptionDate: '2021-10-10',
    lastTransactionDate: '2021-10-10',
    tier: 'Gold',
  },
];
export const consumersListColumnDynamic = (
  moveToConsumer?: any,
  selectedRoleList?: any,
  setSelectedRoleList?: any,
  consumerData?: any,
  handleStatusChange?: any,
) => [
  {
    accessorFn: (row: IConsumer) => row?._id,
    id: '_id',
    cell: (info: any) => (
      <Checkbox
        icon={<CheckboxIcon />}
        checkedIcon={<CheckboxCheckedIcon />}
        checked={
          !!selectedRoleList?.find(
            (item: any) => item?._id === info?.getValue(),
          )
        }
        onChange={(e: any) => {
          e?.target?.checked
            ? setSelectedRoleList([...selectedRoleList, info?.row?.original])
            : setSelectedRoleList(
                selectedRoleList?.filter(
                  (item: any) => item?._id !== info?.getValue(),
                ),
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
        checked={
          consumerData?.length
            ? selectedRoleList?.length === consumerData?.length
            : false
        }
        onChange={(e: any) => {
          e?.target?.checked
            ? setSelectedRoleList(consumerData)
            : setSelectedRoleList([]);
        }}
        color="primary"
        name="id"
      />
    ),
  },
  {
    accessorFn: (row: IConsumer) => row?.firstName,
    id: 'firstName',
    isSortable: true,
    header: 'Consumer',
    cell: (info: any) => {
      const consumerId = info?.row?.original?.id;
      return (
        <Typography
          onClick={() => moveToConsumer(consumerId)}
          variant="body3"
          component={'div'}
          sx={{ cursor: 'pointer' }}
        >
          <TruncateText text={info.getValue()} />
        </Typography>
      );
    },
  },
  {
    accessorFn: (row: IConsumer) => row?.address,
    id: 'address',
    isSortable: true,
    header: 'Address',
    cell: (info: any) => <TruncateText text={info?.getValue()} />,
  },
  {
    accessorFn: (row: IConsumer) => row?.phone,
    id: 'phone',
    isSortable: true,
    header: 'Phone Number',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: IConsumer) => row?.status,
    id: 'status',
    isSortable: true,
    header: 'Status',
    cell: (info: any) => (
      <Select
        value={info?.getValue()}
        onChange={
          (event) => handleStatusChange(info?.row?.original, event) // Call the handleStatusChange function here
        }
      >
        <MenuItem value={LOYALTY_CONSUMER_STATUS?.ACTIVE}>
          {LOYALTY_CONSUMER_STATUS?.ACTIVE}
        </MenuItem>
        <MenuItem value={LOYALTY_CONSUMER_STATUS?.INACTIVE}>
          {LOYALTY_CONSUMER_STATUS?.INACTIVE}
        </MenuItem>
      </Select>
    ),
  },
  {
    accessorFn: (row: IConsumer) => row?.totalPointsEarned,
    id: 'totalPointsEarned',
    isSortable: true,
    header: 'Total Points Earned',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: IConsumer) => row?.currentPointsBalance,
    id: 'currentPointsBalance',
    isSortable: true,
    header: 'Current Points Balance',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: IConsumer) => row?.noOfTransactions,
    id: 'noOfTransactions',
    isSortable: true,
    header: 'No of Transactions',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: IConsumer) => row?.firstPointsReceptionDate,
    id: 'firstPointsReceptionDate',
    isSortable: true,
    header: 'First Points Reception Date',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: IConsumer) => row?.lastTransactionDate,
    id: 'lastTransactionDate',
    isSortable: true,
    header: 'Last Transaction Date',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: IConsumer) => row?.tier,
    id: 'tier',
    isSortable: true,
    header: 'Tier',
    cell: (info: any) => info?.getValue(),
  },
];
