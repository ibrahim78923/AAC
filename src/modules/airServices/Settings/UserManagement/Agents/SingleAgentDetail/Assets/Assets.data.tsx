import { AIR_SERVICES, DATE_FORMAT } from '@/constants';
import { fullName } from '@/utils/avatarUtils';
import { Typography } from '@mui/material';
import dayjs from 'dayjs';

export const inventoryListsColumnsDynamic: any = (router: any): any => [
  {
    accessorFn: (row: any) => row?.displayName,
    id: 'displayName',
    isSortable: true,
    header: 'Name',
    cell: (info: any) => (
      <Typography
        component={'span'}
        onClick={() =>
          router?.push({
            pathname: AIR_SERVICES?.ASSETS_INVENTORY_DETAIL,
            query: {
              inventoryId: info?.row?.original._id,
            },
          })
        }
        color="custom.bright"
        sx={{ cursor: 'pointer' }}
      >
        {info?.getValue()}
      </Typography>
    ),
  },
  {
    accessorFn: (row: any) => row?.assetTypeDetails,
    id: 'assetType',
    header: 'Asset Type',
    isSortable: true,
    cell: (info: any) => info?.getValue()?.name ?? '--',
  },
  {
    accessorFn: (row: any) => row?.locationDetails,
    id: 'locationId',
    isSortable: true,
    header: 'Location',
    cell: (info: any) => info?.getValue()?.locationName ?? '--',
  },
  {
    accessorFn: (row: any) => row?.userDetails,
    id: 'UsedBy',
    isSortable: true,
    header: 'Used By',
    cell: (info: any) =>
      fullName(info?.getValue()?.firstName, info?.getValue()?.lastName),
  },
  {
    accessorFn: (row: any) => row?.departmentDetails,
    id: 'departmentId',
    isSortable: true,
    header: 'Department',
    cell: (info: any) => info?.getValue()?.name ?? '--',
  },
  {
    accessorFn: (row: any) => row?.impact,
    id: 'impact',
    isSortable: true,
    header: 'Impact',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.assetLifeExpiry,
    id: 'assetLifeExpireOn',
    isSortable: true,
    header: 'Asset life expire on',
    cell: (info: any) => dayjs(info?.getValue())?.format(DATE_FORMAT?.UI),
  },
];
