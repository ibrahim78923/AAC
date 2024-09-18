import { Avatar, Box, Typography } from '@mui/material';
import { generateImage } from '@/utils/avatarUtils';
import { ARRAY_INDEX } from '@/constants/strings';
import { uiDateFormat } from '@/utils/dateTime';

export const importTabColumns = [
  {
    accessorFn: (row: any) => row?.user,
    id: 'user',
    isSortable: true,
    header: 'User',
    cell: (info: any) => (
      <Box display={'flex'} flexWrap={'wrap'} alignItems={'center'} gap={1}>
        <Avatar
          sx={{ bgcolor: 'error.lighter', width: 32, height: 32 }}
          src={generateImage(
            info?.row?.original?.userDetails[ARRAY_INDEX?.ZERO]?.avatar?.url,
          )}
          alt={info?.row?.original?.userDetails[ARRAY_INDEX?.ZERO]?.firstName}
        />
        <Box display={'flex'} flexDirection={'column'}>
          <Typography
            variant="body2"
            color={'grey.800'}
            textTransform="capitalize"
          >
            {info?.row?.original?.userDetails[
              ARRAY_INDEX?.ZERO
            ]?.firstName?.toLowerCase() +
              ' ' +
              info?.row?.original?.userDetails[
                ARRAY_INDEX?.ZERO
              ]?.lastName?.toLowerCase() ?? '---'}
          </Typography>
          <Typography variant="body3" color={'grey.900'}>
            {info?.row?.original?.userDetails[ARRAY_INDEX?.ZERO]?.email ??
              '---'}
          </Typography>
        </Box>
      </Box>
    ),
  },
  {
    accessorFn: (row: any) => row?.fileName,
    id: 'fileName',
    isSortable: true,
    header: 'File Name',
    cell: (info: any) => (
      <Typography variant="body2" textTransform="capitalize">
        {info?.getValue() ?? '---'}
      </Typography>
    ),
  },
  {
    accessorFn: (row: any) => row?.product,
    id: 'product',
    isSortable: true,
    header: 'Product',
    cell: (info: any) => (
      <Typography variant="body2" textTransform="capitalize">
        {info?.getValue()?.toLowerCase() ?? '---'}
      </Typography>
    ),
  },
  {
    accessorFn: (row: any) => row?.object,
    id: 'object',
    isSortable: true,
    header: 'Object',
    cell: (info: any) => (
      <Typography variant="body2" textTransform="capitalize">
        {info?.getValue()?.toLowerCase() ?? '---'}
      </Typography>
    ),
  },
  {
    accessorFn: (row: any) => row?.status,
    id: 'status',
    isSortable: true,
    header: 'Status',
    cell: (info: any) => (
      <Typography variant="body2" textTransform="capitalize">
        {info?.getValue()?.toLowerCase() ?? '---'}
      </Typography>
    ),
  },
  {
    accessorFn: (row: any) => row?.createdAt,
    id: 'createdAt',
    isSortable: true,
    header: 'Created Date',
    cell: (info: any) => uiDateFormat(info?.getValue() ?? '---'),
  },
];
