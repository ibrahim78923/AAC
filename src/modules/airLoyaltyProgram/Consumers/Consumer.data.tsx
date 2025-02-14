import { SingleDropdownButtonCloseMenuI } from '@/components/Buttons/SingleDropdownButton/SingleDropdownButton.interface';
import { TruncateText } from '@/components/TruncateText';
import { UserInfo } from '@/components/UserInfo';
import { ACTIVITY_STATUS_MENU, DATE_TIME_FORMAT } from '@/constants';
import { fullName, fullNameInitial } from '@/utils/avatarUtils';
import { Box, Typography } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import FiberSmartRecordIcon from '@mui/icons-material/FiberSmartRecord';
import ListStatusAction from './ListStatusAction';
import { otherDateFormat } from '@/lib/date-time';
import { CheckboxField } from '@/components/InputFields/CheckboxField';

export const getHeaderActionButtonDropdown = (
  handleHeaderActionButtonStatusChange: any,
) => [
  {
    id: 1,
    title: (
      <Box display={'flex'} gap={1} alignItems={'center'}>
        <FiberManualRecordIcon color={'secondary'} />
        <Typography variant="body2" color={'grey.600'} fontWeight={500}>
          Active
        </Typography>
      </Box>
    ),
    handleClick: (closeMenu: SingleDropdownButtonCloseMenuI) => {
      handleHeaderActionButtonStatusChange(ACTIVITY_STATUS_MENU?.ACTIVE);
      closeMenu?.();
    },
  },
  {
    id: 2,
    title: (
      <Box display={'flex'} gap={1} alignItems={'center'}>
        <FiberSmartRecordIcon color={'secondary'} />
        <Typography variant="body2" color={'grey.600'} fontWeight={500}>
          Inactive
        </Typography>
      </Box>
    ),
    handleClick: (closeMenu: SingleDropdownButtonCloseMenuI) => {
      handleHeaderActionButtonStatusChange(ACTIVITY_STATUS_MENU?.INACTIVE);
      closeMenu?.();
    },
  },
];

export const consumersListColumnDynamic = (
  moveToConsumer?: any,
  selectedConsumerList?: any,
  setSelectedConsumersList?: any,
  consumerData?: any,
) => [
  {
    accessorFn: (row: any) => row?._id,
    id: '_id',
    cell: (info: any) => (
      <CheckboxField
        checked={
          !!selectedConsumerList?.find(
            (item: any) => item?._id === info?.getValue(),
          )
        }
        onChange={(e: any) => {
          e?.target?.checked
            ? setSelectedConsumersList([
                ...selectedConsumerList,
                info?.row?.original,
              ])
            : setSelectedConsumersList(
                selectedConsumerList?.filter(
                  (item: any) => item?._id !== info?.getValue(),
                ),
              );
        }}
        name={info?.getValue()}
      />
    ),
    header: (
      <CheckboxField
        checked={
          consumerData?.length
            ? selectedConsumerList?.length === consumerData?.length
            : false
        }
        onChange={(e: any) => {
          e?.target?.checked
            ? setSelectedConsumersList(consumerData)
            : setSelectedConsumersList([]);
        }}
        name="id"
      />
    ),
  },
  {
    accessorFn: (row: any) => row,
    id: 'firstName',
    isSortable: true,
    header: 'Consumer',
    cell: (info: any) => {
      const consumerId = info?.getValue()?._id;

      return (
        <UserInfo
          handleBoxClick={() => moveToConsumer(consumerId)}
          boxProps={{ sx: { cursor: 'pointer' } }}
          nameProps={{ sx: { whiteSpace: 'nowrap' } }}
          nameInitial={fullNameInitial(
            info?.getValue()?.firstName,
            info?.getValue()?.lastName,
          )}
          name={fullName(
            info?.getValue()?.firstName,
            info?.getValue()?.lastName,
          )}
          avatarSrc={info?.row?.original?.avatar?.url}
          email={info?.getValue()?.email}
        />
      );
    },
  },
  {
    accessorFn: (row: any) => row?.address,
    id: 'address',
    isSortable: true,
    header: 'Address',
    cell: (info: any) => <TruncateText text={info?.getValue()} />,
  },
  {
    accessorFn: (row: any) => row?.phoneNumber,
    id: 'phoneNumber',
    isSortable: true,
    header: 'Phone Number',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.status,
    id: 'status',
    isSortable: true,
    header: 'Status',
    cell: (info: any) => (
      <ListStatusAction info={info} status={info?.getValue()?.toUpperCase()} />
    ),
  },
  {
    accessorFn: (row: any) => row?.totalPointsEarned,
    id: 'totalPointsEarned',
    isSortable: true,
    header: 'Total Points Earned',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.currentPointBalance,
    id: 'currentPointBalance',
    isSortable: true,
    header: 'Current Points Balance',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.numberofTransactions,
    id: 'numberofTransactions',
    isSortable: true,
    header: 'No of Transactions',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.firstPointsReceptionDate,
    id: 'firstPointsReceptionDate',
    isSortable: true,
    header: 'First Points Reception Date',
    cell: (info: any) =>
      info?.getValue()
        ? otherDateFormat(
            info?.getValue(),
            DATE_TIME_FORMAT?.MMM_DD_YYYY_hh_mm_A,
          )
        : '---',
  },
  {
    accessorFn: (row: any) => row?.lastTransactionDate,
    id: 'lastTransactionDate',
    isSortable: true,
    header: 'Last Transaction Date',
    cell: (info: any) =>
      info?.getValue()
        ? otherDateFormat(
            info?.getValue(),
            DATE_TIME_FORMAT?.MMM_DD_YYYY_hh_mm_A,
          )
        : '---',
  },
  {
    accessorFn: (row: any) => row?.tierDetails,
    id: 'tierDetails',
    isSortable: true,
    header: 'Tier',
    cell: (info: any) => info?.getValue()?.name ?? '---',
  },
];
