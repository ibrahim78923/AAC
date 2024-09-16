import { DATE_TIME_FORMAT } from '@/constants';
import { Avatar, Box, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { generateImage } from '@/utils/avatarUtils';

export const exportTabColumns = [
  {
    accessorFn: (row: any) => row?.user,
    id: 'user',
    isSortable: true,
    header: 'User',
    cell: (info: any) => (
      <Box display={'flex'} flexWrap={'wrap'} alignItems={'center'} gap={1}>
        <Avatar
          sx={{ bgcolor: 'error.lighter', width: 32, height: 32 }}
          src={generateImage(info?.row?.original?.avatar)}
          alt={info?.row?.original?.userFullName}
        />
        <Box display={'flex'} flexDirection={'column'}>
          <Typography variant="body2" color={'grey.800'}>
            {info?.row?.original?.userFullName ?? '---'}
          </Typography>
          <Typography variant="body3" color={'grey.900'}>
            {info?.row?.original?.email ?? '---'}
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
    cell: (info: any) => {
      const url = new URL(info?.row?.original?.fileName);
      const fileName = url?.pathname?.replace(/^\//, '');
      return (
        <Typography variant="body2" color={'primary'}>
          <a href={url?.href} download={fileName}>
            {fileName ?? '---'}
          </a>
        </Typography>
      );
    },
  },
  {
    accessorFn: (row: any) => row?.product,
    id: 'product',
    isSortable: true,
    header: 'Product',
    cell: (info: any) => info?.getValue() ?? '---',
  },
  {
    accessorFn: (row: any) => row?.object,
    id: 'object',
    isSortable: true,
    header: 'Object',
    cell: (info: any) => info?.getValue() ?? '---',
  },
  {
    accessorFn: (row: any) => row?.noOfRecords,
    id: 'noOfRecords',
    isSortable: true,
    header: 'No of Records',
    cell: (info: any) => info?.getValue() ?? '---',
  },
  {
    accessorFn: (row: any) => row?.createdAt,
    id: 'createdAt',
    isSortable: true,
    header: 'Created Date',
    cell: (info: any) =>
      dayjs(info?.getValue())?.format(DATE_TIME_FORMAT?.DDMMYYY) ?? '---',
  },
];
