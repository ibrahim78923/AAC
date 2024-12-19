import { UserInfo } from '@/components/UserInfo';
import { DATE_TIME_FORMAT } from '@/constants';
import { ESCROW_STATUS } from '@/constants/strings';
import { otherDateFormat } from '@/lib/date-time';

export const transactionsPointsColumns: any = (
  handleVoucherClick: (rowData: any) => void,
  handleConsumerClick: (rowData: any) => void,
) => [
  {
    accessorFn: (row: any) => row?.name,
    id: 'name',
    header: 'Voucher',
    cell: (info: any) => (
      <UserInfo
        name={info?.getValue()}
        optionDetail={info?.row?.original?.voucherCode}
        avatarSrc={info?.row?.original?.voucherAttachment}
        nameInitial={info?.getValue()?.slice(0, 2)}
        nameProps={{ fontWeight: 700 }}
        avatarSize={{ width: 40, height: 40, variant: 'circular' }}
        handleBoxClick={() => handleVoucherClick(info?.row?.original)}
        boxProps={{ sx: { cursor: 'pointer' } }}
      />
    ),
  },
  {
    accessorFn: (row: any) => row?.consumerName,
    id: 'consumerName',
    header: 'Consumer',
    cell: (info: any) => (
      <UserInfo
        name={info?.getValue()}
        email={info?.row?.original?.email}
        avatarSrc={info?.row?.original?.avatarUrl}
        nameInitial={info?.getValue()?.slice(0, 2)}
        nameProps={{ fontWeight: 700 }}
        avatarSize={{ width: 40, height: 40, variant: 'circular' }}
        handleBoxClick={() => handleConsumerClick(info?.row?.original)}
        boxProps={{ sx: { cursor: 'pointer' } }}
      />
    ),
  },
  {
    accessorFn: (row: any) => row?.percentageOff,
    id: 'percentageOff',
    header: 'Discount Percentage',
    cell: (info: any) => (!!info?.getValue() ? `${info?.getValue()}%` : '---'),
  },
  {
    accessorFn: (row: any) => row?.escrowStatus,
    id: 'escrowStatus',
    header: 'Escrow Status',
    cell: (info: any) => {
      const value = info?.getValue();
      const status = Object.values(ESCROW_STATUS).includes(value)
        ? value
        : '---';
      return status;
    },
  },
  {
    accessorFn: (row: any) => row?.earnDiscountAmount,
    id: 'earnDiscountAmount',
    header: 'Voucher Discount',
    cell: (info: any) => (!!info?.getValue() ? `£${info?.getValue()}` : '---'),
  },
  {
    accessorFn: (row: any) => row?.createdAt,
    id: 'createdAt',
    header: 'CreatedAt',
    cell: (info: any) =>
      otherDateFormat(
        info?.getValue(),
        DATE_TIME_FORMAT?.MMM_DD_YYYY_hh_mm_A,
      ) ?? '---',
  },
];
