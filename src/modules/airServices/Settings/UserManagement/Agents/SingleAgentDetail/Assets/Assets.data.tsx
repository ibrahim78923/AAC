import { TruncateText } from '@/components/TruncateText';
import { AIR_SERVICES } from '@/constants/routes';
import { uiDateFormat } from '@/lib/date-time';
import { fullName } from '@/utils/avatarUtils';
import { Typography } from '@mui/material';

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
        {<TruncateText text={info?.getValue()?.toLowerCase()} />}
      </Typography>
    ),
  },
  {
    accessorFn: (row: any) => row?.assetTypeDetails,
    id: 'assetType',
    header: 'Asset Type',
    isSortable: true,
    cell: (info: any) => (
      <TruncateText text={info?.getValue()?.name?.toLowerCase()} />
    ),
  },
  {
    accessorFn: (row: any) => row?.locationDetails,
    id: 'locationId',
    isSortable: true,
    header: 'Location',
    cell: (info: any) => (
      <TruncateText text={info?.getValue()?.locationName?.toLowerCase()} />
    ),
  },
  {
    accessorFn: (row: any) => row?.userDetails,
    id: 'UsedBy',
    isSortable: true,
    header: 'Used By',
    cell: (info: any) => (
      <TruncateText
        text={fullName(
          info?.getValue()?.firstName?.toLowerCase(),
          info?.getValue()?.lastName?.toLowerCase(),
        )}
      />
    ),
  },
  {
    accessorFn: (row: any) => row?.departmentDetails,
    id: 'departmentId',
    isSortable: true,
    header: 'Department',
    cell: (info: any) => (
      <TruncateText text={info?.getValue()?.name?.toLowerCase()} />
    ),
  },
  {
    accessorFn: (row: any) => row?.impact,
    id: 'impact',
    isSortable: true,
    header: 'Impact',
    cell: (info: any) => (
      <TruncateText text={info?.getValue()?.toLowerCase()} />
    ),
  },
  {
    accessorFn: (row: any) => row?.assetLifeExpiry,
    id: 'assetLifeExpireOn',
    isSortable: true,
    header: 'Asset life expire on',
    cell: (info: any) => uiDateFormat(info?.getValue()),
  },
];
