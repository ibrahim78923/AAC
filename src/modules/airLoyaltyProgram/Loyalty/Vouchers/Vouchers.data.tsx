import { Box, Chip, IconButton, Typography } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { DATE_TIME_FORMAT } from '@/constants';
import { EditYellowBGPenIcon, TrashIcon } from '@/assets/icons';
import { VOUCHERS_STATUS } from '@/constants/strings';
import dayjs from 'dayjs';
import { UserInfo } from '@/components/UserInfo';

export const vouchersColumns = (
  handleVoucherClick: any,
  handleEditVoucher: any,
  handleDeleteVoucher: any,
  checkActionPermissions: any,
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
          avatarSrc={info?.row?.original?.avatar}
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
            {info?.getValue()?.voucherValue ?? '0'} /{' '}
          </Typography>
          <Typography fontSize={'0.9rem'}>
            {info?.getValue() ?? 'Unlimited'}
          </Typography>
        </Box>
      ),
    },
    {
      accessorFn: (row: any) => row?.status,
      id: 'status',
      isSortable: true,
      header: 'Status',
      cell: (info: any) => (
        <Chip
          sx={({ palette }: any) => ({
            backgroundColor:
              info?.getValue() === VOUCHERS_STATUS?.EXPIRED
                ? `${palette?.warning?.main}1A`
                : info?.getValue() === VOUCHERS_STATUS?.ACTIVE
                  ? palette?.success?.lighter
                  : palette?.custom?.error_lighter,

            color:
              info?.getValue() === VOUCHERS_STATUS?.EXPIRED
                ? palette?.warning?.main
                : info?.getValue() === VOUCHERS_STATUS?.ACTIVE
                  ? palette?.success?.main
                  : palette?.error?.main,
            fontSize: '0.8rem',
          })}
          icon={
            <FiberManualRecordIcon
              color={
                info?.getValue() === VOUCHERS_STATUS?.EXPIRED
                  ? 'warning'
                  : info?.getValue() === VOUCHERS_STATUS?.ACTIVE
                    ? 'success'
                    : 'error'
              }
              sx={{ fontSize: '0.7rem' }}
            />
          }
          label={info?.getValue() ?? '---'}
        />
      ),
    },
    {
      accessorFn: (row: any) => row?.createdAt,
      id: 'createdAt',
      isSortable: true,
      header: 'Created at',
      cell: (info: any) =>
        dayjs(info?.getValue())?.format(DATE_TIME_FORMAT?.YMDHM) ?? '---',
    },
  ];

  if (checkActionPermissions) {
    columns.push({
      accessorFn: (row: any) => row?._id,
      id: '_id',
      isSortable: true,
      header: 'Actions',
      cell: (info: any) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={() => handleEditVoucher(info?.row?.original)}>
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
