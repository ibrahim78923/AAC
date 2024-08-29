import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import { DATE_TIME_FORMAT } from '@/constants';
import { Avatar, Box, Checkbox, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { ImportTabColumnsI } from './ImportTab.interface';
import { generateImage } from '@/utils/avatarUtils';
import { ARRAY_INDEX } from '@/constants/strings';

export const importTabColumnsFunction: ImportTabColumnsI = (
  exportList,
  selectedExportList,
  setSelectedExportList,
) => [
  {
    accessorFn: (row: any) => row?._id,
    id: '_id',
    cell: (info: any) => (
      <Checkbox
        icon={<CheckboxIcon />}
        checkedIcon={<CheckboxCheckedIcon />}
        checked={
          !!selectedExportList?.find(
            (item: any) => item?._id === info?.getValue(),
          )
        }
        onChange={(e: any) => {
          e?.target.checked
            ? setSelectedExportList([
                ...selectedExportList,
                exportList?.find((item: any) => item?._id === info?.getValue()),
              ])
            : setSelectedExportList(
                selectedExportList?.filter((item: any) => {
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
        checked={
          selectedExportList?.length
            ? selectedExportList?.length === exportList?.length
            : false
        }
        onChange={(e: any) => {
          e?.target?.checked
            ? setSelectedExportList([...exportList])
            : setSelectedExportList([]);
        }}
        color="primary"
        name="id"
      />
    ),
    isSortable: false,
  },
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
          <Typography variant="body2" color={'grey.800'}>
            {info?.row?.original?.userDetails[ARRAY_INDEX?.ZERO]?.firstName +
              ' ' +
              info?.row?.original?.userDetails[ARRAY_INDEX?.ZERO]?.lastName ??
              '---'}
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
    cell: (info: any) => info?.getValue() ?? '---',
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
    accessorFn: (row: any) => row?.status,
    id: 'status',
    isSortable: true,
    header: 'Status',
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
