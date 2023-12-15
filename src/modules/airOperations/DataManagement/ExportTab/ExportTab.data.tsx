import { DATE_FORMAT } from '@/constants';
import { Avatar, Box, Checkbox, Typography } from '@mui/material';
import dayjs from 'dayjs';

export const exportTabColumnsFunction: any = (
  exportList: any,
  selectedExportList: any,
  setSelectedExportList: any,
) => [
  {
    accessorFn: (row: any) => row?.id,
    id: 'id',
    cell: (info: any) => (
      <Checkbox
        checked={
          !!selectedExportList?.find(
            (item: any) => item?.id === info?.getValue(),
          )
        }
        onChange={(e: any) => {
          e?.target.checked
            ? setSelectedExportList([
                ...selectedExportList,
                exportList?.find((item: any) => item?.id === info?.getValue()),
              ])
            : setSelectedExportList(
                selectedExportList?.filter((item: any) => {
                  return item?.id !== info?.getValue();
                }),
              );
        }}
        color="primary"
        name={info?.getValue()}
      />
    ),
    header: (
      <Checkbox
        checked={selectedExportList?.length === exportList?.length}
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
    header: 'user',
    cell: (info: any) => (
      <Box display={'flex'} flexWrap={'wrap'} alignItems={'center'} gap={1}>
        <Avatar
          sx={{ bgcolor: 'error.lighter' }}
          style={{ width: 24, height: 24 }}
          src={info?.row?.original?.user?.profileImg?.src}
          alt={info?.row?.original?.user?.name}
        />
        <Box>
          <Typography
            variant="subtitle2"
            fontWeight={500}
            color="blue.dull_blue"
          >
            {info?.getValue()}
          </Typography>
          <Typography variant="subtitle2" fontWeight={400} color="custom.light">
            {info?.getValue()}
          </Typography>
        </Box>
      </Box>
    ),
  },
  {
    accessorFn: (row: any) => row?.fileName,
    id: 'fileName',
    isSortable: true,
    header: 'file Name',
    cell: (info: any) => (
      <Typography color="primary.main">{info?.getValue()}</Typography>
    ),
  },
  {
    accessorFn: (row: any) => row?.product,
    id: 'product',
    isSortable: true,
    header: 'product',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.object,
    id: 'object',
    isSortable: true,
    header: 'object',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.noOfRecords,
    id: 'noOfRecords',
    isSortable: true,
    header: 'No Of Records',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.createdDate,
    id: 'createdDate',
    isSortable: true,
    header: 'created Date',
    cell: (info: any) =>
      info?.getValue()
        ? dayjs(info?.getValue())?.format(DATE_FORMAT?.UI)
        : '---',
  },
];

export const exportListData: any = [
  {
    id: 1,
    user: 'purchase cost',
    fileName: 'Doc.pdf',
    product: 'Service',
    object: 'Deals',
    noOfRecords: 1506,
    createdDate: `2023-12-14T11:59:08.238Z`,
  },
  {
    id: 2,
    user: 'purchase cost',
    fileName: 'Doc.pdf',
    product: 'Service',
    object: 'Deals',
    noOfRecords: 1506,
    createdDate: `2023-12-14T11:59:08.238Z`,
  },
];
