import { TruncateText } from '@/components/TruncateText';
import { AIR_SERVICES } from '@/constants';
import { fullName } from '@/utils/avatarUtils';
import { Typography } from '@mui/material';

export const softwareColumnsDynamic = (router: any): any => [
  {
    accessorFn: (row: any) => row?.name,
    id: 'name',
    isSortable: true,
    header: 'Software',
    cell: (info: any) => (
      <Typography
        component="span"
        onClick={() =>
          router?.push({
            pathname: AIR_SERVICES?.ASSETS_SOFTWARE_DETAIL,
            query: {
              softwareId: info?.row?.original?._id,
            },
          })
        }
        color="custom.bright"
        sx={{ cursor: 'pointer' }}
      >
        {<TruncateText text={info?.getValue()?.toLowerCase()} />}
      </Typography>
    ),
  },
  {
    accessorFn: (row: any) => row?.status,
    id: 'status',
    header: 'Status',
    isSortable: true,
    cell: (info: any) => (
      <TruncateText text={info?.getValue()?.toLowerCase()} />
    ),
  },
  {
    accessorFn: (row: any) => row?.category,
    id: 'category',
    isSortable: true,
    header: 'Category',
    cell: (info: any) => (
      <TruncateText text={info?.getValue()?.toLowerCase()} />
    ),
  },
  {
    accessorFn: (row: any) => row?.contractValue,
    id: 'contractValue',
    isSortable: true,
    header: 'Contract Value',
    cell: (info: any) => (
      <TruncateText text={info?.getValue()?.toLowerCase()} />
    ),
  },
  {
    accessorFn: (row: any) => row?.managedBy,
    id: 'managedBy',
    isSortable: true,
    header: 'Managed By',
    cell: (info: any) => (
      <TruncateText text={fullName(info?.getValue()?.toLowerCase())} />
    ),
  },
  {
    accessorFn: (row: any) => row?.users,
    id: 'users',
    isSortable: true,
    header: ' Users',
    cell: (info: any) => (
      <TruncateText text={info?.getValue()?.toLowerCase()} />
    ),
  },
  {
    accessorFn: (row: any) => row?.installs,
    id: 'installs',
    isSortable: true,
    header: 'Installs',
    cell: (info: any) => (
      <TruncateText text={info?.getValue()?.toLowerCase()} />
    ),
  },
  {
    accessorFn: (row: any) => row?.type,
    id: 'type',
    isSortable: true,
    header: 'Type',
    cell: (info: any) => (
      <TruncateText text={info?.getValue()?.toLowerCase()} />
    ),
  },
  {
    accessorFn: (row: any) => row?.publisherName,
    id: 'publisherName',
    isSortable: true,
    header: 'Publisher',
    cell: (info: any) => (
      <TruncateText text={fullName(info?.getValue()?.toLowerCase())} />
    ),
  },
];
