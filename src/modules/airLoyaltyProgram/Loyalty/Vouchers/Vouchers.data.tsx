import { Box, IconButton, Typography } from '@mui/material';
import { DATE_TIME_FORMAT } from '@/constants';
import { EditYellowBGPenIcon, TrashIcon } from '@/assets/icons';
import { UserInfo } from '@/components/UserInfo';
import { otherDateFormat } from '@/lib/date-time';
import { VoucherStatus } from './VoucherStatus';
import { LOYALTY_VOUCHER_STATUS } from '@/constants/loyalty-program';

export const vouchersColumns = (
  handleVoucherClick: any,
  handleEditVoucher: any,
  handleDeleteVoucher: any,
  checkActionPermissions: boolean,
) => {
  const columns = [
    {
      accessorFn: (row: any) => row?.name,
      id: 'name',
      header: 'Vouchers',
      isSortable: true,
      cell: (info: any) => (
        <UserInfo
          name={info?.getValue()}
          optionDetail={info?.row?.original?.voucherCode}
          avatarSrc={info?.row?.original?.voucherAttachment}
          nameInitial={info?.getValue()?.slice(0, 2)}
          handleBoxClick={() => handleVoucherClick(info?.row?.original)}
          boxProps={{ sx: { cursor: 'pointer' } }}
          nameProps={{ fontWeight: 700 }}
          avatarSize={{ width: 40, height: 40, variant: 'circular' }}
        />
      ),
    },
    {
      accessorFn: (row: any) => row?.voucherLimitValue,
      id: 'voucherLimitValue',
      header: 'Vouchers usage',
      isSortable: true,
      cell: (info: any) => (
        <Box display={'flex'}>
          <Typography fontSize={'0.9rem'}>
            {info?.row?.original?.redeemedVoucherLimit ?? '0'} /{' '}
          </Typography>
          <Typography fontSize={'0.9rem'}>
            {info?.getValue() || 'Unlimited'}
          </Typography>
        </Box>
      ),
    },
    {
      accessorFn: (row: any) => row?.ascrowRedeemedVoucherLimit,
      id: 'ascrowRedeemedVoucherLimit',
      isSortable: true,
      header: 'Escrow Redeemed Voucher',
      cell: (info: any) => info.getValue() ?? '---',
    },
    {
      accessorFn: (row: any) => row?.status,
      id: 'status',
      isSortable: true,
      header: 'Status',
      cell: (info: any) => <VoucherStatus info={info} />,
    },
    {
      accessorFn: (row: any) => row?.createdAt,
      id: 'createdAt',
      isSortable: true,
      header: 'Created at',
      cell: (info: any) =>
        otherDateFormat(info?.getValue(), DATE_TIME_FORMAT?.YMDHM) ?? '---',
    },
  ];
  if (checkActionPermissions) {
    columns?.push({
      accessorFn: (row: any) => row?._id,
      id: '_id',
      isSortable: true,
      header: 'Actions',
      cell: (info: any) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            onClick={() => handleEditVoucher(info?.row?.original)}
            disabled={
              info?.row?.original?.status ===
              LOYALTY_VOUCHER_STATUS?.EXPIRED_LABEL
            }
            sx={{
              opacity:
                info?.row?.original?.status ===
                LOYALTY_VOUCHER_STATUS?.EXPIRED_LABEL
                  ? 0.5
                  : 1,
            }}
          >
            <EditYellowBGPenIcon />
          </IconButton>
          <IconButton onClick={() => handleDeleteVoucher(info?.row?.original)}>
            <TrashIcon />
          </IconButton>
        </Box>
      ),
    });
  }
  return columns;
};
